import PocketBase from 'pocketbase';

const pb = new PocketBase('https://apigame.emcotech.ru');

// Загружаем сохранённые данные аутентификации из localStorage, используя ключ "pb_auth"
const storedAuth = localStorage.getItem('pb_auth');
if (storedAuth) {
  try {
    const authData = JSON.parse(storedAuth);
    pb.authStore.token = authData.token;
    pb.authStore.model = authData.model;
  } catch (error) {
    console.error('Ошибка загрузки аутентификации из localStorage', error);
  }
}

export default pb;



// import PocketBase from 'pocketbase';
//
// const pb = new PocketBase('https://apigame.emcotech.ru');
//
// // Попытка загрузить сохранённые данные аутентификации из localStorage
// const storedAuth = localStorage.getItem('pb_auth'); // изменено с "pocketbase_auth" на "pb_auth"
// if (storedAuth) {
//   try {
//     pb.authStore.save(JSON.parse(storedAuth));
//   } catch (error) {
//     console.error('Ошибка загрузки аутентификации из localStorage', error);
//   }
// }
//
// export default pb;
