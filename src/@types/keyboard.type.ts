export type Key = { matrix: [number, number]; x: number; y: number; w?: number; h?: number };

export type QmkLayout = Key[];

export type Layouts = { [key: string]: { layout: QmkLayout } };

export type QmkKeyboard = { layouts: Layouts };

export type QmkKeymapLayer = string[];

export type QmkKeymap = QmkKeymapLayer[];
