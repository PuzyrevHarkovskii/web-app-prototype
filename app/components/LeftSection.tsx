import React, { useState } from "react";
import { Box, Textarea, Button, ButtonGroup } from "@chakra-ui/react";

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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (activeButton === "html") {
      setHtmlContent(e.target.value);
      setHtmlCode(e.target.value);
    } else {
      setCssContent(e.target.value);
      setCssCode(e.target.value);
    }
  };

  return (
    <Box bg="#311855" width={`${width}px`} height="100%" padding="1rem">
      <ButtonGroup display="flex" justifyContent="space-between" mb="3">
        <Button
          colorScheme={activeButton === "html" ? "purple" : "gray"}
          onClick={() => handleLanguageChange("html")}
        >
          HTML
        </Button>
        <Button
          colorScheme={activeButton === "css" ? "purple" : "gray"}
          onClick={() => handleLanguageChange("css")}
        >
          CSS
        </Button>
      </ButtonGroup>

      <Textarea
        color={"white"}
        fontSize={"2xl"}
        value={activeButton === "html" ? htmlContent : cssContent}
        onChange={handleContentChange}
        height="300px"
      />
    </Box>
  );
};

export default LeftSection;
