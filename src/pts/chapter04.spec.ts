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

  it('works with contextual typing', () => {
    function times(
      f: (index: number) => number,
      n: number
    ): number {
      let x = 0
      for (let i=0; i<n; i++) {
        x += f(i)
      }
      return x
    }

    const result = times(n => n * 2, 4)
    expect(result).toEqual(12)
  })

  it('works with generics', () => {
    type Filter = {
      <T>(array: T[], f: (item: T) => boolean): T[]
    }
    const filter: Filter = (array, f) => {
      const result = []
      for (let i = 0; i < array.length; i++) {
        const item = array[i]
        if (f(item)) {
          result.push(item)
        }
      }
      return result
    }

    const names = [
      {firstName: 'beth'},
      {firstName: 'caitlyn'},
      {firstName: 'xin'}
    ]

    const result = filter(
      names,
      _ => _.firstName.startsWith('b')
    )

    expect(result).toEqual([{firstName: 'beth'}])
  })

  it('can implement map with generics', () => {
    type Map = {
      <T, U>(array: T[], f: (item: T) => U): U[]
    }

    const map: Map = (array, f) => {
      const result = []
      for (let i=0; i<array.length; i++) {
        result[i] = f(array[i])
      }
      return result
    }

    const x = [1,2,3,4]

    const result = map(x, (x) => x.toString())
    expect(result).toEqual(["1","2","3","4"])
  })

  it('has bounded polymorphism', () => {
    type TreeNode = {
      value: string
    }
    type LeafNode = TreeNode & {
      isLeaf: true
    }
    type InnerNode = TreeNode & {
      children: [TreeNode] | [TreeNode, TreeNode]
    }

    const a: TreeNode = {value: 'a'}
    const b: LeafNode = {value: 'b', isLeaf: true}
    const c: InnerNode = {value: 'c', children: [b]}

    const a1 = mapNode(a, _ => _.toUpperCase())
    const b1 = mapNode(b, _  => _.toUpperCase())
    const c1 = mapNode(c, _  => _.toUpperCase())

    function mapNode<T extends TreeNode>(
      node: T,
      f: (value: string) => string
    ): T {
      return {
        ...node,
        value: f(node.value)
      }
    }

    expect(a1).toEqual({value: 'A'})
    expect(b1).toEqual({value: 'B', isLeaf: true})
    expect(c1).toEqual({value: 'C', children: [b]})
  })
})
