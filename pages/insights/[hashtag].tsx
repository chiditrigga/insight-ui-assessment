import { useRouter } from 'next/router';
import { useHashtagTrend } from '../../hooks/useHashtagTrend';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { HashtagTrendCard } from '../../components/HashtagTrendCard';

const HashtagPage = () => {
  const router = useRouter();
  const { hashtag } = router.query;

  const { data, isLoading, error } = useHashtagTrend(hashtag as string);

  if (isLoading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
        <Typography mt={2}>Loading trend data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h4" color="error">404 - Hashtag Not Found</Typography>
        <Typography mt={2}>
          The hashtag <strong>#{hashtag}</strong> doesn't exist in our system.
        </Typography>
        <Button onClick={() => router.push('/')} variant="contained" sx={{ mt: 3 }}>
          Go Home
        </Button>
      </Box>
    );
  }

  return (
    <Box maxWidth="1000px" mx="auto" p={2}>
      <HashtagTrendCard
        data={data}
        isLoading={isLoading}
        error={error}
        onRetry={() => router.reload()}
      />
    </Box>
  );
};

export default HashtagPage;
