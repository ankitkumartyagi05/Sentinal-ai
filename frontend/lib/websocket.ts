import { useState, useEffect, useCallback, useRef } from 'react';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/api/v1/ws/dashboard';

export function useWebsocket() {
    const [messages, setMessages] = useState<any[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef<WebSocket | null>(null);

    const connect = useCallback(() => {
        if (ws.current?.readyState === WebSocket.OPEN) return;

        ws.current = new WebSocket(WS_URL);

        ws.current.onopen = () => {
            console.log('Connected to SentinelAI Stream');
            setIsConnected(true);
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prev) => [data, ...prev].slice(0, 50));
        };

        ws.current.onclose = () => {
            console.log('Disconnected from SentinelAI Stream');
            setIsConnected(false);
            // Reconnect after 3 seconds
            setTimeout(connect, 3000);
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket Error:', error);
            ws.current?.close();
        };
    }, []);

    useEffect(() => {
        connect();
        return () => {
            ws.current?.close();
        };
    }, [connect]);

    return { messages, isConnected };
}
