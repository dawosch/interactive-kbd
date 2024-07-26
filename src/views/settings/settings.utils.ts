export async function authorizeDevice() {
  const devices = await navigator.hid.requestDevice({ filters: [{ vendorId: 64562, productId: 647 }] });
  console.log(devices);
  // device[0].open();
  // device[0].addEventListener('inputreport', ({ data, device, reportId }) => {
  //   const buffer: Uint8Array = new Uint8Array(data.buffer);
  //   console.log(buffer[0], buffer[1], buffer[2]);
  //   if (buffer[3] === 1) {
  //     setActiveKey([buffer[2], buffer[1]]);
  //   } else {
  //     setActiveKey(undefined);
  //   }
  // });

  return devices[0];
}
