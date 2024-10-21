"use client";
import { Box, Flex } from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import LeftSection from "./LeftSection";
import MiddleSection from "./MiddleSection";
import Resizer from "./Resizer";

const ResizableSections: React.FC = () => {
  const [leftWidth, setLeftWidth] = useState<number>(() => {
    const savedLeftWidth = localStorage.getItem("leftWidth");
    return savedLeftWidth ? parseInt(savedLeftWidth, 10) : 300; // Устанавливаем 300 по умолчанию, если в localStorage нет данных
  });

  const [htmlCode, setHtmlCode] = useState<string>(
    () => localStorage.getItem("htmlCode") || "<h1>Hello World</h1>"
  );

  const [cssCode, setCssCode] = useState<string>(
    () =>
      localStorage.getItem("cssCode") || "body { background-color: tomato; }"
  );

  const isDragging = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Сохранение данных в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("htmlCode", htmlCode); // Сохраняем HTML в localStorage
  }, [htmlCode]);

  useEffect(() => {
    localStorage.setItem("cssCode", cssCode); // Сохраняем CSS в localStorage
  }, [cssCode]);

  useEffect(() => {
    localStorage.setItem("leftWidth", leftWidth.toString()); // Сохраняем ширину левой секции в localStorage
  }, [leftWidth]);

  // Перетаскивание разделителя
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const newLeftWidth = e.clientX;
    const totalWidth = window.innerWidth;
    if (newLeftWidth >= 100 && newLeftWidth <= totalWidth - 100) {
      setLeftWidth(newLeftWidth); // Устанавливаем новую ширину левой секции
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    if (overlayRef.current) {
      overlayRef.current.style.display = "block"; // Показываем прозрачный div поверх iframe
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    if (overlayRef.current) {
      overlayRef.current.style.display = "none"; // Прячем прозрачный div
    }
  };

  const middleWidth = window.innerWidth - leftWidth; // Вычисляем ширину для средней секции

  return (
    <Flex height="93vh" direction={["column", "row"]} position="relative">
      <LeftSection
        width={leftWidth}
        setHtmlCode={setHtmlCode}
        setCssCode={setCssCode}
      />
      <Resizer onMouseDown={handleMouseDown} />
      <MiddleSection
        width={middleWidth}
        htmlCode={htmlCode}
        cssCode={cssCode}
      />
      <Box
        ref={overlayRef}
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        display="none"
        zIndex="10"
        background="transparent"
      />
    </Flex>
  );
};

export default ResizableSections;
