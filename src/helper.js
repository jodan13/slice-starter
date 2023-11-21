export function sanitizeFileName(fileName) {
  const invalidChars = /[\/:*?"<>|]/g; // Регулярное выражение для запрещенных символов
  return fileName.replace(invalidChars, '-'); // Заменяем запрещенные символы на '-'
}

export function toLowerCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function toCamelCase(str) {
  return sanitizeFileName(str)
    .split('-') // Разбиваем строку по дефису
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Преобразуем каждое слово в CamelCase
    .join(''); // Объединяем слова в одну строку
}
