export function isLTKey(key: string) {
  return key.startsWith('LT(');
}

export function isMOKey(key: string) {
  return key.startsWith('MO(');
}

export function isLayerChangeKey(key: string) {
  return isLTKey(key) || isMOKey(key);
}
