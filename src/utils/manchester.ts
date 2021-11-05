
export default class ManchesterEncoding {
  static encode(msg: string): string {
    return msg.split("").map(bit => (bit === "1") ? "01" : "10").join("");
  }

  static decode(msg: string): string {
    return (msg.match(/..?/g) || []).map(bit => (bit === "01")? "1" : "0").join("");
  }
}
