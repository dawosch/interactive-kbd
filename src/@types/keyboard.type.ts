export type Key = { matrix: [number, number]; x: number; y: number };

export type Layout = Key[];

export type Layouts = { [key: string]: { layout: Layout } };

export type Keymap = string[][];
