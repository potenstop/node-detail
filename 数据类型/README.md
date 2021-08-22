## undefined
未定义的类型，typeof undefined的值的为"undefined"。
下面为判断undefined的方式
```javascript
let val;
console.log(typeof val === "undefined")  // "true
console.log(val === undefined) // true
if (!val) {
    console.log(true) // true
}
```

## null
空指针类型，typeof null的值的为"object"。
下面为判断null的方式
```javascript
let val = null;
console.log(typeof val === "object")  // "true
console.log(val === null) // true
if (!val) {
    console.log(true) // true
}
```
## number
数字类型，可以表示整数、小数、负数、NAN、Infinity，范围Number.MIN_VALUE~Number.MAX_VALUE。
```javascript
const numberWrap = new Number(1); // 创建的是Number对象
const number1 = Number(1);  // primitive
const number2 = 1;      // 和number1相同
const number3 = 0b1;    // 通过二进制形式创建
const nan = Number("ad");   // NaN
const fin = 1/0;    // Infinity
```
javascript所有的数字都是64位(1位符号+11 位指数+52位尾数)，(-1)^s*1.f*2^(e-1023)
```javascript
0.7 *2 = 1.4 *2 = 0.8 *2 =1.6 * 2 = 1.2 *2 =0.4
0.10110

0.1 *2 = 0.2 * 2= 0.4 *2 = 0.8*2 =0.6 *2 =0.2 * 2=0.4
0.0 0011 0011 0011 0011 0011 0011  = 1.1 0011 0011 0011 * 2^(-4) =>
s=0 
f= 0.1 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 001 
e=1019_10=(011 1111 1011)_2
0011 1111 1011 1 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 010
0011 1111 1100 1 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 010  +
=

s=0
对阶
100 0000 0101
011 1111 1100 1020
000 0000 0001

0 10011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 001 101
1 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 010
1110011001100110011001100110011001100110011001100111

-1^0 * 1.111 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 1 * 2^-3

(-1)^2 *1.0 0110 0110 0110 0110 0110 0110 0110 0110 0110 0110 0110 0110 0110 010 * 2

```


