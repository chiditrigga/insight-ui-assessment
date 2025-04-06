import React from 'react';
import { Card, CardContent, Typography, Skeleton, Button, Box } from '@mui/material';
import { SentimentChart } from './SentimentChart';
import Link from 'next/link';

interface TrendData {
  hashtag: string;
  range: string;
  trend: Array<{
    date: string;
    sentiment: number;
  }>;
}

type Props = {
  data: TrendData | null;
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
          <Skeleton variant="text" height={32} />
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    const isNotFound = error?.message === 'Hashtag not found';
    return (
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Typography variant="h6" color="error">
              {isNotFound ? 'Hashtag Not Found' : 'Error Loading Data'}
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              {isNotFound 
                ? 'We couldn\'t find any trend data for this hashtag. Try searching for a different one.'
                : 'There was an error loading the trend data. Please try again.'}
            </Typography>
            <Box display="flex" gap={2}>
              <Button variant="contained" onClick={onRetry}>
                Try Again
              </Button>
              <Link href="/" passHref>
                <Button variant="outlined">
                  Go Home
                </Button>
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const trend = data.trend;
  if (!trend || trend.length === 0) {
    return (
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Typography variant="h6" color="error">
              No Trend Data Available
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              There is no trend data available for this hashtag.
            </Typography>
            <Box display="flex" gap={2}>
              <Button variant="contained" onClick={onRetry}>
                Try Again
              </Button>
              <Link href="/" passHref>
                <Button variant="outlined">
                  Go Home
                </Button>
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const isUp = trend[trend.length - 1]?.sentiment > trend[0]?.sentiment;

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5">{data.hashtag} {isUp ? '📈' : '📉'}</Typography>
        <Typography variant="subtitle2">{data.range}</Typography>
        <SentimentChart trend={trend} />
      </CardContent>
    </Card>
  );
});
