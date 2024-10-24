import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

const MiddleSection = ({
  width,
  htmlCode,
  cssCode,
}: {
  width: number;
  htmlCode: string;
  cssCode: string;
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <style>
                /* Применяем CSS, переданный из левой секции */
                ${cssCode}
              </style>
            </head>
            <body>
              ${htmlCode}
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [htmlCode, cssCode]);

  return (
    <Box width={`${width}px`} height="100%">
      <iframe
        ref={iframeRef}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          backgroundColor: "transparent",
        }}
        title="Code Preview"
      />
    </Box>
  );
};

export default MiddleSection;
