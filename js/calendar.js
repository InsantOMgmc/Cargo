const calendarWrapper = document.querySelector(".calendar-wrapper");
const calendarBtn = document.querySelector(".calendar-btn");

let calendar = document.querySelector('.calendar')
const month_names = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')
    let selected_date = document.querySelector('.selected-date') // Элемент для отображения выбранной даты

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // Получаем первый день месяца

    let first_day = new Date(year, month, 1)

    // Функция для обновления выбранной даты
    function updateSelectedDate(day, month, year) {
        let date = new Date(year, month, day);
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        selected_date.innerHTML = date.toLocaleDateString('ru-RU', options);
    }

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('active')
                updateSelectedDate(currDate.getDate(), month, year)
            }
        }
        calendar_days.appendChild(day)

        day.addEventListener('click', () => {
            // Удаление класса active у всех дней
            document.querySelectorAll('.calendar-day-hover').forEach(d => d.classList.remove('active'))


            // Добавление класса active к текущему дню
            day.classList.add('active')

            // Обновление выбранной даты
            let selected_day = i - first_day.getDay() + 1
            updateSelectedDate(selected_day, month, year)

            calendarWrapper.classList.remove('active')
        })
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}
if (calendarBtn) {
    calendarBtn.addEventListener("click", () => {
        calendarWrapper.classList.add('active');
    })
}

function closeWindowClickOutside(element, childElement) {
    element.addEventListener("click", (event) => {
        if (!childElement.contains(event.target)) {
            element.classList.remove('active');
        }
    })
}
closeWindowClickOutside(calendarWrapper, calendar)