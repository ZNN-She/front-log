# 前端日志监控上报插件


## 使用

### 安装
```
yarn add front-log
```
### 使用
### 场景一：接口异常上报
* 比如接口400、404、500等错误上报
```js
import Log from "front-log";
const log = new Log({
  env: 'dev',
  appcode: 'test-appcode',
  loggroup: 'roc'
})

// 接口挂了
if(res.statusCode !== 200 && res.statusCode !== 401){
  log.error({
    request: {/* 这里是请求的参数 */},
    hedader: {/**这里可一把header信息加入 header一般有token等信息 */}
  });
}

// 业务异常
if(res.data.code !== 0){
  log.info({
    request: {/* 这里是请求的参数 */},
    hedader: {/**这里可一把header信息加入 header一般有token等信息 */}
  });
}
```
### 场景二：小程序代码异常上报
```js
import Log from "front-log";

const log = new Log({
  env: 'dev',
  appcode: 'test-appcode',
  loggroup: 'roc'
})

wx.onError((err) => {
  log.warn({content: err});
})
```

### 场景三：web代码码异常上报
```js
import Log from "front-log";

const log = new Log({
  env: 'dev',
  appcode: 'test-appcode',
  loggroup: 'roc'
})

// 全局监听error
window.addEventListener('error', (event) => {
    log.warn({content: event})
});
```

## 中间件
```js
import Log from "front-log";

const log = new Log({
  env: 'dev',
  appcode: 'test-appcode',
  loggroup: 'roc'
})

// 添加中间件
log.use(async (ctx, next) => {
  ctx.content.headers = {
    ...ctx.context.headers,
    Authorization: Taro.getStorageSync('Authorization') // token添加进去Authorization 这里是以门店助手为例子，
  };
  await next()
})

log.use((ctx, next) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      ctx.content.b = 2 //  其它参数
      resolve(ctx);
      next()
    }, 3000)
  })
})

log.info({
  test: 'test'
})

```

## options

| 参数 | 说明   | 类型  | 是否必传 | 默认值 | 版本 |
| - | - | - | - | - | - |
| env | 环境 | dev/test/uat/prod | 是 | 无 | * | 
| appcode | 应用的唯一标识 | string | 是 | 无 | * | 
| loggroup | 告警分组，用来标记那条业务线，告警消息发送到哪里 | string | 是 | 无 | * | 

## log 实例

| 方法 | 说明   | 类型 | 版本  |
| - | - | - | - |
| use | 注册中间 | Promise<(ctx, next) => void> | * | 
| info | 常规日志 | (params) => void | * | 
| warn | 警告日志 | (params) => void | * | 
| error | 严重会触发告警 | (params) => void | * | 

## 告警配置

> 需要找运维配置告警规则，给运维提供appcode、loggroup、logintype  
> 运维会给每个项目建立一个告警规则
> 告警查询语句举例：content : #"Logcode:setting" and content : #"Loggroup:roc" and #"Logtype:error"

* logintype的值
  * info
  * warn
  * error

## 告警消息
 > *注意：告警消息只有线上会触发，其他环境不会触发。如遇到非线上环境不触发或接口问题请不要慌张；*

告警图片删除了


## 测试环境查看日志

删除了

```shell
# 登录服务器后 执行以下命令进行查看
删除了
```
服务器图片删除了