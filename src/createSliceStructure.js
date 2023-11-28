import fs from 'fs';
import path from 'path';
import { createModelIndexFile } from './createModelIndexFile.js';
import { createIndexFile } from './createIndexFile.js';
import { toCamelCase, toLowerCase } from './helper.js';

const segments = ['model', 'lib', 'ui', 'types', 'config', 'api'];

export function createSliceStructure(baseDir, selectedLayers, sliceName) {
  const name = toCamelCase(sliceName);
  const nameLowerCase = toLowerCase(name);
  fs.writeFileSync(path.join(baseDir, 'index.ts'), `export { ${name} } from './ui/${name}';\n\n`);
  createIndexFile(baseDir, name, nameLowerCase);
  segments.forEach(layer => {
    // Создаем директорию для каждого слоя внутри слайса
    const layerPath = path.join(baseDir, layer);
    if (!fs.existsSync(layerPath)) {
      fs.mkdirSync(layerPath, { recursive: true });
      console.log(`Создана папка: ${layerPath}`);
      // Пример создания файла внутри слоя
      if (layer === 'ui') {
        fs.writeFileSync(path.join(layerPath, `${name}.tsx`), `export const ${name} = () => {\n  return <div>${name}</div>;\n};\n`);
      } else if (layer === 'model') {
        createModelIndexFile(layerPath, nameLowerCase);
      } else if (layer === 'types') {
        fs.writeFileSync(path.join(layerPath, 'index.ts'), `export interface I${name}State {\n  isLoading: boolean;\n}\n`);
      } else {
        fs.writeFileSync(path.join(layerPath, 'index.ts'), '// Initial content\n');
      }
    } else {
      console.log(`Папка ${layerPath} уже существует`);
    }
  });
}
