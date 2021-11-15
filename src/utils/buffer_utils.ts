
export default class BufferUtils {
    static bufferToBitBuffer(buf: Buffer): Buffer {
        return Buffer.from(Array.from(buf).flatMap((el: number) => {
            const byte = [];
            for (let i = 0; i < 8; i++) {
                byte.unshift((el & (1 << i))? 1 : 0);
            }
            return byte;
        }));
    }

    static bitBufferToBuffer(bitBuf: Buffer): Buffer {
        const buf = [];

        for (let i = 0; i < bitBuf.length; i += 8) {
            buf.push(bitBuf.slice(i, i + 8).reduce((previous, curr, idx) => {
                return (curr)? previous + Math.pow(2, 7 - idx) : previous;
            }, 0));
        }

        return Buffer.from(buf);
    }

    static bitBufferToString(bitBuf: Buffer): string {
        return Array.from(bitBuf).map(el => el.toString()).join("");
    }

    static bufferToBitString(buf: Buffer): string {
        return Array.from(buf).map(el => el.toString(2).padStart(8, "0")).join("");
    }
}