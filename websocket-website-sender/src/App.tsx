import { useEffect, useRef, useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/text");

    ws.onopen = () => {
      console.log("connected");
    };

    ws.onclose = () => {
      console.log("disconnected");
    };

    ws.onerror = (e) => {
      console.log("error", e);
    };

    socketRef.current = ws;

    return () => ws.close();
  }, []);

  const send = (value: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    send(value);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="type something..."
        style={{
          width: "90%",
          height: "90%",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          outline: "none",
          resize: "none",
          fontSize: "18px",
          fontFamily: "monospace",
          lineHeight: "1.5",
          padding: "20px",
        }}
      />
    </div>
  );
}

