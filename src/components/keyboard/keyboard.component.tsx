import { useMemo, useState } from 'react';
import { QmkKey, QmkKeymap } from '../../@types/keyboard.type';

import { Key } from './key.components';
import { calculateParentSize, matrixToId } from './keyboard.utils';

// import { key2icon, KEYMAPPINGS, PREFIXES } from '../../keycodes';

// const TAB_HOLD_PATTERN = /\w+\((\d+),\s?(\w+_\w+|\d)\)/;
// const LAYER_SWITCH_PATTERN = /\w+\((\d+)\)/;

// function getLegendFromKeycode(keycode: string) {
//   const prefix = keycode.substring(0, keycode.indexOf('_'));
//   const legend = KEYMAPPINGS[prefix as keyof typeof KEYMAPPINGS]?.find((map) => map.key === keycode || map.aliases?.includes(keycode))?.legend ?? '';
//   return legend;
// }

// function parseKeycode(keycode: string) {
//   const isDefaultKey = PREFIXES.some((p) => keycode.startsWith(`${p}_`));

//   switch (isDefaultKey) {
//     case true:
//       return getLegendFromKeycode(keycode);
//     case false: {
//       const tabHoldMatch = keycode.match(TAB_HOLD_PATTERN);
//       if (tabHoldMatch && tabHoldMatch.length === 3) {
//         const layer = tabHoldMatch[1];
//         const _keycode = tabHoldMatch[2];
//         const legend = getLegendFromKeycode(_keycode);
//         return `${legend} L${layer}`;
//       }

//       const switchLayerMatch = keycode.match(LAYER_SWITCH_PATTERN);
//       if (switchLayerMatch && switchLayerMatch.length === 2) {
//         const layer = keycode.match(LAYER_SWITCH_PATTERN)?.[1];
//         return layer ? `L${layer}` : '';
//       }

//       return '';
//     }
//     default:
//       return '';
//   }
// }

type KeyboardProps = { keys: QmkKey[]; keymap?: QmkKeymap; keyWidth: number; keyHeight: number; space: number };

export function Keyboard({ keys, keymap, keyWidth, keyHeight, space }: KeyboardProps) {
  const [layer, setLayer] = useState<number>(0);
  const [width, height] = useMemo(() => calculateParentSize(keys ?? [], keyWidth, keyHeight, space), [keys, keyHeight, keyWidth, space]);

  return (
    <div className="keyboard" style={{ width, height }}>
      {keys?.map((key, i) => (
        <Key
          key={matrixToId(key.matrix)}
          keycode={keymap?.[layer][i]}
          // legend={getLegend(layer, key.matrix, keymap)}
          // icon={getIcon(layer, key.matrix, keymap)}
          positionX={keyWidth * key.x + space * Math.trunc(key.x)}
          positionY={keyHeight * key.y + space * Math.trunc(key.y)}
          width={keyWidth * (key.w ?? 1)}
          height={keyHeight * (key.h ?? 1)}
          pressed={key.pressed}
          // onPressed={() => console.log('Pressed', key.keycode)}
          // onReleased={() => console.log('Released', key.keycode)}
        />
      ))}
    </div>
  );
}
