# React Component Builder

## 前置要求
安装 Node 环境，最低要求 Node.js 6 LTS 版本。<br />
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

### Mac 系统推荐使用 [Homewbrew](https://brew.sh/) 或 [NVM](https://github.com/creationix/nvm) 安装 Node.js

1. Homebrew
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install node
```

2. NVM
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash
nvm install node
```

更多 NVM 介绍: [安裝多版本 Node.js](http://km.oa.com/group/1847/articles/show/272868)

## 安装
```bash
npm install -g recombl
```

## 初始化
在当前目录下，生成一个完整的项目文件夹，包含配置文件。
```bash
reco init [project_name]
```
```
.
├── client
│   ├── container
│   │   └── index.js
│   ├── html
│   │   └── index.html
│   ├── image
│   ├── slice
│   └── style
│       └── index.scss
├── config
│   └── pageConfig.js
├── package.json
└── userConfig.js
```
### 配置

#### 用戶配置 userConfig.js
```js
module.exports = {
  jsPath: "client/container",
  stylePath: "client/style",
  htmlPath: "client/html",
  projectName: "my-project-1",
  userName: "hoyangtsai",
  sprites: {
    spritesmith: {
      padding: 4
    },  //雪碧图间距
    retina: true,  //retina屏幕
    ratio: 3  //图片分倍率
  },
  webpack: {
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    },
    resolve: {
      alias: {
        "component": "",  //组件路径
        "currentDir": process.cwd()
      }
    }
  },
  browsersList: [
    'last 4 versions',
    'Android >= 4.0',
    'Chrome >= 37',
    'iOS>=7'
  ],
  postcss: false, //true or false
  pageConfig: "config/pageConfig.js"
}
```
* postcss 设置 `true`，使用 QQ浏览器 postcss 默认配置 (autoprefixer, postcss-flexbugs-fixes, postcss-gradientfixer)
* pageConfig 不同用户可指定不同页面配置

#### 页面配置 config/pageConfig.js
```js
module.exports = {
  path: "",  //页面层级
  entry: ["index"], //页面文件列表 Array or Object
  commonsChunk: {
    name: null,  //公共js、样式文件名，默认common
    minChunks: null,  //至少几个文件出现才抽取公共
    exclude: []
  },
  sprites: {  //覆写 userConfg.js 雪碧图配置
    spritesmith: {
      padding: 4
    },
    retina: true,
    ratio: 3
  },
  // external loaders for webpack
  extLoaders: [
    {
      test: /\.(jpe?g|png|gif|ttf|eot|woff2?)(\?.*)?$/,
      loader: require.resolve('myapp-file-loader') + '?name=[path][name].[ext]'
    }
  ]
}
```
* path

  > 如果多人开发一个项目文件夾，填入 js 入口文件对应的 html 和 style 路径。不需要可以留空。

* entry

  > 页面 js 入口文件，通常一个 js 入口文件对应一个 html 文件，可以是数组或对象。

```js
// array
entry: ['page1', 'page2', 'page3'];
// object
entry: {
  'page1': ['page1/sub-page-1', 'page1/sub-page-2', 'page-sub-page-3'],
  'page2': ['page2/sub-page-1', 'page2/sub-page-2']
}
```

* commonsChunk

  > 1. name - 生成公用的 js 和 css 文件名，填 `null` 默认文件名为 common。
  > 2. minChunks (false | Infinity | null | Number) - 多少页面引同一个文件才生成共用文件。
  > 3. exclude - 排除不抽出做公共組件的頁面。

* extLoaders

  > 支持外部引入其他 loader。

## 开发模式
启动 webpack-dev-server 与 inline mode 和 Hot Module Replacement 对源码进行实时编译。
```bash
reco serve
```
### 引数 argument
`-i, --ip` 选填；本地运行ip，默认localhost。
`-p, --port` 选填；本地运行端口，默认8003。
`-o, --open` 选填；编译完成后，自动开启浏览器进行预览。

## 生成新模版
读取 pageConfg.js 中 entry 生成新模版，其中包含 js, html 和 scss 文件。
```bash
reco new
```

## 生成静态文件
将目前源文件打包成静态文件，生成至 publish 文件夹底下。
```bash
reco build
```
### 引数 argument
`-m, --minimize` 选填；压缩 js 和 css 文件。

## 上传重构测试服务器
将 publish.zip 用 http request 方式上传到指定服务器
```bash
reco upload
```
### 引数 argument
`-h` 选填；指定服务器位址。<br>
`-u` 选填；用户名称。<br>
`-p` 选填；项目名称。<br>
`-o, --open` 选填；上传完成后，自动开启浏览器进行预览。

## FAQ
