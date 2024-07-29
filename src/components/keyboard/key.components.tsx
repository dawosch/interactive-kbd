import * as ICONS from 'evergreen-ui';
import React, { useEffect } from 'react';
import './styles.css';
type KeyProps = {
  legend: string;
  icon: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  pressed: boolean;
};

export function Key({ legend, icon, positionX, positionY, width, height, pressed }: KeyProps) {
  useEffect(() => {
    console.log('Key pressed', pressed);
  }, [pressed]);

  return (
    <div
      className={`key lightMode ${pressed ? 'active' : ''}`}
      style={{
        left: positionX,
        top: positionY,
        width,
        height,
      }}
    >
      {icon ? React.createElement(ICONS[icon]) : <span>{legend}</span>}
    </div>
  );
}
