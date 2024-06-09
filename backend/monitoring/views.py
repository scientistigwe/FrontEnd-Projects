import pandas as pd
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import grangercausalitytests
from django.db.models import Avg, Min, Max, Sum, Count
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import render
from .models import SensorData
from .serializers import SensorDataSerializer
import numpy as np

class SensorDataViewSet(viewsets.ModelViewSet):
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer

    @staticmethod
    def aggregate_site_data(queryset):
        return queryset.values('site').annotate(
            co_agg=Avg('co_level'), min_co=Min('co_level'), max_co=Max('co_level'), total_co=Sum('co_level'),
            nox_agg=Avg('nox_level'), min_nox=Min('nox_level'), max_nox=Max('nox_level'), total_nox=Sum('nox_level'),
            no2_agg=Avg('no2_level'), min_no2=Min('no2_level'), max_no2=Max('no2_level'), total_no2=Sum('no2_level'),
            no_agg=Avg('no_level'), min_no=Min('no_level'), max_no=Max('no_level'), total_no=Sum('no_level'),
            o3_agg=Avg('o3_level'), min_o3=Min('o3_level'), max_o3=Max('o3_level'), total_o3=Sum('o3_level'),
            so2_agg=Avg('so2_level'), min_so2=Min('so2_level'), max_so2=Max('so2_level'), total_so2=Sum('so2_level'),
            pm10_agg=Avg('pm10_level'), min_pm10=Min('pm10_level'), max_pm10=Max('pm10_level'), total_pm10=Sum('pm10_level'),
            pm25_agg=Avg('pm2_5_level'), min_pm25=Min('pm2_5_level'), max_pm25=Max('pm2_5_level'), total_pm25=Sum('pm2_5_level'),
            v10_agg=Avg('v10_level'), min_v10=Min('v10_level'), max_v10=Max('v10_level'), total_v10=Sum('v10_level'),
            v25_agg=Avg('v2_5_level'), min_v25=Min('v2_5_level'), max_v25=Max('v2_5_level'), total_v25=Sum('v2_5_level'),
            nv10_agg=Avg('nv10_level'), min_nv10=Min('nv10_level'), max_nv10=Max('nv10_level'), total_nv10=Sum('nv10_level'),
            nv25_agg=Avg('nv2_5_level'), min_nv25=Min('nv2_5_level'), max_nv25=Max('nv2_5_level'), total_nv25=Sum('nv2_5_level'),
            wind_speed_agg=Avg('wind_speed'), min_wind_speed=Min('wind_speed'), max_wind_speed=Max('wind_speed'), total_wind_speed=Sum('wind_speed'),
            wind_dir_agg=Avg('wind_direction'), air_temp_agg=Avg('air_temperature'), min_air_temp=Min('air_temperature'), max_air_temp=Max('air_temperature'),
            lat_agg=Avg('latitude'), lon_agg=Avg('longitude'), count=Count('id')
        )

    @action(detail=False, methods=['get'])
    def filter_and_aggregate_data(self, request):
        site = request.GET.get('site')
        queryset = self.queryset.filter(site=site) if site else self.queryset
        site_data = list(self.aggregate_site_data(queryset))

        # Convert queryset to list of dictionaries
        site_data = list(site_data)

        if not site_data:
            return Response({'error': 'No data found for the given site'}, status=404)

        # Prepare data for plotting
        data_for_plotting = {}
        for site_entry in site_data:
            sensor_df = pd.DataFrame(list(queryset.filter(site=site_entry['site']).values())).drop(columns=['serial_no', 'site', 'site_code', 'site_type'])

            # Autocorrelation analysis
            co_autocorr = sensor_df['co_level'].autocorr()

            # Add data for each site
            data_for_plotting[site_entry['site']] = {'co_autocorr': co_autocorr}

            # Calculate other statistics as needed

        return Response({'site_data': site_data, 'data_for_plotting': data_for_plotting})

    @action(detail=False, methods=['get'])
    def render_chart(self, request):
        return render(request, 'data-science.html')
