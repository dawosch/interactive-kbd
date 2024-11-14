import { Pane } from 'evergreen-ui';
import { useEffect, useState } from 'react';
import { HidKey, QmkKeyboard, QmkKeymap } from '../@types/keyboard.type';
import { Authorize } from '../components/authorize/authorize.component';
import { KeyboardFileSelection } from '../components/keyboard-file-selection/keyboard-file-selection';
import { Keyboard } from '../components/keyboard/keyboard.component';
import { matrixToId } from '../components/keyboard/keyboard.utils';
import { Navbar } from '../components/navbar/navbar.component';

export function App() {
  const [keyboard, setKeyboard] = useState<QmkKeyboard>();
  const [selectedLayout, setSelectedLayout] = useState<string>();
  const [keymap, setKeymap] = useState<QmkKeymap>();
  const [device, setDevice] = useState<HIDDevice>();

  useEffect(() => {
    device?.addEventListener('inputreport', handleDeviceInput);
    return () => device?.removeEventListener('inputreport', handleDeviceInput);
  });

  const handleDeviceInput = ({ data }: HIDInputReportEvent) => {
    if (!selectedLayout) return;

    const keys = keyboard?.layouts[selectedLayout]?.layout;
    const key: HidKey = { row: data.getUint8(0), col: data.getUint8(1), pressed: Boolean(data.getUint8(2)) };
    switch (key.pressed) {
      case true: {
        if (keys) {
          const mappedKeys = keys.map((_key) => (matrixToId(_key.matrix) === matrixToId([key.col, key.row]) ? { ..._key, pressed: true } : _key));
          setKeyboard({ ...keyboard, layouts: { [selectedLayout]: { layout: mappedKeys } } });
        }
        break;
      }
      case false: {
        if (keys) {
          const mappedKeys = keys.map((_key) => (matrixToId(_key.matrix) === matrixToId([key.col, key.row]) ? { ..._key, pressed: false } : _key));
          setKeyboard({ ...keyboard, layouts: { [selectedLayout]: { layout: mappedKeys } } });
        }
        break;
      }
    }
  };

  return (
    <div className="interactive-kbd">
      <Navbar title="InteractiveKBD">
        <KeyboardFileSelection
          layout={selectedLayout}
          layouts={Object.keys(keyboard?.layouts ?? [])}
          onKeyboardChange={setKeyboard}
          onLayoutChange={setSelectedLayout}
          onKeymapChange={setKeymap}
        />
        <Authorize onAuthorized={setDevice} />
      </Navbar>

      {keyboard && selectedLayout && keyboard.layouts[selectedLayout]?.layout && (
        <Pane display="flex" justifyContent="center" paddingTop="50px">
          <Keyboard keys={keyboard.layouts[selectedLayout].layout} keymap={keymap} keyWidth={50} keyHeight={50} space={10} />
        </Pane>
      )}
    </div>
  );
}
