import kcCodes from './kc.json';
import deCodes from './de.json';
import iconCodes from './icons.json';

export const kc = kcCodes;
export const de = deCodes;

export const KEYCODE_ICONS = iconCodes;
export const PREFIXES = [kcCodes.prefix, deCodes.prefix];
export const KEYCODE_LEGENDS = { [kcCodes.prefix]: kcCodes.keys, [deCodes.prefix]: deCodes.keys };
