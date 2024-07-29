import { Button } from 'evergreen-ui';

type AuthorizeProps = {
  onAuthorized: (device: HIDDevice) => void;
};

export function Authorize({ onAuthorized }: AuthorizeProps) {
  const handleAuthorization = async () => {
    const devices = await navigator.hid.requestDevice({ filters: [] });
    const device = devices[7];

    console.log(devices);

    onAuthorized(device);
  };
  return (
    <div>
      <Button marginRight={16} onClick={handleAuthorization}>
        Authorize Keyboard
      </Button>
    </div>
  );
}
