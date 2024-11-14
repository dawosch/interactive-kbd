import { Button } from 'evergreen-ui';

type AuthorizeProps = {
  onAuthorized: (device: HIDDevice) => void;
};

export function Authorize({ onAuthorized }: AuthorizeProps) {
  const handleAuthorization = async () => {
    const devices = await navigator.hid.requestDevice({
      filters: [
        {
          usagePage: 0xff60,
          usage: 0x61,
        },
      ],
    });

    if (devices.length) await devices[0].open();
    onAuthorized(devices[0]);
  };

  return (
    <div>
      <Button marginRight={16} onClick={handleAuthorization}>
        Authorize Keyboard
      </Button>
    </div>
  );
}
