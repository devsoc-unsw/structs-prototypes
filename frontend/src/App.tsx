import React, {useState } from 'react';
import RenderObject from './component/render/RenderObject';
import { generateArrayState } from './component/state/arrayDsParser'; // Replace with the actual file name containing the generateRandomArrayData function
import { State } from './component/state/state';

const App: React.FC = () => {
  const [entityData, setEntityData] = useState<State>(generateArrayState());

  const onGenerateArray = () => {
    const randomArrayData = generateArrayState();
    console.log(randomArrayData);
    setEntityData(randomArrayData);
  };

  return (
    <div className="App" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1>Playground</h1>
      <div style={{ flex: '0 0 80%', overflow: 'auto' }}>
        <RenderObject entity={entityData} />
      </div>
      <div style={{ flex: '0 0 20%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <button onClick={onGenerateArray}>Generate Array</button>
      </div>
    </div>
  );
};

export default App;
