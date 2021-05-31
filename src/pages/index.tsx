import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      const images = await api.get('/api/images', {
        params: {
          after: pageParam,
        },
      });
      return images;
    },
    { getNextPageParam: lastPage => lastPage.data.after }
  );
  // console.log(data);
  const formattedData = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return acc.concat(page.data.data);
    }, []);
  }, [data]);
  // console.log(formattedData);
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && !isFetchingNextPage && (
          <Button mt="40px" onClick={() => fetchNextPage()}>
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
