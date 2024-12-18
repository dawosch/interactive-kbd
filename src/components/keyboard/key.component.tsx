import * as ICONS from 'evergreen-ui';
import React, { useEffect } from 'react';
import { KEYCODE_ICONS, KEYCODE_LEGENDS } from '../../keycodes';
import './styles.css';

function getLegendFromKeycode(keycode?: string, shift?: boolean) {
  if (!keycode) return;

  // Check if keycode is QMK function
  const match = keycode.match(/LT\(\d+,\s?(\w+_\w+)\)/); // TODO: Check if there are other QMK functions like "LT"
  const _keycode = match ? match[1] : keycode;

  // Check if keycode is mapped to icon
  const icon: string | undefined = KEYCODE_ICONS[_keycode as keyof typeof KEYCODE_ICONS];
  // @ts-expect-error TODO: Create a type for the icons
  if (icon) return React.createElement(ICONS[icon]);

  // Check if keycode is mapped to legend
  const prefix = _keycode.substring(0, _keycode.indexOf('_'));
  const key = KEYCODE_LEGENDS[prefix as keyof typeof KEYCODE_LEGENDS]?.find((map) => map.key === _keycode || map.aliases?.includes(_keycode));
  if (key !== undefined) return shift && key.shift ? key.shift : key.legend; // Empty string should be printed

  return _keycode;
}

type KeyProps = {
  keycode?: string;
  shift?: boolean;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  pressed?: boolean;
  onShiftPressed: () => void;
  onShiftReleased: () => void;
};

export function Key({ keycode, shift, positionX, positionY, width, height, pressed, onShiftPressed, onShiftReleased }: KeyProps) {
  useEffect(() => {
    switch (true) {
      case pressed && keycode === 'KC_LSFT': // Shift pressed
        onShiftPressed(); // TODO: Maybe it's better to make a generic "onKeyPressed" for "shift" and other keys
        break;
      case !pressed && keycode === 'KC_LSFT': // Shift released
        onShiftReleased();
        break;
    }
  }, [keycode, pressed, onShiftPressed, onShiftReleased]);

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
      <span className="legend">{getLegendFromKeycode(keycode, shift)}</span>
    </div>
  );
}
