export interface SlideItem {
  type: 'text' | 'bullet' | 'code' | 'table' | 'heading' | 'subheading' | 'tip' | 'example' | 'answer' | 'analysis';
  content: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  language?: string;
  delay?: number;
}

export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  items: SlideItem[];
  theme?: 'default' | 'dark' | 'accent' | 'code';
}

export const slides: Slide[] = [
  // Slide 1: Title
  {
    id: 'title',
    title: 'SAST.2026 C语言急救车',
    subtitle: '南邮校科协',
    theme: 'accent',
    items: [
      { type: 'text', content: '🚑 紧急救援，考前冲刺' },
    ]
  },

  // Slide 2: 上车须知
  {
    id: 'notice',
    title: '上车须知',
    theme: 'default',
    items: [
      { type: 'bullet', content: '对于今后有志从事计算机相关行业的同学', items: ['若不能 80 分以上，建议重修'] },
      { type: 'bullet', content: '本课程仅面向考试', items: ['某些内容可能不尽合理'] },
      { type: 'bullet', content: '本课程的主题是急救', items: ['可能不会涉及复杂题目，但并非说某些题不重要'] },
      { type: 'bullet', content: '计软院、物联网学院等专业试卷题型不一样', items: ['开卷考试+手写代码，需要对 C 语言有更深入的理解'] },
      { type: 'bullet', content: '每个专业考点可能不同', items: ['有选择地理解记忆知识点'] },
      { type: 'tip', content: '资料来源：实验指导 / 校 C 语言平台 / 科协祖传' },
      { type: 'tip', content: '观看回放以及往年录播请访问 南邮校科协 B 站账号' },
    ]
  },

  // Slide 3: 第一章标题
  {
    id: 'ch1-title',
    title: '第一章',
    subtitle: '计算机、C 语言与二进制',
    theme: 'accent',
    items: [
      { type: 'heading', content: '重点' },
      { type: 'bullet', content: '冯诺伊曼架构' },
      { type: 'bullet', content: '进制转换' },
      { type: 'heading', content: '难点' },
      { type: 'bullet', content: '源程序到目标程序的翻译方式' },
      { type: 'bullet', content: '内存及储存容量相关概念' },
    ]
  },

  // Slide 4: 冯诺伊曼架构
  {
    id: 'ch1-vonneumann',
    title: '冯诺伊曼架构',
    subtitle: '常识题，考前抢记即可',
    theme: 'default',
    items: [
      { type: 'text', content: '1. 冯诺伊曼提出了程序存储的思想。' },
      { type: 'text', content: '2. 计算机的五大基本组成部件：' },
      { type: 'bullet', content: '运算器' },
      { type: 'bullet', content: '控制器' },
      { type: 'bullet', content: '存储器' },
      { type: 'bullet', content: '输入设备' },
      { type: 'bullet', content: '输出设备' },
    ]
  },

  // Slide 5: 进制转换
  {
    id: 'ch1-radix',
    title: '进制转换',
    subtitle: '记住算法，理解最好',
    theme: 'code',
    items: [
      { type: 'subheading', content: '1. 二进制转 k 进制' },
      { type: 'text', content: '如果 k 不是 4, 8, 16：先转成十进制，然后再从十进制转成 k 进制' },
      { type: 'bullet', content: '第一步：二进制 转 十进制' },
      { type: 'bullet', content: '第二步：十进制 转 k 进制' },
      { type: 'subheading', content: '2. 有关八进制和十六进制' },
      { type: 'text', content: '先转成二进制：' },
      { type: 'bullet', content: '一个八进制位相当于三个二进制位' },
      { type: 'bullet', content: '一个十六进制位相当于四个二进制位' },
    ]
  },

  // Slide 6: 翻译方法与内存
  {
    id: 'ch1-compile-memory',
    title: '翻译方法与内存',
    theme: 'default',
    items: [
      { type: 'subheading', content: '源程序到目标程序的翻译方法' },
      { type: 'text', content: '只有三种：汇编，编译，解释' },
      { type: 'tip', content: 'C 语言使用的是 编译' },
      { type: 'subheading', content: '内存' },
      { type: 'text', content: '1. 32 位操作系统最多支持 4G 内存' },
      { type: 'text', content: '即 32 根地址总线，每根总线上两种状态 0 或 1，那么就可以有 2³² 个地址' },
      { type: 'subheading', content: '2. 存储单位换算' },
      { type: 'code', content: '1 B = 8 bit\n1 KB = 1024 B\n1 MB = 1024 KB\n1 GB = 1024 MB\n1 TB = 1024 GB', language: 'text' },
      { type: 'tip', content: 'Tips：1024 是 2 的 10 次方' },
    ]
  },

  // Slide 7: 第二章标题
  {
    id: 'ch2-title',
    title: '第二章',
    subtitle: '源程序和数据类型',
    theme: 'accent',
    items: [
      { type: 'heading', content: '重点' },
      { type: 'bullet', content: '函数是 C 语言源程序的基本单位（会考选择题）' },
      { type: 'bullet', content: '变量命名规范' },
      { type: 'bullet', content: '基本数据类型，变量和常量' },
      { type: 'bullet', content: 'scanf / printf' },
      { type: 'bullet', content: 'getchar / putchar' },
      { type: 'heading', content: '难点' },
      { type: 'bullet', content: '基本类型的输入输出控制方法' },
    ]
  },

  // Slide 8: 命名规则
  {
    id: 'ch2-naming',
    title: '命名规则',
    subtitle: '附录 G',
    theme: 'default',
    items: [
      { type: 'text', content: '1. 只能由字母、数字、下划线组成。' },
      { type: 'text', content: '2. 开头只能是字母或者下划线。' },
      { type: 'text', content: '3. 不能与保留字（附录 B）或者库函数冲突。' },
      { type: 'subheading', content: '考察点' },
      { type: 'bullet', content: 'P23 表格：实型常量的表示方式' },
      { type: 'bullet', content: 'P23 表格：常用的转义字符' },
      { type: 'bullet', content: '单引号字符，双引号字符串' },
    ]
  },

  // Slide 9: 标识符例题
  {
    id: 'ch2-naming-example',
    title: '例题：合法标识符',
    theme: 'code',
    items: [
      { type: 'example', content: '以下选项中合法的用户自定义标识符是 ( )' },
      { type: 'bullet', content: '(A) 3%' },
      { type: 'bullet', content: '(B) 8num' },
      { type: 'bullet', content: '(C) for' },
      { type: 'bullet', content: '(D) _arca3' },
      { type: 'answer', content: '正确答案：D' },
      { type: 'table', content: '解析', headers: ['选项', '标识符', '合法性', '原因'], rows: [
        ['A', '3%', '❌', '不能以数字开头，且不能包含特殊字符 %'],
        ['B', '8num', '❌', '不能以数字开头'],
        ['C', 'for', '❌', 'for 是关键字/保留字'],
        ['D', '_arca3', '✅', '可以以下划线开头，包含字母、数字和下划线'],
      ]},
    ]
  },

  // Slide 10: 数据类型
  {
    id: 'ch2-datatypes',
    title: '常见数据类型所占空间',
    theme: 'default',
    items: [
      { type: 'table', content: '数据类型内存空间', headers: ['数据类型', '内存空间'], rows: [
        ['char', '1B'],
        ['short', '2B'],
        ['int / long / float', '4B'],
        ['long long / double', '8B'],
        ['指针', '4B'],
      ]},
    ]
  },

  // Slide 11: 输入输出
  {
    id: 'ch2-io',
    title: '输入输出',
    subtitle: '零碎的知识点比较多，看题',
    theme: 'default',
    items: [
      { type: 'subheading', content: '回顾' },
      { type: 'bullet', content: 'scanf/printf/putchar/getchar 用法？' },
      { type: 'bullet', content: '是否读空格/回车？' },
      { type: 'bullet', content: '浮点数的输入和输出？' },
      { type: 'bullet', content: '转义字符的输出？' },
      { type: 'subheading', content: '格式说明' },
      { type: 'code', content: '%-m.nf：左对齐占 m 位保留到 n 位小数', language: 'c' },
      { type: 'tip', content: '对应课本 26～28 页四张表' },
      { type: 'example', content: '已有 int i, j; float x; 为将 -20 赋给 i，12 赋给 j，410.34 赋给 x' },
      { type: 'code', content: 'scanf("%d,%d,%f",&i,&j,&x)', language: 'c' },
      { type: 'answer', content: '正确答案：-20,12,410.34' },
    ]
  },

  // Slide 12: 第三章标题
  {
    id: 'ch3-title',
    title: '第三章',
    subtitle: '运算符与表达式',
    theme: 'accent',
    items: [
      { type: 'heading', content: '重点' },
      { type: 'bullet', content: '运算符的使用' },
      { type: 'bullet', content: '自动类型转换' },
      { type: 'heading', content: '难点' },
      { type: 'bullet', content: '优先级与结合性' },
      { type: 'bullet', content: '前置++和后置++的区别' },
    ]
  },

  // Slide 13: 表达式求值
  {
    id: 'ch3-expression',
    title: '表达式求值',
    theme: 'code',
    items: [
      { type: 'bullet', content: '单变量表达式的值是变量的值' },
      { type: 'bullet', content: '赋值表达式的值是 = 最右边的值，求值顺序从右到左' },
      { type: 'bullet', content: '执行赋值语句，会先计算等号右边的表达式，再将结果赋值给左边的变量' },
      { type: 'bullet', content: '运算表达式的值是运算结果，表达式值的类型是表达式中精度最高的值类型' },
      { type: 'code', content: 'int a = 0;\nint b = 0;\n\na++     // 0\n++b     // 1', language: 'c' },
      { type: 'text', content: '后置 ++ 表达式的值是 a 的值，前置 ++ 表达式的值是 b+1 的值。表达式求值后，a 和 b 的值都会加 1。' },
    ]
  },

  // Slide 14: 前置后置记忆
  {
    id: 'ch3-increment',
    title: '前置/后置 ++ 记忆方式',
    theme: 'code',
    items: [
      { type: 'tip', content: '离 = 更近的是表达式的值' },
      { type: 'code', content: 'int a = 0;\nint b = 0;\n\nint resultA = a++;      // a  更近 a++的值是a\nint resultB = ++b;      // ++ 更近 ++b的值是b+1', language: 'c' },
    ]
  },

  // Slide 15: 运算符优先级
  {
    id: 'ch3-priority',
    title: '运算符优先级',
    subtitle: '考前抢记',
    theme: 'default',
    items: [
      { type: 'code', content: '单目 > 算术 > 位运算 > 逻辑 > 赋值 > 逗号', language: 'text' },
      { type: 'subheading', content: '逻辑短路' },
      { type: 'bullet', content: '对于 &&，从左到右遇到第一个值为 0 的表达式，则停止继续求值，并返回 0' },
      { type: 'bullet', content: '对于 ||，从左到右遇到第一个值为 1 的表达式，则停止继续求值，并返回 1' },
      { type: 'tip', content: '自动类型转换参见 P46，图 3-2' },
    ]
  },

  // Slide 16: 第三章例题
  {
    id: 'ch3-example',
    title: '例题：复合赋值运算',
    theme: 'code',
    items: [
      { type: 'example', content: '若 x 和 n 均是 int 型变量，且 x 的初值为 12，n 的初值为 5，则执行表达式 x%=(n%=2) 后 x 值为' },
      { type: 'bullet', content: '(A) 0' },
      { type: 'bullet', content: '(B) 6' },
      { type: 'bullet', content: '(C) 3' },
      { type: 'bullet', content: '(D) 12' },
      { type: 'answer', content: '正确答案：A' },
      { type: 'analysis', content: '计算步骤：\n1. 先算 n %= 2 → n = 5 % 2 = 1\n2. 再算 x %= 1 → x = 12 % 1 = 0' },
    ]
  },

  // Slide 17: 第四章标题
  {
    id: 'ch4-title',
    title: '第四章',
    subtitle: '程序流程控制',
    theme: 'accent',
    items: [
      { type: 'heading', content: '重点' },
      { type: 'bullet', content: '一层循环案例：累加/累乘' },
      { type: 'bullet', content: '二层循环案例：文本打印/排序' },
      { type: 'heading', content: '难点' },
      { type: 'bullet', content: '循环条件设置与次数控制' },
      { type: 'bullet', content: 'for 语句的执行过程' },
      { type: 'bullet', content: 'break 与 continue' },
    ]
  },

  // Slide 18: switch-case 和循环
  {
    id: 'ch4-switch-loop',
    title: 'switch-case 与循环语句',
    theme: 'default',
    items: [
      { type: 'subheading', content: 'switch-case 语句' },
      { type: 'text', content: '加 break 和不加 break 运行结果的区别' },
      { type: 'tip', content: '例题：P68，读程序第一题' },
      { type: 'subheading', content: '循环语句（很可能读程序写结果）' },
      { type: 'example', content: '下面有关 for 循环的正确描述是' },
      { type: 'bullet', content: '(A) for 循环只能用于循环次数已经确定的情况' },
      { type: 'bullet', content: '(B) for 循环是先执行循环体语句，后判定循环条件是否满足' },
      { type: 'bullet', content: '(C) 在 for 循环中，不能用 break 语句跳出循环体' },
      { type: 'bullet', content: '(D) for 循环与 while 循环一样，都是先判断后执行的当型循环' },
      { type: 'answer', content: '正确答案：D' },
    ]
  },

  // Slide 19: do-while 例题
  {
    id: 'ch4-dowhile',
    title: '例题：do-while 循环',
    theme: 'code',
    items: [
      { type: 'example', content: '以下程序段 ( )' },
      { type: 'code', content: 'x=1;\ndo\n{\n    x=x*x;\n}while(!x);', language: 'c' },
      { type: 'bullet', content: '(A) 是死循环' },
      { type: 'bullet', content: '(B) 循环体执行二次' },
      { type: 'bullet', content: '(C) 循环体执行一次' },
      { type: 'bullet', content: '(D) 有语法错' },
      { type: 'answer', content: '正确答案：C' },
      { type: 'analysis', content: '执行过程：\n1. x = 1\n2. 执行 x = x * x，x = 1\n3. 判断 !x，即 !1 = 0，条件为假\n4. 循环结束' },
    ]
  },

  // Slide 20: 函数
  {
    id: 'ch5-function',
    title: '函数',
    subtitle: '一组一起执行一个任务的语句',
    theme: 'code',
    items: [
      { type: 'subheading', content: '函数的定义' },
      { type: 'code', content: 'int foo(int x, int y) // 函数头：函数类型 函数名(参数列表)\n{\n    /* 函数体 */\n    return bar; // 返回值，若函数类型为void则留空\n}', language: 'c' },
      { type: 'subheading', content: '函数的调用' },
      { type: 'code', content: 'foo(1, 2);  // 常量作为参数\nfoo(a, b);  // 变量作为参数，也可以是表达式', language: 'c' },
      { type: 'subheading', content: '函数的声明' },
      { type: 'code', content: 'int foo(int x, int y);\nint foo(int, int);      // 这是由于函数声明的唯一性\nint foo(int x, int);    // ←这个奇怪的写法居然也是对的', language: 'c' },
    ]
  },

  // Slide 21: 参数传递
  {
    id: 'ch5-params',
    title: '参数传递：形参与实参',
    theme: 'default',
    items: [
      { type: 'bullet', content: '形参是函数中的一个局部变量' },
      { type: 'bullet', content: '实参是一个表达式，有一个值' },
      { type: 'bullet', content: '调用时使用实参的值初始化形参（复制一份）' },
      { type: 'bullet', content: '对于基本数据类型，形参的变化不影响实参涉及的变量' },
      { type: 'example', content: '若主函数中有定义 int str[10]={0}; 和函数调用语句 f(str);，则下列哪一个函数原型声明是错误的' },
      { type: 'bullet', content: '(A) void f(int a[]);' },
      { type: 'bullet', content: '(B) void f(int a[5]);' },
      { type: 'bullet', content: '(C) void f(int *a);' },
      { type: 'bullet', content: '(D) void f(int a);' },
      { type: 'answer', content: '正确答案：D（类型不匹配，数组不能传给 int）' },
    ]
  },

  // Slide 22: 递归
  {
    id: 'ch5-recursion',
    title: '递归',
    subtitle: '套娃',
    theme: 'code',
    items: [
      { type: 'text', content: '参见"递归"' },
      { type: 'text', content: '如果你不知道什么是"递归"，参见"递归"。← 注意结束条件' },
      { type: 'code', content: 'int f(int x)\n{\n    if (x == 1) return 1;\n    else return (x * f(x-1));\n}\n\nf(4)->4*f(3)->4*(3*f(2))->4*(3*(2*f(1)))  // 递\nf(4)==24 <- f(3)==6 <- f(2)==2 <- f(1)==1 // 归', language: 'c' },
    ]
  },

  // Slide 23: 变量存储期
  {
    id: 'ch5-storage',
    title: '变量存储期',
    theme: 'default',
    items: [
      { type: 'subheading', content: '自动（auto）存储期：作用域开始到作用域结束' },
      { type: 'bullet', content: '局部变量：语句块内定义，从定义开始作用到语句块结束，未初始化则为随机值' },
      { type: 'bullet', content: 'auto 修饰的变量（局部变量默认被 auto 修饰）' },
      { type: 'subheading', content: '静态（static）存储期：程序开始到程序结束' },
      { type: 'bullet', content: 'static 修饰的变量' },
      { type: 'bullet', content: '字符串字面量' },
      { type: 'bullet', content: '全局变量：函数体外定义，未初始化则默认为 0' },
    ]
  },

  // Slide 24: 静态变量例题
  {
    id: 'ch5-static-example',
    title: '例题：静态局部变量',
    theme: 'code',
    items: [
      { type: 'example', content: '下面关于静态局部变量的描述，不正确的是' },
      { type: 'bullet', content: '(A) 静态局部变量只做一次初始化' },
      { type: 'bullet', content: '(B) 静态局部变量的作用域为整个程序' },
      { type: 'bullet', content: '(C) 静态局部变量生命期与全局变量相同' },
      { type: 'bullet', content: '(D) 静态局部变量作用域与自动局部变量相同' },
      { type: 'answer', content: '正确答案：B' },
      { type: 'table', content: '解析', headers: ['选项', '描述', '正确性', '说明'], rows: [
        ['A', '只做一次初始化', '✅', 'static 变量仅初始化一次'],
        ['B', '作用域为整个程序', '❌', '作用域仍在定义的语句块内'],
        ['C', '生命期与全局变量相同', '✅', '都是程序开始到结束'],
        ['D', '作用域与自动局部变量相同', '✅', '都是局部作用域'],
      ]},
    ]
  },

  // Slide 25: 数组
  {
    id: 'ch6-array',
    title: '数组',
    subtitle: '定义与初始化',
    theme: 'code',
    items: [
      { type: 'code', content: 'int a[5];\nint a[5] = {1,2,3,4,5};\nint a[5] = {1,2,3};       /* a[3]和a[4]默认为0 */\nint a[5] = {0};           /* 全都是0 */\nint a[] = {1,2,3,4,5};    /* 长度依然为5 */', language: 'c' },
      { type: 'subheading', content: '访问 —— 从 0 开始' },
      { type: 'code', content: 'a[0], a[1]\na[5]     // 越界访问\na[-1]    // 越界访问', language: 'c' },
    ]
  },

  // Slide 26: 二维数组
  {
    id: 'ch6-2darray',
    title: '二维数组',
    theme: 'code',
    items: [
      { type: 'subheading', content: '定义与初始化' },
      { type: 'code', content: 'int a[3][4];\nint a[3][4] = {1,2,3,4,5,6,7,8,9,10,11,12};\nint a[3][4] = {{1,2,3,4},{5,6,7,8},{9,10,11,12}};\nint a[3][4] = {1,2,3,4,5,6};\nint a[3][4] = {{1,2},{3,4},{5,6}};\n/* 每个大括号里都是一个一维数组 */\nint a[][4]  = {1,2,3,4,5,6,7,8,9,10};', language: 'c' },
      { type: 'subheading', content: '访问' },
      { type: 'code', content: 'a[0][0]\na[2][3]', language: 'c' },
      { type: 'tip', content: '多维数组的本质是数组的数组' },
    ]
  },

  // Slide 27: 二维数组例题
  {
    id: 'ch6-array-example',
    title: '例题：二维数组',
    theme: 'code',
    items: [
      { type: 'example', content: '若有说明：int a[][4]={{1,2},{3,5},{6,7},{0}}; 则数组 a 的第一维的大小为' },
      { type: 'answer', content: '正确答案：4' },
      { type: 'analysis', content: '数组初始化分析：\n第二维必须指定(4)，第一维可省略，由初始化列表确定\n共有 4 个大括号对应 4 行' },
      { type: 'table', content: '数组结构', headers: ['行号', '初始化内容'], rows: [
        ['a[0]', '{1,2} → 补齐为 {1,2,0,0}'],
        ['a[1]', '{3,5} → 补齐为 {3,5,0,0}'],
        ['a[2]', '{6,7} → 补齐为 {6,7,0,0}'],
        ['a[3]', '{0} → 补齐为 {0,0,0,0}'],
      ]},
    ]
  },

  // Slide 28: 指针
  {
    id: 'ch7-pointer',
    title: '指针',
    theme: 'code',
    items: [
      { type: 'text', content: '运算符 & 作用于单个变量可以获得它的地址，指针类型变量可以存储一个地址值' },
      { type: 'subheading', content: '常见的说法' },
      { type: 'bullet', content: '指针是指针变量的简称' },
      { type: 'bullet', content: '"指针指向 a" 表示 "指针变量存储变量 a 的地址"' },
      { type: 'text', content: '运算符 * 作用于指针变量可以访问到指针指向的数据' },
      { type: 'code', content: 'int a = 0;\nint* ptr = &a;\n*ptr = 1;', language: 'c' },
    ]
  },

  // Slide 29: 指针危险行为
  {
    id: 'ch7-pointer-danger',
    title: '指针：危险行为',
    theme: 'default',
    items: [
      { type: 'bullet', content: '不可以访问内存地址为 0，即值为 NULL 的数据' },
      { type: 'bullet', content: '不可以访问随意给定的内存地址的数据（0x114514）' },
      { type: 'bullet', content: '不可以访问未被初始化的指针指向的数据' },
      { type: 'subheading', content: '改写变量声明，以增强可读性' },
      { type: 'code', content: '// 1. 将类型修饰符 * 放在类型右边\nint *ptr = &a;  // 改写为\nint* ptr = &a;\n\n// 2. 多变量声明拆成多个语句\nint x, y, *ptr1, *ptr2;  // 改写为\nint x;\nint y;\nint* ptr1;\nint* ptr2;', language: 'c' },
    ]
  },

  // Slide 30: const与指针
  {
    id: 'ch7-const-pointer',
    title: 'const 修饰词语法',
    theme: 'code',
    items: [
      { type: 'bullet', content: 'const 加在类型前后效果等价' },
      { type: 'bullet', content: '对同一类型的 const 修饰重复多次等同于一次' },
      { type: 'bullet', content: '对于 const 修饰指针本身而言，const 应移至类型后防止歧义' },
      { type: 'subheading', content: '* 类型修饰符语法' },
      { type: 'bullet', content: '* 左边的类型是指针所指向的类型' },
    ]
  },

  // Slide 31: 指针例题
  {
    id: 'ch7-pointer-example',
    title: '例题：指针与地址',
    theme: 'code',
    items: [
      { type: 'example', content: '设有语句 int *point, i=10; 和 point=&i; 则下面全部代表地址的一组选项为' },
      { type: 'bullet', content: '(A) i, point, *&i' },
      { type: 'bullet', content: '(B) &*i, &i, *point' },
      { type: 'bullet', content: '(C) *&point, *point, &i' },
      { type: 'bullet', content: '(D) &i, &*point, point' },
      { type: 'answer', content: '正确答案：D' },
      { type: 'code', content: 'point == &i           // 两者都是i的地址\n&*point == &i         // 对指针解引用再取地址，回到原地址\n*&i == i              // 对变量取地址再解引用，回到原值\n*&point == point      // 对指针取地址再解引用，回到指针本身', language: 'c' },
    ]
  },

  // Slide 32: 地址偏移
  {
    id: 'ch7-offset',
    title: '地址偏移',
    theme: 'code',
    items: [
      { type: 'code', content: 'int a[4] = {1, 2, 3, 4};\n\n&a[0] == 100;     // 假设\n&a[0] + 1 == 104; // 104 == 100 + sizeof(int) \n&a[0] + 2 == 108; // 108 == 100 + sizeof(int) * 2', language: 'c' },
      { type: 'text', content: '偏移：对 T 类型的指针进行 +/- 运算。每加上或减去 1，则地址向后或向前偏移一个 sizeof(T)' },
      { type: 'subheading', content: '数组名不是指针' },
      { type: 'text', content: '对于数组名 arr，sizeof(arr) 得到的是数组所占内存空间。数组名作为表达式的值是数组首地址，且此表达式的值不可更改。' },
    ]
  },

  // Slide 33: [] 运算符
  {
    id: 'ch7-bracket',
    title: '[] 运算符',
    theme: 'code',
    items: [
      { type: 'code', content: 'a[0] == *(a + 0);   // a + 0 == 100\na[1] == *(a + 1);   // a + 1 == 104\na[2] == *(a + 2);   // a + 2 == 108\na[3] == *(a + 3);   // a + 3 == 112\na[4] == *(a + 4);   // 越界访问！ a + 4 == 116', language: 'c' },
      { type: 'tip', content: '[] 内的数字就是对地址的偏移量' },
      { type: 'subheading', content: '查看变量类型技巧："摘帽子"' },
      { type: 'code', content: 'int arr[][4] = { /*...*/ };\nint[4] arr[] = { /*...*/ };     // \'int[4]\' is an array\nint arr[4][] = { /*...*/ };\nint[] arr[4] = { /*...*/ };     // what is \'int[]\' ???', language: 'c' },
      { type: 'tip', content: '数组类型作为函数参数时，会发生类型退化（如 int arr[5] 退化为 int*）' },
    ]
  },

  // Slide 34: 字符串
  {
    id: 'ch8-string',
    title: '字符串',
    subtitle: '在内存中的存储形式',
    theme: 'code',
    items: [
      { type: 'text', content: '双引号包围的字符串末尾有字符 \'\\0\' 表示字符串结束' },
      { type: 'code', content: '"hello"\n┌─────┬─────┬─────┬─────┬─────┬──────┐\n│ \'h\' │ \'e\' │ \'l\' │ \'l\' │ \'o\' │ \'\\0\' │\n└─────┴─────┴─────┴─────┴─────┴──────┘', language: 'text' },
      { type: 'tip', content: '整型数字 0 和 字符 \'\\0\' 等价' },
    ]
  },

  // Slide 35: 字符串与指针
  {
    id: 'ch8-string-pointer',
    title: '字符串与指针',
    theme: 'code',
    items: [
      { type: 'text', content: '字符串的本质是字符数组，字符数组经过类型退化后变成了 char*，此时指针的值是字符串的首地址。' },
      { type: 'code', content: 'char* str = "hello"\nstr == &"hello";', language: 'c' },
      { type: 'text', content: '注意上面两种赋值方式虽然效果一样，但是原理完全不同：' },
      { type: 'bullet', content: '第一行是字符串退化为指针类型，赋值给指针' },
      { type: 'bullet', content: '第二行是获得字符串的地址，将它赋值给指针' },
      { type: 'text', content: '将字符串赋值给字符数组时会将字符串的每个字符依次复制到数组中' },
    ]
  },

  // Slide 36: 字符串函数
  {
    id: 'ch8-string-func',
    title: '字符串处理函数',
    theme: 'code',
    items: [
      { type: 'tip', content: '开卷考试请看课本了解这些函数有什么功能以及如何使用，闭卷考试需要考前背诵' },
      { type: 'code', content: 'strlen(), strcpy(), strcat(), strcmp(), strupr(), strlwr()', language: 'c' },
      { type: 'tip', content: '注意：这些函数的第一个参数是目标字符串' },
    ]
  },

  // Slide 37: 编译预处理
  {
    id: 'ch9-preprocess',
    title: '编译预处理',
    theme: 'code',
    items: [
      { type: 'code', content: '#include\n#define PI 3.14159\n#define SUB(a,b) a-b\n\n#ifdef\n#else\n#endif\n#ifndef\n#undef', language: 'c' },
      { type: 'tip', content: '#define 只完成替换，不执行任何表达式求值' },
    ]
  },

  // Slide 38: 宏定义例题
  {
    id: 'ch9-macro-example',
    title: '例题：宏定义',
    theme: 'code',
    items: [
      { type: 'example', content: '若有宏定义如下：#define M(x,y) x*y，则 M(2+8,4) 的值是' },
      { type: 'bullet', content: '(A) 40' },
      { type: 'bullet', content: '(B) 34' },
      { type: 'bullet', content: '(C) 14' },
      { type: 'bullet', content: '(D) 16' },
      { type: 'answer', content: '正确答案：B' },
      { type: 'analysis', content: '宏展开过程：\nM(2+8,4)\n↓ 文本替换\n2+8*4\n↓ 运算符优先级（* 高于 +）\n2 + 32 = 34' },
    ]
  },

  // Slide 39: 结构体
  {
    id: 'ch10-struct',
    title: '结构体',
    theme: 'code',
    items: [
      { type: 'bullet', content: '初始化方式类似于数组' },
      { type: 'bullet', content: '普通变量访问方式 a.x' },
      { type: 'bullet', content: '结构体指针 Point *p = &a;' },
      { type: 'bullet', content: '指针访问方式 p->x 或 (*p).x（注意括号）' },
    ]
  },

  // Slide 40: 结构体例题
  {
    id: 'ch10-struct-example',
    title: '例题：结构体嵌套访问',
    theme: 'code',
    items: [
      { type: 'example', content: '已知教师记录描述为：' },
      { type: 'code', content: 'struct teacher\n{\n    int id;\n    struct {int y; int m; int d;} birth;\n} t;', language: 'c' },
      { type: 'text', content: '将变量 t 中的 d 成员赋值为 25 的语句为：' },
      { type: 'answer', content: 't.birth.d = 25;' },
      { type: 'analysis', content: '结构图示：\nt (teacher类型)\n├── id\n└── birth (匿名结构体)\n    ├── y\n    ├── m\n    └── d  ← 目标成员' },
    ]
  },

  // Slide 41: 文件
  {
    id: 'ch11-file',
    title: '文件',
    theme: 'default',
    items: [
      { type: 'subheading', content: '文件指针 FILE*' },
      { type: 'subheading', content: '理解记忆' },
      { type: 'code', content: 'r w a [ b + ]  （课本 P232 表格）', language: 'text' },
      { type: 'example', content: '若已存在一个 new.txt 文件，则函数 fopen("new.txt","w+") 的功能描述错误的是' },
      { type: 'bullet', content: '(A) 打开 new.txt 文件，消除原有的内容' },
      { type: 'bullet', content: '(B) 打开 new.txt 文件，可以写入新的内容' },
      { type: 'bullet', content: '(C) 打开 new.txt 文件，只能读取原有的内容' },
      { type: 'bullet', content: '(D) 打开 new.txt 文件，可以写入新的内容，也可以读取新写入的内容' },
      { type: 'answer', content: '正确答案：C' },
      { type: 'tip', content: '"w+" 模式：w = 写入模式(清空原有内容)，+ = 可读可写' },
    ]
  },

  // Slide 42: 典型大题
  {
    id: 'ch12-bigq',
    title: '典型的大题',
    theme: 'code',
    items: [
      { type: 'example', content: '以下程序的执行结果是' },
      { type: 'code', content: '#include<stdio.h>\n\nint func(int n)\n{\n    static int m=1;\n    do{\n        m=m*5+n%10;\n        n=n/10;\n    }while(n);\n    return m;\n}\n\nint main()\n{\n    int n=10;\n    printf("%d,",func(n));\n    printf("%d\\n",func(5));\n    return 0;\n}', language: 'c' },
    ]
  },

  // Slide 43: 典型大题解析
  {
    id: 'ch12-bigq-answer',
    title: '大题解析',
    theme: 'code',
    items: [
      { type: 'answer', content: '正确答案：26,135' },
      { type: 'tip', content: '关键点：m 是 static 静态变量，初始化只执行一次，值会保留' },
      { type: 'subheading', content: '第一次调用：func(10)' },
      { type: 'table', content: '计算过程', headers: ['次数', '计算过程', 'm值', 'n值'], rows: [
        ['初始', 'm = 1（首次初始化）', '1', '10'],
        ['1', 'm = 1×5 + 10%10 = 5+0', '5', '1 (10/10)'],
        ['2', 'm = 5×5 + 1%10 = 25+1', '26', '0 (1/10)'],
      ]},
      { type: 'subheading', content: '第二次调用：func(5)' },
      { type: 'text', content: 'm = 26（保留上次的值！static 变量不重新初始化）' },
      { type: 'table', content: '计算过程', headers: ['次数', '计算过程', 'm值', 'n值'], rows: [
        ['初始', 'm = 26（保留）', '26', '5'],
        ['1', 'm = 26×5 + 5%10 = 130+5', '135', '0 (5/10)'],
      ]},
    ]
  },

  // Slide 44: 总结
  {
    id: 'summary',
    title: '回顾',
    subtitle: '考前最后一遍',
    theme: 'accent',
    items: [
      { type: 'bullet', content: '第一章：冯诺伊曼、进制转换、内存单位' },
      { type: 'bullet', content: '第二章：命名规则、数据类型、输入输出' },
      { type: 'bullet', content: '第三章：运算符优先级、++前后置、逻辑短路' },
      { type: 'bullet', content: '第四章：循环控制、break/continue' },
      { type: 'bullet', content: '函数：定义声明调用、形参实参、递归' },
      { type: 'bullet', content: '变量：存储期、作用域、static' },
      { type: 'bullet', content: '数组：一维二维、初始化、越界' },
      { type: 'bullet', content: '指针：地址偏移、数组退化、const' },
      { type: 'bullet', content: '字符串：\\0结尾、处理函数' },
      { type: 'bullet', content: '预处理：#define宏替换' },
      { type: 'bullet', content: '结构体：.访问、->访问' },
      { type: 'bullet', content: '文件：fopen模式' },
      { type: 'tip', content: '开卷考试请看课本了解函数功能及使用，闭卷考试需要考前背诵' },
    ]
  },

  // Slide 45: 结束
  {
    id: 'end',
    title: '祝考试顺利！',
    subtitle: '南邮校科协 SAST.2026',
    theme: 'accent',
    items: [
      { type: 'text', content: '🎉 加油！' },
    ]
  },
];

export const totalSlides = slides.length;
