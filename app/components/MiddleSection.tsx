import { Box, Flex } from "@chakra-ui/react";
import { useState, useRef } from "react";

const MiddleSection = ({ width }: { width: number }) => {
  return <Box width={`${width}%`} height="100%" overflow="hidden"></Box>;
};

export default MiddleSection;
