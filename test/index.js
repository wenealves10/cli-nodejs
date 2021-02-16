/* eslint-disable no-undef */
import { deepStrictEqual } from 'assert'
import dataBase from '../database/index.js'

const DEFAULT_ITEM = {
  name: 'Flash',
  power: 'Speed',
  id: 2,
}

describe('Registration manipulation suite', () => {
  before(async () => {
    await dataBase.register(DEFAULT_ITEM)
  })

  it('Must list heroes by id correctly', async () => {
    const expected = DEFAULT_ITEM

    // Process of Listing
    const [result] = await dataBase.list(expected.id)

    deepStrictEqual(result, expected)
  })

  it('Must register a hero using files', async () => {
    const expected = DEFAULT_ITEM

    await dataBase.register(DEFAULT_ITEM)

    const [actual] = await dataBase.list(DEFAULT_ITEM.id)

    deepStrictEqual(actual, expected)
  })
})
