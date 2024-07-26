import { useRef, useState } from 'react';
// import { Upload, UploadCloud } from 'react-feather';
import { Button, Text, CloudUploadIcon, Combobox, Dialog, Group, Heading, IconButton, Pane, TextInputField, UploadIcon } from 'evergreen-ui';
import { Keymap, Layouts } from '../../@types/keyboard.type';
import { Keyboard } from '../../components/keyboard/keyboard.component';
import { fetchKeyboardLayout } from '../../services/keyboard.service';

export function Settings() {
  const [isKeyboardModalOpen, setKeyboardModalOpen] = useState<boolean>(false);
  const [keyboardLayoutURL, setKeyboardLayoutURL] = useState<string>('');
  const [layouts, setLayouts] = useState<Layouts>();
  const [layout, setLayout] = useState<string>('');
  const [keymapURL, setKeymapURL] = useState<string>();
  const [keymap, setKeymap] = useState<Keymap>();
  const keymapFileRef = useRef(null);

  const keyboardLayoutModalSave = () => {
    fetchKeyboardLayout(keyboardLayoutURL ?? '').then((layouts) => {
      setLayouts(layouts);
      setLayout(Object.keys(layouts)[0]);
    });
    setKeyboardModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (e) => {
        setKeymap(JSON.parse(e.target?.result).layers);
        console.log(keymap);
        console.log(JSON.parse(e.target?.result));
      };
    }
  };

  return (
    <div>
      <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
        <Pane flex={1} alignItems="center" display="flex">
          <Heading size={600}>InteractiveKBD</Heading>
        </Pane>
        <Pane display="flex" flexDirection="row">
          <Pane display="flex" justifyContent="center" alignItems="center" paddingX="10px">
            <Text paddingRight="10px">Keyboard:</Text>
            <Group>
              <IconButton icon={UploadIcon} onClick={() => setKeyboardModalOpen(true)} />
              <IconButton icon={CloudUploadIcon} onClick={() => setKeyboardModalOpen(true)} />
            </Group>
          </Pane>
          <Pane display="flex" justifyContent="center" alignItems="center" paddingX="10px">
            <Text paddingRight="10px">Layout:</Text>
            <Combobox items={layouts ? Object.keys(layouts) : []} selectedItem={layout} onChange={(layout) => setLayout(layout)} disabled />
          </Pane>
          <Pane display="flex" justifyContent="center" alignItems="center" paddingX="10px">
            <Text paddingRight="10px">Keymaps:</Text>
            <input type="file" ref={keymapFileRef} style={{ display: 'none' }} onChange={handleFileChange}></input>
            <Group>
              <IconButton icon={UploadIcon} onClick={() => setKeyboardModalOpen(true)} />
              <IconButton icon={CloudUploadIcon} onClick={() => setKeyboardModalOpen(true)} />
            </Group>
          </Pane>
        </Pane>
      </Pane>
      <Dialog
        isShown={isKeyboardModalOpen}
        title="URL to the QMK layout file"
        onCloseComplete={() => setKeyboardModalOpen(false)}
        onConfirm={keyboardLayoutModalSave}
        confirmLabel="Custom Label"
      >
        <TextInputField label="Test123" value={keyboardLayoutURL} onChange={(e) => setKeyboardLayoutURL(e.target.value)} />
      </Dialog>
      <div style={{ position: 'relative' }}>
        <Keyboard layout={layouts?.[layout]?.layout} keymap={keymap} active={[0, 0]} />
      </div>
    </div>
  );
}
