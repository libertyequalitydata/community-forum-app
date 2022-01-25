import React from "react";
import { Text, Button, ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Text>App</Text>
        <Button>dsasda</Button>
        <Button colorScheme="teal" size="xs">
          Button
        </Button>
      </div>
    </ChakraProvider>
  );
}

export default App;
