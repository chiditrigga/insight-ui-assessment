import React from 'react';
import { Card, CardContent, Typography, Skeleton, Button } from '@mui/material';
import { SentimentChart } from './SentimentChart';

type Props = {
  data: any;
  isLoading: boolean;
  error: any;
  onRetry: () => void;
};

export const HashtagTrendCard = React.memo(({ data, isLoading, error, onRetry }: Props) => {
  if (isLoading) {
    return (
      <Card sx={{ mt: 4 }}>
        <CardContent>
      
          <Skeleton variant="rectangular" height={600} sx={{ mt: 2 }} />
          <Skeleton variant="text"  height={32} />
        </CardContent>
      </Card>
    );
  }
  if (error) return <div>Error loading data. <Button onClick={onRetry}>Retry</Button></div>;

  const isUp = data?.trend[data?.trend.length - 1]?.sentiment > data?.trend[0]?.sentiment;

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5">{data?.hashtag} {isUp ? '📈' : '📉'}</Typography>
        <Typography variant="subtitle2">{data?.range}</Typography>
        <SentimentChart trend={data?.trend} />
      </CardContent>
    </Card>
  );
});
