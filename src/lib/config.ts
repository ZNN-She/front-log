// @ts-ignore
import md5 from 'md5'

const HOST = {
  'dev': 'http://dev.com',
  'test': 'http://test.cn',
  'uat': 'https://uat.cn',
  'prod': 'https://prod.cn'
}

const PATH = '/front-log'

const LOG_KEY = 'xxxxx'

type IENV = 'dev' | 'test' | 'uat' | 'prod'

function getUrl(dev: IENV) {
  return `${HOST[dev]}${PATH}`
}

function getLogKey() {
  return LOG_KEY
}

function encrypt(params: any) {
  const res = md5(JSON.stringify(params)+LOG_KEY)
  return res;
}

export type { IENV }

export {
  getUrl,
  getLogKey,
  encrypt
}
