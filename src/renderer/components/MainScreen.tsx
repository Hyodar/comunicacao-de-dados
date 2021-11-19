import React from 'react';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Brush,
} from 'recharts';

import BottomBar from './BottomBar';
import Header from './Header';

interface MainScreenProps {
  mode: string;
  clearTextMessage: Buffer;
  binaryMessage: Buffer;
  encodingMessage: Buffer;
  chartData: Array<object>;
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
    chartData,
    serverAddr,
    onReturn,
    onInput,
    onSend
  } = props;

  return (
    <div>
      <Header mode={mode} serverAddr={serverAddr} onReturn={onReturn} />
      <div
        style={{
          width: '100vw',
          height: 'calc(90vh - 400px)',
          marginBottom: '80px',
        }}
      >
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 100, bottom: 0, left: 0 }}
          >
            <Line
              type="stepAfter"
              dataKey="uv"
              stroke="#ffffff"
              strokeWidth="5px"
            />
            <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
            <XAxis dataKey="idx" stroke="#fff" />
            <YAxis stroke="#fff" ticks={[0, 1]} />
            <Brush dataKey="idx" height={30} stroke="#8884d8" startIndex={0} endIndex={Math.min(chartData.length - 1, 50)} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <BottomBar
        mode={mode}
        clearTextMessage={clearTextMessage}
        binaryMessage={binaryMessage}
        encodingMessage={encodingMessage}
        onInput={onInput}
        onSend={onSend}
      />
    </div>
  );
}
