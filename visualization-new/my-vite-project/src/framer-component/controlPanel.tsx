import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowPointer, faLightbulb, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'; // Add faLock and faUnlock
import { UiState } from './types/uiState';
import './css/controlPanel.css';

interface ControlPanelProps {
  settings: UiState;
  setSettings: React.Dispatch<React.SetStateAction<UiState>>;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({settings, setSettings}) => {
  const [shakePointer, setShakePointer] = useState(false);
  const [shakeLightbulb, setShakeLightbulb] = useState(false);
  const [isLocked, setIsLocked] = useState(!settings.canDrag);

  const handlePointerClick = () => {
    setShakePointer(true);
    setTimeout(() => setShakePointer(false), 1000);
  };

  const handleLightbulbClick = () => {
    setShakeLightbulb(true);
    setTimeout(() => setShakeLightbulb(false), 1000);
  };

  const handleLockClick = () => {
    setIsLocked(!isLocked);
    setSettings({...settings, canDrag: !isLocked});
  };

  return (
    <div style={{marginTop: '20px'}}>
      <div className="icon-row">
        <FontAwesomeIcon
          icon={faArrowPointer}
          shake={shakePointer}
          className="fa-2x icon-item"
          onClick={handlePointerClick}
        />
        <span className="tooltip">Currently Useless, discuss this feature more</span>
      </div>
      <div className="icon-row">
        <FontAwesomeIcon
          icon={faLightbulb}
          shake={shakeLightbulb}
          className="fa-2x icon-item"
          onClick={handleLightbulbClick}
        />
        <span className="tooltip">Currently Useless, discuss this feature more</span>
      </div>
      <div className="icon-row">
        <FontAwesomeIcon
          icon={isLocked ? faUnlock : faLock} // Switch between faLock and faUnlock based on isLocked state
          className="fa-2x icon-item"
          onClick={handleLockClick}
        />
        <span className="tooltip">Click to {isLocked ? 'lock' : 'unlock'}</span> {/* Change tooltip text based on isLocked state */}
      </div>
    </div>
  );
};