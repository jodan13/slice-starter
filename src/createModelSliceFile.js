/* eslint-disable no-template-curly-in-string */
import fs from 'fs';
import path from 'path';

export function createModelSliceFile(layerPath, name, nameLowerCase) {
  const payloadAction = 'PayloadAction<boolean>';
  const content =
    `import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { I${name}State } from '../types';

const initialState: I${name}State = {
  isLoading: false,
};

const slice = createSlice({
  name: '${nameLowerCase}',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: ${payloadAction}) => {
      state.isLoading = payload;
    },
    testSaga: (_state, _action: ${payloadAction}) => {
      /** @see wTestSaga */
    },
  },
});

export const ${nameLowerCase}Actions = slice.actions;
export const ${nameLowerCase}Reducer = slice.reducer;
`;
  fs.writeFileSync(path.join(layerPath, 'slice.ts'), content);
}
