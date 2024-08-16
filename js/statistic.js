const switchStatisticBtn = document.querySelectorAll('.statistic__switch-btn');
const monthList = document.querySelector('.statistic__month-list');
const quarryList = document.querySelector('.statistic__quarry-list');
const quarryStatistic = document.querySelector('.quarry-statistic');
const monthStatistic = document.querySelector('.month-statistic');

switchStatisticBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        // Удаляем класс 'active' у всех кнопок
        switchStatisticBtn.forEach(element => {
            element.classList.remove('active');
        });
        // Добавляем класс 'active' на нажатую кнопку
        btn.classList.add('active');

        // Проверяем какую кнопку нажали и показываем соответствующий контейнер
        if (btn.classList.contains('statistic__income')) {
            monthList.style.display = 'flex';
            monthStatistic.style.display = 'flex';
            quarryList.style.display = 'none';
            quarryStatistic.style.display = 'none';
        } else if (btn.classList.contains('statistic__quarry')) {
            monthList.style.display = 'none';
            quarryList.style.display = 'flex';
            monthStatistic.style.display = 'none';
            quarryStatistic.style.display = 'flex';
        }
    });
});
