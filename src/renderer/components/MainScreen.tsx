import React from 'react';

import BottomBar from './BottomBar';
import Header from './Header';
import Chart from './Chart';

interface MainScreenProps {
  mode: string;
  clearTextMessage: Buffer;
  binaryMessage: Buffer;
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
    clearTextMessage,
    binaryMessage,
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
        clearTextMessage={clearTextMessage}
        binaryMessage={binaryMessage}
        encodingMessage={encodingMessage}
        encryptingMessage={encryptingMessage}
        onInput={onInput}
        onSend={onSend}
      />
    </div>
  );
}
