
import React, { useState } from "react";

import TitledTextarea from "./TitledTextarea";

import ExtAscii from "../../utils/ext_ascii";
import BufferUtils from "../../utils/buffer_utils";

interface BottomBarProps {
  mode: string;
  clearTextMessage: Buffer;
  encodingMessage: Buffer;
  encryptingMessage: Buffer;
  onInput: (text: string) => void;
  onSend: (buffer: Buffer) => void;
}

export default function BottomBar(props: BottomBarProps) {

  const {
    mode,
    clearTextMessage,
    encodingMessage,
    encryptingMessage,
    onInput,
    onSend,
  } = props;

  return (
    <div className="bottom-bar row jc-center">
      <TitledTextarea
        className="p10 m10 grow-1"
        style={{ order: (mode === "sender")? 1 : 4 }}
        title="MENSAGEM"
        value={ExtAscii.bufferToString(clearTextMessage)}
        onChange={onInput}
        readOnly={mode === "receiver"}
      />
      <TitledTextarea
        className="p10 m10 grow-1"
        style={{ order: (mode === "sender")? 2 : 3 }}
        title="CRIPTOGRAFADO"
        value={ExtAscii.bufferToString(encryptingMessage)}
        onChange={() => {}}
        readOnly={true}
      />
      <TitledTextarea
        className="p10 m10 grow-1"
        style={{ order: (mode === "sender")? 3 : 2 }}
        title="BINÁRIO"
        value={BufferUtils.bufferToBitString(encryptingMessage)}
        onChange={() => {}}
        readOnly={true}
      />
      <TitledTextarea
        className="p10 m10 grow-1"
        title="CODIFICADO"
        style={{ order: (mode === "sender")? 4 : 1 }}
        value={BufferUtils.bufferToBitString(encodingMessage)}
        onChange={() => {}}
        readOnly={true}
      />
      { (mode === "sender") && 
        <div className="p10 m10" style={{ order: 5 }}>
          <button style={{height: "100%", backgroundColor: "#ffffff22", color: "white"}} onClick={() => onSend(encodingMessage)}>
            <p style={{fontSize: "50px"}}>&#9656;</p>
            <p className="p10">ENVIAR</p>
          </button>
        </div>
      }
    </div>
  );
}
