"use client";

import { Box, Flex } from "@chakra-ui/react";
import { useState, useRef } from "react";
import LeftSection from "./LeftSection";
import Resizer from "./Resizer";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";

const ResizableSections = () => {
  const [leftWidth, setLeftWidth] = useState(30); // Начальная ширина первой секции
  const [middleWidth, setMiddleWidth] = useState(40); // Начальная ширина средней секции
  const [htmlCode, setHtmlCode] = useState("<h1>Hello World</h1>"); // Начальный HTML-код
  const [cssCode, setCssCode] = useState("body { background-color: tomato; }"); // Начальный CSS-код
  const isDraggingLeft = useRef(false);
  const isDraggingRight = useRef(false);

  const handleMouseMoveLeft = (e: MouseEvent) => {
    if (!isDraggingLeft.current) return;
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    if (newLeftWidth > 10 && newLeftWidth < 80) {
      setLeftWidth(newLeftWidth);
    }
  };

  const handleMouseMoveRight = (e: MouseEvent) => {
    if (!isDraggingRight.current) return;
    const totalWidth = window.innerWidth;
    const newMiddleWidth =
      ((e.clientX - (leftWidth * totalWidth) / 100) / totalWidth) * 100;
    if (newMiddleWidth > 10 && newMiddleWidth < 80) {
      setMiddleWidth(newMiddleWidth);
    }
  };

  const handleMouseUp = () => {
    isDraggingLeft.current = false;
    isDraggingRight.current = false;
    document.removeEventListener("mousemove", handleMouseMoveLeft);
    document.removeEventListener("mousemove", handleMouseMoveRight);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownLeft = () => {
    isDraggingLeft.current = true;
    document.addEventListener("mousemove", handleMouseMoveLeft);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownRight = () => {
    isDraggingRight.current = true;
    document.addEventListener("mousemove", handleMouseMoveRight);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <Flex height="100vh">
      {/* Первая секция */}
      <LeftSection
        width={leftWidth}
        setHtmlCode={setHtmlCode} // Передача функции для обновления HTML
        setCssCode={setCssCode} // Передача функции для обновления CSS
      />

      <Resizer onMouseDown={handleMouseDownLeft} />

      <MiddleSection
        width={middleWidth}
        htmlCode={htmlCode} // Передача HTML-кода
        cssCode={cssCode} // Передача CSS-кода
      />

      <Resizer onMouseDown={handleMouseDownRight} />

      {/* Правая секция */}
      <RightSection width={100 - leftWidth - middleWidth} />
    </Flex>
  );
};

export default ResizableSections;
