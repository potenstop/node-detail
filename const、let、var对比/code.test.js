describe("测试", () => {
    it("相同1", () => {
        let a;
        var b;
        console.log(a, b);
    })
    it('不同1', function () {
        console.log(varTest); //输出undefined(注意要注释掉下面一行才能运行)
        // console.log(letTest); //直接报错：ReferenceError: letTest is not defined

        var varTest = 'test var OK.';
        let letTest = 'test let OK.';
    });
    it("不同2", () => {
        var varTest = 'test var OK.';
        let letTest = 'test let OK.';

        var varTest = 'varTest changed.';
        // let letTest = 'letTest changed.'; //直接报错：SyntaxError: Identifier 'letTest' has already been declared

    })
    it('不同3', function () {
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
    });
    it('const', function () {
        const val = 1;
        // val = 2; // TypeError: Assignment to constant variable.
    });
})
