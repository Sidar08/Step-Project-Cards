// function fetchVisits() {
//   return fetch("https://ajax.test-danit.com/api/cards.json")
//     .then((response) => response.json())
//     .then((data) => {
//       if (Array.isArray(data)) {
//         return data.map((card) => card.visit);
//       } else {
//         throw new Error("Неправильний формат даних");
//       }
//     })
//     .catch((error) => {
//       throw new Error("Помилка отримання списку візитів");
//     });
// }

// export { fetchVisits };
