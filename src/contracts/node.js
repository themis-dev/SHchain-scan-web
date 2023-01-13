import { BigNumber, Contract, ethers, Overrides } from 'ethers';
import cfg from './abiConfig'
import { formatEther, parseEther } from 'ethers/lib/utils';

class Node {
    constructor() {
        const newProvider = new ethers.providers.Web3Provider(window.ethereum, 572845)
        this.provider = newProvider
        this.signer = newProvider.getSigner(0);
        this.proxyContract = new Contract(cfg['proxy'].address, cfg['proxy'].abi, this.signer);
        this.superNodeContract = new Contract(cfg['superNode'].address, cfg['superNode'].abi, this.signer);
        this.superNodeNewContract = new Contract(cfg['superNodeNew'].address, cfg['superNodeNew'].abi, this.signer);
        this.tokenConverterContract = new Contract(cfg['tokenConverter'].address, cfg['tokenConverter'].abi, this.signer);
        this.lockProxyContract = new Contract(cfg['nodeProxy'].address, cfg['nodeProxy'].abi, this.signer); 
    }
    gasOptions(gas) {
        const multiplied = Math.floor(gas.toNumber() * 1.2);
        // console.log(`⛽️ Gas multiplied: ${gas} -> ${multiplied}`);
        return {
          gasLimit: BigNumber.from(multiplied),
        };
    }
    // 注册成为候选节点
    async pledgeForCandidate(address, name, value) {
        console.log(address, name)
        const gas = await this.superNodeContract.estimateGas.pledgeForCandidate(address, name, {value});
        return await this.superNodeContract.pledgeForCandidate(address, name, {value, gasLimit: this.gasOptions(gas).gasLimit})
    }
    // 赎回节点质押本金
    async withdrawPledge() {
        const gas = await this.proxyContract.estimateGas.withdrawPledge();
        return await this.proxyContract.withdrawPledge(this.gasOptions(gas))
    }
    // 候选节点申请退出
    async requestQuitFromCandidate() {
        const gas = await this.superNodeContract.estimateGas.requestQuitFromCandidate();
        return await this.superNodeContract.requestQuitFromCandidate(this.gasOptions(gas))
    }
    // 用户向候选节点进行投票
    async voteForCandidate(address, voteAmount) {
        // if (stake === 0) {
            // const gas = await this.superNodeContract.estimateGas.voteForCandidate(address);
            return await this.superNodeContract.voteForCandidate(address, voteAmount)
        // } 
        // else {
        //     var id = 1
        //     if(stake === 30) id = 1
        //     if(stake === 90) id = 2
        //     if(stake === 180) id = 3
        //     console.log(id, voteAmount, address)
        //     const gas = await this.lockProxyContract.estimateGas.stake(id, voteAmount, address);
        //     return await this.lockProxyContract.stake(id, voteAmount, address, this.gasOptions(gas))
        // }
    }

    // 更换锁仓节点
    async changeNode(address, stake = 0) {
        var id = 1
        if(stake === 30) id = 1
        if(stake === 90) id = 2
        if(stake === 180) id = 3
        const gas = await this.lockProxyContract.estimateGas.changeNode(id, address);
        return await this.lockProxyContract.changeNode(id, address, this.gasOptions(gas))
    }

