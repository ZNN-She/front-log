function send(url: string, params: any, header: {[key: string]: string}) {
  window.fetch(
    url,
    {
      method: 'POST', //仅为示例，并非真实的接口地址
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        ...header
      }
    })
}

export default send
