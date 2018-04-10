import { pascalCase } from 'utils'

describe('pascalCase function', () => {
  test('that it transforms strings into pascalCase', () => {
    expect(pascalCase('some-sort-of-function-name'))
      .toEqual('SomeSortOfFunctionName')
  })
})