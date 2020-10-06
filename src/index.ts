// tslint:disable:no-console

import Greeter from "./greeter";
import * as _ from "lodash";

const greeter = new Greeter("world");

console.log(_.padStart(greeter.greet(), 20));

function getFinalPrice(price: number, discount: number) {
  return price - price / discount;
}

console.log(getFinalPrice(100, 10));
// console.log(getFinalPrice(100, "10%")); // type error
