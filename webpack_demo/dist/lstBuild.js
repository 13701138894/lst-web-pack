!function(modules){
    // 缓存
    const installModules = {}
    function __lst_pack__(moduleId){
        // 是否缓存
        if(installModules[moduleId]){
            return installModules[moduleId].exports
        }
        let modules = installModules[moduleId] = {
            exports: {}
        }
        modules[moduleId].call(modules.exports,module,exports,__lst_require__)
        return module.exports
    }
    return __lst_require__('./src/index.js')
}("./src/index.js":function(module,exports,__lst_require__){
            eval('const sayHi = __lst_require__("./src\a.js");

sayHi('啦啦啦')') 
        }
        ,"./src\a.js":function(module,exports,__lst_require__){
            eval('const sayAge = __lst_require__("./src\common\util.js");
module.exports = (name) =>{
    console.log('hello a.js' + name)
    sayAge(18)
}') 
        }
        ,"./src\common\util.js":function(module,exports,__lst_require__){
            eval('module.exports = (age) =>{
    console.log('你今年'+ age + '岁了')
}') 
        }
        ,) 