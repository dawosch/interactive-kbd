import * as ICONS from 'evergreen-ui';
import React, { useEffect } from 'react';
import './styles.css';
import { KEYCODE_ICONS, KEYCODE_LEGENDS } from '../../keycodes';

function getLegendFromKeycode(keycode?: string) {
  if (!keycode) return;

  const icon: string | undefined = KEYCODE_ICONS[keycode as keyof typeof KEYCODE_ICONS];
  if (icon) return React.createElement(ICONS[icon]);

  const prefix = keycode.substring(0, keycode.indexOf('_'));
  const legend = KEYCODE_LEGENDS[prefix as keyof typeof KEYCODE_LEGENDS]?.find((map) => map.key === keycode || map.aliases?.includes(keycode))?.legend;
  return legend;
}

type KeyProps = {
  keycode?: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  pressed?: boolean;
  // onPressed: () => void;
  // onReleased: () => void;
};

export function Key({ keycode, positionX, positionY, width, height, pressed }: KeyProps) {
  // useEffect(() => {
  //   if (pressed === undefined) return;
  //   pressed ? onPressed() : onReleased();
  // }, [pressed, onPressed, onReleased]);

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
      {getLegendFromKeycode(keycode)}
    </div>
  );
}
