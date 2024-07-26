import { Layouts } from '../@types/keyboard.type';

type KeyboardLayoutResponse = {
  layouts: Layouts;
};

export async function fetchKeyboardLayout(url: string) {
  const res = await fetch(url);
  const data: KeyboardLayoutResponse = await res.json();
  return data.layouts;
}

export async function fetchKeymaps(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
