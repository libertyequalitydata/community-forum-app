import React from "react";

import { ChakraProvider, Text } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Text>App</Text>
      </div>
    </ChakraProvider>
  );
}

export default App;
