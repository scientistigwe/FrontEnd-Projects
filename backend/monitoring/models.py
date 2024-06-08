from django.db import models

# Create your models here.
class SensorData(models.Model):
    timeStamp = models.DateTimeField(auto_now_add=True)
    device_id = models.TextField()
    co_level = models.FloatField()
    temperature = models.FloatField()
    humidity = models.FloatField()
    light_intensity = models.BooleanField()
    motion_presence = models.BooleanField()
    smoke_detected = models.FloatField()
    gas_leak_detected = models.FloatField()

