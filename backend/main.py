from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import regions, alerts

app = FastAPI(
    title="Early Warning Supply Chain Predictor",
    version="0.1.0",
    description="Hierarchical cascading impact predictor for supply chain disruptions",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://disruption-warning.vercel.app/",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(regions.router)
app.include_router(alerts.router)


@app.get("/")
def root():
    return {"status": "ok", "app": "Early Warning Supply Chain Predictor"}


@app.post("/api/simulate")
def simulate(payload: dict = None):
    """Placeholder simulation endpoint — future ML integration point."""
    return {
        "status": "simulation_placeholder",
        "message": "Simulation engine not yet connected. See ml/simulator.py",
        "input_received": payload,
    }
