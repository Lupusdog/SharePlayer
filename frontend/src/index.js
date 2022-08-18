import { render } from 'react-dom';
import { App }from './components/App';
import React from "react"
import { ChakraProvider } from "@chakra-ui/react"

const root = document.getElementById("root");
render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  root
);

