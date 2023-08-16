import Log from "../../lib";

const log = new Log({
  env: 'uat',
  appcode: 'setting',
  loggroup: 'roc'
})

log.use(async (ctx, next) => {
  ctx.content.a = 1;
  await next()
})

log.use((ctx, next) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      ctx.content.b = 2
      resolve(ctx);
      next()
    }, 3000)
  })
})

export default () => {

  const onClick = () => {
    log.error({
      test: 'test',
      cxx: '测试日志',
      tiem: Date.now()
    })
  }
  return (
    <div>
      <button onClick={onClick}>发送日志</button>
    </div>
  )
}