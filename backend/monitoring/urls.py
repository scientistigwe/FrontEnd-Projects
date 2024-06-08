from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SensorDataViewSet

router = DefaultRouter()
router.register(r'sensor-data', SensorDataViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('sensors/', SensorDataViewSet.as_view({'get': 'list'})),
    path('chart/', SensorDataViewSet.as_view({'get': 'render_chart'})),
    path('api/sensors/filter_and_aggregate_data/', SensorDataViewSet.as_view({'get': 'filter_and_aggregate_data'})),
]
