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
    await lmnLotto.methods.buy5().send({
      from: addresses[1],
      gas: gas,
      value: web3.utils.toWei('5'),
    })
    console.log('✅ Can purchase 5 EWT')
  } catch (e) {
    console.log('ERROR: Buy acc[1]')
  }
  try {
    await lmnLotto.methods.buy5().send({
      from: addresses[2],
      gas: gas,

      value: web3.utils.toWei('5'),
    })
    console.log('✅ Can purchase 5 EWT')
  } catch (e) {
    console.log('ERROR: Buy acc[2]')
  }
  try {
    await lmnLotto.methods.buy5().send({
      from: addresses[3],
      gas: gas,

      value: web3.utils.toWei('5'),
    })
    console.log('✅ Can purchase 5 EWT')
  } catch (e) {
    console.log('ERROR: Buy acc[3]')
  }
  try {
    await lmnLotto.methods.buy5().send({
      from: addresses[4],
      gas: gas,

      value: web3.utils.toWei('5'),
    })
    console.log('✅ Can purchase 5 EWT')
  } catch (e) {
    console.log('ERROR: Buy acc[4]')
  }

  try {
    console.log('Summary Data')
    const tkCount = await lmnLotto.methods.ticketCount().call()
    console.log(tkCount, ' == ', 20)
  } catch (e) {
    console.log(e)
  }

  try {
    const lmnFeeAddress = await lmnLotto.methods.lemonFeeComi().call()
    const initlmnFeeBalance = await web3.eth.getBalance(lmnFeeAddress)
    console.log(
      `Init LMN Fee Balance: ${web3.utils.fromWei(initlmnFeeBalance)} EWT`,
    )
  } catch (e) {
    console.log('Error at END ')
  }

  try {
    await lmnLotto.methods.chooseWinner().send({
      from: addresses[0],
      gas: gas,
    })

    console.log('Winner has been choosen')

    const winnerAddress = await lmnLotto.methods.winner().call()

    console.log(
      winnerAddress == addresses[1]
        ? 'add_1'
        : winnerAddress == addresses[2]
        ? 'add_2'
        : winnerAddress == addresses[3]
        ? 'add_3'
        : 'add_4',
    )

    const preWinnerBal = await web3.eth.getBalance(winnerAddress)
    console.log(`Winner PRE balance: ${web3.utils.fromWei(preWinnerBal)}`)
  } catch (e) {
    console.log('Error at END 3')
  }

  try {
    const winnerAddress = await lmnLotto.methods.winner().call()
    const lmnFeeAddress = await lmnLotto.methods.lemonFeeComi().call()

    console.log(winnerAddress)
    await lmnLotto.methods.withdrawOwner(winnerAddress).send({
      from: addresses[0],
      gas: gas,
    })

    const postWinnerBal = await web3.eth.getBalance(winnerAddress)
    console.log(`Winner POST balance: ${web3.utils.fromWei(postWinnerBal)}`)

    const endlmnFeeBalance = await web3.eth.getBalance(lmnFeeAddress)

    console.log(
      `End LMN Fee Balance: ${web3.utils.fromWei(endlmnFeeBalance)} EWT`,
    )
  } catch (e) {
    console.log('Error at END 4')
  }
}

testLotto()
