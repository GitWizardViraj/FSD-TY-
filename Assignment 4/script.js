document.addEventListener("DOMContentLoaded", () => {
    // 1. Season Performance Chart (Bar chart for Wins vs Losses)
    const perfCanvas = document.getElementById('performanceChart');
    if (perfCanvas) {
        new Chart(perfCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
                datasets: [
                    {
                        label: 'Wins',
                        data: [11, 10, 6, 11, 4, 10],
                        backgroundColor: '#fdb913' // CSK Yellow
                    },
                    {
                        label: 'Losses',
                        data: [5, 7, 8, 5, 10, 4],
                        backgroundColor: '#f73859' // Red
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // 2. Runs Scored Trend (Line chart)
    const runsCanvas = document.getElementById('runsChart');
    if (runsCanvas) {
        new Chart(runsCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5', 'Match 6'],
                datasets: [{
                    label: 'Runs Scored',
                    data: [178, 205, 159, 212, 185, 226],
                    borderColor: '#0081e9', // CSK Blue
                    backgroundColor: 'rgba(0, 129, 233, 0.2)', // Light Blue fill
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1 // minimal curve
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        suggestedMin: 100
                    }
                }
            }
        });
    }
});
