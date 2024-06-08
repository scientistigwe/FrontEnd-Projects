import os
import sys
import django

# Add project and backend directories to Python path
project_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
backend_directory = os.path.join(project_directory, 'backend')
sys.path.append(project_directory)
sys.path.append(backend_directory)

# Set up Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.air_quality_monitor.settings')
django.setup()

import pandas as pd
from datetime import datetime
from monitoring.models import SensorData

def data_collection_and_preparation(file_path):
    """
    Read data from a CSV file into a pandas DataFrame.
    
    Args:
    file_path (str): The path to the CSV file.
    df (pandas.DataFrame): The DataFrame containing the data.
    
    Returns:
    pandas.DataFrame: The cleansed DataFrame.
    """
    # Initialize dataframe
    df = None
    try:
        df = pd.read_csv(file_path)

        if df is not None:
            # Check for null values
            print("Checking for null values:")
            print(df.isnull().sum())
            
            # Drop rows with any missing values
            df.dropna(inplace=True)
            
            # Convert timestamp column to datetime format
            df['timestamp'] = pd.to_datetime(df['ts'], unit='s')

            
            # Remove duplicates
            df.drop_duplicates(inplace=True)

    except Exception as e:
        print(f"Encountered error during file reading: {e   }")

    # Save to database
    for _, row in df.iterrows():
        SensorData.objects.create(
            timeStamp=row['timestamp'],
            device_id=row['device'],
            temperature=row['temp'],
            humidity=row['humidity'],
            light_intensity=row['light'],
            motion_presence=row['motion'],
            smoke_detected=row['smoke'],
            gas_leak_detected=row['lpg']
        )


def environment_monitoring_main():
   # Path to the CSV file
    file_path = "../../dataset/enviroment-monitoring-dataset.csv"
    
    # Execute Data collection and preparation function
    data_collection_and_preparation(file_path)


if __name__ == "__main__":
    # Execute Environment Monitoring Function
    environment_monitoring_main()

