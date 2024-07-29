import { Pane } from 'evergreen-ui';
import { useEffect, useState } from 'react';
import { QmkKeyboard, QmkKeymap } from '../@types/keyboard.type';
import { Authorize } from '../components/authorize/authorize.component';
import { KeyboardFileSelection } from '../components/keyboard-file-selection/keyboard-file-selection';
import { Keyboard } from '../components/keyboard/keyboard.component';
import { Navbar } from '../components/navbar/navbar.component';

function App() {
  const [keyboard, setKeyboard] = useState<QmkKeyboard>();
  const [layout, setLayout] = useState<string>('');
  const [keymap, setKeymap] = useState<QmkKeymap>();
  const [device, setDevice] = useState<HIDDevice>();
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (device && !device?.opened) {
      device?.open();
      device?.addEventListener('inputreport', (ev) => {
        const keyIdentifier = `${ev.data.getInt8(2)}${ev.data.getInt8(1)}`;
        console.log(ev.data);
        if (ev.data.getInt8(3) === 1) {
          setPressedKeys((pressedKeys) => [...pressedKeys, keyIdentifier]);
          console.log('Pressed', keyIdentifier);
        } else {
          setPressedKeys((pressedKeys) => pressedKeys.filter((key) => key !== keyIdentifier));
          console.log('Released', keyIdentifier);
        }
      });
    }
  }, [device, pressedKeys]);

  return (
    <div className="interactive-kbd">
      <Navbar title="InteractiveKBD">
        <KeyboardFileSelection
          layout={layout}
          layouts={Object.keys(keyboard?.layouts ?? [])}
          onKeyboardChange={setKeyboard}
          onLayoutChange={setLayout}
          onKeymapChange={setKeymap}
        />
        <Authorize onAuthorized={setDevice} />
      </Navbar>

      <Pane display="flex" justifyContent="center" paddingTop="50px">
        <Keyboard layout={keyboard?.layouts?.[layout]?.layout} keymap={keymap} keyWidth={50} keyHeight={50} space={10} pressedKeys={pressedKeys} />
      </Pane>
    </div>
  );
}

export default App;
