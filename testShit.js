const Web3 = require('web3')

const LMNLotto = require('./src/abis/LMNLotto.json')

//!PROVABI

const tokenABI = [
  {
    name: 'Transfer',
    inputs: [
      { type: 'address', name: '_from', indexed: true },
      { type: 'address', name: '_to', indexed: true },
      { type: 'uint256', name: '_value', indexed: false },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'Approval',
    inputs: [
      { type: 'address', name: '_owner', indexed: true },
      { type: 'address', name: '_spender', indexed: true },
      { type: 'uint256', name: '_value', indexed: false },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: '__init__',
    outputs: [],
    inputs: [
      { type: 'bytes32', name: '_name' },
      { type: 'bytes32', name: '_symbol' },
      { type: 'uint256', name: '_decimals' },
      { type: 'uint256', name: '_supply' },
    ],
    constant: false,
    payable: false,
    type: 'constructor',
  },
  {
    name: 'deposit',
    outputs: [],
    inputs: [],
    constant: false,
    payable: true,
    type: 'function',
    gas: 74279,
  },
  {
    name: 'withdraw',
    outputs: [{ type: 'bool', name: 'out' }],
    inputs: [{ type: 'uint256', name: '_value' }],
    constant: false,
    payable: false,
    type: 'function',
    gas: 108706,
  },
  {
    name: 'totalSupply',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 543,
  },
  {
    name: 'balanceOf',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [{ type: 'address', name: '_owner' }],
    constant: true,
    payable: false,
    type: 'function',
    gas: 745,
  },
  {
    name: 'transfer',
    outputs: [{ type: 'bool', name: 'out' }],
    inputs: [
      { type: 'address', name: '_to' },
      { type: 'uint256', name: '_value' },
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: 74698,
  },
  {
    name: 'transferFrom',
    outputs: [{ type: 'bool', name: 'out' }],
    inputs: [
      { type: 'address', name: '_from' },
      { type: 'address', name: '_to' },
      { type: 'uint256', name: '_value' },
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: 110600,
  },
  {
    name: 'approve',
    outputs: [{ type: 'bool', name: 'out' }],
    inputs: [
      { type: 'address', name: '_spender' },
      { type: 'uint256', name: '_value' },
    ],
    constant: false,
    payable: false,
    type: 'function',
    gas: 37888,
  },
  {
    name: 'allowance',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [
      { type: 'address', name: '_owner' },
      { type: 'address', name: '_spender' },
    ],
    constant: true,
    payable: false,
    type: 'function',
    gas: 1025,
  },
  {
    name: 'name',
    outputs: [{ type: 'bytes32', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 723,
  },
  {
    name: 'symbol',
    outputs: [{ type: 'bytes32', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 753,
  },
  {
    name: 'decimals',
    outputs: [{ type: 'uint256', name: 'out' }],
    inputs: [],
    constant: true,
    payable: false,
    type: 'function',
    gas: 783,
  },
]

//!PROVABI

const testLotto = async () => {
  const web3 = new Web3('http://localhost:9545')

  //!wallet: Deployer

  // const wallet = new HDWalletProvider(
  //   [process.env.MNEMONIC1],
  //   'https://rpc.energyweb.org',
  // )

  // const web3 = new Web3(wallet)

  //!wallet: Buyer

  const id = await web3.eth.net.getId()
  console.log(id)

  // const addresses = await web3.eth.getAccounts()
  let addresses = await web3.eth.getAccounts()

  const gas = new web3.utils.BN('6000000')

  const bn = new web3.utils.BN('150000000000000000000000000')

  const lmnLotto = new web3.eth.Contract(
    LMNLotto.abi,
    LMNLotto.networks[id].address,
  )

  try {
    const lmnfeeaddress = await lmnLotto.methods.lemonFeeComi().call()

    const lmnInitBalance = await web3.eth.getBalance(lmnfeeaddress)
    console.log(`LMN FEE BALANCE = ${web3.utils.fromWei(lmnInitBalance)}`)

    await lmnLotto.methods.chooseWinner().send({
      from: addresses[0],
      gas: gas,
    })
    console.log('⛔️ Can choose winner while TICKECOUNT = 0 !')
  } catch (error) {
    console.log('✅ Maravilla')
  }

  try {
    await lmnLotto.methods.buy1().send({
      from: addresses[1],
      value: 1000000000000000000,
      gas: gas,
    })
    console.log('Hemo comprao 1 EWT de LOTTO')

    const count = await lmnLotto.methods.ticketCount().call()
    console.log(
      `Total Tickets after purchase 1 EWT == ${count}`,
      count == 1 ? '✅' : '⛔️',
    )

    await lmnLotto.methods.buy5().send({
      from: addresses[2],
      value: 5000000000000000000,
      gas: gas,
    })
    console.log('Hemo comprao 5 EWT de LOTTO')

    const count2 = await lmnLotto.methods.ticketCount().call()
    console.log(
      `Total Tickets after purchase 5 EWT == ${count2 - count}`,
      count2 == 6 ? '✅' : '⛔️',
    )

    // let rand = await lmnLotto.methods.generateRandom().call()
    // console.log(rand)
    // await web3.eth.sendTransaction({
    //   from: addresses[3],
    //   to: addresses[4],
    // })
    // let rand1 = await lmnLotto.methods.generateRandom().call()
    // console.log(rand1)

    // await web3.eth.sendTransaction({
    //   from: addresses[4],
    //   to: addresses[3],
    // })
    // let rand2 = await lmnLotto.methods.generateRandom().call()
    // console.log(rand2)
    // await web3.eth.sendTransaction({
    //   from: addresses[3],
    //   to: addresses[4],
    // })
    // let rand3 = await lmnLotto.methods.generateRandom().call()
    // console.log(rand3)
  } catch (e) {
    console.log(e)
  }

  setTimeout(async function () {
    try {
      await lmnLotto.methods.withdrawUser().send({
        from: addresses[2],
        value: web3.utils.toWei('1'),
        gas: gas,
      })
      console.log('⛔️ User 2: Can witdraw before endTime')
    } catch (error) {
      console.log('✅ User 2: Can not witdraw before endTime')
    }
  }, 20 * 1000) // 1 sec == 1,000 ms

  setTimeout(async function () {
    try {
      await lmnLotto.methods.chooseWinner().send({
        from: addresses[1],
        gas: gas,
      })
      console.log('⛔️ A mindungui CAN CHOOSE WINNER!')
    } catch (error) {
      console.log('✅ Mindungui can not choose winner, mindunguis...')
    }
  }, 55 * 1000) // 1 sec == 1,000 ms

  setTimeout(async function () {
    try {
      await lmnLotto.methods.chooseWinner().send({
        from: addresses[0],
        gas: gas,
      })
      console.log('✅ A winner has been selected')
    } catch (error) {
      console.log('Something occured while choosing winner')
      console.log(error)
    }
  }, 60 * 1000) // 1 sec == 1,000 ms

  setTimeout(async function () {
    try {
      // const winner = await lmnLotto.methods.winner().call()
      const Prebalance = await web3.eth.getBalance(addresses[5])

      console.log(
        `Balance RandomDeFiUser (Pre-withdraw): ${web3.utils.fromWei(
          Prebalance,
        )}`,
      )

      await lmnLotto.methods.withdrawUser().send({
        from: addresses[5],
        gas: gas,
      })

      // const balance = await web3.eth.getBalance(addresses[5])
      console.log('⛔️ NON-Purchaser can withdraw prize')
    } catch (error) {
      const balance = await web3.eth.getBalance(addresses[5])
      console.log(
        `Balance RandomDeFiUser (Post-withdraw): ${web3.utils.fromWei(
          balance,
        )}`,
      )
      console.log('✅ Failed one a NON-Purchaser tries to witdraw')
      // console.log(error)
    }
  }, 65 * 1000) // 1 sec == 1,000 ms

  setTimeout(async function () {
    try {
      const winner = await lmnLotto.methods.winner().call()
      const Prebalance = await web3.eth.getBalance(winner)

      console.log(
        `Balance WINNER (Pre-withdraw): ${web3.utils.fromWei(Prebalance)}`,
      )

      await lmnLotto.methods.withdrawOwner(winner).send({
        from: addresses[1],
        gas: gas,
      })

      const balance = await web3.eth.getBalance(winner)
      console.log('⛔️ Can withdraw Owner and it is not OWNER!')
    } catch (error) {
      console.log('✅ Can not withdraw Owner if not owner')
    }
  }, 70 * 1000) // 1 sec == 1,000 ms

  setTimeout(async function () {
    try {
      const winner = await lmnLotto.methods.winner().call()
      const Prebalance = await web3.eth.getBalance(winner)

      console.log(
        `Balance WINNER (Pre-withdraw): ${web3.utils.fromWei(Prebalance)}`,
      )

      await lmnLotto.methods.withdrawOwner(winner).send({
        from: addresses[0],
        gas: gas,
      })

      const balance = await web3.eth.getBalance(winner)
      console.log(
        `Balance WINNER (Post-withdraw): ${web3.utils.fromWei(balance)}`,
      )
      console.log('✅ Can withdraw Owner if owner')
    } catch (error) {
      console.log('⛔️ Can NOT withdraw Owner and it is OWNER')
      console.log(error)
    }
  }, 75 * 1000) // 1 sec == 1,000 ms

  // setTimeout(async function () {
  //   try {
  //     const winner = await lmnLotto.methods.winner().call()
  //     const Prebalance = await web3.eth.getBalance(winner)

  //     console.log(
  //       `Balance WINNER (Pre-withdraw): ${web3.utils.fromWei(Prebalance)}`,
  //     )

  //     await lmnLotto.methods.withdrawUser().send({
  //       from: winner,
  //       gas: gas,
  //     })

  //     const balance = await web3.eth.getBalance(winner)
  //     console.log(
  //       `Balance WINNER (Post-withdraw): ${web3.utils.fromWei(balance)}`,
  //     )
  //   } catch (error) {
  //     console.log('Something occured while withdrawing from winner')
  //     console.log(error)
  //   }
  // }, 70 * 1000) // 1 sec == 1,000 ms

  // console.log(bn.toNumber())
}

testLotto()
