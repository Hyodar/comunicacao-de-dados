export default class Cryptography {
  static encrypt(text: Buffer): Buffer {
    const encrypted = text.map((value, index) =>
      index !== 0 ? value - text[index - 1] : value
    );
    encrypted.reverse();
    return Buffer.from(encrypted);
  }

  static decrypt(text: Buffer): Buffer {
    const decrypted: number[] = [];

    text
      .reverse()
      .forEach((value, index) =>
        decrypted.push(index !== 0 ? value + decrypted[index - 1] : value)
      );

    return Buffer.from(decrypted);
  }
}
