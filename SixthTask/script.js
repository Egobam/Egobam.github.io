document.addEventListener("DOMContentLoaded",() => {
    // Получение необходимых элементов из HTML
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsSelectOne = document.getElementById('optionsOne');
    const optionsSelectTwo = document.getElementById('optionsTwo');
    const propertyCheckboxContainer = document.getElementById('checkboxContainer'); // контейнер чекбокса
    const totalCostDisplay = document.getElementById('totalCost');
    
    // Пример цен на услуги
    const prices = {
        type1: 1900,
        type2: 2000,
        type3: 2200,
        type4: 3800,
    };
    
    // Функция для обновления стоимости
    function updateCost() {
        let quantity = parseInt(quantityInput.value) || 0;
        if (quantity <= 0) {
            totalCostDisplay.textContent = 'Введите положительное количество';
            return; // Прекращаем выполнение, если количество некорректное
        }
    
        let totalCost = 0;
    
        // Определяем выбранный тип услуги
        serviceTypeRadios.forEach(radio => {
            if (radio.checked) {
                switch (radio.value) {
                    case '1':
                        totalCost = prices.type1 * quantity;
                        break;
                    case '2':
                        totalCost = prices.type2 * quantity;
                        if (optionsSelectOne.value === 'option2') {
                            totalCost += 800;
                        } else if (optionsSelectOne.value === 'option3') {
                            totalCost += 1200;
                        }
                        break;
                    case '3':
                        totalCost = prices.type3 * quantity;
                        const properties = document.querySelectorAll('#checkboxContainer input[type="checkbox"]:checked');
                        properties.forEach(property => {
                            totalCost += 400;
                        });
                        break;
                    case '4':
                        totalCost = prices.type4 * quantity;
                        if (optionsSelectTwo.value) {
                            totalCost += 2000;
                        }
                        break;
                    default:
                        totalCostDisplay.textContent = 'Выберите тип услуги';
                        return; // Прекращаем выполнение, если тип услуги некорректен
                }
            }
        });
    
        // Обновляем отображаемую стоимость
        totalCostDisplay.textContent = totalCost;
    }
    
    // Функция для обновления видимости опций и свойств
    function updateOptionsAndProperties() {
        const selectedTypeRadio = [...serviceTypeRadios].find(radio => radio.checked);
        
        if (!selectedTypeRadio) {
            totalCostDisplay.textContent = 'Выберите тип услуги';
            return;
        }
    
        const selectedType = selectedTypeRadio.value;
    
        if (selectedType === '1') {
            optionsSelectOne.parentElement.style.display = 'none';
            optionsSelectTwo.parentElement.style.display = 'none';
            propertyCheckboxContainer.style.display = 'none';
        } else if (selectedType === '2') {
            optionsSelectOne.parentElement.style.display = 'block';
            optionsSelectTwo.parentElement.style.display = 'none';
            propertyCheckboxContainer.style.display = 'none';
        } else if (selectedType === '3') {
            optionsSelectOne.parentElement.style.display = 'none';
            optionsSelectTwo.parentElement.style.display = 'none';
            propertyCheckboxContainer.style.display = 'block';
        } else if (selectedType === '4') {
            optionsSelectOne.parentElement.style.display = 'none';
            optionsSelectTwo.parentElement.style.display = 'block';
            propertyCheckboxContainer.style.display = 'none';
        }
    
        updateCost(); // Пересчитываем стоимость при изменении типа услуги
    }
    
    // Обработчики событий для всех элементов
    quantityInput.addEventListener('input', updateCost);
    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', updateOptionsAndProperties);
        radio.addEventListener('change', updateCost);
    });
    optionsSelectOne.addEventListener('change', updateCost);
    optionsSelectTwo.addEventListener('change', updateCost);
    
    // Добавление обработчиков событий для чекбоксов при выборе типа 3
    function addCheckboxListeners() {
        const propertyCheckboxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]');
        propertyCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateCost);
        });
    }
    
    // Инициализация отображения в зависимости от начального состояния
    updateOptionsAndProperties();
    addCheckboxListeners();
})
