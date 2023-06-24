const contract = artifacts.require("EducationSystem");

module.exports = function(deployer) {
    // deployment steps
    deployer.deploy(contract);
  };