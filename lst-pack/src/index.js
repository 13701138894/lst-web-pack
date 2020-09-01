#! /usr/bin/env node
const path = require('path')
const fs = require('fs')
let defaultConfig = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    }
}

let config = {...defaultConfig,...require(path.resolve('./lst.config.js'))}

class LstPath {
    constructor(config){
        this.config = config;
        this.entry = config.entry;
        // 当前工作目录 执行当前命令所在目录
        this.root = process.cwd();
        // 存储所有代码
        this.module = {};
        this.template = ''
    }
    parse(code,parent){
        let deps = [];
        // 能够解析文件依赖 require('XX.js')
        let r = /require\('(.*)'\)/g
        // require('XX')替换为__lst_require__
        code = code.replace(r,function(match,arg){
            // let str = arg.replace(/'|"/g);
            // console.log('arg',arg)   ./a
            // const resPath = path.join(parent,str,'');
            // console.log(parent,str,resPath) // ./src ./a src\a

            const retPath = path.join(parent,arg.replace(/'|"/g),'');
            // const retPath = path.join(parent,arg,'');
            deps.push(retPath);
            return `__lst_require__("./${retPath}")`
        })
        // console.log(deps)
        return { code, deps }
    }
    createModule(modulePath,name){
        if(this.module[modulePath]){
            // 出现循环引用
        }
        const fileContent = fs.readFileSync(modulePath,'utf-8');
        // console.log(fileContent);
        // 替换后的代码和依赖数组
        const { code, deps } = this.parse(fileContent,path.dirname(name))
        // console.log(code, deps);
        this.module[name] = `function(module,exports,__lst_require__){
            eval(\'${code}\') 
        }
        `
        // 循环获取所有依赖数组的内容
        deps.forEach(dep=>{
            this.createModule(path.join(this.root,dep),'./'+dep)
        })
    }
    generateModuleStr(){
       let fnTemp = "";
       Object.keys(this.module).forEach(name=>{
           fnTemp += `"${name}":${this.module[name]},`
       }) 
       return fnTemp
    }
    generateFile(){
        let template = fs.readFileSync(path.resolve(__dirname,'./template.js'),'utf-8')
        this.template = template.replace('__entry__',this.entry)
                    .replace('__module_content__',this.generateModuleStr())
        fs.writeFileSync('./dist/'+this.config.output.filename,this.template)
        console.log('写入文件完毕')
    }
    start(){
        console.log('开始执行获取路径');
        const entryPath = path.resolve(this.root,this.entry);
        this.createModule(entryPath,this.entry)
        console.log(this.module)
        // 生成新文件
        this.generateFile()
        // console.log(this.root) 
        // C:\Users\Linshentai\Desktop\demo\webpack_demo
        // console.log(this.entry)
        // ./src/index.js
        // console.log(entryPath)
        // C:\Users\Linshentai\Desktop\demo\webpack_demo\src\index.js
    }
}

let lst = new LstPath(config);
lst.start()
// console.log(defaultConfig)