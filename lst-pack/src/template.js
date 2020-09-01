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
    return __lst_require__('__entry__')
}(__module_content__) 