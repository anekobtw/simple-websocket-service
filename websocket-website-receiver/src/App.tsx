import { useEffect, useState } from "react";

export default function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/text");

    ws.onmessage = (event) => {
      setText(event.data);
    };

    ws.onopen = () => {
      console.log("connected");
    };

    ws.onclose = () => {
      console.log("disconnected");
    };

    ws.onerror = (e) => {
      console.log("error", e);
    };

    return () => ws.close();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        fontFamily: "monospace",
        padding: "20px",
        textAlign: "center",
        whiteSpace: "pre-wrap",
      }}
    >
      {text}
    </div>
  );
}
