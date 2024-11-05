const inputWidth = document.getElementById('inputWidth');
const inputHeight = document.getElementById('inputHeight');
const buttonSubmit = document.getElementById('buttonSubmit');
const image = document.getElementById('image');

// Обработчик события щелчка на кнопке
buttonSubmit.addEventListener('click', () => {
  // Получаем значения из input
  const width = parseInt(inputWidth.value);
  const height = parseInt(inputHeight.value);

  // Проверяем, что числа в диапазоне
  if (isNaN(width) || isNaN(height) || width < 100 || width > 300 || height < 100 || height > 300) {
    image.innerHTML = 'Одно из чисел вне диапазона от 100 до 300';
    return;
  }

  // Делаем запрос
  fetch(`https://dummyimage.com/${width}x${height}/`)
    .then(response => response.blob())
    .then(blob => {
      // Создаём URL для изображения blob
      const url = URL.createObjectURL(blob);

      // Вставляем изображение в элемент image
      image.innerHTML = `<img src="${url}" alt="${width}x${height}">`;
    })
    .catch(() => {
      image.innerHTML = 'Ошибка при получении данных';
    });
});
