document.addEventListener('DOMContentLoaded', function() {
    let incomeData = [];
    let expenseData = [];
    let chart;

//     function updateChart() {
//         const ctx = document.getElementById('financeChart').getContext('2d');
        
//         const labels = [...new Set([...incomeData, ...expenseData].map(item => item.category))];
//         const incomeAmounts = labels.map(category => 
//             incomeData.filter(item => item.category === category).reduce((sum, item) => sum + item.amount, 0)
//         );
//         const expenseAmounts = labels.map(category => 
//             expenseData.filter(item => item.category === category).reduce((sum, item) => sum + item.amount, 0)
//         );

//         if (chart) {
//             chart.destroy();
//         }

//         chart = new Chart(ctx, {
//             type: 'bar',
//             data: {
//                 labels: labels,
//                 datasets: [
//                     {
//                         label: '收入',
//                         data: incomeAmounts,
//                         backgroundColor: 'rgba(75, 192, 192, 0.6)'
//                     },
//                     {
//                         label: '支出',
//                         data: expenseAmounts,
//                         backgroundColor: 'rgba(255, 99, 132, 0.6)'
//                     }
//                 ]
//             },
//             options: {
//                 responsive: true,
//                 scales: {
//                     y: {
//                         beginAtZero: true
//                     }
//                 }
//             }
//         });
//     }

  
  
//   // 初始化收入和支出數據
//   let incomeTotal = 0;
//   let expenseTotal = 0;
//   const financeData = {
//     labels: [],
//     datasets: [{
//       label: '收入',
//       backgroundColor: '#6BC48E',
//       data: []
//     }, {
//       label: '支出',
//       backgroundColor: '#EF6663',
//       data: []
//     }]
//   };

//   const financeOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       xAxes: [{
//         stacked: true,
//         ticks: {
//           callback: function (value, index) {
//             return financeData.labels[index];
//           }
//         }
//       }],
//       yAxes: [{
//         stacked: true,
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   };

//   const financeChart = new Chart(document.getElementById('financeChart'), {
//     type: 'bar',
//     data: financeData,
//     options: financeOptions
//   });

//     // 更新收入累計
//     incomeTotal += incomeAmount;

//     // 更新圖表數據
//     const dateLabel = incomeDate; // 這裡根據實際情況調整日期格式
//     if (!financeData.labels.includes(dateLabel)) {
//       financeData.labels.push(dateLabel);
//       financeData.datasets[0].data.push(incomeAmount);
//       financeData.datasets[1].data.push(0); // 支出初始為0
//     } else {
//       const index = financeData.labels.indexOf(dateLabel);
//       financeData.datasets[0].data[index] += incomeAmount;
//     }
//     updateChart();

//     // 更新支出累計
//     expenseTotal += expenseAmount;

//     // 更新圖表數據
//     const dateLabel = expenseDate; // 這裡根據實際情況調整日期格式
//     if (!financeData.labels.includes(dateLabel)) {
//       financeData.labels.push(dateLabel);
//       financeData.datasets[0].data.push(0); // 收入初始為0
//       financeData.datasets[1].data.push(expenseAmount);
//     } else {
//       const index = financeData.labels.indexOf(dateLabel);
//       financeData.datasets[1].data[index] += expenseAmount;
//     }
//     updateChart();
//   // 更新圖表數據函數
//   function updateChart() {
//     financeChart.data.labels = financeData.labels;
//     financeChart.data.datasets[0].data = financeData.datasets[0].data;
//     financeChart.data.datasets[1].data = financeData.datasets[1].data;
//     financeChart.update();
//   }
// });
  
    function updateChart() {
        const ctx = document.getElementById('financeChart').getContext('2d');

        const labels = [...new Set([...incomeData, ...expenseData].map(item => item.date))];
        const incomeAmounts = labels.map(date => 
            incomeData.filter(item => item.date === date).reduce((sum, item) => sum + item.amount, 0)
        );
        const expenseAmounts = labels.map(date => 
            expenseData.filter(item => item.date === date).reduce((sum, item) => sum + item.amount, 0)
        );

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '收入',
                        data: incomeAmounts,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)'
                    },
                    {
                        label: '支出',
                        data: expenseAmounts,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        
                    },
                    y: {
                  
                        beginAtZero: true
                    }
                }
            }
        });
    }
  
    function updateTables() {
        const incomeTableBody = document.querySelector('#incomeTable tbody');
        const expenseTableBody = document.querySelector('#expenseTable tbody');

        incomeTableBody.innerHTML = '';
        expenseTableBody.innerHTML = '';

        incomeData.forEach(income => {
            const row = incomeTableBody.insertRow();
            row.insertCell(0).textContent = income.customerName;
            row.insertCell(1).textContent = income.customerID;
            row.insertCell(2).textContent = income.amount.toFixed(2);
            row.insertCell(3).textContent = income.category;
            row.insertCell(4).textContent = income.date;
                row.insertCell(5).textContent = income.tax.toFixed(0);
            row.insertCell(6).textContent = income.sale.toFixed(0);
        });

        expenseData.forEach(expense => {
            const row = expenseTableBody.insertRow();
            row.insertCell(0).textContent = expense.vendorName;
            row.insertCell(1).textContent = expense.vendorID;
            row.insertCell(2).textContent = expense.amount.toFixed(2);
            row.insertCell(3).textContent = expense.category;
            row.insertCell(4).textContent = expense.date;
            row.insertCell(5).textContent = expense.tax.toFixed(0);
            row.insertCell(6).textContent = expense.sale.toFixed(0);
        });
    }

    function updateAll() {
        updateChart();
        updateTables();
    }

  function calculateTaxAndSale(amount) {
        const tax = Math.round(amount/1.05*0.05);
        const sale = Math.round(amount/1.05);
        return { tax, sale };}
          
  
   function handleIncomeAmountInput() {
        const amount = parseFloat(document.getElementById('incomeAmount').value);
        if (!isNaN(amount)) {
               const { tax, sale } = calculateTaxAndSale(amount);
            document.getElementById('incomeTax').value = tax;
            document.getElementById('incomeSale').value = sale;
        }}
           function handleExpenseAmountInput() {
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        if (!isNaN(amount)) {
            const { tax, sale } = calculateTaxAndSale(amount);
            document.getElementById('expenseTax').value = tax;
            document.getElementById('expenseSale').value = sale;
        }}


    function addIncome(e) {
        e.preventDefault();
             const amount = parseFloat(document.getElementById('incomeAmount').value);

        const newIncome = {
            customerName: document.getElementById('customerName').value,
            customerID: document.getElementById('customerID').value,
            amount: parseFloat(document.getElementById('incomeAmount').value),
            category: document.getElementById('incomeCategory').value,
            date: document.getElementById('incomeDate').value, // 使用用戶輸入的日期
                   tax: Math.round(amount/1.05*0.05),
           sale: Math.round(amount/1.05)
        };
        incomeData.push(newIncome);
        updateAll();
        this.reset();
        console.log('收入已記錄:', newIncome);
        alert('收入已記錄！');
              const today = new Date().toISOString().split('T')[0];
        document.getElementById('incomeDate').value = today;
    }

    function addExpense(e) {
        e.preventDefault();
             const amount = parseFloat(document.getElementById('expenseAmount').value);

        const newExpense = {
            vendorName: document.getElementById('vendorName').value,
            vendorID: document.getElementById('vendorID').value,
            amount: parseFloat(document.getElementById('expenseAmount').value),
            category: document.getElementById('expenseCategory').value,
            date: document.getElementById('expenseDate').value, // 使用用戶輸入的日期
                   tax: Math.round(amount/1.05*0.05),
           sale: Math.round(amount/1.05)
        };
        expenseData.push(newExpense);
        updateAll();
        this.reset();
        console.log('支出已記錄:', newExpense);
        alert('支出已記錄！');
      const today = new Date().toISOString().split('T')[0];
    document.getElementById('expenseDate').value = today;
    }

  
  const today = new Date().toISOString().split('T')[0];
    document.getElementById('incomeDate').value = today;
    document.getElementById('expenseDate').value = today;
  
  
   document.getElementById('incomeAmount').addEventListener('input', handleIncomeAmountInput);
   document.getElementById('expenseAmount').addEventListener('input', handleExpenseAmountInput);
  
    document.getElementById('incomeForm').addEventListener('submit', addIncome);
    document.getElementById('expenseForm').addEventListener('submit', addExpense);

    // 初始化
    updateAll();
});
