import { Box, Flex } from "@chakra-ui/react";
import { useState, useRef } from "react";

const RightSection = ({ width }: { width: number }) => {
  return (
    <Box bg="blue.500" width={`${width}%`} height="100%" overflow="hidden" />
  );
};

export default RightSection;
