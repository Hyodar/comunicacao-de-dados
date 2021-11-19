
import React, { useEffect, useState, useCallback } from 'react';
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

import debounce from "lodash";

function bitBufferToChartData(bitBuf: Buffer) {
  return Array.from(bitBuf).map((el, idx) => ({ idx, uv: el }));
}

function AppMain() {
  const [stage, setStage] = useState('startup');
  const [mode, setMode] = useState('sender');
  const [serverAddr, setServerAddr] = useState('');
  const [server, setServer] = useState<any>();
  const [client, setClient] = useState<any>();
  
  const [messageInput, setMessageInput] = useState('');
  const [message, setMessage] = useState(Buffer.from([]));
  const [clearTextMessage, setClearTextMessage] = useState(Buffer.from([]));
  const [binaryMessage, setBinaryMessage] = useState(Buffer.from([]));
  const [encodingMessage, setEncodingMessage] = useState(Buffer.from([]));

  const [chartData, setChartData] = useState<Array<Object>>([]);
  
  useEffect(() => {
    if (mode === "sender") {
      setClearTextMessage(message);
      setBinaryMessage(BufferUtils.bufferToBitBuffer(message));
  
      const encryptedMessage = Cryptography.encrypt(message);
      setEncodingMessage(ManchesterEncoding.encode(encryptedMessage));
    }
    else {
      const decodedMessage = ManchesterEncoding.decode(message);
      const messageBuffer = Cryptography.decrypt(decodedMessage);
  
      setEncodingMessage(decodedMessage);
      setBinaryMessage(BufferUtils.bufferToBitBuffer(messageBuffer));
      setClearTextMessage(messageBuffer);
    }
  }, [message, mode]);
  
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout|null>(null);
  const [loadingChart, setLoadingChart] = useState(false);

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    else {
      setChartData([]);
      setLoadingChart(true);
      setTimeoutId(
        setTimeout(() => {
          if (mode === "sender") {
            setChartData(bitBufferToChartData(BufferUtils.bufferToBitBuffer(encodingMessage)));
          }
          else {
            setChartData(bitBufferToChartData(BufferUtils.bufferToBitBuffer(message)));
          }
          setLoadingChart(false);
        }, 1000)
      );
    }
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
      clearTextMessage={clearTextMessage}
      binaryMessage={binaryMessage}
      encodingMessage={encodingMessage}
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
