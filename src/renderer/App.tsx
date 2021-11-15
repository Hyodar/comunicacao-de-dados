import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';

import { toast, Toaster } from 'react-hot-toast';
import StartupScreen from './components/StartupScreen';
import ConnectingScreen from './components/ConnectingScreen';
import MainScreen from './components/MainScreen';

import Server from '../communication/server';
import Client from '../communication/client';
import ExtAscii from 'utils/ext_ascii';
import BufferUtils from 'utils/buffer_utils';

function AppMain() {
  const [stage, setStage] = useState('startup');
  const [mode, setMode] = useState('sender');
  const [serverAddr, setServerAddr] = useState('');
  const [server, setServer] = useState<any>();
  const [client, setClient] = useState<any>();
  const [message, setMessage] = useState(Buffer.from([]));
  const [messageInput, setMessageInput] = useState('');
  const [chartData, setChartData] = useState([
    { idx: 0, uv: 0 },
    { idx: 1, uv: 1 },
    { idx: 2, uv: 0 },
    { idx: 3, uv: 1 },
    { idx: 4, uv: 0 },
    { idx: 5, uv: 1 },
    { idx: 6, uv: 0 },
    { idx: 7, uv: 1 },
  ]);

  function showToast(msg: string) {
    toast(msg, {
      style: {
        borderRadius: '10px',
        background: '#ffffff33',
        color: '#fff',
        fontSize: '18px',
        backdropFilter: 'blur(2px)',
      },
    });
  }

  function handleSend(buffer: Buffer) {
    console.log(buffer)
    console.log(BufferUtils.bufferToBitBuffer(buffer))
    client.sendMessage(BufferUtils.bufferToBitBuffer(buffer));
    showToast('Mensagem Enviada!');
  }

  function handleReceive(buffer: Buffer) {
    console.log(buffer)
    console.log(BufferUtils.bitBufferToBuffer(buffer))
    setMessage(BufferUtils.bitBufferToBuffer(buffer));
    showToast('Mensagem Recebida!');
  }

  function handleConnect() {
    setStage('running');
    showToast('Conexão aberta!');
  }

  function handleDisconnect() {
    setStage('startup');
    showToast('Conexão terminada!');
  }

  function handleServerError(errorType: string) {
    if (errorType === 'EADDRINUSE') {
      showToast('Endereço ocupado!');
      setStage('startup');
    }
  }

  function handleStart() {
    setStage('connecting');
    try {
      const address = serverAddr.split(':');
      const host = address[0];
      const port = parseInt(address[1], 10);

      if (mode === 'receiver') {
        setServer(Server(handleReceive, host, port, handleConnect, handleServerError));
      } else {
        setClient(Client(host, port, handleConnect, handleDisconnect));
      }

    } catch (error) {
      console.log(error);
    }
  }

  function handleReturn() {
    if (client && mode === 'sender') {
      try {
        client.disconnect();
      } catch (error) {
        console.log(error);
      }
    } else if (server && mode === 'receiver') {
      try {
        server.close();
      } catch (error) {
        console.log(error);
      }
    }

    setStage('startup');
    setMessageInput('');
    setServerAddr('');
  }

  useEffect(() => {
    setMessage(ExtAscii.stringToBuffer(messageInput));
  }, [messageInput]);

  if (stage === 'startup') {
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
  if (stage === 'connecting') {
    return (
      <ConnectingScreen
        mode={mode}
        serverAddr={serverAddr}
        onCancelConnecting={handleReturn}
      />
    );
  }

  return (
    <MainScreen
      mode={mode}
      serverAddr={serverAddr}
      onReturn={handleReturn}
      chartData={chartData}
      message={message}
      onInput={msg => setMessageInput(msg)}
      onSend={handleSend}
    />
  );
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
