import os
import sys
import django
import pytz

# Add project and backend directories to Python path
project_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
backend_directory = os.path.join(project_directory, 'backend')
sys.path.append(project_directory)
sys.path.append(backend_directory)

# Set up Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.air_quality_monitor.settings')
django.setup()

import pandas as pd
from monitoring.models import SensorData

def data_collection_and_preparation(file_path):
    """
    Read data from a CSV file into a pandas DataFrame, cleanse the data,
    and save it to the database.

    Args:
    file_path (str): The path to the CSV file.

    Returns:
    None
    """

    try:
        # Load data from CSV
        df = pd.read_csv(file_path)

        # Check for null values
        print("Checking for null values:")
        print(df.isnull().sum())
        print(df.info())

        # Drop rows with any missing values
        df.dropna(inplace=True)

        # Convert timestamp column to datetime format
        utc = pytz.UTC
        df['timestamp'] = pd.to_datetime(df['date'], dayfirst=True).apply(lambda x: utc.localize(x))

        # Remove duplicates
        df.drop_duplicates(inplace=True)
        

        # Save to database by iterating through the DataFrame and creating objects
        for _, row in df.iterrows():
            SensorData.objects.create(
                serial_no=row['id'],
                site=row['site'],
                site_code=row['code'],
                timestamp=row['timestamp'],  # Use the converted datetime column
                co_level=row['co'],
                nox_level=row['nox'],
                no2_level=row['no2'],
                no_level=row['no'],
                o3_level=row['o3'],
                so2_level=row['so2'],
                pm10_level=row['pm10'],
                pm2_5_level=row['pm2.5'],
                v10_level=row['v10'],
                v2_5_level=row['v2.5'],
                nv10_level=row['nv10'],
                nv2_5_level=row['nv2.5'],
                wind_speed=row['ws'],
                wind_direction=row['wd'],
                air_temperature=row['air_temp'],
                latitude=row['latitude'],
                longitude=row['longitude'],
                site_type=row['site_type']
            )
        print("Data successfully loaded into the database.")

    except pd.errors.EmptyDataError:
        print("No data found in the file.")
    except pd.errors.ParserError:
        print("Error parsing data.")
    except Exception as e:
        print(f"Encountered error during file reading or database operation: {e}")

def environment_monitoring_main():
    # Path to the CSV file
    file_path = "../dataset/data-science/aurn.csv"
    
    # Execute Data collection and preparation function
    data_collection_and_preparation(file_path)

if __name__ == "__main__":
    # Execute Environment Monitoring Function
    environment_monitoring_main()
