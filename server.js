connectBtn.addEventListener("click", async () => {
  // ... existing code ...

  try {
    bleDevice = await navigator.bluetooth.requestDevice({
      filters: [{ name: "ESP32 AntiTheft" }],
      optionalServices: ["a1b2c3d4-e5f6-7890-1234-567890abcdef"]
    });

    bleServer = await bleDevice.gatt.connect();
    bleService = await bleServer.getPrimaryService("a1b2c3d4-e5f6-7890-1234-567890abcdef");
    bleChar = await bleService.getCharacteristic("a1b2c3d4-e5f6-7890-1234-567890abcdef");

    await bleChar.startNotifications();
    bleChar.addEventListener("characteristicvaluechanged", handleAlert);

    connectionStatus.textContent = "✅ Connected to Watch";
    connectBtn.textContent = "Disconnect";
    isConnected = true;
  } catch (err) {
    alert("BLE connection failed: " + err);
  }
});
