import React, { useEffect, useRef } from 'react';

const Sender: React.FC<{ wsUrl: string }> = ({ wsUrl }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const senderWS = useRef<WebSocket | null>(null);
  
  const pc = new RTCPeerConnection();

  useEffect(() => {
    senderWS.current = new WebSocket(wsUrl);

    senderWS.current.onopen = () => {
      console.log('Sender WebSocket connected');
    };

    senderWS.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const { type, data } = message;

      switch (type) {
        case 'answer':
          handleReceiveAnswer(data);
          break;
        case 'iceCandidate':
          handleReceiveIceCandidate(data);
          break;
        default:
          console.log('Unknown message type:', type);
      }
    };

    senderWS.current.onclose = () => {
      console.log('Sender WebSocket disconnected');
    };

    return () => {
      if (senderWS.current) {
        senderWS.current.close();
      }
    };
  }, [wsUrl]);

  function createOffer() {

    if (localVideoRef.current && localVideoRef.current.srcObject instanceof MediaStream) {
      localVideoRef.current.srcObject.getTracks().forEach(track => pc.addTrack(track, localVideoRef.current!.srcObject! as MediaStream));
    }

    pc.createOffer()
      .then(offer => pc.setLocalDescription(offer))
      .then(() => {
        senderWS.current!.send(JSON.stringify({ type: 'offer', data: pc.localDescription }));
      })
      .catch(error => console.error('Error creating offer:', error));

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        senderWS.current!.send(JSON.stringify({ type: 'iceCandidate', data: event.candidate }));
      }
    };
  }

function handleReceiveAnswer(answer: any) {
  console.log('Received answer:', answer);
  pc.setRemoteDescription(new RTCSessionDescription(answer))
    .then(() => {
      console.log('Remote description set successfully');
    })
    .catch(error => {
      console.error('Error setting remote description:', error);
    });
}


  function handleReceiveIceCandidate(candidate: any) {
    console.log('Received ICE candidate:', candidate);
    pc.addIceCandidate(new RTCIceCandidate(candidate))
      .catch(error => console.error('Error handling ICE candidate:', error));
  }

  return (
    <div>
      <h2>Sender</h2>
      <video ref={localVideoRef} autoPlay playsInline muted></video>
      <button onClick={createOffer}>Start Screen Sharing</button>
    </div>
  );
};

export default Sender;
