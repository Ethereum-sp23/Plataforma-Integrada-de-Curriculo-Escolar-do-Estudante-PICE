const { Web3Connection, Model, Web3Contract, Web3ContractOptions, ContractCallMethod } = require('@taikai/dappkit');
const abiJson = require("./build/contracts/EducationSystem.json")

const deploy = async () => {

    const {abi, bytecode} = await JSON.parse(JSON.stringify(abiJson));

    const web3Connection = new Web3Connection({ 
      web3Host: `https://sepolia.infura./v3/`,
      privateKey: "",
     });

     await web3Connection.start();

    const model = await new Model(web3Connection, abi)

    const deployOptions = {data: bytecode, arguments: []}

    const response = await model.deploy(deployOptions)

    console.log(response)

  }

  deploy();