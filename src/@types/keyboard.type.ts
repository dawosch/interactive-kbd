export type QmkKey = { pressed: boolean; matrix: [number, number]; x: number; y: number; w?: number; h?: number };

export type HidKey = { row: number; col: number; pressed: boolean };

export type QmkLayouts = { [key: string]: { layout: QmkKey[] } };

export type QmkKeyboard = { layouts: QmkLayouts };

export type QmkKeymapLayer = string[];

export type QmkKeymap = QmkKeymapLayer[];
