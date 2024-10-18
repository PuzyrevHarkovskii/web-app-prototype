import { Box } from "@chakra-ui/react";

interface ResizerProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Resizer: React.FC<ResizerProps> = ({ onMouseDown }) => {
  return (
    <Box
      width="10px"
      cursor="col-resize"
      bg="gray.500"
      onMouseDown={onMouseDown}
    />
  );
};

export default Resizer;
