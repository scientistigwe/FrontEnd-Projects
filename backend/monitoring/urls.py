from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SensorDataViewSet

router = DefaultRouter()
router.register(r'sensor-data', SensorDataViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('sensors/', SensorDataViewSet.as_view({'get': 'list'})),
    path('sensors/filter/', SensorDataViewSet.as_view({'get': 'filter_and_aggregate_data'})),

]
