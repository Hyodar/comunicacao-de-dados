
export default class ExtAscii {
    static stringToBuffer(text: string): Buffer {
        return Buffer.from(text, "latin1");
    }

    static bufferToString(buf: Buffer): string {
        return buf.toString("latin1");
    }
}
