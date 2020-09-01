class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

const greeter = new Greeter("world");

console.log(greeter.greet());

function getFinalPrice(price: number, discount: number) {
  return price - price/discount;
}

console.log(getFinalPrice(100, 10));
// console.log(getFinalPrice(100, "10%")); // type error
