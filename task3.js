const input = document.getElementById('input');
const button = document.getElementById('button');
const result = document.getElementById('result');

// Обработчик события щелчка на кнопке
button.addEventListener('click', () => {
  // Получаем значение из input
  const value = parseInt(input.value);

  // Проверяем, что число в диапазоне
  if (value < 1 || value > 10) {
    result.innerHTML = 'Число вне диапазона от 1 до 10';
    return;
  }

  // Делаем запрос
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://jsonplaceholder.typicode.com/photos?_limit=${value}`);
  xhr.onload = () => {
    if (xhr.status === 200) {
      // Выводим список картинок
      const data = JSON.parse(xhr.responseText);
      result.innerHTML = data.map(photo => `<img src="${photo.url}" alt="${photo.title}">`).join('');
    } else {
      result.innerHTML = 'Ошибка при получении данных';
    }
  };
  xhr.send();
});
