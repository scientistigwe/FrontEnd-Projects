import pandas as pd
import os
from flashtext import KeywordProcessor
import json
from hdfs import InsecureClient
from pyspark.sql import SparkSession

# Load articles
def load_articles_from_directory(directory):
    articles = []
    for filename in os.listdir(directory):
        if filename.endswith('.csv'):
            df = pd.read_csv(os.path.join(directory, filename), low_memory=False)
            articles.extend(df.to_dict('records'))
    return articles

# Create Keyword Processor
def build_keyword_processor(keywords):
    keyword_processor = KeywordProcessor(case_sensitive=False)
    for keyword in keywords:
        keyword_processor.add_keyword(keyword)
    return keyword_processor

# Search Articles
def search_articles(keyword_processor, articles):
    results = {keyword.lower(): [] for keyword in keyword_processor.get_all_keywords()}
    for idx, article in enumerate(articles):
        text = article.get('Article text', '')
        text = str(text) if not pd.isna(text) else ''
        if text:
            matches = keyword_processor.extract_keywords(text, span_info=True)
            for match in matches:
                keyword, start_idx, end_idx = match
                results[keyword.lower()].append((start_idx, end_idx, idx, text))
    return results

# Generate Report
def generate_report(results, articles):
    report_data = []
    keywords = []
    frequencies = []

    # Collect data for the report
    for keyword, occurrences in results.items():
        keywords.append(keyword)
        frequencies.append(len(occurrences))
        for start_idx, end_idx, article_index, article_text in occurrences[:3]:  # Only first 3 occurrences
            context = article_text[max(0, start_idx-30):min(len(article_text), end_idx+30)]
            article = articles[article_index]
            report_data.append({
                'Keyword': keyword,
                'Frequency': len(occurrences),
                'Article': article['Headline'],
                'Context': context,
                'Link': article.get('Url', 'N/A')
            })

    # Convert report data to DataFrame
    report_df = pd.DataFrame(report_data)

    return report_df, keywords, frequencies

# Write JavaScript code to file
def write_js_file(keywords, frequencies, file_path):
    with open(file_path, 'w') as js_file:
        js_file.write("""
        document.addEventListener("DOMContentLoaded", function() {
            var ctx = document.getElementById('trend-analysis-chart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: %s,
                    datasets: [{
                        label: 'Keyword Frequency',
                        data: %s,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
                      
        });
        """ % (json.dumps(keywords), json.dumps(frequencies)))

# Main Function
def article_main():
    # Step 1: Load articles from the directory
    directory = './dataset/CNN-Articles/'
    articles = load_articles_from_directory(directory)

    # Step 2: Define the keywords
    keywords = [
        "climate change", 
        "Peace", 
        "Hate", 
        "artificial intelligence", 
        "economy",
        "technology",
        "healthcare",
        "war crimes"
    ]

    # Step 3: Build the Keyword Processor
    keyword_processor = build_keyword_processor(keywords)
    
    # Step 4: Search the articles and record occurrences
    results = search_articles(keyword_processor, articles)
    
    # Step 5: Generate the report
    report_df, keywords, frequencies = generate_report(results, articles)

    print(report_df.head())

    # Write the JavaScript code to a file
    js_file_path = './scripts/python-auto-js-code.js'
    write_js_file(keywords, frequencies, js_file_path)


"""
FILE I/O WITH HADOOP DISTRIBUTED SYSTEM TASK
1. DATA INGESTION INTO HADOOP
"""
def file_exists_in_hdfs(hdfs_file_path):
    """
    Check if a file exists in HDFS.

    :param hdfs_file_path: The full path of the file in HDFS.
    :return: True if the file exists, False otherwise.
    """
    try:
        status = client.status(hdfs_file_path, strict=False)
        return status is not None and status['type'] == 'FILE'
    except Exception as e:
        print(f"Error checking if file exists in HDFS: {e}")
        return False

def upload_to_hdfs(local_file_path, hdfs_file_path):
    """
    Upload a file to HDFS if it does not already exist.

    :param local_file_path: The local path of the file to upload.
    :param hdfs_file_path: The destination path in HDFS.
    """
    if not file_exists_in_hdfs(hdfs_file_path):
        with open(local_file_path, "rb") as local_file:
            client.write(hdfs_file_path, local_file, overwrite=True)

def ingest_store_data():
    """
    Ingest store data from a local directory to HDFS.
    """
    for file in os.listdir(LOCAL_DATA_DIR):
        local_file_path = os.path.join(LOCAL_DATA_DIR, file)
        # Determine the HDFS subdirectory based on the file name
        if "sales" in file.lower():
            hdfs_subdir = "sales"
        elif "store" in file.lower():
            hdfs_subdir = "store"
        else:
            hdfs_subdir = "others"  # Optional: handle files that do not match 'sales' or 'store'

        # Maintain the directory structure in HDFS
        hdfs_file_path = os.path.join(HDFS_DATA_DIR, hdfs_subdir, file)
        print(f"Uploading {local_file_path} to {hdfs_file_path}")
        upload_to_hdfs(local_file_path, hdfs_file_path)
        print(f"file upload successful")

def hadoop_main():
    """
    Main function to process and upload files from the local dataset directory.
    """
    ingest_store_data()

"""
2. DATA PROCESSING WITH SPARK
"""
from pyspark.sql import SparkSession

def process_data():
    # Initialize spark session
    spark = SparkSession.builder \
                        .appName("DataProcessing") \
                        .config("spark.hadoop.fs.defaultFS", "hdfs://localhost:9000") \
                        .getOrCreate()

    # Set logging level
    spark.sparkContext.setLogLevel("WARN")

    # HDFS path to the file
    hdfs_path = "hdfs://localhost:9000/dataset/store/rossmann-store-2.csv"
    print(f"Reading data from HDFS path: {hdfs_path}")

    try:
        # List directory contents to verify the file's existence
        files = spark.sparkContext._gateway.jvm.org.apache.hadoop.fs.FileSystem \
                 .get(spark._jsc.hadoopConfiguration()) \
                 .listStatus(spark._jvm.org.apache.hadoop.fs.Path("/"))
        
        for file in files:
            print(file.getPath())

        # Read CSV file from HDFS
        df = spark.read.format("csv").option("header", "true").load(hdfs_path)
        # Show first few rows of the DataFrame
        df.show()
    except Exception as e:
        print(f"Error during file reading from HDFS: {e}")
    
    # Stop the session
    spark.stop()




if __name__ == "__main__":
    # Configuration
    HDFS_URL = "http://localhost:50070"
    HDFS_USER = "hdfs"
    LOCAL_DATA_DIR = r"C:\Users\admin\Desktop\on-going-projects\Full-Stack-Dev.-Challenge\dataset\file-input-output-data"
    HDFS_DATA_DIR = "/dataset"

    # Initialize HDFS Client
    client = InsecureClient(HDFS_URL, user=HDFS_USER)

    #Execute article_main function
    #article_main()

    #Execute hadoop_main function
    #hadoop_main()

    # Execute process_data function with corrected arguments
    process_data()    

