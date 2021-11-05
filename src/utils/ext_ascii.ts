
export default class ExtAscii {
    static toBuffer(text: string): Buffer {
        return Buffer.from(text, "latin1");
    }

    static fromBuffer(buf: Buffer): string {
        return buf.toString("latin1");
    }

    static toBinStr(text: string): string {
        // TODO
        return "00000000";
    }

    static bufferToBinStr(buf: Buffer): string {
        return this.toBinStr(this.fromBuffer(buf));
    }

    static binStrToBuffer(text: string): Buffer {
        // TODO
        return this.toBuffer("a");
    }
}
