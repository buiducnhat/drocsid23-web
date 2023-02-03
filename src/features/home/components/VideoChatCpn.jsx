import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import Peer from 'simple-peer';
import Video from './Video';
import useCheckAuth from 'src/hooks/useCheckAuth';

function VideoChatCpn({ socket }) {
  const { userData } = useCheckAuth();

  const curChannel = useSelector((state) => state.servers.currentChannel);
  const [isJoined, setIsJoined] = useState(false);

  const [localStream, setLocalStream] = useState();
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
      });
  }, []);

  useEffect(() => {
    return () => {
      // component will unmount logic here
      peers.forEach((peer) => {
        peer.destroy();
      });
      setPeers([]);
      isJoined && socket.emit('leaveChannel');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isJoined]);

  const joinVideoCall = () => {
    socket.emit('joinChannel', curChannel._id);

    socket.on('acceptToVoiceChannel', (channel) => {
      console.log('accept to voice channel');
      if (channel._id !== curChannel._id) return;
      setIsJoined(true);
      const tmpPeers = new Map();

      // Có user mới vào room
      // => tạo peer kiểu host, gửi signal về cho user đó qua event 'pair'
      socket.on('userJoinedVoiceChannel', (newUser) => {
        console.log('new user joined', newUser);
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: localStream,
        });
        tmpPeers.set(newUser._id, peer);

        peer.on('signal', (data) => {
          // Emit signal về cho user mới joined
          socket.emit('setupPeer', {
            isInitiator: true,
            from: userData?._id,
            to: newUser._id,
            channelId: channel._id,
            signal: data,
          });
        });

        peer.on('stream', (stream) => {
          setPeers((prev) => [
            ...prev,
            {
              peer,
              user: { id: newUser._id, name: newUser.name },
              stream,
            },
          ]);
        });

        peer.on('close', () => {
          console.log('close');
          // peer.destroy();
        });
      });

      // Khi đã được accept vào room, sau khi gửi signal đi, các user khác
      // sẽ gửi lại signal chờ kết nối với user này qua event 'pair'
      // Có 2 case: là user cũ, nhận được accept từ user mới join
      // hoặc là user mới, nhận được signal từ user cũ
      socket.on('setupPeer', ({ isInitiator, from, to, channelId, signal }) => {
        console.log('setupPeer', {
          isInitiator,
          from,
          to,
          channelId,
          signal,
        });
        if (to === userData?._id && channelId === channel._id) {
          // Đây là data từ user cũ gửi cho mình khi vừa joined
          if (isInitiator) {
            const peer = new Peer({
              initiator: false,
              trickle: false,
              stream: localStream,
            });

            peer.on('signal', (data) => {
              socket.emit('setupPeer', {
                isInitiator: false,
                from: to,
                to: from,
                channelId,
                signal: data,
              });
            });

            peer.on('stream', (stream) => {
              setPeers((prev) => [
                ...prev,
                {
                  user: { id: from, name: from },
                  stream,
                  peer,
                },
              ]);
            });

            peer.signal(signal);
          } else {
            // Đây là data user mới joined gửi lại signal
            tmpPeers.get(from).signal(signal);
          }
        }
      });

      socket.on('userLeftChannel', (userId) => {
        console.log('user left', userId);
        peers.forEach((peer) => {
          if (peer.user.id === userId) {
            peer.destroy();
          }
        });
        setPeers((prev) => prev.filter((peer) => peer.user.id !== userId));
      });
    });
  };

  const videoLayouts = React.useMemo(() => {
    const num = peers.length + 1;
    if (num === 1) return 8;
    if (num === 2) return 6;
    if (num === 3) return 4;
    if (num === 4) return 3;
    return 3;
  }, [peers.length]);

  return (
    <Grid container spacing={2}>
      {localStream && (
        <Grid item xs={12} md={videoLayouts} sx={{ position: 'relative' }}>
          <Stack>
            <Video playsInline muted autoPlay stream={localStream} />
            <Box
              p={1}
              borderRadius={4}
              sx={{ position: 'absolute', bottom: 14, left: 22, opacity: 0.8 }}
              bgcolor="gray"
            >
              <Typography variant="body1">Me</Typography>
            </Box>
            <Button
              sx={{ display: isJoined ? 'none' : 'initial' }}
              onClick={joinVideoCall}
            >
              Join
            </Button>
          </Stack>
        </Grid>
      )}

      {peers.length > 0
        ? peers.map((peer, index) => {
            return (
              <Grid
                key={index}
                item
                xs={12}
                md={videoLayouts}
                position="relative"
              >
                <Video stream={peer.stream} playsInline autoPlay />
                <Box
                  p={1}
                  borderRadius={4}
                  sx={{
                    position: 'absolute',
                    bottom: 14,
                    left: 22,
                    opacity: 0.8,
                  }}
                  bgcolor="gray"
                >
                  <Typography variant="body1">{peer?.user?.name}</Typography>
                </Box>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
}

export default VideoChatCpn;
