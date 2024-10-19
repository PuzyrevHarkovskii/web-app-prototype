import { Box, Flex, Heading } from "@chakra-ui/react";
import { useState, useRef } from "react";

const RightSection = ({ width }: { width: number }) => {
  return (
    <Box bg="blue.500" width={`${width}%`} height="100%" overflow="hidden">
      <Flex
        margin={6}
        borderRadius={"25px"}
        border={"1px"}
        padding={6}
        content="center"
      >
        <Heading>Привет</Heading>
      </Flex>
    </Box>
  );
};

export default RightSection;
