'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  NETWORK: '"testnet"',
  NETWORKTITLE: '"Devnet"',
  BASE_API: '"http://119.23.241.63:8083"',
  CHAIN_ID: '35997',
  RPC_URL: '"http://119.23.241.63:30190"',
  CHAIN_NAME: '"SHchain Devnet"',
  BLOCKEXPLORERURLS: '""',
  GITHUB_ID: '"f65a3da2e5742e4d0c27"'
})
