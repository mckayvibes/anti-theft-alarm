connectBtn.addEventListener("click", async () => {
  // ... existing code ...

  try {
    bleDevice = await navigator.bluetooth.requestDevice({
      filters: [{ name: "ESP32 AntiTheft" }],
      optionalServices: ["7e1fd874-2aa2-4391-9f2e-5405bedd91d8"]
    });

    bleServer = await bleDevice.gatt.connect();
    bleService = await bleServer.getPrimaryService("7e1fd874-2aa2-4391-9f2e-5405bedd91d8");
    bleChar = await bleService.getCharacteristic("7e1fd874-2aa2-4391-9f2e-5405bedd91d8");

    await bleChar.startNotifications();
    bleChar.addEventListener("characteristicvaluechanged", handleAlert);

    connectionStatus.textContent = "✅ Connected to Watch";
    connectBtn.textContent = "Disconnect";
    isConnected = true;
  } catch (err) {
    alert("BLE connection failed: " + err);
  }
});
