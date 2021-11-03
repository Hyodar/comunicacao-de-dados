
import React, { useState } from "react";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import "./App.global.css";

import StartupScreen from "./components/StartupScreen";
import ConnectingScreen from "./components/ConnectingScreen";
import MainScreen from "./components/MainScreen";
import { toast, Toaster } from "react-hot-toast";

function AppMain() {
  const [stage, setStage] = useState("startup");
  const [mode, setMode] = useState("sender");
  const [serverAddr, setServerAddr] = useState("");
  const [message, setMessage] = useState("");
  const [chartData, setChartData] = useState([
    {idx: 0, uv: 0},
    {idx: 1, uv: 1},
    {idx: 2, uv: 0},
    {idx: 3, uv: 1},
    {idx: 4, uv: 0},
    {idx: 5, uv: 1},
    {idx: 6, uv: 0},
    {idx: 7, uv: 1}
  ]);

  function handleStart() {
    setStage("connecting");

    // teste
    setTimeout(() => {
      setStage("running");
    }, 1000);
  }

  function handleReturn() {
    // terminar conexão aqui

    setStage("startup");
    setMessage("");
    setServerAddr("");
  }

  function showToast(msg: string) {
    toast(msg, {
      style: {
        borderRadius: "10px",
        background: "#ffffff33",
        color: "#fff",
        fontSize: "18px",
        backdropFilter: "blur(2px)"
      }
    });
  }

  function handleSend() {
    showToast("Mensagem Enviada!");
  }

  function handleReceive() {
    showToast("Mensagem Recebida!");
  }

  if (stage === "startup") {
    return (
      <StartupScreen
        mode={mode}
        serverAddr={serverAddr}
        onModeChange={setMode}
        onStart={handleStart}
        onServerAddrChange={setServerAddr}
      />
    );
  }
  else if (stage === "connecting") {
    return (
      <ConnectingScreen
        mode={mode}
        serverAddr={serverAddr}
        onCancelConnecting={handleReturn}
      />
    );
  }
  else {
    return (
      <MainScreen
        mode={mode}
        serverAddr={serverAddr}
        onReturn={handleReturn}
        chartData={chartData}
        message={message}
        onInput={setMessage}
        onSend={handleSend}
      />
    )
  }
}

export default function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Router>
        <Switch>
          <Route path="/" component={AppMain} />
        </Switch>
      </Router>
    </div>
  );
}