    // 取消投票
    async cancelVoteForCandidate() {
        const gas = await this.superNodeContract.estimateGas.cancelVoteForCandidate();
        return await this.superNodeContract.cancelVoteForCandidate(this.gasOptions(gas))
    }
    // 锁仓取消投票
    async cancelVoteForLockCandidate(id) {
        console.log(id)
        const gas = await this.lockProxyContract.estimateGas.withdraw(id);
        return await this.lockProxyContract.withdraw(id, this.gasOptions(gas))
    }
    // 赎回候选节点收益
    async claimCandidateReward() {
        const gas = await this.superNodeContract.estimateGas.claimCandidateReward();
        return await this.superNodeContract.claimCandidateReward(this.gasOptions(gas))
    }
    // 赎回候选节点收益(新)
    async claimCandidateRewardNew() {
        const gas = await this.superNodeNewContract.estimateGas.claimCandidateReward();
        return await this.superNodeNewContract.claimCandidateReward(this.gasOptions(gas))
    }
    // 查询节点收益(新)
    async getCandidateReward(address) {
        const info = await this.superNodeNewContract.rewardsInfo(address)
        console.log(formatEther(info))
        return formatEther(info)
    }
    // 赎回投票收益
    async claimVoteReward() {
        const gas = await this.superNodeContract.estimateGas.claimVoteReward();
        return await this.superNodeContract.claimVoteReward(this.gasOptions(gas))
    }
    // 赎回锁仓投票收益
    async claimVoteLockReward(id) {
        // console.log(id)
        const gas = await this.lockProxyContract.estimateGas.getReward(1);
        return await this.lockProxyContract.getReward(1, this.gasOptions(gas))
    }
    // 查询用户所有信息 锁仓
    async getLockAllInfo(address) {
        const voteID = await this.lockProxyContract.getVoteID(address)
        const info = await this.lockProxyContract.getUserInfo(address)
        // console.log(this.superNodeContract)
        // console.log(voteID.toNumber())
        // console.log(info)
        // console.log(formatEther(info.reward))
        let userInfo = {
            voteAmount: formatEther(info.balance), // 用户投票数量
            voteCandidate: info.voteNode, // 投票投给的候选节点地址
            voteReward1: formatEther(info.reward), // 投票奖励
            unlockTime: info.unlockTime.toNumber() * 1000, // 锁定时间
            stakeTime: info.stakeTime.toNumber() * 1000, // 质押时间
            voteCandidateName: info.nodeName, // 投票节点名
            nodeID: info.nodeID.toNumber(), // 投票对应节点id
            voteID: voteID.toNumber(), // 获取用户投票的合约id
        }
        // console.log(userInfo)
        return userInfo
    }
    // 查询用户所有信息 不锁仓
    async getAllInfo(address) {
        const gas = await this.superNodeContract.estimateGas.getAllInfo(address);
        const info = await this.superNodeContract.getAllInfo(address, this.gasOptions(gas))
        // console.log(this.superNodeContract)
        // console.log(info)
        const userInfo = {
            id: info.id.toNumber(), // 节点id，当id==0时，代表该节点不是候选节点
            pledgedAmount: formatEther(info.pledgedAmount), // 质押AAC金额
            receiveVoteAmount: formatEther(info.receiveVoteAmount), // 得到的票数
            votedUserNumber: info.votedUserNumber.toNumber(), // 对其进行投票用户的数量
            lastVoteRound: info.lastVoteRound.toNumber(), // 上一次投票是在哪一轮
            voteAmount: formatEther(info.voteAmount), // 用户投票数量
            voteCandidate: info.voteCandidate, // 投票投给的候选节点地址
            candidateReward: formatEther(info.candidateReward), // 候选节点奖励
            voteReward1: formatEther(info.voteReward), // 投票奖励
            lockAmount: formatEther(info.lockAmount), // 锁定AAC数量
            unlockTime: info.unlockTime.toNumber() * 1000, // 锁定时间
            name: info.name, // 节点名
            voteCandidateName: info.voteCandidateName, // 投票节点名
        }
        // console.log(userInfo)
        return userInfo
    }
    // 将AAC转换为vtoken
    async exchangeForVToken(amount) {
        // const gas = await this.tokenConverterContract.estimateGas.exchangeForVToken(amount);
        return await this.tokenConverterContract.exchangeForVToken({value: amount})
    }
    // 申请将vtoken转换回AAC
    async requestBackToOtoken(amount) {
        const gas = await this.tokenConverterContract.estimateGas.requestBackToOtoken(amount);
        return await this.tokenConverterContract.requestBackToOtoken(amount, this.gasOptions(gas))
    }
    // 赎回AAC
    async withdraw() {
        const gas = await this.tokenConverterContract.estimateGas.withdraw();
        return await this.tokenConverterContract.withdraw(this.gasOptions(gas))
    }
    // 获取锁定信息
    async getLockInfo(address) {
        const info = await this.tokenConverterContract.getLockInfo(address)
        // console.log(info)
        const lockInfo = {
            unlockTime: info[0].toNumber() * 1000, // 解锁时间
            lockAmount: formatEther(info[1]), // 锁定金额
        }
        // console.log(lockInfo)
        return lockInfo
    }
    // rid
    async rid() {
        return await this.superNodeContract.rid()
    }
    async roundEndTime() {
        return await this.superNodeContract.roundEndTime()
    }
    async getBlockNumber() {
        return await this.provider.getBlockNumber()
    }
}

export default Node
