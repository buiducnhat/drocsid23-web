import React, { useState, useEffect, useRef } from 'react';
import { Grid, Paper, Typography, Button, Box, TextField } from '@mui/material';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { createRef } from 'react';

const socket = io('https://buiducnhat.ddns.net:9990');

function VideoChat() {
  const [localStream, setLocalStream] = useState();
  const [userId, setUserId] = useState('');
  const [channelId, setChannelId] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [curChannel, setCurChannel] = useState({});
  const [peers, setPeers] = useState([]);

  const myVideoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);

        myVideoRef.current.srcObject = stream;
      });
  }, []);

  const joinChannel = () => {
    setIsJoined(true);

    socket.emit('joinChannel', {
      userId,
      channelId,
    });

    socket.on('acceptToChannel', (channel) => {
      setCurChannel(channel);
      const newPeers = [];
      channel.listActiveUser.forEach((user) => {
        if (user.id !== userId) {
          newPeers.push({
            user,
            stream: null,
            ref: createRef(),
          });
        }
      });
      setPeers(newPeers);
      const ps = new Map();

      // Có user mới vào room
      // => tạo peer kiểu host, gửi signal về cho user đó qua event 'pair'
      socket.on('userJoined', (newUser) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: localStream,
        });
        ps.set(newUser.id, peer);
        console.log(ps.get(newUser.id));

        peer.on('signal', (data) => {
          // Emit signal về cho user mới joined
          socket.emit('pairT', {
            isInitiator: true,
            from: userId,
            to: newUser.id,
            channelId,
            signal: data,
          });
        });

        peer.on('stream', (stream) => {
          setPeers((prev) =>
            prev.map((p) => {
              if (p.user.id === newUser.id) {
                p.ref.current.srcObject = stream;
                p.stream = stream;
                return p;
              } else {
                return p;
              }
            })
          );
        });
      });

      socket.on('pairF', ({ isInitiator, from, to, channelId, signal }) => {
        console.log('pairF', { isInitiator, from, to, channelId, signal });
        // Đây là data user mới joined gửi lại signal
        if (!isInitiator && to === userId && channelId === channel.id) {
          ps.get(from).signal(signal);
        }
      });

      // Khi đã được accept vào room, sau khi gửi signal đi, các user khác
      // sẽ gửi lại signal chờ kết nối với user này qua event 'pair'
      // Có 2 case: là user cũ, nhận được accept từ user mới join
      // hoặc là user mới, nhận được signal từ user cũ
      socket.on('pairT', ({ isInitiator, from, to, channelId, signal }) => {
        console.log('pairT', { isInitiator, from, to, channelId, signal });
        if (to === userId && channelId === channel.id) {
          // Đây là data từ user cũ gửi cho mình khi vừa joined
          if (isInitiator) {
            const peer = new Peer({
              initiator: false,
              trickle: false,
              stream: localStream,
            });

            peer.on('signal', (data) => {
              socket.emit('pairF', {
                isInitiator: false,
                from: to,
                to: from,
                channelId,
                signal: data,
              });
            });

            peer.on('stream', (stream) => {
              peer.on('stream', (stream) => {
                setPeers((prev) =>
                  prev.map((p) => (p.user.id === from ? { ...p, stream } : p))
                );
              });
            });

            peer.signal(signal);
          }
        }
      });
    });
  };

  const leaveChannel = () => {
    socket.emit('leaveChannel');
    setIsJoined(false);

    // window.location.reload();
  };

  return (
    <Box p={5}>
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
        disabled={isJoined || !userId || !channelId}
        onClick={joinChannel}
      >
        Join
      </Button>
      <Button disabled={!isJoined} onClick={leaveChannel}>
        Leave
      </Button>

      {localStream && (
        <Paper>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Me: {userId}
            </Typography>
            <video playsInline muted ref={myVideoRef} autoPlay />
          </Grid>
        </Paper>
      )}

      {isJoined &&
        peers.length &&
        peers.map((peer) => {
          return (
            <Paper key={peer.user.id}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom></Typography>
                <video playsInline ref={peer.ref} autoPlay />
              </Grid>
            </Paper>
          );
        })}

      {/* {isJoined &&
        curChannel.listActiveUser.map((user) => {
          const peer = peers.find((p) => p.user.id === user.id);

          if (peer.ref.current) {
            peer.ref.current.srcObject = peer.stream;
          }

          return (
            <Paper key={user.id}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  {user.id}
                </Typography>
                <video playsInline ref={peer.ref} autoPlay/>
              </Grid>
            </Paper>
          );
        })} */}
    </Box>
  );
}

export default VideoChat;
