import React, { useEffect, useRef } from 'react';

const Receiver: React.FC<{ wsUrl: string }> = ({ wsUrl }) => {
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const receiverWS = useRef<WebSocket | null>(null);
  const pc = new RTCPeerConnection();

  useEffect(() => {
    receiverWS.current = new WebSocket(wsUrl);

    receiverWS.current.onopen = () => {
      console.log('Receiver WebSocket connected');
    };

    receiverWS.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const { type, data } = message;

      switch (type) {
        case 'offer':
          handleReceiveOffer(data);
          break;
        case 'iceCandidate':
          handleReceiveIceCandidate(data);
          break;
        default:
          console.log('Unknown message type:', type);
      }
    };

    receiverWS.current.onclose = () => {
      console.log('Receiver WebSocket disconnected');
    };

    return () => {
      if (receiverWS.current) {
        receiverWS.current.close();
      }
    };
  }, [wsUrl]);

  function handleReceiveOffer(offer: any) {
    console.log('Received offer:', offer);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        receiverWS.current!.send(JSON.stringify({ type: 'iceCandidate', data: event.candidate }));
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    pc.setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => pc.createAnswer())
      .then(answer => pc.setLocalDescription(answer))
      .then(() => {
        receiverWS.current!.send(JSON.stringify({ type: 'answer', data: pc.localDescription }));
      })
      .catch(error => console.error('Error handling offer:', error));
  }

  function handleReceiveIceCandidate(candidate: any) {
    console.log('Received ICE candidate:', candidate);
    pc.addIceCandidate(new RTCIceCandidate(candidate))
      .catch(error => console.error('Error handling ICE candidate:', error));
  }

  return (
    <div>
      <h2>Receiver</h2>
      <div className="video-container">
        <video ref={remoteVideoRef} autoPlay playsInline controls muted></video>
      </div>
    </div>
  );
};

export default Receiver;
