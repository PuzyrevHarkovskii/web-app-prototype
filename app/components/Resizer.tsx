import { Box } from "@chakra-ui/react";

interface ResizerProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Resizer: React.FC<ResizerProps> = ({ onMouseDown }) => {
  return (
    <Box
      width="10px"
      cursor="col-resize"
      bg="#383c5b"
      onMouseDown={onMouseDown}
      height="100%"
    >
      <Box bgColor={"#222438"} height={"100%"} width={"4px"} margin="auto" />
    </Box>
  );
};

export default Resizer;
