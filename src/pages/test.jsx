import React, { useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

export default function Test() {
  const [editor] = useState(() => withReact(createEditor()));
  return (
    <div>
      <div>
        <button>B</button>
        <button>I</button>
      </div>
      <input type="text" placeholder="1200 caractéres" />
    </div>
  );
}
