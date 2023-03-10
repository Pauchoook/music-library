import React from 'react';
import './line-progress.scss';

interface LineProgressProps {
  left: number;
  right: number;
  width: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LineProgress: React.FC<LineProgressProps> = ({ left, right, width, onChange }) => {
  const percentTrack = left / right * 100;

  return (
    <div style={{width}} className="line-progress">
      <div style={{width: `${percentTrack}%`}} className="line-progress__bg"></div>
      <input className="line-progress__input" type="range" min={0} max={right} value={left} onChange={onChange} />
    </div>
  );
};

export default LineProgress;