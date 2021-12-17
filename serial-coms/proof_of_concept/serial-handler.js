class SerialHandler {
  encoder = new TextEncoder();
  decoder = new TextDecoder();

  async init() {
    if ("serial" in navigator) {
      try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });

        this.writer = port.writable.getWriter();
        this.reader = port.readable.getReader();

        const signals = await port.getSignals();
        console.log(signals);
      } catch (err) {
        console.error("There was an error opening the serial port:", err);
      }
    } else {
      console.error(
        "Web serial doesn't seem to be enabled in your browser. Try enabling it by visiting:"
      );
      console.error(
        "chrome://flags/#enable-experimental-web-platform-features"
      );
      console.error("opera://flags/#enable-experimental-web-platform-features");
      console.error("edge://flags/#enable-experimental-web-platform-features");
    }
  }

  async write(data) {
    const dataArrayBuffer = this.encoder.encode(data + "\n"); // All messages must end with \n
    return await this.writer.write(dataArrayBuffer);
  }

  async read() {
    try {
      const readerData = await this.reader.read();
      return this.decoder.decode(readerData.value);
    } catch (err) {
      const errorMessage = `error reading data: ${err}`;
      console.error(errorMessage);
      return errorMessage;
    }
  }
}
