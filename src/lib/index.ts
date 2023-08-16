/**
 * LTS 日志上报功能
 * 
 */
import compose, { Middleware } from 'koa-compose'
import wxrequire from './wxrequire'
import webrequire from './webrequire'
import { IENV, getUrl, encrypt } from './config'

interface IOptions {
  env: IENV
  appcode: string
  loggroup: string
}

interface IContext {
  env: IENV,
  appcode: string
  loggroup: string
  headers: {
    [key: string]: string
  },
  content: {
    [key: string]: any
  }
}

class Log {
  context: IContext
  middlewareList: Middleware<IContext>[] = []

  constructor(options: IOptions) {
    this.context = {
      env: options.env,
      appcode: options.appcode,
      loggroup: options.loggroup,
      headers: {
        // 'logkey': logKey,
        'logcode': options.appcode,
        loggroup: options.loggroup
      },
      content: {}
    }
  }

  use(fn: Middleware<IContext>) {
    this.middlewareList.push(fn)
    return this
  }

  require() {
    try {
      // 微信小程序环境
      // @ts-ignore
      if (typeof wx === 'object' && typeof wx.request === 'function') {
        wxrequire(
          getUrl(this.context.env),
          this.context.content,
          this.context.headers
        )
      } else if (window && typeof window.fetch === 'function') { // web环境
        webrequire(
          getUrl(this.context.env),
          this.context.content,
          this.context.headers
        )
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async send(params: any, logType: 'info' | 'warn' | 'error') {
    await compose(this.middlewareList)(this.context)

    const content = {
      ...this.context.content,
      ...params
    }

    const headers = {
      ...this.context.headers,
      logtype: logType,
      logkey: encrypt(content)
    }

    this.context = {
      ...this.context,
      content: content,
      headers: headers
    }

    this.require();
  }

  info(params: any) {
    this.send(params, 'info')
  }

  warn(params: any) {
    this.send(params, 'warn')
  }

  error(params: any) {
    this.send(params, 'error')
  }
}

export interface ILog {
  context: IContext
  middlewareList: Middleware<IContext>[]
  info: (params: any) => {}
  warn: (params: any) => {}
  error: (params: any) => {}
}

export default Log;