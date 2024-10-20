import { Box } from "@chakra-ui/react";

interface ResizerProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Resizer: React.FC<ResizerProps> = ({ onMouseDown }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width="15px"
      cursor="grab"
      bg="#383c5b"
      onMouseDown={onMouseDown}
    >
      <Box
        bgColor={"#222438"}
        height={"60px"}
        borderRadius={"full"}
        width={"10px"}
      />
    </Box>
  );
};

export default Resizer;
