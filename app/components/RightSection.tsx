import {
  Box,
  Flex,
  Heading,
  Divider,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const RightSection = ({
  width,
  isVisible,
  onMouseDown,
  htmlCode,
}: {
  width: number;
  isVisible: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  htmlCode: string;
}) => {
  const [checkedTasks, setCheckedTasks] = useState({
    task1: false,
    task2: false,
    task3: false,
    task4: false,
  });

  useEffect(() => {
    if (htmlCode.includes("<h1>") && htmlCode.includes("</h1>")) {
      setCheckedTasks((prev) => ({ ...prev, task1: true }));
    } else {
      setCheckedTasks((prev) => ({ ...prev, task1: false }));
    }
  }, [htmlCode]);

  // Объявляем handleCheckTask2 внутри useEffect, чтобы не было необходимости добавлять его в зависимости
  useEffect(() => {
    const handleCheckTask2 = () => {
      if (htmlCode.includes("<div>") && htmlCode.includes("</div>")) {
        setCheckedTasks((prev) => ({ ...prev, task2: true }));
      } else {
        setCheckedTasks((prev) => ({ ...prev, task2: false }));
      }
    };
    handleCheckTask2();
  }, [htmlCode]);

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
        direction="column"
        margin={6}
        borderRadius="25px"
        padding={6}
        justifyContent="flex-start"
        alignItems="center"
        width="100%"
        height="100%"
        bg="#e0e0e0"
      >
        <Box
          bg="#e0e0e0"
          borderRadius="15px"
          boxShadow="5px 5px 15px #bebebe, -5px -5px 15px #ffffff"
          p={4}
          width="100%"
          mb={4}
        >
          <Heading as="h3" size="lg" textAlign="center">
            Task List
          </Heading>
        </Box>

        <Divider mb={4} />

        <VStack spacing={6} align="stretch" width="100%">
          <Box
            bg="#e0e0e0"
            borderRadius="15px"
            boxShadow="5px 5px 15px #bebebe, -5px -5px 15px #ffffff"
            p={4}
            width="100%"
          >
            <Checkbox
              size="lg"
              isChecked={checkedTasks.task1}
              onChange={() => {}}
            >
              Task 1: Contains {"<h1>"} tag
            </Checkbox>
          </Box>

          <Box
            bg="#e0e0e0"
            borderRadius="15px"
            boxShadow="5px 5px 15px #bebebe, -5px -5px 15px #ffffff"
            p={4}
            width="100%"
          >
            <Checkbox
              size="lg"
              isChecked={checkedTasks.task2}
              onChange={() => {}}
            >
              Task 2: Contains {"<div>"} tag
            </Checkbox>
          </Box>

          <Box
            bg="#e0e0e0"
            borderRadius="15px"
            boxShadow="5px 5px 15px #bebebe, -5px -5px 15px #ffffff"
            p={4}
            width="100%"
          >
            <Checkbox
              size="lg"
              isChecked={checkedTasks.task3}
              onChange={() => {}}
            >
              Task 3: Some other condition
            </Checkbox>
          </Box>

          <Box
            bg="#e0e0e0"
            borderRadius="15px"
            boxShadow="5px 5px 15px #bebebe, -5px -5px 15px #ffffff"
            p={4}
            width="100%"
          >
            <Checkbox
              size="lg"
              isChecked={checkedTasks.task4}
              onChange={() => {}}
            >
              Task 4: Another condition
            </Checkbox>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default RightSection;
