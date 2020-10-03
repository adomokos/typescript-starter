function sum(numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}

function sumVariadic(...numbers: number[]): number {
  return sum(Array
    .from(numbers))
}

describe('Chapter04', () => {
  it('sums with reduce', () => {
    const result = sum([1,2,3])
    expect(result).toBe(6)
  })

  it('sums variadic arguments', () => {
    const result = sumVariadic(1,2,3)
    expect(result).toBe(6)
  })

  it('can invoke a function with diff arguments', () => {
    function add(a: number, b: number): number {
      return a + b
    }

    expect(add(10, 20)).toEqual(30)
    expect(add.apply(null, [10, 20])).toBe(30)
    expect(add.call(null, 10, 20)).toBe(30)
    expect(add.bind(null, 10, 20)()).toBe(30)
  })

  it('can generate values with generators', () => {
    function* createFibonacciGenerator() {
      let a = 0
      let b = 1
      while (true) {
        yield a;
        [a, b] = [b, a + b]
      }
    }

    const generator = createFibonacciGenerator()
    expect(generator.next()).toEqual({value: 0, done: false})
    expect(generator.next()).toEqual({value: 1, done: false})
    expect(generator.next()).toEqual({value: 1, done: false})
    expect(generator.next()).toEqual({value: 2, done: false})
    expect(generator.next()).toEqual({value: 3, done: false})
  })
})
