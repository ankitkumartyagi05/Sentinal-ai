import time
import random

def analyze_text(text: str) -> dict:
    start = time.time()
    
    # Simple heuristic to act as ML layer
    lower_text = text.lower()
    toxic_keywords = ["hate", "kill", "idiot", "dumb", "murder", "nsfw", "spam"]
    
    is_toxic = any(word in lower_text for word in toxic_keywords)
    confidence = round(random.uniform(0.85, 0.99), 4) if is_toxic else round(random.uniform(0.70, 0.95), 4)
    
    # Simulated HuggingFace pipeline latency
    time.sleep(random.uniform(0.1, 0.2))
    
    return {
        "is_flagged": is_toxic,
        "confidence": confidence,
        "categories": {
            "toxicity": confidence if is_toxic else 0.05,
            "threat": confidence - 0.2 if is_toxic else 0.01,
            "spam": random.uniform(0.01, 0.15),
            "sentiment": 1 - confidence if is_toxic else confidence
        },
        "processing_time_ms": int((time.time() - start) * 1000)
    }
