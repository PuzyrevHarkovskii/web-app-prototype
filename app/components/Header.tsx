"use client";
import {
  Box,
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
      bg={useColorModeValue("gray.100", "gray.800")}
      py={4}
    >
      {/* Обертка для шариков */}
      <Flex justify="center" align="center" flexGrow={1}>
        {steps.map((step: number) => (
          <Circle
            key={step}
            size="40px"
            bg={currentStep === step ? "blue.500" : "gray.300"}
            color={currentStep === step ? "white" : "black"}
            mx={4}
            cursor="pointer"
            onClick={() => handleStepClick(step)}
          >
            <Text fontSize="lg">{step}</Text>
          </Circle>
        ))}
      </Flex>
      {/* Кнопка переключения темы */}
      <Button onClick={toggleColorMode} ml={4}>
        {colorMode === "light" ? "Темная тема" : "Светлая тема"}
      </Button>
    </Flex>
  );
};

export default Header;
