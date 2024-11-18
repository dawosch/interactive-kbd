import * as ICONS from 'evergreen-ui';
import React, { useEffect, useRef } from 'react';
import './styles.css';
import { KEYCODE_ICONS, KEYCODE_LEGENDS } from '../../keycodes';

function getLegendFromKeycode(keycode?: string) {
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
  const legend = KEYCODE_LEGENDS[prefix as keyof typeof KEYCODE_LEGENDS]?.find((map) => map.key === _keycode || map.aliases?.includes(_keycode))?.legend;
  if (legend !== undefined) return legend; // Empty string should be printed

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

type KeyProps = {
  keycode?: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  pressed?: boolean;
  onPressed: (layer: number, changeBaseLayer: boolean) => void;
  // onReleased: () => void;
};

export function Key({ keycode, positionX, positionY, width, height, pressed, onPressed }: KeyProps) {
  const wasPressedBefore = useRef<boolean | undefined>(pressed);
  const baseKeycode = useRef<string | undefined>(keycode);

  // TODO: All keys will be rerendered on layer change, so this method doesn't work
  useEffect(() => {
    if (pressed && !wasPressedBefore.current && keycode && keycodeContainsLayer(keycode)) {
      baseKeycode.current = keycode;
      onPressed(extractLayer(keycode), false); // TODO: "false" should be genericextractLayer(keycode)
    }
    if (!pressed && wasPressedBefore.current && baseKeycode.current && keycodeContainsLayer(baseKeycode.current)) {
      baseKeycode.current = keycode;
      onPressed(0, false);
    }

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
      <span className="legend">{getLegendFromKeycode(keycode)}</span>
    </div>
  );
}
