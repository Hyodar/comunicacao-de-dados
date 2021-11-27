
import iconv from "iconv-lite";

const encodingName = "cp437";

export default class ExtAscii {
    static stringToBuffer(text: string): Buffer {
        return iconv.encode(text, encodingName);
    }

    static bufferToString(buf: Buffer): string {
        return iconv.decode(buf, encodingName);
    }
}
