"use client";
import { Box, Flex } from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import LeftSection from "./LeftSection";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";
import Resizer from "./Resizer";

const ResizableSections: React.FC = () => {
  const [leftWidth, setLeftWidth] = useState<number>(() =>
    parseInt(localStorage.getItem("leftWidth") || "300", 10)
  );
  const [rightWidth, setRightWidth] = useState<number>(() =>
    parseInt(localStorage.getItem("rightWidth") || "300", 10)
  );
  const [isRightSectionVisible, setIsRightSectionVisible] = useState<boolean>(
    () => localStorage.getItem("rightSectionVisible") === "true"
  );

  const [htmlCode, setHtmlCode] = useState<string>(
    () => localStorage.getItem("htmlCode") || "<h1>Hello World</h1>"
  );
  const [cssCode, setCssCode] = useState<string>(
    () =>
      localStorage.getItem("cssCode") || "body { background-color: tomato; }"
  );

  const isDraggingLeft = useRef(false);
  const isDraggingRight = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("htmlCode", htmlCode);
  }, [htmlCode]);

  useEffect(() => {
    localStorage.setItem("cssCode", cssCode);
  }, [cssCode]);

  useEffect(() => {
    localStorage.setItem("leftWidth", leftWidth.toString());
  }, [leftWidth]);

  useEffect(() => {
    localStorage.setItem("rightWidth", rightWidth.toString());
    localStorage.setItem(
      "rightSectionVisible",
      isRightSectionVisible.toString()
    );
  }, [rightWidth, isRightSectionVisible]);

  const handleMouseMoveLeft = (e: MouseEvent) => {
    if (!isDraggingLeft.current) return;
    const newLeftWidth = e.clientX;
    const totalWidth =
      window.innerWidth - (isRightSectionVisible ? rightWidth : 0);
    if (newLeftWidth >= 100 && newLeftWidth <= totalWidth - 100) {
      setLeftWidth(newLeftWidth);
    }
  };

  const handleMouseMoveRight = (e: MouseEvent) => {
    if (!isDraggingRight.current) return;
    const newRightWidth = Math.min(window.innerWidth - e.clientX, 500);
    const totalWidth = window.innerWidth - leftWidth;
    if (newRightWidth >= 0 && newRightWidth <= totalWidth - 100) {
      setRightWidth(newRightWidth);
    }
  };

  const handleMouseDownLeft = () => {
    isDraggingLeft.current = true;
    document.addEventListener("mousemove", handleMouseMoveLeft);
    document.addEventListener("mouseup", handleMouseUp);
    if (overlayRef.current) {
      overlayRef.current.style.display = "block";
    }
  };

  const handleMouseDownRight = () => {
    isDraggingRight.current = true;
    document.addEventListener("mousemove", handleMouseMoveRight);
    document.addEventListener("mouseup", handleMouseUp);
    if (overlayRef.current) {
      overlayRef.current.style.display = "block";
    }
  };

  const handleMouseUp = () => {
    isDraggingLeft.current = false;
    isDraggingRight.current = false;
    document.removeEventListener("mousemove", handleMouseMoveLeft);
    document.removeEventListener("mousemove", handleMouseMoveRight);
    document.removeEventListener("mouseup", handleMouseUp);
    if (overlayRef.current) {
      overlayRef.current.style.display = "none";
    }
  };

  const toggleRightSection = () => {
    setIsRightSectionVisible(!isRightSectionVisible);
  };

  const middleWidth =
    window.innerWidth - leftWidth - (isRightSectionVisible ? rightWidth : 0);

  return (
    <Flex height="93vh" direction={["column", "row"]} position="relative">
      <LeftSection
        width={leftWidth}
        setHtmlCode={setHtmlCode}
        setCssCode={setCssCode}
      />
      <Resizer onMouseDown={handleMouseDownLeft} />
      <MiddleSection
        width={middleWidth}
        htmlCode={htmlCode}
        cssCode={cssCode}
      />
      {isRightSectionVisible && <Resizer onMouseDown={handleMouseDownRight} />}
      <RightSection
        width={rightWidth}
        isVisible={isRightSectionVisible}
        onMouseDown={handleMouseDownRight}
        htmlCode={htmlCode} // Добавляем htmlCode
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
