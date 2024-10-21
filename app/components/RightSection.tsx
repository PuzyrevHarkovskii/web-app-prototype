import { Box, Flex, Heading } from "@chakra-ui/react";

const RightSection = ({
  width,
  isVisible,
  onMouseDown,
}: {
  width: number;
  isVisible: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <Box
      bg="#311855"
      width={isVisible ? `${width}px` : "500px"}
      height="100%"
      overflow="hidden"
      transition="transform 0.3s ease"
      transform={isVisible ? "translateX(0)" : "translateX(500px)"}
      position="absolute"
      right={0}
    >
      <Box
        onMouseDown={onMouseDown}
        cursor="col-resize"
        width="50px"
        height="100%"
        position="absolute"
        left="-30px"
        top="0"
        bg="rgba(56, 60, 91, 0.8)"
        zIndex="10"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box bgColor="white" height="100%" width="5px" />
      </Box>

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
