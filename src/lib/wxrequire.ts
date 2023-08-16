function send(url: string, params: any, header: {[key: string]: string}) {
  // @ts-ignore
  wx.request({
    method: 'POST',
    url: url,
    data: params,
    header: {
      'content-type': 'application/json',
      ...header
    },
  })
}

export default send
