import { CloudUploadIcon, Combobox, Dialog, Group, IconButton, Pane, Text, TextInput, UploadIcon } from 'evergreen-ui';
import { ChangeEvent, useRef, useState } from 'react';
import { QmkKeyboard, QmkKeymap } from '../../@types/keyboard.type';
import { fetchQmkKeyboard, fetchQmkKeymap } from '../../services/keyboard.service';

type HandleFileType = 'keyboard' | 'keymap';

type KeyboardChangeEvent = (keyboard: QmkKeyboard) => void;
type LayoutChangeEvent = (layout: string) => void;
type KeymapChangeEvent = (keymap: QmkKeymap) => void;

export function KeyboardFileSelection({
  layout,
  layouts,
  onKeyboardChange,
  onLayoutChange,
  onKeymapChange,
}: {
  layout: string;
  layouts: string[];
  onKeyboardChange: KeyboardChangeEvent;
  onLayoutChange: LayoutChangeEvent;
  onKeymapChange: KeymapChangeEvent;
}) {
  const [isKeyboardModalOpen, setKeyboardModalOpen] = useState<boolean>(false);
  const [keyboardURL, setKeyboardURL] = useState<string>('');
  const keyboardFileRef = useRef<HTMLInputElement>(null);
  const [isKeymapModalOpen, setKeymapModalOpen] = useState<boolean>(false);
  const [keymapURL, setKeymapURL] = useState<string>('');
  const keymapFileRef = useRef<HTMLInputElement>(null);

  const handleLocalFile = (type: HandleFileType, file?: File) => {
    if (file) {
      const fr = new FileReader();
      fr.readAsText(file, 'UTF-8');
      fr.addEventListener('load', () => {
        switch (type) {
          case 'keyboard':
            onKeyboardChange(fr.result ? JSON.parse(fr.result.toString()) : undefined);
            break;
          case 'keymap':
            onKeymapChange(fr.result ? JSON.parse(fr.result.toString()) : undefined);
            break;
        }
      });
    }
  };

  const handleCloudFile = (type: HandleFileType) => {
    switch (type) {
      case 'keyboard':
        fetchQmkKeyboard(keyboardURL).then((keyboard) => {
          onKeyboardChange(keyboard);
          onLayoutChange(Object.keys(keyboard?.layouts)?.[0]);
        });
        setKeyboardModalOpen(false);
        break;
      case 'keymap':
        fetchQmkKeymap(keymapURL).then((keymap) => {
          onKeymapChange(keymap.layers);
        });
        setKeymapModalOpen(false);
        break;
    }
  };

  return (
    <>
      <Pane display="flex" flexDirection="row" flex={1} justifyContent="center">
        <Pane display="flex" justifyContent="center" alignItems="center" paddingX="10px">
          <Text paddingRight="10px">Keyboard:</Text>
          <Group>
            <IconButton icon={UploadIcon} onClick={() => keyboardFileRef?.current?.click()} />
            <IconButton icon={CloudUploadIcon} onClick={() => setKeyboardModalOpen(true)} />
          </Group>
          <input type="file" ref={keyboardFileRef} accept="application/json" style={{ display: 'none' }} onChange={(e) => handleLocalFile('keyboard', e.target.files?.[0])}></input>
        </Pane>
        <Pane display="flex" justifyContent="center" alignItems="center" paddingX="10px">
          <Text paddingRight="10px">Layout:</Text>
          <Combobox items={layouts} selectedItem={layout} onChange={(layout) => onLayoutChange(layout)} disabled={!layout} />
        </Pane>
        <Pane display="flex" justifyContent="center" alignItems="center" paddingX="10px">
          <Text paddingRight="10px">Keymaps:</Text>
          <Group>
            <IconButton icon={UploadIcon} onClick={() => keymapFileRef?.current?.click()} />
            <IconButton icon={CloudUploadIcon} onClick={() => setKeymapModalOpen(true)} />
          </Group>
          <input type="file" ref={keymapFileRef} accept="application/json" style={{ display: 'none' }} onChange={(e) => handleLocalFile('keymap', e.target.files?.[0])}></input>
        </Pane>
      </Pane>
      <Dialog
        isShown={isKeyboardModalOpen}
        title="URL to the QMK keyboard file"
        confirmLabel="Load"
        width="50%"
        minHeightContent="50px"
        onConfirm={() => handleCloudFile('keyboard')}
        onCancel={() => setKeyboardModalOpen(false)}
      >
        <TextInput
          value={keyboardURL}
          placeholder="https://raw.githubusercontent.com/qmk/qmk_firmware/master/keyboards/abacus/keyboard.json"
          width="100%"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyboardURL(e.target.value)}
        />
      </Dialog>
      <Dialog
        isShown={isKeymapModalOpen}
        title="URL to the QMK keymap file"
        confirmLabel="Load"
        width="50%"
        minHeightContent="50px"
        onConfirm={() => handleCloudFile('keymap')}
        onCancel={() => setKeymapModalOpen(false)}
      >
        <TextInput
          value={keymapURL}
          placeholder="https://raw.githubusercontent.com/qmk/qmk_firmware/master/keyboards/abacus/keymaps/default/keymap.json"
          width="100%"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setKeymapURL(e.target.value)}
        />
      </Dialog>
    </>
  );
}
