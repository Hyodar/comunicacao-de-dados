
import React from "react";

import TitledTextarea from "./TitledTextarea";

export function textToAsciiBin(text: string) {
  return Array.from(window.Buffer.from(text, "ascii")).map(
      chr => chr.toString(2).padStart(8, "0")
  ).join("");
}

interface BottomBarProps {
  mode: string;
  message: string;
  onInput: (text: string) => void;
  onSend: () => void;
}

export default function BottomBar(props: BottomBarProps) {

  const {
    mode,
    message,
    onInput,
    onSend,
  } = props;

  return (
    <div className="bottom-bar row jc-center">
      <TitledTextarea className="p10 m10 grow-1" title="MENSAGEM" value={message} onChange={onInput} readOnly={mode === "receiver"} />
      <TitledTextarea className="p10 m10 grow-1" title="BINÁRIO" value={message} onChange={onInput} readOnly={true} />
      <TitledTextarea className="p10 m10 grow-1" title="CODIFICADA" value={message} onChange={onInput} readOnly={true} />
      { (mode === "sender") && 
        <div className="p10 m10">
          <button style={{height: "100%", backgroundColor: "#ffffff22", color: "white"}} onClick={onSend}>
            <p style={{fontSize: "50px"}}>&#9656;</p>
            <p className="p10">ENVIAR</p>
          </button>
        </div>
      }
    </div>
  );
}
