
import React from "react";

export default function Header(props: any) {
  
  const {
    mode,
    serverAddr,
    onReturn,
  } = props;

  return (
    <div className="top-bar row jc-space-around">
      <button
        style={{color: "#fff", backgroundColor: "#ffffff00", fontSize: "16px"}}
        onClick={onReturn}
      > &lt; VOLTAR</button>

      <p style={{textTransform: "uppercase", alignSelf: "center", fontSize: "16px"}}>
        <span>&#8226; Conectado</span>
        <span>&nbsp; | &nbsp;</span>
        {
          (mode === "sender")
          ? <span>Remetente [Socket Destino: {serverAddr}]</span>
          : <span>Destinatário [Socket: {serverAddr}]</span>
        }
      </p>
    </div>
  );
}