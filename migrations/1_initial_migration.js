const Migrations = artifacts.require("Migrations"); //Import the Migration contract

module.exports = function (deployer) {
  deployer.deploy(Migrations);    //Deploying the contract
};
