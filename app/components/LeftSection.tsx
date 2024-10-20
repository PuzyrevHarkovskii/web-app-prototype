import React, { useEffect, useRef, useState } from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { EditorView, ViewUpdate } from "@codemirror/view";
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
  const [language, setLanguage] = useState<"html" | "css">("html");

  useEffect(() => {
    const languageExtension = language === "html" ? html() : css();

    const updateListener = EditorView.updateListener.of(
      (update: ViewUpdate) => {
        if (update.docChanged) {
          const code = update.state.doc.toString();
          if (language === "html") {
            setHtmlCode(code);
          } else {
            setCssCode(code);
          }
        }
      }
    );

    const editor = new EditorView({
      state: EditorState.create({
        doc:
          language === "html"
            ? "<h1>Hello World</h1>"
            : "body { background-color: tomato; }",
        extensions: [
          languageExtension,
          autocompletion(),
          dracula,
          updateListener,
        ],
      }),
      parent: editorRef.current!,
    });

    return () => {
      editor.destroy();
    };
  }, [language, setHtmlCode, setCssCode]);

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

      <Box ref={editorRef} fontSize={"1.25em"} borderRadius={"15px"} />
    </Box>
  );
};

export default LeftSection;
