import { Box, Text, Divider, Fade } from '@chakra-ui/react';
import NextImage from 'next/image';

import { formatDate } from '../lib/utils';

export type LaunchesListItemProps = {
  launch: {
    mission_name: string;
    launch_date_utc: string;
    rocket: {
      first_stage: {
        cores: {
          core_serial: string;
        }[];
      };
      second_stage: {
        payloads: {
          payload_id: string;
          payload_type: string;
        }[];
      };
    };
    links: {
      mission_patch_small: string;
    };
    launch_success: boolean;
    launch_failure_details?: {
      reason: string;
    };
  };
};

const LaunchesListItem = ({ launch }: LaunchesListItemProps) => {
  return (
    <Box as="li">
      <Fade in>
        <Box
          bg="gray.700"
          border="1px solid"
          borderColor="gray.600"
          borderRadius="5px"
          paddingX="1.5rem"
          paddingY="1rem"
          position="relative"
        >
          <Box position="absolute" top="-1.5rem" right="-1rem">
            {launch.links?.mission_patch_small && (
              <NextImage
                src={launch.links.mission_patch_small}
                width={70}
                height={70}
                objectFit="contain"
                alt={launch.mission_name}
                data-testid="badge"
              />
            )}
          </Box>
          <Text
            as="h2"
            color="gray.100"
            fontWeight="semibold"
            fontSize="large"
            marginRight="2rem"
          >
            {launch.mission_name}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {formatDate(launch.launch_date_utc)}
          </Text>

          <Divider borderColor="gray.600" marginY="1rem" />

          <Text fontSize="sm" fontWeight="semibold">
            Core serials:{' '}
            <Text as="span" color="gray.400" fontWeight="normal">
              {launch.rocket.first_stage.cores
                .map((core) => core.core_serial)
                .join(', ')}
            </Text>
          </Text>

          <Divider borderColor="gray.600" marginY="1rem" />

          <Text fontWeight="semibold" marginBottom="0.5rem">
            Payloads:
          </Text>
          {launch.rocket.second_stage.payloads.map((payload) => (
            <Box
              key={payload.payload_id}
              fontSize="xs"
              bg="gray.800"
              paddingY="0.25rem"
              paddingX="0.5rem"
              rounded="3px"
              marginBottom="0.5rem"
            >
              <Text fontWeight="semibold">
                ID:{' '}
                <Text as="span" fontWeight="normal">
                  {payload.payload_id}
                </Text>
              </Text>
              <Text fontWeight="semibold">
                TYPE:{' '}
                <Text as="span" fontWeight="normal">
                  {payload.payload_type}
                </Text>
              </Text>
            </Box>
          ))}

          <Divider borderColor="gray.600" marginY="1rem" />

          {launch.launch_success ? (
            <Text
              marginTop="1rem"
              color="green.400"
              textAlign="center"
              fontWeight="bold"
            >
              Launch successful
            </Text>
          ) : (
            <>
              <Text
                marginTop="1rem"
                color="red.400"
                textAlign="center"
                fontWeight="bold"
              >
                Launch failed
              </Text>
              {launch?.launch_failure_details ? (
                <Text color="gray.400" fontSize="sm" textAlign="center">
                  {launch.launch_failure_details.reason}
                </Text>
              ) : null}
            </>
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default LaunchesListItem;
