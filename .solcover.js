module.exports = {
  // start blockchain on the same port specified in truffle.js
  // use the default delicious Ganache mnemonic
  testrpcOptions: '-p 7545 -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"',
  skipFiles: ['plcr-revival/ProxyFactory.sol']
};
