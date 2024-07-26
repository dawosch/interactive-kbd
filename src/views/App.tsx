import { useState } from 'react';
import { KeyboardFileSelection } from '../components/keyboard-file-selection/keyboard-file-selection';
import { Keyboard } from '../components/keyboard/keyboard.component';
import { Navbar } from '../components/navbar/navbar.component';
import { QmkKeyboard, QmkKeymap } from '../@types/keyboard.type';
import { Pane } from 'evergreen-ui';

function App() {
  const [keyboard, setKeyboard] = useState<QmkKeyboard>();
  const [layout, setLayout] = useState<string>('');
  const [keymap, setKeymap] = useState<QmkKeymap>();
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
      </Navbar>

      <Pane position="relative" width="60%" marginX="auto" marginTop="50px">
        <Keyboard layout={keyboard?.layouts?.[layout]?.layout} keymap={keymap} active={undefined} />
      </Pane>
    </div>
  );
}

export default App;
