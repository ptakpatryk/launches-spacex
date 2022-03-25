import { ChakraProvider } from '@chakra-ui/react';
import MainLayout from '../components/mainLayout';
import 'reset-css';


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  )
}

export default MyApp;
