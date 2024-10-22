import React, { useState, useCallback } from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { ViewUpdate } from "@codemirror/view";
import { EditorView } from "@codemirror/view";

const LeftSection = ({
  width,
  setHtmlCode,
  setCssCode,
}: {
  width: number;
  setHtmlCode: (code: string) => void;
  setCssCode: (code: string) => void;
}) => {
  const [activeButton, setActiveButton] = useState<"html" | "css">("html");

  const [htmlContent, setHtmlContent] = useState<string>(
    "<h1>Hello World</h1>"
  );
  const [cssContent, setCssContent] = useState<string>(
    "body { background-color: tomato; }"
  );

  const handleLanguageChange = (lang: "html" | "css") => {
    setActiveButton(lang);
  };

  const handleContentChange = useCallback(
    (val: string, viewUpdate: ViewUpdate) => {
      if (activeButton === "html") {
        setHtmlContent(val);
        setHtmlCode(val);
      } else {
        setCssContent(val);
        setCssCode(val);
      }
    },
    [activeButton, setHtmlCode, setCssCode]
  );

  return (
    <Box
      bg="#311855"
      minWidth={"10%"}
      width={`${width}px`}
      height="100%"
      padding="1rem"
    >
      <ButtonGroup
        display="flex"
        spacing={0.5}
        justifyContent="space-between"
        mb="2"
      >
        <Button
          borderRadius={"0"}
          width={"100%"}
          colorScheme={activeButton === "html" ? "purple" : "gray"}
          onClick={() => handleLanguageChange("html")}
        >
          HTML
        </Button>
        <Button
          borderRadius={"0"}
          width={"100%"}
          colorScheme={activeButton === "css" ? "purple" : "gray"}
          onClick={() => handleLanguageChange("css")}
        >
          CSS
        </Button>
      </ButtonGroup>

      <CodeMirror
        value={activeButton === "html" ? htmlContent : cssContent}
        height="60vh"
        extensions={[
          activeButton === "html" ? html() : css(),
          EditorView.lineWrapping,
        ]}
        onChange={handleContentChange}
        theme={"dark"}
        style={{
          fontSize: "1.5rem",
        }}
      />
    </Box>
  );
};

export default LeftSection;
