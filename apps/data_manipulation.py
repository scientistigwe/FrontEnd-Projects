import pandas as pd
import os
from flashtext import KeywordProcessor
import json

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
def main():
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

if __name__ == "__main__":
    main()