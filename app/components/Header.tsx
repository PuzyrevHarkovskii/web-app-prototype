"use client";
import {
  Flex,
  Circle,
  Text,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Header: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { colorMode, toggleColorMode } = useColorMode();

  const steps: number[] = [1, 2, 3];

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
    console.log(`Переключение на страницу задания ${step}`);
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      bg={useColorModeValue("#FEC866", "gray.800")}
      py={2}
    >
      <Flex justify="center" align="center" flexGrow={1}>
        {steps.map((step: number) => (
          <Circle
            key={step}
            size="30px"
            border={"1px solid black"}
            bg={currentStep === step ? "#311855" : "white"}
            color={currentStep === step ? "white" : "black"}
            mx={4}
            cursor="pointer"
            onClick={() => handleStepClick(step)}
          >
            <Text fontSize="xl">{step}</Text>
          </Circle>
        ))}
      </Flex>

      <Button onClick={toggleColorMode} ml={4}>
        {colorMode === "light" ? "Темная тема" : "Светлая тема"}
      </Button>
    </Flex>
  );
};

export default Header;
