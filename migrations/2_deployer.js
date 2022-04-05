const { networks } = require('../truffle-config')

//* Contracts to deploy
const LMNLotto = artifacts.require('LMNLotto.sol')

// const Factory = artifacts.require('Factory.sol')

module.exports = async function (deployer, _network, addresses) {
  console.log('Working on Deployment Enviroment 👁‍🗨')
  const [admin, _] = addresses

  console.log(
    `Managing Deployment through: ${admin} \n on NETWORK: ${_network}`,
  )

  // console.log("deployer.toString()");
  // // console.log(deployer.address);
  // console.log("admin.toString()");
  // console.log(admin.toString());

  //TODO: Contract --> Contracts

  //! Start ELIST LOCKs (mainnet)
  // await deployer.deploy(ERC20Creator, 1000000000) // 1,000,000,000 ELT
  // const fake = await ERC20Creator.deployed()
  // console.log('PATO is deployed 😏👌🏻')

  // let _now = new Date().getTime() / 1000

  // await deployer.deploy(
  //   ELISTLocks,
  //   admin,
  //   fake.address, //'0x7C6DdcC3DD33290fEb0C32023fa3e3Cd0BBdd36F', //'0x3328C7562DC58e176b977e7D297fd3A061B9a735' //* PATO --> ELIST address
  // )

  // const locks = await ELISTLocks.deployed()
  // console.log('ⲶLIST LockUps deployed 😏👌🏻')
  //! END ELIST LOCKs

  //? Testing SHIT

  //! Start LMNLotto (test)
  let _now = new Date().getTime() / 1000

  await deployer.deploy(LMNLotto, 100000, admin, admin) //parseInt(_now) + 60)

  const lmnLotto = await LMNLotto.deployed()

  console.log(
    `We have deployed the LOTTO SMART CONTRACT AT: --> ${lmnLotto.address}`,
  )

  //! END LMNLotto (test)

  //! Start Factory (test)
  // await deployer.deploy(Factory)

  // const facto = await Factory.deployed()

  // console.log('ERC20 Factory should be deployed')
  //! END Factory (test)

  //TODO END: Contract --> Contracts

  //! ELIST ILO

  // await deployer.deploy(ERC20Creator, 1000000000)
  // const fake = await ERC20Creator.deployed()
  // console.log('ChupaChupa is deployed 😏👌🏻')

  // let _now = new Date().getTime() / 1000

  // console.log(_now)

  // await deployer.deploy(ILO, admin, fake.address, parseInt(_now) + 60)
  // const ilo = await ILO.deployed()
  // console.log('Testing ILO has been deployed 😏👌🏻')

  // ! ELT Contract

  //   await deployer.deploy(ILO, admin, fake.address, parseInt(_now))
  //   const ilo = await ILO.deployed()

  //   console.log('ILO is deployed 😏👌🏻')

  // ! LMN ICO SMART CONTRACT
  // const lmn_address = "0xdBB49BE8562ca6E23B41B3BC7f76b00748EED557";

  // const fakeToken = "0x179562eAd11C4dF1deAa6C364AFCf811A29A8a89";
  // console.log("LMN ERC-20 should be deployed");
  // console.log(`LMN Total Supply is: ${web3.utils.fromWei(ttl)}`);

  //   await deployer.deploy(
  //     LMNPurchase,
  //     admin, //! Profit wallet
  //     fake.address, //! Token Address
  //   )
  //   const lmnPurchase = await LMNPurchase.deployed()

  //   await deployer.deploy(
  //     LMNExit,
  //     admin, //! Controls Contract
  //     lmnPurchase.address, //! Where LMN Go (ewtBack)
  //     fake.address, //! Token Address
  //   )

  //   const lmnExit = LMNExit.deployed()

  //   let now = new Date().getTime() / 1000

  //   now = now + 60
  //   const finish = now + 180

  //   await deployer.deploy(
  //     Vault,
  //     admin, //! Controls Contract
  //     fake.address, //! Token Address
  //     now.toFixed(0), //! Deposit TimeLine
  //     finish.toFixed(0), //! Withdrawal Release
  //   )
  //   const vault = Vault.deployed()

  //   await deployer.deploy(
  //     LemonNetworkVault,
  //     admin, //! Controls Contract
  //     fake.address, //! Token Address
  //     now.toFixed(0), //! Deposit TimeLine
  //     finish.toFixed(0), //! Withdrawal Release
  //   )
  //   const lemonVault = LemonNetworkVault.deployed()

  // const lmn_ico = awayit LMN_ICO.deployed();
  // console.log("LMN ICO is published ✌🏻 😉 🍋");
}
