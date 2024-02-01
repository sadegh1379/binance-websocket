"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext();
const WSSUrl = process.env.NEXT_PUBLIC_BINANCE_WSS_URL;

const WebSocketProvider = ({ children }) => {
  const [socketData, setSocketData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket(WSSUrl);

    const handleWebSocketMessage = (event) => {
      if (event.data) {
        setSocketData(JSON.parse(event.data));
        setLoading(false);
      }
    };

    ws.addEventListener('message', handleWebSocketMessage);

    const subscribeMessage = JSON.stringify({
      method: 'SUBSCRIBE',
      params: ['!ticker@arr'],
      id: 1,
    });

    ws.addEventListener('open', () => {
      ws.send(subscribeMessage);
    });

    return () => {
      const unsubscribeMessage = JSON.stringify({
        method: 'UNSUBSCRIBE',
        params: ['!ticker@arr'],
        id: 1,
      });
      ws.addEventListener('open', () => {
        ws.send(unsubscribeMessage);
      });
      ws.removeEventListener('message', handleWebSocketMessage);
      ws.close();
    };
  }, []);

  const value = {
    socketData,
    loading,
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};

const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export { WebSocketProvider, useWebSocket };
