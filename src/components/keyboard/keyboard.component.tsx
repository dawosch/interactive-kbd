import { useMemo, useRef, useState } from 'react';
import { QmkKey, QmkKeymap } from '../../@types/keyboard.type';

import { Key } from './key.component';
import { calculateParentSize, matrixToId } from './keyboard.utils';

type KeyboardProps = { keys: QmkKey[]; keymap?: QmkKeymap; keyWidth: number; keyHeight: number; space: number };

export function Keyboard({ keys, keymap, keyWidth, keyHeight, space }: KeyboardProps) {
  const baseLayer = useRef<number>(0);
  const [layer, setLayer] = useState<number>(baseLayer.current);
  const [width, height] = useMemo(() => calculateParentSize(keys ?? [], keyWidth, keyHeight, space), [keys, keyHeight, keyWidth, space]);
  const [shift, setShift] = useState<boolean>();

  const onLayerKeyPressed = (layer: number, isBaseLayer: boolean) => {
    setLayer(layer);
    if (isBaseLayer) baseLayer.current = layer;
  };
  const onLayerKeyReleased = () => setLayer(baseLayer.current);
  const onShiftPressed = () => setShift(true);
  const onShiftReleased = () => setShift(false);

  return (
    <div className="keyboard" style={{ width, height }}>
      {keys?.map((key, i) => {
        const keycode = keymap?.[layer][i] !== 'KC_TRANS' ? keymap?.[layer][i] : keymap?.[baseLayer.current][i]; // TODO: Handling special keys here seems not to be ideal
        return (
          <Key
            key={matrixToId(key.matrix)}
            keycode={keycode}
            shift={shift}
            positionX={keyWidth * key.x + space * Math.trunc(key.x)}
            positionY={keyHeight * key.y + space * Math.trunc(key.y)}
            width={keyWidth * (key.w ?? 1)}
            height={keyHeight * (key.h ?? 1)}
            pressed={key.pressed}
            onLayerKeyPressed={onLayerKeyPressed}
            onLayerKeyReleased={onLayerKeyReleased}
            onShiftPressed={onShiftPressed}
            onShiftReleased={onShiftReleased}
          />
        );
      })}
    </div>
  );
}
