import React from 'react';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

import BottomBar from './BottomBar';
import Header from './Header';

interface MainScreenProps {
  mode: string;
  message: string;
  chartData: Array<object>;
  serverAddr: string;
  onReturn: () => void;
  onInput: (text: string) => void;
  onSend: (buffer: Buffer) => void;
}

export default function MainScreen(props: MainScreenProps) {
  const { mode, message, chartData, serverAddr, onReturn, onInput, onSend } = props;

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
          </LineChart>
        </ResponsiveContainer>
      </div>
      <BottomBar
        mode={mode}
        message={message}
        onInput={onInput}
        onSend={onSend}
      />
    </div>
  );
}
