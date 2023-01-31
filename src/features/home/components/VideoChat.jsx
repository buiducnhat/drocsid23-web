import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box, TextField, Stack } from '@mui/material';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import Video from './Video';

const socket = io('http://localhost:9999');

function VideoChat() {
  const [localStream, setLocalStream] = useState();
  const [userId, setUserId] = useState('');
  const [channelId, setChannelId] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [curChannel, setCurChannel] = useState({});
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
      });
  }, []);

  const joinChannel = () => {
    setIsJoined(true);

    socket.emit('joinChannel', {
      userId,
      channelId,
    });

    socket.on('rejectToChannel', () => {
      setIsJoined(false);
      setCurChannel({});
      console.log('rejectToChannel');
      // alert('Reject to channel');
    });

    socket.on('acceptToChannel', (channel) => {
      setCurChannel(channel);
      const tmpPeers = new Map();

      // Có user mới vào room
      // => tạo peer kiểu host, gửi signal về cho user đó qua event 'pair'
      socket.on('userJoined', (newUser) => {
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
            from: userId,
            to: newUser._id,
            channelId,
            signal: data,
          });
        });

        peer.on('stream', (stream) => {
          setPeers((prev) => [
            ...prev,
            {
              user: { id: newUser._id, name: newUser.name },
              stream,
            },
          ]);
        });
      });

      // Khi đã được accept vào room, sau khi gửi signal đi, các user khác
      // sẽ gửi lại signal chờ kết nối với user này qua event 'pair'
      // Có 2 case: là user cũ, nhận được accept từ user mới join
      // hoặc là user mới, nhận được signal từ user cũ
      socket.on('setupPeer', ({ isInitiator, from, to, channelId, signal }) => {
        console.log('setupPeer', { isInitiator, from, to, channelId, signal });
        if (to === userId && channelId === channel._id) {
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
                  user: channel.listActiveUser.find((x) => x._id === from),
                  stream,
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
    });
  };

  const leaveChannel = () => {
    socket.emit('leaveChannel');
    setIsJoined(false);
    setPeers([]);
    setCurChannel({});
  };

  const videoLayouts = React.useMemo(() => {
    const num = peers.length + 1;
    if (num === 1) return 12;
    if (num === 2) return 6;
    if (num === 3) return 4;
    if (num === 4) return 3;
    return 3;
  }, [peers.length]);

  return (
    <Box p={5}>
      <Stack spacing={2} direction="row">
        <TextField
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <TextField
          label="Channel ID"
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
        />

        <Button
          variant="contained"
          disabled={isJoined || !userId || !channelId}
          onClick={joinChannel}
        >
          Join
        </Button>
        <Button
          variant="outlined"
          color="error"
          disabled={!isJoined}
          onClick={leaveChannel}
        >
          Leave
        </Button>
      </Stack>

      <Grid container spacing={2} mt={2}>
        {localStream && (
          <Grid item xs={12} md={videoLayouts} sx={{ position: 'relative' }}>
            <Video playsInline muted autoPlay stream={localStream} />
            <Box
              p={1}
              borderRadius={4}
              sx={{ position: 'absolute', bottom: 14, left: 22, opacity: 0.8 }}
              bgcolor="gray"
            >
              <Typography variant="body1">Me</Typography>
            </Box>
          </Grid>
        )}

        {isJoined &&
          peers.length &&
          peers.map((peer, index) => {
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
                  <Typography variant="body1">{peer.user.name}</Typography>
                </Box>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}

export default VideoChat;
