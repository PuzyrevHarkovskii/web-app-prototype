import {
  Box,
  Flex,
  Heading,
  Divider,
  Checkbox,
  VStack,
  useColorModeValue,
  Collapse,
  IconButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";

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
  });

  const [isOpenTask1, setIsOpenTask1] = useState(false);
  const [isOpenTask2, setIsOpenTask2] = useState(false);

  const bg = useColorModeValue("#e0e0e0", "#1A202C");
  const boxShadow = useColorModeValue(
    "5px 5px 15px #bebebe, -5px -5px 15px #ffffff",
    "5px 5px 15px #2D3748, -5px -5px 15px #4A5568"
  );
  const headingColor = useColorModeValue("black", "white");
  const dividerColor = useColorModeValue("gray.600", "gray.400");
  const additionalInfoBg = useColorModeValue("gray.100", "gray.700");
  const additionalInfoText = useColorModeValue("black", "white");

  useEffect(() => {
    if (htmlCode.includes("<h1>") && htmlCode.includes("</h1>")) {
      setCheckedTasks((prev) => ({ ...prev, task1: true }));
    } else {
      setCheckedTasks((prev) => ({ ...prev, task1: false }));
    }
  }, [htmlCode]);

  useEffect(() => {
    if (htmlCode.includes("<div>") && htmlCode.includes("</div>")) {
      setCheckedTasks((prev) => ({ ...prev, task2: true }));
    } else {
      setCheckedTasks((prev) => ({ ...prev, task2: false }));
    }
  }, [htmlCode]);

  const toggleAccordion = (taskNumber: number) => {
    switch (taskNumber) {
      case 1:
        setIsOpenTask1(!isOpenTask1);
        break;
      case 2:
        setIsOpenTask2(!isOpenTask2);
        break;

      default:
        break;
    }
  };

  return (
    <Box
      bg="#311855"
      width={isVisible ? `${width}px` : "500px"}
      height="100%"
      pr={4}
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
        margin={5}
        borderRadius="25px"
        padding={6}
        justifyContent="flex-start"
        alignItems="center"
        width="100%"
        height="100%"
        bg={bg}
      >
        <Box
          bg={bg}
          borderRadius="15px"
          boxShadow={boxShadow}
          p={4}
          width="100%"
          mb={4}
        >
          <Heading as="h3" size="lg" textAlign="center" color={headingColor}>
            Task List
          </Heading>
        </Box>

        <Divider mb={4} borderColor={dividerColor} />

        <VStack spacing={6} align="stretch" width="100%">
          {/* Task 1 */}
          <Box
            bg={bg}
            borderRadius="15px"
            boxShadow={boxShadow}
            p={4}
            width="100%"
          >
            <Flex alignItems="center">
              <Checkbox
                iconColor="yellow.400"
                colorScheme="purple"
                size="lg"
                isChecked={checkedTasks.task1}
                onChange={() => toggleAccordion(1)}
              >
                Task 1: Contains {"<h1>"} tag
              </Checkbox>
              <IconButton
                ml="auto"
                aria-label="Toggle Task 1"
                icon={isOpenTask1 ? <ChevronDownIcon /> : <ChevronRightIcon />}
                onClick={() => toggleAccordion(1)}
                variant="ghost"
              />
            </Flex>
            <Collapse in={isOpenTask1} animateOpacity>
              <Box
                mt={4}
                p={2}
                bg={additionalInfoBg} // Цвет для темной темы
                rounded="md"
                color={additionalInfoText} // Цвет текста для темной темы
              >
                Additional information about Task 1
              </Box>
            </Collapse>
          </Box>

          {/* Task 2 */}
          <Box
            bg={bg}
            borderRadius="15px"
            boxShadow={boxShadow}
            p={4}
            width="100%"
          >
            <Flex alignItems="center">
              <Checkbox
                iconColor="yellow.400"
                colorScheme="purple"
                size="lg"
                isChecked={checkedTasks.task2}
                onChange={() => toggleAccordion(2)}
              >
                Task 2: Contains {"<div>"} tag
              </Checkbox>
              <IconButton
                ml="auto"
                aria-label="Toggle Task 2"
                icon={isOpenTask2 ? <ChevronDownIcon /> : <ChevronRightIcon />}
                onClick={() => toggleAccordion(2)}
                variant="ghost"
              />
            </Flex>
            <Collapse in={isOpenTask2} animateOpacity>
              <Box
                mt={4}
                p={2}
                bg={additionalInfoBg}
                rounded="md"
                color={additionalInfoText}
              >
                Additional information about Task 2
              </Box>
            </Collapse>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default RightSection;
