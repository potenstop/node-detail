describe("测试", () => {
    it("number", () => {
        const numberWrap = new Number(1); // 创建的是Number对象
        const number1 = Number(1);  // primitive
        const number2 = 1;      // 和number1相同
        const number3 = 0b1;    // 通过二进制形式创建
        const nan = Number("ad");   // NaN
        const fin = 1/0;    // Infinity

        console.log(numberWrap, number2)

    })

})
