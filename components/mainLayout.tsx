import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import NextImage from 'next/image';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Flex direction="column" minHeight="100vh" bg="gray.800" color="gray.300">
      <Flex
        as="nav"
        justifyContent="center"
        padding="2rem"
        bg="gray.900"
        marginBottom="3.5rem"
      >
        <Box>
          <NextImage
            src="/spacex_logo.png"
            height={40}
            width={180}
            objectFit="contain"
          />
        </Box>
      </Flex>
      <Box
        as="main"
        maxWidth="container.xl"
        width="100%"
        paddingX="2rem"
        marginX="auto"
        marginBottom="2rem"
      >
        {children}
      </Box>
      <Box
        as="footer"
        marginTop="auto"
        padding="1.25rem"
        bg="gray.900"
        textAlign="center"
        fontSize="xs"
        color="gray.500"
      >
        © 2022 All Rights Reserved
      </Box>
    </Flex>
  );
};

export default MainLayout;
