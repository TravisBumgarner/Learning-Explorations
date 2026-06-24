import os
import httpx
from fastapi import FastAPI, Request
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

FRONT_API_TOKEN = os.getenv("FRONT_API_TOKEN")
FRONT_AUTHOR_ID = os.getenv("FRONT_AUTHOR_ID")
PONG_SENDER = "travis.bumgarner@threeinsurance.com"
FRONT_API = "https://api2.frontapp.com"


@app.post("/webhook")
async def handle_webhook(request: Request):
    data = await request.json()

    payload = data.get("payload", {})
    sender = payload.get("from", {}).get("handle", "")
    conversation_id = payload.get("conversation", {}).get("id")

    if sender.lower() != PONG_SENDER or not conversation_id:
        return {"status": "ignored"}

    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{FRONT_API}/conversations/{conversation_id}/messages",
            headers={"Authorization": f"Bearer {FRONT_API_TOKEN}"},
            json={
                "author_id": FRONT_AUTHOR_ID,
                "body": "pong",
                "options": {"archive": False},
            },
        )
        resp.raise_for_status()

    return {"status": "pong sent"}
