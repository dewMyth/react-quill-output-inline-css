import "./styles.css";
import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css";

//Text direction
Quill.register(Quill.import("attributors/style/direction"), true);
//Alignment
Quill.register(Quill.import("attributors/style/align"), true);

// Don't forget corresponding css
const Size = Quill.import("attributors/style/size");
Size.whitelist = ["0.75em", "1em", "1.5em", "2.5em"];
Quill.register(Size, true);

//Text indent
const Parchment = Quill.import("parchment");
class IndentAttributor extends Parchment.Attributor.Style {
  add(node, value) {
    if (value === 0) {
      this.remove(node);
      return true;
    } else {
      return super.add(node, `${value}em`);
    }
  }
}

let IndentStyle = new IndentAttributor("indent", "text-indent", {
  scope: Parchment.Scope.BLOCK,
  whitelist: ["1em", "2em", "3em", "4em", "5em", "6em", "7em", "8em", "9em"]
});

Quill.register(IndentStyle, true);

const modules = {
  // https://github.com/quilljs/quill/issues/2905#issuecomment-683128521
  clipboard: {
    matchVisual: false
  },
  toolbar: [
    [
      { size: ["0.75em", "1em", "1.5em", "2.5em"] },
      "bold",
      "italic",
      "underline",
      { color: [] },
      { background: [] },
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { align: [] },
      "link"
    ]
  ]
};

function App() {
  const [text, setText] = useState(
    `<p><strong style="color: rgb(255, 153, 0);"><em><u>Pjhfdcjhad</u></em></strong> <span style="font-size: 1.5em;">jadhjvhgds</span> <u style="background-color: rgb(255, 194, 102);">dsbjhvgdsz</u> x</p><p><br></p><ul><li>Ok</li><li>LEt</li></ul><p style="text-indent: 8em;">&nbsp;&nbsp;&nbsp;&nbsp;</p><p style="text-indent: 8em;">&nbsp;&nbsp;&nbsp;&nbsp;See</p><p style="text-indent: 8em;">&nbsp;&nbsp;&nbsp;&nbsp;what</p><p style="text-indent: 8em;">&nbsp;&nbsp;&nbsp;&nbsp;happens</p><p><br></p><ol><li>Well lets</li><li>See <a href="wjat" rel="noopener noreferrer" target="_blank">wjat</a></li></ol> `
  );

  const handleChange = (value) => {
    setText(value);
  };

  const handleSubmit = () => {
    console.log(text);
  };

  return (
    <div data-text-editor="form-editor">
      <ReactQuill
        value={text}
        onChange={(val) => {
          console.log(val); //.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"));
          setText(val);
        }}
        bounds={`[data-text-editor="form-editor"]`} //for link editor to be not cut-off
        modules={modules}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
