"""
WebSocket Real-Time Event Sync Engine for KSP-CopSight.
Broadcasting live incident updates, FIR filings, and AI agent executions across all connected clients.
"""

from typing import List, Dict, Any
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import json

router = APIRouter(prefix="/ws", tags=["Real-Time Synchronization"])


class ConnectionManager:
    """Manages active WebSocket client connections and broadcasts events."""

    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: Dict[str, Any]):
        """Broadcast JSON payload to all active client connections."""
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                pass


ws_manager = ConnectionManager()


@router.websocket("/live-feed")
async def websocket_live_feed(websocket: WebSocket):
    """
    WebSocket endpoint for real-time state synchronization.
    """
    await ws_manager.connect(websocket)
    try:
        # Send initial connected handshake
        await websocket.send_json({
            "event": "CONNECTED",
            "message": "Connected to Karnataka State Police Real-Time Intelligence Feed",
            "active_clients": len(ws_manager.active_connections)
        })
        while True:
            # Keep connection open and receive ping messages if any
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
    except Exception:
        ws_manager.disconnect(websocket)
