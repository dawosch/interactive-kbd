import { QmkLayout } from '../../@types/keyboard.type';

export function calculateParentSize(layout: QmkLayout, keyWidth: number, keyHeight: number, space: number): [number, number] {
  return layout.reduce(
    (sizes, key) => {
      const x = keyWidth * key.x + space * Math.trunc(key.x) + keyWidth * (key.w ?? 1);
      const y = keyHeight * key.y + space * Math.trunc(key.y) + keyHeight * (key.h ?? 1);

      return [sizes[0] > x ? sizes[0] : x, sizes[1] > y ? sizes[1] : y];
    },
    [0, 0]
  );
}

export function getLayerFromKey(key?: string): number {
  return key ? parseInt(key.match(/\d/g)!.join(), 10) : 0;
}
