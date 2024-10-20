// script.js

// Получение необходимых элементов из HTML
const quantityInput = document.getElementById('quantity');
const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
const optionsSelectOne = document.getElementById('optionsOne');
const optionsSelectTwo = document.getElementById('optionsTwo'); // Исправлено
const propertyCheckboxContainer = document.getElementById('checkboxContainer'); // контейнер чекбокса
const totalCostDisplay = document.getElementById('totalCost');

// Пример цен на услуги (можно изменить в зависимости от задач)
const prices = {
    type1: 1900, // Цена для первого типа услуги
    type2: 2000, // Цена для второго типа услуги
    type3: 2200, // Цена для третьего типа услуги
    type4: 3800, // Цена для четвертого типа услуги
};

// Функция для обновления стоимости
function updateCost() {
    let quantity = parseInt(quantityInput.value) || 0; // Получаем количество
    let totalCost = 0; // Начальная стоимость

    // Определяем выбранный тип услуги
    serviceTypeRadios.forEach(radio => {
        if (radio.checked) {
            switch (radio.value) {
                case '1':
                    totalCost = prices.type1 * quantity; // Только базовая цена
                    break;
                case '2':
                    totalCost = prices.type2 * quantity; // Базовая цена + опции
                    if (optionsSelectOne.value == 'option2'){
                        totalCost += 800; // Добавить стоимость опции
                    } else if (optionsSelectOne.value == 'option3'){
                        totalCost += 1200;
                    }
                    break;
                case '3':
                    totalCost = prices.type3 * quantity; // Базовая цена
                    const properties = document.querySelectorAll('#checkboxContainer input[type="checkbox"]:checked');
                    properties.forEach(property => {
                        totalCost += 400; // Цена каждого выбранного свойства
                    });
                    break;
                case '4':
                    totalCost = prices.type4 * quantity; // Базовая цена + опции
                    if (optionsSelectTwo.value) totalCost += 2000; // Добавить стоимость опции
                    break;
            }
        }
    });

    // Обновляем отображаемую стоимость
    totalCostDisplay.textContent = totalCost;
}

// Функция для обновления видимости опций и свойств
function updateOptionsAndProperties() {
    const selectedType = [...serviceTypeRadios].find(radio => radio.checked).value;

    if (selectedType === '1') {
        optionsSelectOne.parentElement.style.display = 'none'; // Скрываем селект 1
        optionsSelectTwo.parentElement.style.display = 'none'; // Скрываем селект 2
        propertyCheckboxContainer.style.display = 'none'; // Скрываем чекбокс
    } else if (selectedType === '2') {
        optionsSelectOne.parentElement.style.display = 'block'; // Показываем селект 1
        optionsSelectTwo.parentElement.style.display = 'none'; // Скрываем селект 2
        propertyCheckboxContainer.style.display = 'none'; // Скрываем чекбокс
    } else if (selectedType === '3') {
        optionsSelectOne.parentElement.style.display = 'none'; // Скрываем селект 1
        optionsSelectTwo.parentElement.style.display = 'none'; // Скрываем селект 2
        propertyCheckboxContainer.style.display = 'block'; // Показываем чекбокс
    } else if (selectedType === '4') {
        optionsSelectOne.parentElement.style.display = 'none'; // Скрываем селект 1
        optionsSelectTwo.parentElement.style.display = 'block'; // Показываем селект 2
        propertyCheckboxContainer.style.display = 'none'; // Скрываем чекбокс
    }

    updateCost(); // Пересчитываем стоимость при изменении типа услуги
}

// Обработчики событий для всех элементов
quantityInput.addEventListener('input', updateCost);
serviceTypeRadios.forEach(radio => {
    radio.addEventListener('change', updateOptionsAndProperties);
    radio.addEventListener('change', updateCost);
});
optionsSelectOne.addEventListener('change', updateCost); // Исправлено
optionsSelectTwo.addEventListener('change', updateCost); // Исправлено

// Обработчик событий для чекбоксов в контейнере свойств
const propertyCheckboxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]');
propertyCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateCost); // Добавлено обновление стоимости при изменении чекбокса
});

// Инициализация отображения в зависимости от начального состояния
updateOptionsAndProperties();
