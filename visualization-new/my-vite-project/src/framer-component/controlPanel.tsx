import React from 'react';
import { UiState } from './motion-node/controlConfig';

interface ControlPanelProps {
  settings: UiState;
  setSettings: React.Dispatch<React.SetStateAction<UiState>>;
}

export const ControlPanel: React.FC<ControlPanelProps> = () => {
  return (
    <div>
      <>This is for setting ish boo boo</>
    </div>
  );
}