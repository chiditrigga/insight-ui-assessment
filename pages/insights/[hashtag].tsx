import { useRouter } from 'next/router';
import { useHashtagTrend } from '../../hooks/useHashtagTrend';
import { HashtagTrendCard } from '../../components/HashtagTrendCard';
import { Container } from '@mui/material';

const HashtagPage = () => {
  const { query } = useRouter();
  const hashtag = query.hashtag as string;

  const { data, isLoading, error, mutate } = useHashtagTrend(hashtag);

  return (
    <Container>
      <HashtagTrendCard data={data} isLoading={isLoading} error={error} onRetry={mutate} />
    </Container>
  );
};

export default HashtagPage;
