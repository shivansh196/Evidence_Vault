const FileStorage = artifacts.require("FileStorage");  //Imports FileStorage contract

module.exports = function (deployer) {
  deployer.deploy(FileStorage);  //Deploying the contract
};
