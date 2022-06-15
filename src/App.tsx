import * as Automerge from "automerge";
import { useState } from "react";

function App() {
  const [doc, setDoc] = useState(
    Automerge.init<{
      items?: {
        text: string
        done: boolean
      }[];
    }>()
  );

  const [text, setText] = useState("");

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)}></input>
      <button
        onClick={() => {
          setDoc(
            Automerge.change(doc, (doc) => {
              if (!doc.items) doc.items = [];
              doc.items.push({ text, done: false });
            })
          );

          setText("");
        }}
      >
        button
      </button>
      <ul>
        {doc.items?.map((x, i) => (
          <li key={i}>{x.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
