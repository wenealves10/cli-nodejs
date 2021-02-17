/* eslint-disable no-undef */
import { deepStrictEqual } from 'assert'
import dataBase from '../database/index.js'

const DEFAULT_ITEM = {
  name: 'Flash',
  power: 'Speed',
  id: 2,
}

const DEFAULT_ITEM_UPDATE = {
  name: 'Batman',
  power: 'Money',
  id: 1,
}

describe('Registration manipulation suite', () => {
  before(async () => {
    await dataBase.register(DEFAULT_ITEM)
    await dataBase.register(DEFAULT_ITEM_UPDATE)
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

  it('must remove a hero by id', async () => {
    const expected = true

    const result = await dataBase.remove(DEFAULT_ITEM.id)

    deepStrictEqual(result, expected)
  })

  it('must update hero by id', async () => {
    const expected = {
      ...DEFAULT_ITEM_UPDATE,
      name: 'Superman',
      power: 'Super strength',
    }

    const newItem = {
      name: 'Superman',
      power: 'Super strength',
    }

    await dataBase.update(DEFAULT_ITEM_UPDATE.id, newItem)

    const [result] = await dataBase.list(DEFAULT_ITEM_UPDATE.id)

    deepStrictEqual(result, expected)
  })
})
