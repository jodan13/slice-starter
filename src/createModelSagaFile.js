import fs from 'fs';
import path from 'path';

export function createModelSagaFile(layerPath, nameLowerCase) {
  const content =
    `import { delay, put, takeEvery } from 'typed-redux-saga';

import { ${nameLowerCase}Actions } from './slice';

function* wTestSaga({ payload }: ReturnType<typeof ${nameLowerCase}Actions.testSaga>) {
  try {
    yield* put(${nameLowerCase}Actions.setIsLoading(true));
    console.log('Test saga payload start:', payload);
    yield* delay(1000);
  } finally {
    console.log('Test saga payload end:', payload);
    yield* put(${nameLowerCase}Actions.setIsLoading(false));
  }
}

export function* ${nameLowerCase}Watcher() {
  yield* takeEvery(${nameLowerCase}Actions.testSaga.type, wTestSaga);
}
`;
  fs.writeFileSync(path.join(layerPath, 'saga.ts'), content);
}
