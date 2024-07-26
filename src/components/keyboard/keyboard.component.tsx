import { QmkKeymap, Layout } from '../../@types/keyboard.type';
import { Key } from './key.components';
import kcKeys from '../../keycodes/kc.json';

function matrixToKey(matrix: [number, number]): string {
  return `key-${matrix.join('')}`;
}

// function parseKeyFromKeymap(key: string) {

// }

function mapKeycode(keycode?: string): string {
  return keycode ? kcKeys.find((kcKey) => kcKey.key === keycode || kcKey.aliases?.includes(keycode))?.legend ?? '' : '';
}

export function Keyboard({ layout, keymap, active }: { layout?: Layout; keymap?: QmkKeymap; active?: [number, number] }) {
  return (
    <div className="keyboard">
      {layout?.map((key, i) => (
        <Key key={matrixToKey(key.matrix)} legend={mapKeycode(keymap?.[0]?.[i])} x={key.x} y={key.y} active={key?.matrix.join(',') === active?.join(',')} />
      ))}
    </div>
  );
}
