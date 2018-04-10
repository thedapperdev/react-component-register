

describe('name', () => {
  test('meow', () => {
    const me = (input: number) => (input+ 1)
    expect(me(1)).toBe(2)
  })
})