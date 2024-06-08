from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Avg, Count, Max, Min, Sum, Case, When, Value, F, FloatField
from .models import SensorData
from .serializers import SensorDataSerializer

# Create your views here.
from rest_framework import viewsets
from .models import SensorData
from .serializers import SensorDataSerializer

class SensorDataViewSet(viewsets.ModelViewSet):
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer

    @action(detail=False, methods=['get'])
    def filter_and_agregate_data(self, request):
        # get query parameter
        device_id = request.GET.get('device_id')

        # Filter queryset based on device_id
        queryset = self.get_queryset()
        if device_id:
            queryset = queryset.filter(device=device_id)

        # Agregate data
        aggregated_data = {}

        # Filter by device_id
        if device_id:
            filtered_data = queryset
        else:
            filtered_data = SensorData.objects.all()

        # Aggregate by device id
        device_aggregation = filtered_data.values('device').annotate(
            avg_co=Avg('co'),
            min_co=Min('co'),
            max_co=Max('co'),
            total_co=Sum('co'),
            avg_humidity=Avg('humidity'),
            min_humidity=Min('humidity'),
            max_humidity=Max('humidity'),
            total_humidity=Sum('humidity'),
            avg_temp=Avg('temp'),
            min_temp=Min('temp'),
            max_temp=Max('temp'),
            total_temp=Sum('temp'),
            avg_lpg=Avg('lpg'),
            min_lpg=Min('lpg'),
            max_lpg=Max('lpg'),
            total_lpg=Sum('lpg')
        )

        aggregated_data[device_aggregation] = list(device_aggregation)

        # Aggregation by TimeStamp (Hourly)
        hourly_aggregation = filtered_data.extra(
            {'hour': "DATE_FORMAT(timestamp, '%%Y-%%m-%%d %%H')"}
        ).values("hour").annotate(
                        avg_co=Avg('co'),
            avg_humidity=Avg('humidity'),
            avg_temp=Avg('temp'),
            avg_lpg=Avg('lpg'),
            light_on_percentage=Count(Case(When(light=True, then=Value(1))), output_field=FloatField()) / Count(F('light'), output_field=FloatField()) * 100
        )

        aggregated_data['hourly_aggregation'] = list(hourly_aggregation)
        # Aggregation by Sensor Reading
        sensor_aggregation = {
            'average_co': filtered_data.aggregate(avg_co=Avg('co'))['avg_co'],
            'min_co': filtered_data.aggregate(min_co=Min('co'))['min_co'],
            'max_co': filtered_data.aggregate(max_co=Max('co'))['max_co'],
            'total_co': filtered_data.aggregate(total_co=Sum('co'))['total_co'],
            'average_humidity': filtered_data.aggregate(avg_humidity=Avg('humidity'))['avg_humidity'],
            'min_humidity': filtered_data.aggregate(min_humidity=Min('humidity'))['min_humidity'],
            'max_humidity': filtered_data.aggregate(max_humidity=Max('humidity'))['max_humidity'],
            'total_humidity': filtered_data.aggregate(total_humidity=Sum('humidity'))['total_humidity'],
            'average_temp': filtered_data.aggregate(avg_temp=Avg('temp'))['avg_temp'],
            'min_temp': filtered_data.aggregate(min_temp=Min('temp'))['min_temp'],
            'max_temp': filtered_data.aggregate(max_temp=Max('temp'))['max_temp'],
            'total_temp': filtered_data.aggregate(total_temp=Sum('temp'))['total_temp'],
            'average_lpg': filtered_data.aggregate(avg_lpg=Avg('lpg'))['avg_lpg'],
            'min_lpg': filtered_data.aggregate(min_lpg=Min('lpg'))['min_lpg'],
            'max_lpg': filtered_data.aggregate(max_lpg=Max('lpg'))['max_lpg'],
            'total_lpg': filtered_data.aggregate(total_lpg=Sum('lpg'))['total_lpg']
        }

        aggregated_data['sensor_aggregation'] = sensor_aggregation

        # Serialize aggregated data
        return Response(aggregated_data)
    
    @action(detail=False, methods=['get'])
    def render_chart(self, request):
        return render(request, 'data-science.html')