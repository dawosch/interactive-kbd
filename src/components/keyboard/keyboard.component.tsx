import { QmkKeymap, QmkLayout } from '../../@types/keyboard.type';
import { Key } from './key.components';
import kcKeys from '../../keycodes/kc.json';
import deKeys from '../../keycodes/de.json';
import { useEffect, useMemo } from 'react';
import { key2icon } from '../../keycodes/key2icon';
import { calculateParentSize, getLayerFromKey } from './keyboard.utils';
import { isLayerChangeKey } from '../../qmk/key.utils';

const KEYMAPPINGS = { KC: kcKeys, DE: deKeys };

function matrixToKey(matrix: [number, number]): string {
  return `${matrix.join('')}`;
}

function mapKeycode(keycode?: string): string {
  const map = keycode?.substring(0, keycode.indexOf('_')) as typeof KEYMAPPINGS | undefined;
  const legend: string | undefined = KEYMAPPINGS[map]?.find((mapKey) => mapKey.key === keycode || mapKey.aliases?.includes(keycode))?.legend;
  if (legend) return legend;
  return '';
}

type KeyboardProps = { layout?: QmkLayout; keymap?: QmkKeymap; keyWidth: number; keyHeight: number; space: number; pressedKeys?: string[] };

export function Keyboard({ layout, keymap, keyWidth, keyHeight, space, pressedKeys }: KeyboardProps) {
  const [width, height] = useMemo(() => calculateParentSize(layout ?? [], keyWidth, keyHeight, space), [layout, keyHeight, keyWidth, space]);
  const test = (key: string) => getLayerFromKey();
  const activeLayerIndex = 0;
  const activeLayer = () => keymap?.[activeLayerIndex];

  // TODO: Get the name of the pressed key (matrix id) and then check if its a layer change key and then parse the number

  useEffect(() => {
    console.log('LAYER', pressedKeys?.find(isLayerChangeKey));
  }, [activeLayer, pressedKeys, activeLayerIndex]);

  return (
    <div className="keyboard" style={{ width, height }}>
      {layout?.map((key, i) => (
        <Key
          key={matrixToKey(key.matrix)}
          // legend={mapKeycode(keymap?.[0]?.[i])}
          legend={mapKeycode(activeLayer?.[i])}
          icon={key2icon[activeLayer?.[i]]}
          positionX={keyWidth * key.x + space * Math.trunc(key.x)}
          positionY={keyHeight * key.y + space * Math.trunc(key.y)}
          width={keyWidth * (key.w ?? 1)}
          height={keyHeight * (key.h ?? 1)}
          pressed={pressedKeys?.includes(matrixToKey(key.matrix)) ?? false}
        />
      ))}
    </div>
  );
}
