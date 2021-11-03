
import React, { useState } from "react";

const { ipcRenderer } = window.require("electron");

interface StartupScreenProps {
  mode: string;
  onStart: () => void;
  serverAddr: string;
  onModeChange: (mode: string) => void;
  onServerAddrChange: (addr: string) => void;
}

export default function StartupScreen(props: StartupScreenProps) {

  const {
    mode,
    onStart,
    serverAddr,
    onModeChange,
    onServerAddrChange,
  } = props;

  const addresses = ipcRenderer.sendSync("ipList");

  const [port, setPort] = useState(4000);
  const [addr, setAddr] = useState(addresses[0]);
  
  const activeButton = { backgroundColor: "rgba(0, 0, 0, 0.253)" };
  const disabledButton = { backgroundColor: "rgba(0, 0, 0, 0.1)" };

  function handleStart() {
    // validar dados aqui

    if (mode === "receiver") {
      onServerAddrChange(`${addr}:${port}`);
    }

    return onStart();
  }

  return (
    <div style={{padding: "20px"}}>
      <p style={{fontSize: "16px", textAlign: "center", width: "100%"}}>MODO DE OPERAÇÃO</p>

      <div className="row">
        <button
          className="mode-button"
          style={(mode === "sender")? activeButton : disabledButton}
          onClick={() => onModeChange("sender")}
        >REMETENTE</button>
        <button
          className="mode-button"
          style={(mode === "receiver")? activeButton : disabledButton}
          onClick={() => onModeChange("receiver")}
        >DESTINATÁRIO</button>
      </div>

      { mode === "sender" &&
        <div className="column jc-center" style={{textAlign: "center", marginTop: "50px"}}>
          <p>IP:PORTA DE DESTINO</p>
          <input value={serverAddr} onChange={ev => onServerAddrChange(ev.target.value)} />
        </div>
      }
      
      { mode === "receiver" &&
        <div className="column jc-center" style={{textAlign: "center", marginTop: "50px"}}>
          <p>IP</p>
          <select value={addr} onChange={ev => setAddr(ev.target.value)}>
            { addresses.map((ip: string, idx: number) => <option value={ip} key={idx}>{ip}</option>) }
          </select>

          <p>PORTA</p>
          <input type="number" value={port} onChange={ev => setPort(parseInt(ev.target.value))} />
        </div>
      }

      <div className="row jc-center" style={{marginTop: "50px"}}>
        <button
          style={{color: "#fff", backgroundColor: "#ffffff00", fontSize: "24px"}}
          onClick={handleStart}
        >INICIAR</button>
      </div>
    </div>
  );
}
