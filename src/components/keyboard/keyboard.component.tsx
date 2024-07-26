import { Keymap, Layout } from '../../@types/keyboard.type';
import { Key } from './key.components';
import kcKeys from '../../keycodes/kc.json';

function matrixToKey(matrix: [number, number]): string {
  return `key-${matrix.join('')}`;
}

// function parseKeyFromKeymap(key: string) {

// }

function mapKeycode(keycode: string) {
  const key = kcKeys.find((kcKey) => kcKey.key === keycode || kcKey.aliases?.includes(keycode));
  return key;
}

export function Keyboard({ layout, keymap, active }: { layout?: Layout; keymap?: Keymap; active: [number, number] }) {
  console.log('Keymap', keymap);
  return (
    <div>
      {keymap &&
        layout?.map((key, i) => (
          <Key key={matrixToKey(key.matrix)} value={mapKeycode(keymap[0][i])} x={key.x} y={key.y} active={key?.matrix.join(',') === active?.join(',')} />
        ))}
    </div>
  );
}
