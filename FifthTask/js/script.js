document.getElementById('calculate').addEventListener('click', function(){
    const quantity = document.getElementById('quantity').value;
    const productPrice = document.getElementById('product').value;
    const result = document.getElementById('result');

    if(quantity && productPrice > 0){
        const totalCost = quantity*productPrice;
        result.textContent = `Стоимость заказа: ${totalCost}`;
    } else {
        result.textContent = 'Пожалуйста введите корректные данные';
    }
});     