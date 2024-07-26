import { QmkKeymap, Layouts } from '../@types/keyboard.type';

type QmkKeyboardResponse = {
  layouts: Layouts;
};

type QmkKeymapResponse = {
  layers: QmkKeymap;
};

export async function fetchQmkKeyboard(url: string) {
  const res = await fetch(url);
  const data: QmkKeyboardResponse = await res.json();
  return data;
}

export async function fetchQmkKeymap(url: string) {
  const res = await fetch(url);
  const data: QmkKeymapResponse = await res.json();
  return data;
}
