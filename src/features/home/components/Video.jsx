import React from 'react';

const Video = ({ stream, ...rest }) => {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video style={{ width: '100%', maxHeight: 800 }} ref={videoRef} {...rest} />
  );
};

export default Video;
