import { useMemo, useState } from 'react';
import { QmkKey, QmkKeymap } from '../../@types/keyboard.type';

import { Key } from './key.components';
import { calculateParentSize, matrixToId } from './keyboard.utils';

type KeyboardProps = { keys: QmkKey[]; keymap?: QmkKeymap; keyWidth: number; keyHeight: number; space: number };

export function Keyboard({ keys, keymap, keyWidth, keyHeight, space }: KeyboardProps) {
  let baseLayer = 0; // TODO: The "onPressed" function should return a layer AND if it's changing "baseLayer"
  const [layer, setLayer] = useState<number>(baseLayer);
  const [width, height] = useMemo(() => calculateParentSize(keys ?? [], keyWidth, keyHeight, space), [keys, keyHeight, keyWidth, space]);
  const [shift, setShift] = useState<boolean>();

  const onKeyboardKeyPressed = (layer?: number, advanced?: { changeBaseLayer?: boolean; shift?: boolean }) => {
    // TODO: BaseLayer not working
    console.log('layer', layer);
    layer ? setLayer(layer) : setLayer(baseLayer);
    if (advanced?.changeBaseLayer) baseLayer = layer!;
    if (advanced?.shift !== undefined) setShift(shift);
  };

  return (
    <div className="keyboard" style={{ width, height }}>
      {keys?.map((key, i) => (
        <Key
          key={matrixToId(key.matrix)}
          keycode={keymap?.[layer][i]}
          shift={shift}
          positionX={keyWidth * key.x + space * Math.trunc(key.x)}
          positionY={keyHeight * key.y + space * Math.trunc(key.y)}
          width={keyWidth * (key.w ?? 1)}
          height={keyHeight * (key.h ?? 1)}
          pressed={key.pressed}
          onPressed={onKeyboardKeyPressed}
          // onReleased={() => console.log('Released', key.keycode)}
        />
      ))}
    </div>
  );
}
