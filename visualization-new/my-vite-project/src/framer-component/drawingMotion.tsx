import React, { useState } from 'react';
import LinkedList from './linkedList';
import { DEFAULT_UISTATE, UiState } from './motion-node/controlConfig';
import { ControlPanel } from './controlPanel';
import { DrawableNode } from './motion-node/node';

export interface DrawingMotionState {
  graphState: DrawableNode[];
}

export const DrawingMotions: React.FC<DrawingMotionState> = ({graphState}) => {
  const [settings, setSettings] = useState<UiState>(DEFAULT_UISTATE);

  return (
    <div>
      <ControlPanel settings={settings} setSettings={setSettings} />
      <LinkedList settings={settings} graphState={graphState}/>
    </div>
  );
}