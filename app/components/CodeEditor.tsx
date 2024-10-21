import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { ViewUpdate } from "@codemirror/view";

function CodeEditor() {
  const [value, setValue] = React.useState(
    "body { background-color: lightblue; }"
  );

  const onChange = React.useCallback((val: string, viewUpdate: ViewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);

  return (
    <CodeMirror
      value={value}
      height="200px"
      extensions={[css()]}
      onChange={onChange}
    />
  );
}

export default CodeEditor;
