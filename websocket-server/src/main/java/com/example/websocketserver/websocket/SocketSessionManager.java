package com.example.websocketserver.websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class SocketSessionManager {
  private final List<WebSocketSession> sessions = new ArrayList<>();

  public void addSession(WebSocketSession session) {
    sessions.add(session);
  }

  public void removeSession(WebSocketSession session) {
    sessions.remove(session);
  }

  public void broadcast(String message) throws IOException {
    for (WebSocketSession session : sessions) {
      if (session.isOpen()) {
        session.sendMessage(new TextMessage(message));
      }
    }
  }
}
