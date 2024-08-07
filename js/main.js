// Функция инициализации делегирования событий для выпадающих меню и кнопок удаления
const initEventDelegation = () => {
  document.addEventListener('click', (event) => {
    // Обработчик событий для открытия/закрытия выпадающих меню
    if (event.target.closest('.order-window__select')) {
      const select = event.target.closest('.order-window__select');
      const dropdown = select.closest('.order-window__dropdown');
      const caret = dropdown.querySelector('.order-window__caret');
      const menu = dropdown.querySelector('.order-window__dropdown-menu');

      caret.classList.toggle('rotate');
      menu.classList.toggle('active');
    }

    // Обработчик событий для выбора элемента из меню
    if (event.target.closest('.order-window__dropdown-menu li')) {
      const option = event.target;
      const menu = option.closest('.order-window__dropdown-menu');
      const dropdown = menu.closest('.order-window__dropdown');
      const selected = dropdown.querySelector('.order-window__selected');

      selected.textContent = option.textContent;
      menu.classList.remove('active');
    }

    // Обработчик событий для кнопок удаления заявок
    if (event.target.closest('.order-window__delete-order')) {
      const deleteButton = event.target.closest('.order-window__delete-order');
      const orderInfoItem = deleteButton.closest('.order-window__order-info');

      orderInfoItem.remove();
    }
  });
};

// Функция добавления новой заявки
const addNewOrder = () => {
  const orderInfoContainer = document.querySelector('.order-window__info-container');
  const orderInfoItemCount = orderInfoContainer.querySelectorAll('.order-window__order-info');

  if (orderInfoItemCount.length < 3) {
    orderInfoContainer.innerHTML += `
      <div class="order-window__order-info">
        <div class="order-window__dropdown">
          <div class="order-window__select">
            <span class="order-window__selected">Вид продукции</span>
            <svg class="order-window__caret" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.9" d="M9.14038 1L5.14038 5L1.14038 1" stroke="#202020" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
          <ul class="order-window__dropdown-menu order-window__dropdown-menu--large">
            <li class="active">АБС Крупнозернистая Плотная, Тип А</li>
            <li>АБС Мелкозернистая Плотная ТИП А-1</li>
            <!-- и так далее -->
          </ul>
        </div>
        <div class="order-window__dropdown">
          <div class="order-window__select">
            <span class="order-window__selected">Карьер</span>
            <svg class="order-window__caret" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.9" d="M9.14038 1L5.14038 5L1.14038 1" stroke="#202020" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
          <ul class="order-window__dropdown-menu">
            <li class="active">Зверосовхоз</li>
            <!-- и так далее -->
          </ul>
        </div>
        <div class="order-window__time-container" style="margin-right: 10px">
          <span class="order-window__time-text">Время</span>
          <div class="order-window__clock-container">
            <input placeholder="00" type="text" class="order-window__clock" id="orderWindowHour" />
            <pre>:</pre>
            <input placeholder="00" type="text" class="order-window__clock" id="orderWindowMinute" />
          </div>
        </div>
        <input class="order-window__input" type="text" name="orderNumber" placeholder="Номер заявки" />
        <input class="order-window__input" type="text" name="orderWeight" placeholder="Вес заявки" />
        <input class="order-window__input" type="text" name="orderCarNumber" placeholder="Номер машины" />
        <button class="order-window__add-field">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" transform="matrix(-1 0 0 1 20 0)" fill="#E9ECF4" />
            <path d="M13.75 9.375H10.625V6.25H9.375V9.375H6.25V10.625H9.375V13.75H10.625V10.625H13.75V9.375Z" fill="#202020" />
          </svg>
        </button>
        <button class="order-window__delete-order">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.90055 0.868917L5.38085 4.34921L8.85285 0.877203L10.361 2.38533L6.88897 5.85733L10.3858 9.3542L8.86942 10.8706L5.37256 7.37375L1.87569 10.8706L0.367568 9.36248L3.86443 5.86562L0.384141 2.38533L1.90055 0.868917Z" fill="#202020" />
          </svg>
        </button>
      </div>
    `;
  } else {
    orderInfoContainer.innerHTML += '<p style="color: red">Максимальное кол-во заявок за раз 3.</p>';
  }
};

// Инициализация событий для создания заявки
const createOrderBtn = document.querySelector('.order-window__create-order');
createOrderBtn.addEventListener('click', addNewOrder);

// Открытие окна создания заявки
const openOrderWindowBtn = document.querySelector('.create-order');
const orderWindowWrapper = document.querySelector('.create-order-window-wrapper');
const createOrderWindow = document.querySelector('.create-order-window');

