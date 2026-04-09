"""
News/Events API integration placeholder.

Future: connect to news aggregators, Google Alerts, or social feeds
to detect strikes, protests, and disruption events in real time.
"""


class NewsAPIClient:
    """Placeholder client for strike/event news ingestion."""

    def __init__(self, api_key: str = "", base_url: str = ""):
        self.api_key = api_key
        self.base_url = base_url or "https://api.news-provider.example.com"

    def get_disruption_events(self, region: str, event_type: str = "strike") -> list:
        """Fetch disruption events. Returns demo data."""
        return [
            {
                "headline": "Logistics workers announce strike in Hyderabad",
                "location": "Hyderabad",
                "event_type": "strike",
                "confidence": 0.91,
                "source": "demo",
            }
        ]

    def get_trending_risks(self, region: str) -> list:
        """Fetch trending risk signals. Returns demo data."""
        return [
            {"topic": "logistics_strike", "trend_score": 0.85, "source": "demo"}
        ]
