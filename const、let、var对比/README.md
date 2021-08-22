
## 介绍
const、let属于ES6新增的关键字，let 声明的变量只在 let 命令所在的代码块内有效。
const的特性包括let所有，并且const修饰的为常量。
## 相同点
```javascript
let a;
var b;
console.log(a,b);   // undefined undefined
```
## 使用未声明的变量，表现不同
```javascript
console.log(varTest); //输出undefined(注意要注释掉下面一行才能运行)
console.log(letTest); //直接报错：ReferenceError: letTest is not defined

var varTest = 'test var OK.';
let letTest = 'test let OK.';
```

## 重复声明同一个变量时，表现不同
```javascript

var varTest = 'test var OK.';
let letTest = 'test let OK.';

var varTest = 'varTest changed.';
let letTest = 'letTest changed.'; //直接报错：SyntaxError: Identifier 'letTest' has already been declared

console.log(varTest); //输出varTest changed
console.log(letTest);
```

## 作用域不同  
var定义的变量是全局变量或者函数变量。
let定义的变量是块级的变量。
```javascript
{
let let1 = 2;
var var1 = 2;
}
//console.log(let1);  //不可访问
console.log(var1);  //可以访问


var varTest = 'test var OK.';
let letTest = 'test let OK.';

{
var varTest = 'varTest changed.';
let letTest = 'letTest changed.';
}

console.log(varTest); //输出"varTest changed."，内部"{}"中声明的varTest变量覆盖外部的letTest声明
console.log(letTest); //输出"test let OK."，内部"{}"中声明的letTest和外部的letTest不是同一个变量
```
## const修饰的是常量
```javascript
const val = 1;
val = 2;  // TypeError: Assignment to constant variable.
```

