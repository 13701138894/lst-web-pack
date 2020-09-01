0、读取webpack.config.js
1、解析文件依赖
2、替换require 为 __webpack_require__
3、本地使用{}存储所有的文件，然后通过使用为__webpack_require__获取问价内容，执行函数

<!-- @ todo
加上loader
加上plugin机制 -->

配置文件 lst.config.js

package.json 中 添加 bin
bin 注册本地命令
本地安装 npm link  把当前命令执行到本地全局
"bin": {
    "lst-pack": "./src/index.js"
}


1、webpack具体做了几件事
    1、文件依赖解析
    2、文件内容替换
        1、loader文件转换
        2、require('xxx.css')
        3、require('xxx.less')
        4、require('xxx.png')
    3、tapable 
    4、compile有很多钩子 ，每个钩子可以做额外的事情，plugin
