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

  let winner

  try {
    await lmnLotto.methods.chooseWinner().send({
      from: addresses[0],
      gas: gas,
    })
    console.log('✅ A winner has been selected')

    winner = await lmnLotto.methods.winner().call()
    console.log(`LMN Lotto Winner: ${winner}`)
  } catch (error) {
    console.log('Something occured while choosing winner')
    console.log(error)
  }

  try {
    await lmnLotto.methods.withdrawOwner(winner).send({
      from: addresses[0],
      gas: gas,
    })

    //! WE SHOULD HAVE RECEIVED 20% OF THE PRIZE
    console.log('✅ Prize has been distributed')
  } catch (error) {
    console.log('Something occured while Distributing Prize')
    console.log(error)
  }
}

testLotto()
