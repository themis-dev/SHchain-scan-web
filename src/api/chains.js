import request from '@/utils/request'

// 首页查询框（支持区块号，交易哈希，eth地址）
export function getSearch(data) {
  return request({
    url: `/scan/search/${data}`,
    method: 'get'
  })
}

// 区块列表
export function getBlockList(params) {
  return request({
    url: `/scan/list/block/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}

// 交易列表
export function getTxList(params) {
  return request({
    url: `/scan/list/tx/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}

// 查询最新的n个区块信息
export function getNewBlockList(num) {
  return request({
    url: `/scan/list/block/${num}`,
    method: 'get'
  })
}

// 查询最新的n比交易
export function getNewTxList(num) {
  return request({
    url: `/scan/list/transaction/${num}`,
    method: 'get'
  })
}

// 查询账户余额排行榜
export function getTopAccountList(params) {
  return request({
    url: `/scan/top/account/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}

// 查询某个账户的交易列表
export function getAddressTxList(params) {
  return request({
    url: `/scan/list/address/tx/${params.address}/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}

// 查询交易总数
export function getTxCount(params) {
  if (params) {
    return request({
      url: `/scan/count/tx/${params.address}`,
      method: 'get'
    })
  }
  return request({
    url: `/scan/count/tx`,
    method: 'get'
  })
}

// 查询账户总数
export function getAccountCount() {
  return request({
    url: `/scan/count/account`,
    method: 'get'
  })
}

// 查询开源合约列表
export function getVerifiedContractsList(params) {
  return request({
    url: `/scan/list/verified/contracts/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}
// 查询地址类型
export function getAddressType(params) {
  return request({
    url: `/scan/address/type/${params.address}`,
    method: 'get'
  })
}

// 查询最新区块、节点数、时间戳
export function getLatestInfo() {
  return request({
    url: `/scan/get/latestInfo`,
    method: 'get'
  })
}

// 查询某一块下的交易列表
export function getBlockTxsList(params) {
  return request({
    url: `/scan/list/oneBlock/txs/${params.blockNumber}/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}

// 查询
export function getAddressCode(params) {
  return request({
    url: `/scan/getCode/${params.address}`,
    method: 'get'
  })
}

// 查询
export function getAddressContractDetails(params) {
  return request({
    url: `/scan/contract/details/${params.address}`,
    method: 'get'
  })
}

// 提交开源合约
export function postOpenSource(data) {
  const form = new FormData();
  const keys = Object.keys(data);
  keys.forEach(key => {
    if (key === 'files') {
      data[key].forEach(v => {
        form.append('files', v)
      })
    } else {
      form.append(key, data[key])
    }
  });
  return request({
    url: `/scan/openSource`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}

// 查询矿工列表
export function getMinersList(params) {
  return request({
    url: `/scan/list/miners/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}

// 查询矿工Block列表
export function getMinedBlocksList(params) {
  return request({
    url: `/scan/getMinedBlocks/${params.address}/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}

// 查询矿工Block总数
export function getMinedBlocksTotal(params) {
  return request({
    url: `/scan/getMinerOverview/${params.address}`,
    method: 'get'
  })
}

// 查询TokenTx
export function getTokenTxList(params) {
  return request({
    url: `/scan/getTokenTxList/${params.tokenType}/${params.address}/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}

// 查询首页
export function getChainOverview(params) {
  return request({
    url: `/scan/getChainOverview`,
    method: 'get'
  })
}

//
export function getValidatorConfigList(params) {
  return request({
    url: `/scan/listValidatorConfig/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}
// 查询汇率
// export function getHTRate(params) {
//   return request({
//     url: `/scan/getHTRate`,
//     method: 'get'
//   })
// }

// 查询矿工信息
export function getMinerInfoList(params) {
  return request({
    url: `/scan/listMinerInfo/${params.block}/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}

// 查询token详情
export function getTokenDetails(params) {
  return request({
    url: `/scan/getTokenDetails/${params.token}`,
    method: 'get'
  })
}

// 查询token交易列表
export function getTokenTrasferList(params) {
  return request({
    url: `/scan/list/token/transfer/${params.token}/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}

// 查询token列表
export function getTokenList(params) {
  return request({
    url: `/scan/list/token/${params.type}/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}
//
export function getTokenTxAddressList(params) {
  return request({
    url: `/scan/listTx/${params.address}/${params.tokenAddress}/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}

export function getTokenBalance(params) {
  return request({
    url: `/scan/getTokenBalance/${params.tokenAddress}/${params.address}`,
    method: 'get'
  })
}
export function getAssets(address) {
  return request({
    url: `/scan/getAssets/${address}`,
    method: 'get'
  })
}

export function getMinerByNumber(block) {
  return request({
    url: `/scan/getMinerByNumber/${block}`,
    method: 'get'
  })
}

export function getTxLogs(txhash) {
  return request({
    url: `/scan/getTxLogs/${txhash}`,
    method: 'get'
  })
}

export function getTokenEvents(address) {
  return request({
    url: `/scan/getTokenEvents/${address}`,
    method: 'get'
  })
}

export function getListTokenHolder(params) {
  return request({
    url: `/scan/listTokenHolder/${params.tokenAddress}/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}

export function getLogsByParam(tokenAddress, topic) {
  return request({
    url: `/scan/listLogsByParam/${tokenAddress}/${topic}`,
    method: 'get'
  })
}

// // 获取图片URL
// export function getImageUrl() {
//   return request({
//     url: '/faucet/captcha',
//     method: 'get'
//   })
// }

// // 获取contract列表
// export function getContractList() {
//   return request({
//     url: '/faucet/tokens',
//     method: 'get'
//   })
// }

// // 水龙头领币
// export function faucet(address, contractAddress, img, key) {
//   const url = contractAddress
//     ? '/faucet/request/erc20'
//     : '/faucet/request'
//   const data = contractAddress
//     ? {
//       address,
//       contractAddress,
//       key,
//       verCode: img
//     }
//     : {
//       address,
//       key,
//       verCode: img
//     }
//   return request({
//     url,
//     method: 'post',
//     data
//   })
// }

// 获取JWT
export function getJWT(code) {
  return request({
    url: `/oauth/github/redirect?code=${code}`,
    method: 'get'
  })
}

// 获取contract列表
export function getContractList() {
  return request({
    url: '/faucet/tokens',
    method: 'get'
  })
}

// 水龙头领币
export function faucet(address, contractAddress) {
  const url = '/faucet/request';
  return request({
    url,
    method: 'post',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      address,
      contractAddress
    }
  })
}

// 获取getCreatorAndOwner
export function getCreatorAndOwner(address) {
  return request({
    url: `/hsc/getCreatorAndOwner/${address}`,
    method: 'get'
  })
}

// checkSign
export function CheckSign(data) {
  return request({
    url: `/hsc/checkSign`,
    method: 'post',
    data
  })
}

// nft-detail erc1155
export function getListNftDetail(params) {
  return request({
    url: `http://192.168.3.113:8080/scan/nft/${params.tokenAddress}/${params.tokenID}/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}

export function getNftDetail(id) {
  return request({
    url: `/scan/search/${id}`,
    method: 'get'
  })
}

export function getNftDetailList(params) {
  return request({
    url: `/scan/nft/tx/list/${params.id}/${params.pageNo}/${params.pageSize}`,
    method: 'get'
  })
}