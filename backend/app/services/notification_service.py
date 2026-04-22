from ..core.websocket import manager

async def notify_users(message: dict):
    await manager.broadcast(message)
