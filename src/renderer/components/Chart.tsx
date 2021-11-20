
import React from 'react';
import ReactLoading from 'react-loading';
import LoadingOverlay from 'react-loading-overlay';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Brush,
} from 'recharts';

interface ChartProps {
  data: Array<object>;
  loading: boolean;
}

function Chart(props: ChartProps) {
  const { data, loading } = props;
  return (
    <div
      style={{
        width: '100vw',
        height: 'calc(90vh - 400px)',
        marginBottom: '80px',
      }}
    >
        <LoadingOverlay
          styles={{
            overlay: base => ({
              ...base,
              background: 'transparent',
            }),
            wrapper: base => ({
              ...base,
              width: '100%',
              height: '100%',
            })
          }}
          active={loading}
          spinner={<ReactLoading type="bars" color="#fff" />}
        >
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 5, right: 100, bottom: 0, left: 0 }}
            >
              <Line
                animationDuration={400}
                type="stepAfter"
                dataKey="uv"
                stroke="#ffffff"
                strokeWidth="5px"
              />
              <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
              <XAxis dataKey="idx" stroke="#fff" />
              <YAxis stroke="#fff" ticks={[0, 1]} />
              <Brush dataKey="idx" height={30} stroke="#fff" fill="#ffffffc9" startIndex={0} endIndex={Math.min(data.length - 1, 50)} />
              <div>aadsasdasd</div>
            </LineChart>
          </ResponsiveContainer>
        </LoadingOverlay>
    </div>
  );
}

export default Chart;
