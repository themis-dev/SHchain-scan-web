import request from '@/utils/request'

export function getNodeList() {
  return request({
    url: `/scan/nodelist`,
    method: 'get'
  })
}


export function getNodeInfoApi(address) {
  return request({
    url: `/scan/node/info?address=${address}`,
    method: 'get'
  })
}