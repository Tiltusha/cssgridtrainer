'use strict'
import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decoded(encoded, translations) {
  const decodedList = []; // список декодированных объектов
  const uniqueIds = new Set(); // множество уникальных id

  encoded.forEach((items) => { // перебираем объекты из списка
    const decodedItems = {}; // объект для декодированных полей
    for (const item in items) { // перебираем поля объекта
      if (item.endsWith('Id') && items[item] !== null && items[item] !== '0') { // проверяем на совпадение суффикса Id и исключаем null и 0
        const id = items[item]; // извлекаем значение поля
        const decodedVal = translations[id] || id; // получаем значение поля или само значение, если нет перевода
        decodedItems[item] = decodedVal; // записываем декодированное значение в объект
        uniqueIds.add(+id); // добавляем id в множество и преобразовыввем в Number
      } else {
        decodedItems[item] = items[item]; // копируем поле без декодирования
      }
    }
    decodedList.push(decodedItems); // добавляем декодированный объект в список
  });

  // выводим уникальные id
  console.log('Уникальные id:', Array.from(uniqueIds).filter(id => id !== null));

  return decodedList; // возвращаем список декодированных объектов
}



const decodedData = decoded(encoded, translations);
console.log(decodedData);