import React from 'react';
import { NativeBaseProvider, Box, Text } from 'native-base';

const TestScreen = () => {
  return (
    <NativeBaseProvider>
      <Box flex={1} justifyContent="center" alignItems="center" bg="primary.500">
        <Text color="white" fontSize="2xl" fontWeight="bold">
          Hello, Native Base!
        </Text>
      </Box>
    </NativeBaseProvider>
  );
};

export default TestScreen;