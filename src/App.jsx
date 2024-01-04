import { useState } from 'react';
import Header from './components/Header/Header';
import Center from './components/Center/Center';

function App() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  return (
    <div>
      <Header boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen} />
      <Center />
    </div>
  );
}

export default App;
