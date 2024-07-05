import { useRef, useState } from "react";

import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";

import "./App.css";
import PersonCard from "./Components/PersonCard/PersonCard";
import OrgTree from "./Components/OrgTree/OrgTree";

// Reads the `$APPDATA/users` directory recursively

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  const readFile = async () => {
    try {
      const file = await open({
        multiple: false,
        title: "Select a file",
      });
      if (!file) return;
      setFile(await readTextFile(file as string));
    } catch (error) {
      console.error("Failed to read file:", error);
    }
  };

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      {greetMsg && <PersonCard name={name} age={20} job="Developer" />}
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>

      <button onClick={readFile}>get files</button>
      {file.length ? (
        <div>
          <p>{file}</p>
        </div>
      ) : null}

      <OrgTree />
    </div>
  );
}

export default App;
