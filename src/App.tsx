// app.tsx
import Sender from './sender';
import Receiver from './receiver';

function App() {
  return (
    <div>
      <h1>WebRTC Screen Sharing Demo</h1>
      <Sender wsUrl={'ws://localhost:3001/sender'} />
      <Receiver wsUrl={'ws://localhost:3001/receiver'} />
    </div>
  );
}

export default App;
