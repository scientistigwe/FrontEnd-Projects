
        document.addEventListener("DOMContentLoaded", function() {
            var ctx = document.getElementById('trend-analysis-chart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["climate change", "peace", "hate", "healthcare", "artificial intelligence", "economy", "technology", "war crimes"],
                    datasets: [{
                        label: 'Keyword Frequency',
                        data: [2929, 1099, 1056, 431, 201, 2181, 1591, 152],
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
        