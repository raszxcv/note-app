# notes-app-2

> A Vue.js project
> 自己重新写了note-app这个项目,添加了一些过渡效果和markdown转换功能.


## 目的
为了尽快熟悉vuex和vue-resource以及vue-cli脚手架下的模块化开发.

以后会逐步升级完善这个note-app,这个项目来自[出处](https://coligo.io/learn-vuex-by-building-notes-app/).外观是直接借用,代码全部自己重构.具体可以自行参考源码.

## 升级日志
2017.3.5 添加搜索笔记高亮功能
2017.3.5 修复无内容转换BUG

## 提醒
- 该项目使用的是vue-cli提供的webpack-simple模板,所以css文件的兼容性前缀没有设置自动添加.如果不想手动添加,可以使用webpack模板.
- 由于rate-limiting的限制,转换markdown文档次数不能超过60次每小时.由于该app每次新建以及更新高亮状态都会自动转换一次,所以使用过程中可能很快就无法转换markdown文档.正在研究学习离线的markwodn转换方法.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
