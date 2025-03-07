document.addEventListener("DOMContentLoaded", function () {
    let ctx = document.getElementById('goalChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Mua nhà", "Nội thất", "Xe", "Kỳ nghỉ", "Học"],
            datasets: [{
                data: [40, 20, 30, 50, 60],
                backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"],
                borderWidth: 1
            }]
        },
        options: {
            cutout: '70%',
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".close-btn").addEventListener("click", function () {
        document.querySelector(".modal").style.display = "none";
        
    });
});