openOrderWindowBtn.addEventListener('click', () => {
  orderWindowWrapper.classList.add('active');
});

// Закрытие окна создания заявки при клике вне окна
orderWindowWrapper.addEventListener('click', (event) => {
  if (!createOrderWindow.contains(event.target)) {
    orderWindowWrapper.classList.remove('active');
  }
});

// Инициализация делегирования событий
initEventDelegation();

// Открытие информации о заявке
const orderItems = document.querySelectorAll('.order-item');
orderItems.forEach((item) => {
  item.addEventListener('click', () => {
    orderInfoWrapper.classList.add('active');
  });
});

// Закрытие окна создания заявки
function closeCreateOrderWindow() {
  orderWindowWrapper.classList.remove('active');
}

// Работа с информацией о заявке и редактированием
const orderInfoWrapper = document.querySelector('.order-info-window-wrapper');
const orderInfoWindow = document.querySelector('.order-info-window');
const editOrderWrapper = document.querySelector('.edit-order-window-wrapper');
const editOrderWindow = document.querySelector('.edit-order-window');

function openEditOrderWindow() {
  orderInfoWrapper.classList.remove('active');
  editOrderWrapper.classList.add('active');
}

function closeEditOrderWindow() {
  orderInfoWrapper.classList.add('active');
  editOrderWrapper.classList.remove('active');
}

// Закрытие информации о заявке при клике вне окна
orderInfoWrapper.addEventListener('click', (event) => {
  if (!orderInfoWindow.contains(event.target)) {
    orderInfoWrapper.classList.remove('active');
  }
});

// Закрытие окна по классу элемента
function closeWindow(element) {
  const wrapper = document.querySelector(`.${element}`);
  const window = document.querySelector('.order-window');
  wrapper.classList.remove('active');
}

// Обновление прогресс-бара
const progressBars = document.querySelectorAll('.progress');
progressBars.forEach(progress => {
  const progressValueElement = progress.querySelector('.progress-value');
  let progressValue = parseInt(progressValueElement.textContent, 10);

  const progressCircle = progress.querySelector('svg circle:nth-child(2)');
  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  if (progressValue >= 100) {
    progressCircle.style.stroke = "#cc341d";
    progressValue = 100; // Ограничиваем значение до 100
  }

  const offsetValue = (progressValue / 100) * circumference;
  progressCircle.style.strokeDashoffset = circumference - offsetValue;
});

// Добавление новых полей
const addFieldBtns = document.querySelectorAll('.order-window__add-field');
addFieldBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const fieldContainer = btn.parentElement;
    const newField = document.createElement('input');
    newField.classList.add('order-window__input');
    newField.type = 'text';
    newField.name = 'orderCarNumber';
    newField.placeholder = 'Номер авто';
    fieldContainer.style.display = 'flex';
    fieldContainer.insertBefore(newField, fieldContainer.lastElementChild);
  });
});
// Делегирование событий для кнопок добавления полей
// Делегирование событий для кнопок добавления полей
document.addEventListener('click', (event) => {
  if (event.target.closest('.order-window__add-field')) {
    const fieldContainer = event.target.closest('.order-window__order-info');
    const newField = document.createElement('input');
    newField.classList.add('order-window__input');
    newField.type = 'text';
    newField.name = 'orderCarNumber';
    newField.placeholder = 'Номер авто';

    // Находим предпоследний элемент в контейнере
    const inputs = fieldContainer.querySelectorAll('.order-window__input');
    const lastField = fieldContainer.querySelector('.order-window__add-field');

    // Вставляем новый элемент перед предпоследним элементом
    if (inputs.length > 1) {
      const secondLastField = inputs[inputs.length - 2];
      fieldContainer.insertBefore(newField, secondLastField);
    } else {
      // Если есть только один элемент, вставляем перед кнопкой добавления поля
      fieldContainer.insertBefore(newField, lastField);
    }

    fieldContainer.style.display = 'flex';
  }
});


// Анимация элементов
const items = document.querySelectorAll('.daily-order');
items.forEach((item, index) => {
  item.style.animation = `fade-top .5s ease-in-out`;
  item.style.animationDelay = `${index * 50}ms`;
  item.style.animationFillMode = 'forwards';
});

// Переключение профиля пользователя
const userProfileBtn = document.querySelector('.user-profile');
const userInfoContainer = document.querySelector('.user-info');
userProfileBtn.addEventListener('click', () => {
  userInfoContainer.classList.toggle('active');
});
