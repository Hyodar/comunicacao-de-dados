
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
import ManchesterEncoding from 'utils/manchester';
import Cryptography from 'utils/cryptography';

function bitBufferToChartData(bitBuf: Buffer) {
  return Array.from(bitBuf).map((el, idx) => ({ idx, uv: el }));
}

function AppMain() {
  const [stage, setStage] = useState('startup');
  const [mode, setMode] = useState('sender');
  const [serverAddr, setServerAddr] = useState('');
  const [server, setServer] = useState<any>();
  const [client, setClient] = useState<any>();
  const [cryptoKey, setCryptoKey] = useState("p4ssw0rd");
  
  const [messageInput, setMessageInput] = useState('');
  const [message, setMessage] = useState(Buffer.from([]));
  const [clearTextMessage, setClearTextMessage] = useState(Buffer.from([]));
  const [encodingMessage, setEncodingMessage] = useState(Buffer.from([]));
  const [encryptingMessage, setEncryptingMessage] = useState(Buffer.from([]));

  const [chartData, setChartData] = useState<Array<Object>>([]);
  
  useEffect(() => {
    if (mode === "sender") {
      const encryptedMessage = Cryptography.encrypt(message, cryptoKey);

      setClearTextMessage(message);
      setEncryptingMessage(encryptedMessage);
      setEncodingMessage(ManchesterEncoding.encode(encryptedMessage));
    }
    else {
      const decodedMessage = ManchesterEncoding.decode(message);
      const decryptedMessage = Cryptography.decrypt(decodedMessage, cryptoKey);

      setEncodingMessage(message);
      setEncryptingMessage(decodedMessage);
      setClearTextMessage(decryptedMessage);
    }
  }, [message, mode, cryptoKey]);
  
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout|null>(null);
  const [loadingChart, setLoadingChart] = useState(false);

  useEffect(() => {
    if (mode !== "receiver") return;

    setChartData(bitBufferToChartData(BufferUtils.bufferToBitBuffer(message)));
  }, [message]);

  useEffect(() => {
    if (mode !== "sender") return;
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setChartData([]);
    setLoadingChart(true);
    setTimeoutId(
      setTimeout(() => {
        setChartData(bitBufferToChartData(BufferUtils.bufferToBitBuffer(encodingMessage)));
        setLoadingChart(false);
      }, 1000)
    );
  }, [message, encodingMessage]);

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
    else if (errorType === 'RANGE') {
      showToast('Porta inválida!');
      setStage('startup');
    }
  }

  function handleStart() {
    setStage('connecting');
    try {
      const separatorIdx = serverAddr.lastIndexOf(':');
      const host = serverAddr.slice(0, separatorIdx);
      const port = parseInt(serverAddr.slice(separatorIdx + 1), 10);

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
        cryptoKey={cryptoKey}
        setCryptoKey={setCryptoKey}
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
      loadingChart={loadingChart}
      messageInput={messageInput}
      clearTextMessage={clearTextMessage}
      encodingMessage={encodingMessage}
      encryptingMessage={encryptingMessage}
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
