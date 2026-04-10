# Early Warning Supply Chain Predictor

A hackathon prototype that predicts how disruptions cascade through supply chains using a hierarchical impact tree model.


## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/regions` | GET | All regions with risk metrics |
| `/api/regions/{id}/alerts` | GET | Alerts for a specific region |
| `/api/alerts/{id}` | GET | Alert detail with impact tree |
| `/api/alerts/{id}/interventions` | GET | Ranked intervention strategies |
| `/api/simulate` | POST | Simulation placeholder |

## Project Structure

```
├── backend/
│   ├── main.py                    # FastAPI app entry
│   ├── data/mock_data.py          # All demo/mock data
│   ├── routers/
│   │   ├── regions.py             # Region endpoints
│   │   └── alerts.py              # Alert endpoints
│   ├── services/
│   │   ├── alert_service.py       # Alert data access
│   │   ├── tree_builder.py        # Impact tree construction
│   │   └── intervention_ranker.py # Strategy ranking
│   ├── ml/                        # ML integration slots
│   │   ├── strike_model.py        # Strike severity prediction
│   │   ├── weather_model.py       # Weather severity prediction
│   │   ├── tree_scoring.py        # Cascading score engine
│   │   └── simulator.py           # 72h projection engine
│   └── integrations/              # External API placeholders
│       ├── weather_api.py         # IMD / OpenWeatherMap
│       ├── news_api.py            # Strike/event detection
│       └── logistics_api.py       # Port/route status
│
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── page.tsx           # Region selection (home)
│       │   ├── region/[regionId]/ # Region alerts page
│       │   └── alert/[alertId]/   # Alert dashboard page
│       ├── components/
│       │   ├── Header.tsx
│       │   ├── KpiCard.tsx
│       │   ├── RegionCard.tsx
│       │   ├── AlertCard.tsx
│       │   ├── ImpactTree.tsx
│       │   ├── InterventionPanel.tsx
│       │   └── NodeImpactTable.tsx
│       └── lib/
│           ├── api.ts             # API client
│           ├── types.ts           # TypeScript types
│           └── utils.ts           # Utility functions
```

## ML Integration Points

| Module | Owner | Integration Point |
|---|---|---|
| `ml/strike_model.py` | Strike ML team | `services/tree_builder.py` |
| `ml/weather_model.py` | Weather ML team | `services/tree_builder.py` |
| `ml/tree_scoring.py` | Shared | `services/tree_builder.py` |
| `ml/simulator.py` | Shared | `POST /api/simulate` |

### Scoring Formula
```
Child Score = Parent Score × Dependency Weight × Vulnerability × (1 - Resilience)
```

## Team Workflow

- **Frontend + Backend**: Modify `data/mock_data.py` → services → routers
- **Strike ML**: Implement `ml/strike_model.py` → wire into `services/tree_builder.py`
- **Weather ML**: Implement `ml/weather_model.py` → wire into `services/tree_builder.py`
