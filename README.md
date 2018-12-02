# Token Curated Register with delegated voting
A token curated register forked from https://github.com/skmgoldin/tcr with the additional ability to perform delegation call.

# Background

ERC20

* https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
* https://theethereum.wiki/w/index.php/ERC20_Token_Standard

PLCRVoting

* https://github.com/ConsenSys/PLCRVoting

SafeMath
* https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol

Proxy
* https://blog.zeppelinos.org/proxy-patterns/

# Features
* Same features guarrenteed from https://github.com/skmgoldin/tcr
* users should be able to assign someone else to vote for themselves

# Environment
* Solidity 0.4.24
* Python 2.7
* Ganache CLI v6.1.8 (ganache-core: 2.2.1)
* Truffle v4.1.14

# Testing
First cmd prompt
* vagrant up
* vagrant ssh
* ganache-cli

Second cmd prompt
* vagrant up
* vagrant ssh
* cd TokenCuratedRegistry/
* ../../node_modules/.bin/solidity-coverage

# Test Coverage
100% branch, 100% line

# Deployment
Please follow web3 documentation at: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#deploy