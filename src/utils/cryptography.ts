
export default class Cryptography {
  
  static encrypt(text: Buffer, key: string): Buffer {
    return Buffer.from(text.map((value, index) => 
      (value + key.charCodeAt(index % key.length)) % 256
    ));
  }

  static decrypt(text: Buffer, key: string): Buffer {
    return Buffer.from(text.map((value, index) => 
      (value - key.charCodeAt(index % key.length) + 256) % 256
    ));
  }
}
