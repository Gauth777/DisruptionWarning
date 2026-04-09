"""
Weather API integration placeholder.

Future: connect to IMD, OpenWeatherMap, or custom weather data feeds
to get real-time cyclone, rainfall, and flood alerts.
"""


class WeatherAPIClient:
    """Placeholder client for weather data ingestion."""

    def __init__(self, api_key: str = "", base_url: str = ""):
        self.api_key = api_key
        self.base_url = base_url or "https://api.weather-provider.example.com"

    def get_active_alerts(self, region: str) -> list:
        """Fetch active weather alerts for a region. Returns demo data."""
        return [
            {
                "event_type": "cyclone",
                "location": "Bay of Bengal",
                "severity_raw": 4.2,
                "wind_speed_kmh": 120,
                "rainfall_mm": 250,
                "source": "demo",
            }
        ]

    def get_forecast(self, lat: float, lng: float, hours: int = 72) -> dict:
        """Fetch weather forecast. Returns demo data."""
        return {
            "temperature_c": 28,
            "humidity_pct": 85,
            "wind_speed_kmh": 45,
            "precipitation_mm": 120,
            "source": "demo",
        }
