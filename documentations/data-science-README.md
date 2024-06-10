Distributed Data Visualization Framework
Table of Contents
Introduction
Data Collection
Data Cleansing
Data Analysis
REST API for Data Access
Frontend Development
Data Visualization
Introduction
This project aims to create a distributed data visualization framework that collects, processes, analyzes, and visualizes environmental data from various sites. The framework is designed to be modular and scalable, leveraging Python for data collection and cleansing, Django for data analysis and API creation, and JavaScript along with Chart.js for frontend data visualization.

Data Collection
Overview
Data collection is the first phase where environmental data from various sensors is gathered.

Tools and Technologies
Python: Used for scripting and automation.
APIs: Data is fetched from external sources through API calls.
Steps
API Integration: Python scripts are used to call external APIs to collect environmental data.
Data Storage: The collected data is stored in a structured format (e.g., JSON, CSV) for further processing.
Data Cleansing
Overview
Data cleansing ensures that the collected data is accurate, consistent, and usable for analysis.

Tools and Technologies
Python: Utilized for data processing and cleansing tasks.
Pandas: A powerful data manipulation library in Python.
Steps
Loading Data: Data is loaded into Python using Pandas.
Cleaning Process: This includes handling missing values, removing duplicates, and correcting data formats.
Saving Cleaned Data: The cleansed data is saved for analysis.
Data Analysis
Overview
Data analysis involves processing the cleaned data to generate meaningful insights.

Tools and Technologies
Django: A high-level Python web framework.
Pandas: For data manipulation and analysis.
Numpy: For numerical operations.
Steps
Data Aggregation: Using Django models and views to aggregate data.
Statistical Analysis: Applying statistical methods to analyze trends and patterns in the data.
Storing Results: The analysis results are stored in a database for easy access.
REST API for Data Access
Overview
The REST API serves as an interface for accessing the analyzed data.

Tools and Technologies
Django REST Framework (DRF): A powerful toolkit for building Web APIs.
Steps
API Development: Creating endpoints in DRF to serve the analyzed data.
Serialization: Using serializers to convert complex data types into JSON.
Testing: Ensuring the API endpoints are functional and secure.
Frontend Development
Overview
Frontend development focuses on creating an interactive interface to display the data.

Tools and Technologies
HTML/CSS: For structuring and styling the web pages.
JavaScript: For dynamic content fetching and user interaction.
Steps
HTML Templates: Creating HTML templates to display data.
CSS Styling: Applying CSS to enhance the visual appeal.
JavaScript Integration: Using JavaScript to fetch data from the API and update the HTML content dynamically.
Data Visualization
Overview
Data visualization converts data into graphical representations for better understanding and insights.

Tools and Technologies
Chart.js: A JavaScript library for creating charts.
Steps
Fetching Data: Using JavaScript to fetch data from the REST API.
Creating Charts: Using Chart.js to create various types of charts (e.g., bar, line, scatter).
Updating Charts: Dynamically updating charts based on user interactions.
By following this modular approach, the framework ensures a seamless flow from data collection to visualization, providing a comprehensive solution for environmental data analysis and presentation.

Columns of interest:
site: Name of the monitoring site. Helps in comparing data across different locations.
code: Code associated with the monitoring site. Can be used for quick identification and filtering.
date: Date and time of the recorded measurement. Essential for time-series analysis and trend identification.
co: Carbon monoxide level. Indicates air quality and potential health risks related to CO exposure.
nox: Nitrogen oxides level. Key for understanding pollution sources, particularly vehicle emissions.
no2: Nitrogen dioxide level. Critical for assessing urban air quality and related health impacts.
no: Nitric oxide level. Helps in understanding the contribution of traffic emissions.
o3: Ozone level. Important for evaluating smog formation and its effects on respiratory health.
so2: Sulfur dioxide level. Used to assess industrial pollution and potential acid rain.
pm10: Particulate matter <10 micrometers. Indicates air quality and potential respiratory health risks.
pm2.5: Particulate matter <2.5 micrometers. More critical than PM10 due to its ability to penetrate deep into the lungs.
v10: Volatile organic compounds <10 micrometers. Relevant for understanding indoor and outdoor air pollution sources.
v2.5: Volatile organic compounds <2.5 micrometers. Important for assessing finer particulate pollution.
nv10: Non-volatile organic compounds <10 micrometers. Useful for detailed air quality studies.
nv2.5: Non-volatile organic compounds <2.5 micrometers. Provides deeper insight into particulate matter composition.
ws: Wind speed. Helps in understanding pollutant dispersion patterns.
wd: Wind direction. Used alongside wind speed to assess pollution transport.
air_temp: Air temperature. Important for studying the effects of temperature on air pollution.
latitude: Geographic coordinate. Indicates the specific location of the monitoring site.
longitude: Geographic coordinate. Complements latitude for precise site location.

Summary of findings:
Air Quality:

Highest Pollution: London Marylebone Road exhibits the highest levels of pollutants, particularly NOx, NO2, and CO, indicating significant air quality concerns. For example, the total CO emission in London Marylebone Road is 17,085.42 kg, significantly higher than other sites.
Moderate Pollution: Belfast Centre, Cardiff Centre, Leeds Centre, and Port Talbot Margam show moderate levels of pollutants, albeit with variations in specific pollutants. For instance, NOx emissions in Belfast Centre total 2,808,412.25 kg.
Relatively Lower Pollution: Edinburgh St Leonards and London N. Kensington have comparatively lower pollution levels. For example, the total NO2 emission in Edinburgh St Leonards is 390,849.67 kg.
Pollution Source:

Persistent Sources: Sites with high autocorrelation in CO levels suggest the presence of persistent pollution sources. For example, Belfast Centre, with a CO autocorrelation of 0.8507, indicates consistent pollution sources.
Urban vs. Industrial: While urban sites like Belfast Centre, Cardiff Centre, and Leeds Centre exhibit pollution from vehicular emissions, industrial sites like Port Talbot Margam also show significant contributions from industrial activities. The total SO2 emission in Port Talbot Margam is 115,847.34 kg, reflecting industrial influence.
Temporal Trend:

Consistent Pollution: High autocorrelation in CO levels across several sites indicates consistent pollution levels over time. For example, London N. Kensington has a CO autocorrelation of 0.9478, suggesting persistent pollution.
Seasonal Variations: Temporal analysis can reveal seasonal variations in pollution levels. For instance, the variation in PM10 and PM2.5 levels across seasons can indicate the influence of factors like weather patterns and human activities.
Spatial Analysis:

Local vs. Regional Impact: Identifying pollution hotspots and their spatial distribution is crucial. For instance, PM10 levels in London Marylebone Road may have a local impact due to traffic emissions, while industrial emissions in Port Talbot Margam may affect wider regions.
Hotspots: Identifying specific areas with consistently high pollution levels, such as traffic intersections or industrial zones, helps prioritize intervention strategies.
Environmental Impact:

Public Health Concerns: High levels of pollutants pose significant health risks. For instance, NO2 emissions, known for their adverse health effects, are substantial in several sites.
Ecosystem Effects: Pollution can have detrimental effects on ecosystems. For example, high SO2 emissions in industrial areas like Port Talbot Margam can lead to acid rain and soil contamination, affecting local ecosystems.
Integrating such data-driven insights enables policymakers and environmental agencies to formulate targeted interventions and regulations to mitigate pollution sources and minimize their environmental and public health impacts.
