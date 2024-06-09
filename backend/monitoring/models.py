from django.db import models

class SensorData(models.Model):
    serial_no = models.FloatField()
    site = models.CharField(max_length=255)
    site_code = models.CharField(max_length=50)
    timestamp = models.DateTimeField()
    co_level = models.FloatField()  # Carbon Monoxide
    nox_level = models.FloatField()  # Nitrogen Oxides
    no2_level = models.FloatField()  # Nitrogen Dioxide
    no_level = models.FloatField()  # Nitric Oxide
    o3_level = models.FloatField()  # Ozone
    so2_level = models.FloatField()  # Sulfur Dioxide
    pm10_level = models.FloatField()  # Particulate Matter <10 micrometers
    pm2_5_level = models.FloatField()  # Particulate Matter <2.5 micrometers
    v10_level = models.FloatField()  # Volatile Particulate Matter <10 micrometers
    v2_5_level = models.FloatField()  # Volatile Particulate Matter <2.5 micrometers
    nv10_level = models.FloatField()  # Non-Volatile Particulate Matter <10 micrometers
    nv2_5_level = models.FloatField()  # Non-Volatile Particulate Matter <2.5 micrometers
    wind_speed = models.FloatField()
    wind_direction = models.FloatField()
    air_temperature = models.FloatField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    site_type = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.site} - {self.timestamp}"
