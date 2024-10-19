import React, { useEffect, useRef, useState } from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { autocompletion } from "@codemirror/autocomplete";
import { dracula } from "@uiw/codemirror-theme-dracula";

const LeftSection = ({ width }: { width: number }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<"html" | "css">("html");

  useEffect(() => {
    // Определяем расширение языка и создаем редактор
    const languageExtension = language === "html" ? html() : css();

    const editor = new EditorView({
      state: EditorState.create({
        doc:
          language === "html"
            ? "<h1>Hello World</h1>"
            : "body { background-color: tomato; }",
        extensions: [languageExtension, autocompletion(), dracula],
      }),
      parent: editorRef.current!,
    });

    return () => {
      editor.destroy();
    };
  }, [language]);

  return (
    <Box bg="tomato" width={`${width}%`} height="100%" padding="1rem">
      <ButtonGroup spacing="4" mb="4">
        <Button colorScheme="teal" onClick={() => setLanguage("html")}>
          HTML
        </Button>
        <Button colorScheme="teal" onClick={() => setLanguage("css")}>
          CSS
        </Button>
      </ButtonGroup>

      <Box ref={editorRef} border="1px solid black" height="300px"></Box>
    </Box>
  );
};

export default LeftSection;
