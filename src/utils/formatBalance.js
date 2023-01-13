import { BigNumber, ethers } from 'ethers';

export function getBalance(balance, decimals = 18) {
    return balance.div(BigNumber.from(10).pow(decimals)).toNumber();
}

export const getDisplayBalance = (balance, fractionDigits = 5) => {
    const number = getBalance(balance, 18 - fractionDigits);
    return (number / 10 ** fractionDigits).toFixed(fractionDigits);
};

