import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { PasswordGenerator } from "./components/PasswordGenerator";

function App() {
  return (
    <ChakraProvider>
      <PasswordGenerator />
    </ChakraProvider>
  );
}

export default App;
