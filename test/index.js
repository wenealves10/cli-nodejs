/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import { deepEqual } from 'assert';
import { assert } from 'console';
import dataBase from '../database/index.js';

const DEFAULT_ITEM = {
  name: 'Flash',
  power: 'Speed',
  id: 10,
};

describe('Registration manipulation suite', () => {
  it('Must list heroes by id correctly', async () => {
    const expected = DEFAULT_ITEM;

    // Process of Listing
    const [result] = await dataBase.list(expected.id);

    deepEqual(result, expected);
  });
});
