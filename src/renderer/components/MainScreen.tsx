import React from 'react';

import BottomBar from './BottomBar';
import Header from './Header';
import Chart from './Chart';

interface MainScreenProps {
  mode: string;
  messageInput: string;
  clearTextMessage: Buffer;
  encodingMessage: Buffer;
  encryptingMessage: Buffer;
  chartData: Array<object>;
  loadingChart: boolean;
  serverAddr: string;
  onReturn: () => void;
  onInput: (text: string) => void;
  onSend: (buffer: Buffer) => void;
}

export default function MainScreen(props: MainScreenProps) {
  const {
    mode,
    messageInput,
    clearTextMessage,
    encodingMessage,
    encryptingMessage,
    chartData,
    loadingChart,
    serverAddr,
    onReturn,
    onInput,
    onSend
  } = props;

  return (
    <div>
      <Header mode={mode} serverAddr={serverAddr} onReturn={onReturn} />
      <Chart data={chartData} loading={loadingChart} />
      <BottomBar
        mode={mode}
        messageInput={messageInput}
        clearTextMessage={clearTextMessage}
        encodingMessage={encodingMessage}
        encryptingMessage={encryptingMessage}
        onInput={onInput}
        onSend={onSend}
      />
    </div>
  );
}
