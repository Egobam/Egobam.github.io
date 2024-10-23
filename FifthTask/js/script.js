document.getElementById('calculate').addEventListener('click', function() {
    const quantity = parseFloat(document.getElementById('quantity').value);
    const productPrice = parseFloat(document.getElementById('product').value);
    const result = document.getElementById('result');

    if (!isNaN(quantity) && quantity >= 0 && !isNaN(productPrice) && productPrice > 0) {
        const totalCost = quantity * productPrice;
        result.textContent = `Стоимость заказа: ${totalCost}`;
    } else {
        result.textContent = 'Пожалуйста введите корректные данные';
    }
});
