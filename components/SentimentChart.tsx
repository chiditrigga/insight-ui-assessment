import React from 'react';
import { LineChart } from '@mui/x-charts';
import { Skeleton } from '@mui/material';

type Props = {
  trend: { date: string; sentiment: number }[];
  loading?: boolean;
};

export const SentimentChart = React.memo(({ trend, loading = false }: Props) => {
  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        height={300}
        animation="wave"
        sx={{ borderRadius: 1 }}
      />
    );
  }

  if (!trend || trend.length === 0) {
    return <div>No sentiment data available</div>;
  }

  return (
    <LineChart
      height={500}
      xAxis={[{ data: trend.map(t => t?.date), scaleType: 'point' }]}
      series={[{ data: trend.map(t => t?.sentiment), label: 'Sentiment' }]}
    />
  );
});
