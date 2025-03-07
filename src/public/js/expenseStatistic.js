function toggleSection(activeSection) {
    const sections = {
        income: {
            activeBtn: 'income-btn',
            inactiveBtn: 'expense-btn',
            activeSection: 'income-section',
            inactiveSection: 'expense-section'
        },
        expense: {
            activeBtn: 'expense-btn',
            inactiveBtn: 'income-btn',
            activeSection: 'expense-section',
            inactiveSection: 'income-section'
        },
        week_based:{
            activeSection: 'week-section',
            inactiveSection: 'month-section',
        },
        month_based:{
            activeSection: 'month-section',
            inactiveSection: 'week-section',
        },
    };

    const config = sections[activeSection];

    
    if (config.activeBtn && config.inactiveBtn) {
        document.getElementById(config.activeBtn).classList.add('is-active');
        document.getElementById(config.inactiveBtn).classList.remove('is-active');
    }
    document.getElementById(config.activeSection).classList.remove('is-hidden');
    document.getElementById(config.inactiveSection).classList.add('is-hidden');
}

// document.getElementById('chart-type-select').addEventListener('change', function() {
//     if (this.value === 'week') {
//         toggleSection('week_based');
//     } else if (this.value === 'month') {
//         toggleSection('month_based');
//     }
// });

const change_to_income = () => toggleSection('income');
const change_to_expense = () => toggleSection('expense');
