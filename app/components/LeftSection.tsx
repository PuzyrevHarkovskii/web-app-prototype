import React, { useEffect, useRef, useState } from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { autocompletion } from "@codemirror/autocomplete";
import { dracula } from "@uiw/codemirror-theme-dracula";

const LeftSection = ({
  width,
  setHtmlCode,
  setCssCode,
}: {
  width: number;
  setHtmlCode: (code: string) => void;
  setCssCode: (code: string) => void;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [htmlContent, setHtmlContent] = useState("<h1>Hello World</h1>");
  const [cssContent, setCssContent] = useState(
    "body { background-color: tomato; }"
  );
  const [language, setLanguage] = useState<"html" | "css">("html");

  useEffect(() => {
    const languageExtension = language === "html" ? html() : css();
    const content = language === "html" ? htmlContent : cssContent;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const code = update.state.doc.toString();
        if (language === "html") {
          setHtmlContent(code);
          setHtmlCode(code);
        } else {
          setCssContent(code);
          setCssCode(code);
        }
      }
    });

    // Создаем редактор только один раз
    if (!viewRef.current) {
      viewRef.current = new EditorView({
        state: EditorState.create({
          doc: content,
          extensions: [
            languageExtension,
            autocompletion(),
            dracula,
            updateListener,
          ],
        }),
        parent: editorRef.current!,
      });
    } else {
      const newState = EditorState.create({
        doc: content,
        extensions: [
          languageExtension,
          autocompletion(),
          dracula,
          updateListener,
        ],
      });
      viewRef.current.setState(newState);
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [language, htmlContent, cssContent, setHtmlCode, setCssCode]);

  return (
    <Box bg="#352830" width={`${width}%`} height="100%" padding="1rem">
      <ButtonGroup spacing="4" mb="4">
        <Button colorScheme="teal" onClick={() => setLanguage("html")}>
          HTML
        </Button>
        <Button colorScheme="teal" onClick={() => setLanguage("css")}>
          CSS
        </Button>
      </ButtonGroup>

      <Box
        ref={editorRef}
        fontSize={"1.5em"}
        height="300px"
        overflow="auto"
        border="1px solid #ccc"
        borderRadius="8px"
      />
    </Box>
  );
};

export default LeftSection;
