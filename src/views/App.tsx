import { Pane } from 'evergreen-ui';
import { useEffect, useState } from 'react';
import { HidKey, QmkKeyboard, QmkKeymap } from '../@types/keyboard.type';
import GitHubLogo from '../assets/github-mark.svg';
import { Authorize } from '../components/authorize/authorize.component';
import { KeyboardFileSelection } from '../components/keyboard-file-selection/keyboard-file-selection';
import { Keyboard } from '../components/keyboard/keyboard.component';
import { matrixToId } from '../components/keyboard/keyboard.utils';
import { Navbar } from '../components/navbar/navbar.component';
import { Welcome } from './welcome/welcome.view';

export function App() {
  const [keyboard, setKeyboard] = useState<QmkKeyboard>();
  const [selectedLayout, setSelectedLayout] = useState<string>();
  const [keymap, setKeymap] = useState<QmkKeymap>();
  const [device, setDevice] = useState<HIDDevice>();
  const [keySize] = useState<number>(60); // TODO: Implement a resize option
  const [baseLayer, setBaseLayer] = useState<number>(0);
  const [layer, setLayer] = useState<number>(0);

  useEffect(() => {
    device?.addEventListener('inputreport', handleDeviceInput);
    return () => device?.removeEventListener('inputreport', handleDeviceInput);
  });

  const handleDeviceInput = ({ data }: HIDInputReportEvent) => {
    if (!selectedLayout) return;

    const keys = keyboard?.layouts[selectedLayout]?.layout;
    setBaseLayer(data.getUint8(3));
    setLayer(data.getUint8(4));

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
        {/* <input type="range" min="50" max="100" value={keySize} onChange={(e) => setKeySize(parseInt(e.target.value))} /> */}
        <Authorize onAuthorized={setDevice} />
        <a className="github-logo" href="https://github.com/dawosch/interactive-kbd" target="_blank">
          <img src={GitHubLogo} width={24} height={24} />
        </a>
      </Navbar>

      {!keyboard && <Welcome />}

      {keyboard && selectedLayout && keyboard.layouts[selectedLayout]?.layout && (
        <Pane display="flex" justifyContent="center" paddingTop="50px">
          <Keyboard
            keys={keyboard.layouts[selectedLayout].layout}
            keymap={keymap}
            layer={layer}
            baseLayer={baseLayer}
            keyWidth={keySize}
            keyHeight={keySize}
            space={10}
          />
        </Pane>
      )}
    </div>
  );
}
