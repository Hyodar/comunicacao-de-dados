
import React from "react";
import ReactLoading from "react-loading";
import CopyToClipboard from "react-copy-to-clipboard";

interface ConnectingScreenProps {
  mode: string;
  serverAddr: string;
  onCancelConnecting: () => void;
}

export default function ConnectingScreen(props: ConnectingScreenProps) {

  const {
    mode,
    serverAddr,
    onCancelConnecting,
  } = props;

  return (
    <div>
      <div className="row jc-center">
        <ReactLoading type="bars" color="#fff" />
      </div>
      <div className="row jc-center">
        <button
          style={{color: "#fff", backgroundColor: "#ffffff00", marginTop: "20px"}}
          onClick={onCancelConnecting}
        >CANCELAR</button>
      </div>
      { mode === "receiver" &&
        <div className="column jc-center" style={{marginTop: "50px"}}>
          <h1>Insira seu endereço na inicialização do remetente:</h1>
          <div className="row jc-center">
            <input readOnly value={serverAddr} />
            <CopyToClipboard text={serverAddr}>
              <button>Copiar</button>
            </CopyToClipboard>
          </div>
        </div>
      }
    </div>
  );
}