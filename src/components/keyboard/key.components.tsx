import * as ICONS from 'evergreen-ui';
import React, { useEffect, useRef } from 'react';
import './styles.css';
import { KEYCODE_ICONS, KEYCODE_LEGENDS } from '../../keycodes';

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

function keycodeContainsLayer(keycode: string) {
  return !!keycode.match(/\((\d+)/g);
}

function extractLayer(keycode: string) {
  const match = keycode.match(/(\d+)/g);
  if (!match) return 0;
  return parseInt(match[0], 10);
}

function changeBaseLayer(keycode: string) {
  return keycode.indexOf('DF') !== -1; // TODO: Make identification more generic
}

type KeyProps = {
  keycode?: string;
  shift?: boolean;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  pressed?: boolean;
  onPressed: (layer?: number, advaced?: { changeBaseLayer?: boolean; shift?: boolean }) => void;
  // onReleased: () => void;
};

export function Key({ keycode, shift, positionX, positionY, width, height, pressed, onPressed }: KeyProps) {
  const wasPressedBefore = useRef<boolean | undefined>(pressed);
  const baseKeycode = useRef<string | undefined>(keycode);

  // TODO: All keys will be rerendered on layer change, so this method doesn't work
  useEffect(() => {
    switch (true) {
      case pressed && !wasPressedBefore.current && keycode && keycodeContainsLayer(keycode): // Layer key pressed
        baseKeycode.current = keycode;
        onPressed(extractLayer(keycode), { changeBaseLayer: changeBaseLayer(keycode) }); // TODO: "false" should be genericextractLayer(keycode)
        break;
      case !pressed && wasPressedBefore.current && baseKeycode.current && keycodeContainsLayer(baseKeycode.current): // Layer key released
        baseKeycode.current = keycode;
        onPressed(); // TODO: When base layer will be changed we don't have to overwrite it with 0
        break;
      case pressed && keycode === 'KC_LSFT':
        onPressed(0, { shift: true });
        break;
      case !pressed && keycode === 'KC_LSFT':
        onPressed(0, { shift: false });
        break;
    }

    // if (pressed && !wasPressedBefore.current && keycode && keycodeContainsLayer(keycode)) {
    //   baseKeycode.current = keycode;
    //   onPressed(extractLayer(keycode), false); // TODO: "false" should be genericextractLayer(keycode)
    // }
    // if (!pressed && wasPressedBefore.current && baseKeycode.current && keycodeContainsLayer(baseKeycode.current)) {
    //   baseKeycode.current = keycode;
    //   onPressed(0, false);
    // }

    wasPressedBefore.current = pressed ?? false;
  }, [keycode, pressed, onPressed]);

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
