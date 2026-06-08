package com.example.websocketserver.websocket;

import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@RequiredArgsConstructor
public class TextSocketHandler extends TextWebSocketHandler {
  private final SocketSessionManager manager;

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    manager.addSession(session);
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
    manager.removeSession(session);
  }

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message)
      throws IOException {
    manager.broadcast(message.getPayload());
  }
}
