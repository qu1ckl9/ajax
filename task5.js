const inputPage = document.getElementById('inputPage');
const inputLimit = document.getElementById('inputLimit');
const buttonRequest = document.getElementById('buttonRequest');
const listImages = document.getElementById('listImages');

// Сохраняем в localStorage данные последнего запроса
function saveData() {
  const page = inputPage.value;
  const limit = inputLimit.value;
  localStorage.setItem('page', page);
  localStorage.setItem('limit', limit);
}

// Получаем данные из localStorage
function loadData() {
  const page = localStorage.getItem('page');
  const limit = localStorage.getItem('limit');

  if (page !== null && limit !== null) {
    inputPage.value = page;
    inputLimit.value = limit;
  }
}

// Обработчик события щелчка на кнопке
buttonRequest.addEventListener('click', () => {
  // Получаем значения из input
  const page = parseInt(inputPage.value);
  const limit = parseInt(inputLimit.value);

  // Проверяем, что числа в диапазонах
  if (page < 1 || page > 10 || isNaN(page)) {
    listImages.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
    return;
  }
  if (limit < 1 || limit > 10 || isNaN(limit)) {
    listImages.innerHTML = 'Лимит вне диапазона от 1 до 10';
    return;
  }

  // Делаем запрос
  fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
    .then(response => response.json())
    .then(data => {
      // Выводим список картинок
      listImages.innerHTML = data.map(photo => `<img src="${photo.url}" alt="${photo.title}">`).join('');

      // Сохраняем данные для следующего запроса
      saveData();
    })
    .catch(() => {
      listImages.innerHTML = 'Ошибка при получении данных';
    });
});

// Загружаем данные из localStorage
loadData();
