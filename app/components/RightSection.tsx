import { Box, Flex, Heading } from "@chakra-ui/react";

const RightSection = ({ width }: { width: number }) => {
  return (
    <Box
      bg="#311855"
      width={`${width}%`}
      height="100%"
      overflow="hidden"
      transition="width 0.3s ease"
    >
      <Flex
        margin={6}
        borderRadius="25px"
        border="1px solid white"
        padding={6}
        justifyContent="center"
        alignItems="center"
        width="200px"
        height="100%"
        bg="white"
      >
        <Heading color="black">Привет</Heading>
      </Flex>
    </Box>
  );
};

export default RightSection;
