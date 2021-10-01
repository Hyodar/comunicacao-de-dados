
import React from "react";

import ReactLoading from "react-loading";

export default function ConnectingScreen(props: Object) {

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
          <input readOnly value={`${serverAddr}`} />
        </div>
      }
    </div>
  );
}