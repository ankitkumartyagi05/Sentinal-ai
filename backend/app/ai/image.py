import time
import random

def analyze_image(file_bytes: bytes) -> dict:
    start = time.time()
    
    # Mock OpenCV / TensorFlow pipeline latency
    time.sleep(random.uniform(0.15, 0.35))
    
    is_nsfw = random.random() > 0.8
    confidence = round(random.uniform(0.80, 0.99), 4)
    
    return {
        "is_flagged": is_nsfw,
        "confidence": confidence,
        "categories": {
            "nsfw": confidence if is_nsfw else 1 - confidence,
            "violence": confidence - 0.1 if is_nsfw else 1 - confidence,
        },
        "processing_time_ms": int((time.time() - start) * 1000)
    }
