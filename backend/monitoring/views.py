from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Avg, Count, Max, Min, Sum, Case, When, Value, F, FloatField
from .models import SensorData
from .serializers import SensorDataSerializer
from django.db.models.functions import TruncHour, Round
from django.db.models import Count, F, Value, FloatField

# Create your views here.
from rest_framework import viewsets
from .models import SensorData
from .serializers import SensorDataSerializer

class SensorDataViewSet(viewsets.ModelViewSet):
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer

    @action(detail=False, methods=['get'])
    def filter_and_aggregate_data(self, request):
        # get query parameter
        device_id = request.GET.get('device_id')

        # Filter queryset based on device_id
        queryset = self.get_queryset()
        if device_id:
            queryset = queryset.filter(device_id=device_id)

        # Agregate data
        aggregated_data = {}

        # Filter by device_id
        if device_id:
            filtered_data = queryset
        else:
            filtered_data = SensorData.objects.all()

        # Aggregate by device id
        device_aggregation = filtered_data.values('device_id').annotate(
            avg_co=Avg('co_level'),
            min_co=Min('co_level'),
            max_co=Max('co_level'),
            total_co=Sum('co_level'),
            avg_humidity=Avg('humidity'),
            min_humidity=Min('humidity'),
            max_humidity=Max('humidity'),
            total_humidity=Sum('humidity'),
            avg_temp=Avg('temperature'),
            min_temp=Min('temperature'),
            max_temp=Max('temperature'),
            total_temp=Sum('temperature'),
            avg_lpg=Avg('gas_leak_detected'),
            min_lpg=Min('gas_leak_detected'),
            max_lpg=Max('gas_leak_detected'),
            total_lpg=Sum('gas_leak_detected'),
            avg_smoke=Avg('smoke_detected'),
            min_smoke=Min('smoke_detected'),
            max_smoke=Max('smoke_detected'),
            total_smoke=Sum('smoke_detected')
        )

        for item in device_aggregation:
            for key, value in item.items():
                if isinstance(value, Round):
                    item[key] = float(value)

        aggregated_data['device_aggregation'] = list(device_aggregation)

        # Aggregation by TimeStamp (Hourly)
        hourly_aggregation = filtered_data.annotate(
            hour=TruncHour('timeStamp')
        ).values("hour").annotate(
            avg_co=Avg('co_level'),
            avg_humidity=Avg('humidity'),
            avg_temp=Avg('temperature'),
            avg_lpg=Avg('gas_leak_detected'),
            avg_smoke=Avg('smoke_detected'),
            light_on_percentage=Count(Case(When(light_intensity=True, then=Value(1))), output_field=FloatField()) / Count(F('light_intensity'), output_field=FloatField()) * 100
        )

        aggregated_data['hourly_aggregation'] = list(hourly_aggregation)
        # Aggregation by Sensor Reading
        sensor_aggregation = {
            'average_co': filtered_data.aggregate(avg_co=Avg('co_level'))['avg_co'],
            'min_co': filtered_data.aggregate(min_co=Min('co_level'))['min_co'],
            'max_co': filtered_data.aggregate(max_co=Max('co_level'))['max_co'],
            'total_co': filtered_data.aggregate(total_co=Sum('co_level'))['total_co'],
            'average_humidity': filtered_data.aggregate(avg_humidity=Avg('humidity'))['avg_humidity'],
            'min_humidity': filtered_data.aggregate(min_humidity=Min('humidity'))['min_humidity'],
            'max_humidity': filtered_data.aggregate(max_humidity=Max('humidity'))['max_humidity'],
            'total_humidity': filtered_data.aggregate(total_humidity=Sum('humidity'))['total_humidity'],
            'average_temp': filtered_data.aggregate(avg_temp=Avg('temperature'))['avg_temp'],
            'min_temp': filtered_data.aggregate(min_temp=Min('temperature'))['min_temp'],
            'max_temp': filtered_data.aggregate(max_temp=Max('temperature'))['max_temp'],
            'total_temp': filtered_data.aggregate(total_temp=Sum('temperature'))['total_temp'],
            'average_lpg': filtered_data.aggregate(avg_lpg=Avg('gas_leak_detected'))['avg_lpg'],
            'min_lpg': filtered_data.aggregate(min_lpg=Min('gas_leak_detected'))['min_lpg'],
            'max_lpg': filtered_data.aggregate(max_lpg=Max('gas_leak_detected'))['max_lpg'],
            'total_lpg': filtered_data.aggregate(total_lpg=Sum('gas_leak_detected'))['total_lpg'],
            'average_smoke': filtered_data.aggregate(avg_smoke=Avg('smoke_detected'))['avg_smoke'],
            'min_smoke': filtered_data.aggregate(min_smoke=Min('smoke_detected'))['min_smoke'],
            'max_smoke': filtered_data.aggregate(max_smoke=Max('smoke_detected'))['max_smoke'],
            'total_smoke': filtered_data.aggregate(total_smoke=Sum('smoke_detected'))['total_smoke']
            }

        aggregated_data['sensor_aggregation'] = sensor_aggregation

        # Serialize aggregated data
        return Response(aggregated_data)
    
    @action(detail=False, methods=['get'])
    def render_chart(self, request):
        return render(request, 'data-science.html')
