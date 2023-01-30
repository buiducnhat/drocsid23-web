import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  AppBar,
  Box,
  TextField,
  Container,
} from '@mui/material';
import { io } from 'socket.io-client';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import Peer from 'simple-peer';

const socket = io('http://localhost:9999');

function VideoChat() {
  const [localStream, setLocalStream] = useState();
  const [userId, setUserId] = useState('');
  const [channelId, setChannelId] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [curChannel, setCurChannel] = useState({});
  const [peers, setPeers] = useState([]);

  const myVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);

        myVideo.current.srcObject = stream;
      });
  }, []);

  const joinChannel = () => {
    setIsJoined(true);

    socket.on('acceptToChannel', (channel) => {
      setCurChannel(channel);
    });

    // Có user mới vào phòng, user đó đã gửi signal lên channel room
    // => tạo peer kiểu khách, gửi signal về cho user đó qua event 'pair'
    socket.on('userJoined', (newUser) => {
      const newPeer = new Peer({
        initiator: true,
        trickle: false,
        stream: localStream,
      });

      newPeer.on('signal', (data) => {
        socket.emit('pair', {
          isInitiator: true,
          to: newUser.id,
          userId,
          channelId,
          signal: data,
        });
      });

      newPeer.on('stream', (stream) => {
        setPeers((prev) => [
          ...prev,
          {
            user: newUser,
            stream,
          },
        ]);
      });

      newPeer.signal(newUser.signal);

      socket.on('pair', ({ isInitiator, to, userId, channelId, signal }) => {
        // Đây là data user mới joined gửi lại signal
        if (!isInitiator && to === userId && channelId === curChannel.id) {
          newPeer.signal(signal);
        }
      });
    });

    // Khi đã được accept vào room, sau khi gửi signal đi, các user khác
    // sẽ gửi lại signal chờ kết nối với user này qua event 'pair'
    socket.on('pair', ({ isInitiator, to, userId, channelId, signal }) => {
      // Đây là data user có sẵn gửi cho mình khi vừa joined
      if (isInitiator && to === userId && channelId === curChannel.id) {
        const newPeer = new Peer({
          initiator: false,
          trickle: false,
          stream: localStream,
        });

        newPeer.on('signal', (data) => {
          socket.emit('pair', {
            isInitiator: false,
            to: userId,
            userId: to,
            channelId,
            signal: data,
          });
        });

        newPeer.on('stream', (stream) => {
          setPeers((prev) => [
            ...prev,
            {
              peerId: userId,
              stream,
            },
          ]);
        });

        newPeer.signal(signal);
      }
    });
  };

  const leaveChannel = () => {
    connectionRef.current.destroy();
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
            <video playsInline muted ref={myVideo} autoPlay />
          </Grid>
        </Paper>
      )}

      {isJoined && (
        <Paper>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom></Typography>
            {/* <video playsInline ref={null} autoPlay /> */}
          </Grid>
        </Paper>
      )}
    </Box>
  );
}

export default VideoChat;
