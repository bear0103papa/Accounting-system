document.addEventListener('DOMContentLoaded', function() {
    let incomeData = [];
    let expenseData = [];
    let chart;
  
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
        // e.preventDefault();
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
        // e.preventDefault();
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
