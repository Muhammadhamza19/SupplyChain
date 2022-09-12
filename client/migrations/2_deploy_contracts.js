const SupplyChain = artifacts.require("Supplychain");

module.exports = function(deployer) {
  deployer.deploy(SupplyChain);
};