
import React, { useState } from "react";

import TitledTextarea from "./TitledTextarea";

import ExtAscii from "../../utils/ext_ascii";
import ManchesterEncoding from "../../utils/manchester";
import Cryptography from "../../utils/cryptography";

interface BottomBarProps {
  mode: string;
  message: string;
  onInput: (text: string) => void;
  onSend: (buffer: Buffer) => void;
}

export default function BottomBar(props: BottomBarProps) {

  const {
    mode,
    message,
    onInput,
    onSend,
  } = props;

  let clearTextMessage = "";
  let binaryMessage = "";
  let encodingMessage = "";

  if (mode === "sender") {
    clearTextMessage = message;
    binaryMessage = ExtAscii.toBinStr(message);

    const encryptedMessage = Cryptography.encrypt(ExtAscii.toBuffer(message));
    const encodedMessage = ManchesterEncoding.encode(ExtAscii.bufferToBinStr(encryptedMessage));

    encodingMessage = encodedMessage;
  }
  else {
    const decodedMessage = ManchesterEncoding.decode(ExtAscii.toBinStr(message));
    const messageBuffer = Cryptography.decrypt(ExtAscii.binStrToBuffer(decodedMessage));

    encodingMessage = decodedMessage;
    binaryMessage = ExtAscii.bufferToBinStr(messageBuffer);
    clearTextMessage = ExtAscii.fromBuffer(messageBuffer);
  }

  return (
    <div className="bottom-bar row jc-center">
      <TitledTextarea
        className="p10 m10 grow-1"
        title="MENSAGEM"
        value={clearTextMessage}
        onChange={onInput}
        readOnly={mode === "receiver"}
      />
      <TitledTextarea
        className="p10 m10 grow-1"
        title="BINÁRIO"
        value={binaryMessage}
        onChange={() => {}}
        readOnly={true}
      />
      <TitledTextarea
        className="p10 m10 grow-1"
        title={(mode === "sender")? "CODIFICADA" : "DECODIFICADA"}
        value={encodingMessage}
        onChange={() => {}}
        readOnly={true}
      />
      { (mode === "sender") && 
        <div className="p10 m10">
          <button style={{height: "100%", backgroundColor: "#ffffff22", color: "white"}} onClick={() => onSend(ExtAscii.binStrToBuffer(encodingMessage))}>
            <p style={{fontSize: "50px"}}>&#9656;</p>
            <p className="p10">ENVIAR</p>
          </button>
        </div>
      }
    </div>
  );
}
