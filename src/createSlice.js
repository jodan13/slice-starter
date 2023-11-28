import path from 'path';
import fs from 'fs';
import readline from 'readline';
import { createSliceStructure } from './createSliceStructure.js';

const layers = ['entities', 'features', 'widgets', 'pages'];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

export function createSlice() {
  console.log('Выберите слой для создания нового слайса:');
  layers.forEach((folder, index) => {
    console.log(`${index + 1}. ${folder}`);
  });

  rl.question('Введите номер слоя: ', (number) => {
    const layersIndex = parseInt(number, 10) - 1;

    // Проверяем, валиден ли ввод
    if (layersIndex < 0 || layersIndex >= layers.length || isNaN(layersIndex)) {
      console.error('Неправильный номер слоя.');
      rl.close();
      return;
    }

    const selectedLayers = layers[layersIndex];

    // Запрашиваем имя новой папки
    rl.question('Введите имя нового слайса: ', (sliceName) => {
      const newFolderPath = path.join('src', selectedLayers, sliceName);

      // Проверка на существование папки
      if (fs.existsSync(newFolderPath)) {
        console.error(`Слайс ${newFolderPath} уже существует`);
        rl.close();
        return;
      }

      // Создаем папку и файл
      fs.mkdirSync(newFolderPath, { recursive: true });
      createSliceStructure(newFolderPath, selectedLayers, sliceName);


      console.log(`Слайс ${newFolderPath} с файлом index.ts создана`);
      rl.close();
    });
  });
}
