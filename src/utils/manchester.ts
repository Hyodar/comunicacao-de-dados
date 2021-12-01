
import BufferUtils from "./buffer_utils";

export default class ManchesterEncoding {
  static encode(msg: Buffer): Buffer {
    const bitBuffer = BufferUtils.bufferToBitBuffer(msg);
    const encodedBitBuffer = Buffer.from(Array.from(bitBuffer).flatMap(bit => (bit)? [-1, 1] : [1, -1]));
    return encodedBitBuffer;
  }

  static decode(msg: Buffer): Buffer {
    const bitBuffer = BufferUtils.bufferToBitBuffer(msg);
    const decoded = [];

    for (let i = 0; i < bitBuffer.length; i += 2) {
      if (bitBuffer[i] === -1 && bitBuffer[i + 1] === 1) {
        decoded.push(1);
      }
      else {
        decoded.push(0);
      }
    }
    
    return Buffer.from(decoded);
  }
}
