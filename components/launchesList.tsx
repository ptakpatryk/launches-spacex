import { Grid, Flex, Button, Text, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import LaunchesListItem from './launchesListItem';

const LaunchesList = () => {
  const [offset, setOffset] = useState(0);
  const [launches, setLaunches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLaunches = async (url: string) => {
    setIsLoading(true);

    try {
      const res = await fetch(url);

      if (res.status > 399 && res.status < 200) {
        throw new Error();
      }

      const data = await res.json();
      setLaunches((state) => [...state, ...data]);
    } catch (error) {
      setError(
        "Sorry, we've encountered an error. Please refresh or try again later."
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showMoreLaunches = () => {
    setOffset((offset) => offset + 10);
  };

  useEffect(() => {
    getLaunches(
      `https://api.spacexdata.com/v3/launches?limit=10&offset=${offset}`
    );
  }, [offset]);

  if (error) {
    return (
      <Text color="red.400" textAlign="center">
        {error}
      </Text>
    );
  }

  return (
    <>
      {isLoading && offset === 0 && (
        <Flex justifyContent="center" marginBottom="1.5rem">
          <Spinner color="teal.400" marginX="auto" size="xl" thickness="6px" />
        </Flex>
      )}

      <Grid
        as="ul"
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gridColumnGap="2.25rem"
        gridRowGap="3.5rem"
      >
        {launches.map((launch) => (
          <LaunchesListItem
            launch={launch}
            key={`${launch.flight_number}-${launch.mission_name}`}
          />
        ))}
      </Grid>

      {launches.length ? (
        <Flex justifyContent="center" marginTop="1.5rem">
          <Button
            onClick={showMoreLaunches}
            type="button"
            bg="teal.300"
            color="gray.800"
            paddingX="1.5rem"
            isLoading={isLoading}
            sx={{
              '&:hover': {
                bg: 'teal.500',
              },
            }}
          >
            Load more...
          </Button>
        </Flex>
      ) : null}
    </>
  );
};

export default LaunchesList;
