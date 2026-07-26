import React, { createContext, useContext, useEffect, useState } from 'react';
import { Incident } from '../types';

interface WebSocketContextType {
  isConnected: boolean;
  latestEvent: { event: string; data?: any } | null;
  liveIncidents: Incident[];
  setLiveIncidents: React.Dispatch<React.SetStateAction<Incident[]>>;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [latestEvent, setLatestEvent] = useState<{ event: string; data?: any } | null>(null);
  const [liveIncidents, setLiveIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    let socket: WebSocket | null = null;

    const connectWS = () => {
      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${wsProtocol}//${window.location.hostname}:8000/api/v1/ws/live-feed`;

      socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        setIsConnected(true);
        console.log("Connected to KSP-CopSight WebSocket Live Sync Engine");
      };

      socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          setLatestEvent(payload);

          if (payload.event === 'INCIDENT_CREATED' && payload.data) {
            setLiveIncidents((prev) => [payload.data as Incident, ...prev]);
          }
        } catch (err) {
          console.error("Failed to parse WebSocket message:", err);
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        // Auto-reconnect after 3s
        setTimeout(connectWS, 3000);
      };

      socket.onerror = () => {
        setIsConnected(false);
      };
    };

    connectWS();

    return () => {
      if (socket) socket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ isConnected, latestEvent, liveIncidents, setLiveIncidents }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
