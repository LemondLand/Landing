import React, { useState, useEffect } from 'react'
import { color } from 'd3-color'
import { interpolateRgb } from 'd3-interpolate'
import LiquidFillGauge from 'react-liquid-gauge'

import LemonPopUp from '../../assets/lemon-popup.png'
import LMN from '../../assets/lemonNetwork.png'
import LMD from '../../assets/lemon-logo.svg'
import networkLogo from '../../assets/lemon-network.png'

import { ToastContainer, toast } from 'react-toastify'

import './Gauge.scss'
import MyTimer from './MyTimer'
import LemonNetworkTimer from './MyTimerLemonNetwork'

import Web3 from 'web3'

import Vault from '../../abis/Vault.json'
import LemonNetworkVault from '../../abis/LemonNetworkVault.json'

const Gauge = () => {
  const glass =
    'https://firebasestorage.googleapis.com/v0/b/lemon-network.appspot.com/o/Assets%2Fglass.png?alt=media'

  const lemonAddress = '0xdBB49BE8562ca6E23B41B3BC7f76b00748EED557'

  const [showModal, setShowModal] = useState(false)
  const [showModalBuy, setShowModalBuy] = useState(false)
  const [successShow, setSuccessShow] = useState(false)
  const [success, setSuccess] = useState(false)

  const [hasDeposit0, setHasDeposit0] = useState(false)
  const [hasDeposit1, setHasDeposit1] = useState(false)

  const [user0, setUser0] = useState({})
  const [percentage0, setPercentage0] = useState(0)
  const [user1, setUser1] = useState({})
  const [percentage1, setPercentage1] = useState(0)

  const [vaultTime0, setvaultTime0] = useState(0)
  const [vaultTime1, setvaultTime1] = useState(0)

  const [maxLmnVault0, setMaxLmnVault0] = useState(0)
  const [totalLmnVault0, setTotalLmnVault0] = useState(0)
  const [valueLmnVault0, setValueLmnVault0] = useState(0)
  const [unlockedVault0, setUnlockedVault0] = useState(false)

  const [maxLmnVault1, setMaxLmnVault1] = useState(0)
  const [totalLmnVault1, setTotalLmnVault1] = useState(0)
  const [valueLmnVault1, setValueLmnVault1] = useState(0)
  const [unlockedVault1, setUnlockedVault1] = useState(false)

  const [depositTimeLine0, setDepositTimeLine0] = useState(0)
  const [depositTimeLine1, setDepositTimeLine1] = useState(0)

  const [withdrawRelease0, setWithdrawRelease0] = useState(0)
  const [withdrawRelease1, setWithdrawRelease1] = useState(0)

  const boolValue = true
  const [withdrawalTime0, setWithdrawalTime0] = useState(false)
  const [withdrawalTime1, setWithdrawalTime1] = useState(false)

  const [rewardsVault1, setRewardsVault1] = useState(0)

  const [isDepositing0, setIsDepositing0] = useState(false)
  const [isDepositing1, setIsDepositing1] = useState(false)

  const [isUnlocking0, setIsUnlocking0] = useState(false)
  const [isUnlocking1, setIsUnlocking1] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // notifyModal();
  }

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

  const notifyModal = () =>
    toast.success(' You bought succesfully2!', {
      icon: <img src={LemonPopUp} alt="" />,
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const unlockNotifyModal = () =>
    toast.info(' Lemonade Contract Unlocked', {
      icon: <img src={LemonPopUp} alt="" />,
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const depositNotifyModal = () =>
    toast.success(`Deposit Tx Success`, {
      icon: <img src={LemonPopUp} alt="" />,
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const withdrawNotifyModal = () =>
    toast.success(`Withdraw Tx Success`, {
      icon: <img src={LemonPopUp} alt="" />,
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const errorNotifyModal = () =>
    toast.error(`Something went wrong`, {
      icon: <img src={LemonPopUp} alt="" />,
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const [value0, setValue0] = useState(10)
  const [value1, setValue1] = useState(10)
  const [valueDraft0, setValueDraft0] = useState(20)
  const [valueDraft1, setValueDraft1] = useState(20)
  const circleWidth = window.innerWidth > 1000 ? 600 : 300
  const startColor = '#9bff00' // cornflowerblue
  const startColor2 = 'purple' // cornflowerblue
  const endColor = '#9bff00'
  const endColor2 = 'purple'
  const interpolate = interpolateRgb(startColor, endColor)
  const interpolate2 = interpolateRgb(startColor2, endColor2)
  const fillColor = interpolate(value0 / 100)
  const fillColor2 = interpolate2(value1 / 100)

  const gradientStops = [
    {
      key: '0%',
      stopColor: color(fillColor).darker(0.5).toString(),
      stopOpacity: 1,
      offset: '0%',
    },
    {
      key: '50%',
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: '50%',
    },
    {
      key: '100%',
      stopColor: color(fillColor).brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: '100%',
    },
  ]
  const gradientStops2 = [
    {
      key: '0%',
      stopColor: color(fillColor2).darker(0.5).toString(),
      stopOpacity: 1,
      offset: '0%',
    },
    {
      key: '50%',
      stopColor: fillColor2,
      stopOpacity: 0.75,
      offset: '50%',
    },
    {
      key: '100%',
      stopColor: color(fillColor2).brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: '100%',
    },
  ]

  const getBlockData = async () => {
    console.log('IAM GETTING SHOOT -->')
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId()
          const accounts = await web3.eth.getAccounts()

          const VaultContract = new web3.eth.Contract(
            Vault.abi,
            Vault.networks[netId].address,
          )
          const LemonNetworkVaultContract = new web3.eth.Contract(
            LemonNetworkVault.abi,
            LemonNetworkVault.networks[netId].address,
          )

          const now = new Date()
          let _now = now.setSeconds(now.getSeconds())
          console.log(_now)
          try {
            let userF = await VaultContract.methods
              .userInfo(accounts[0])
              .call({ from: accounts[0] })
            // let userR = await LemonNetworkVault.methods
            //   .userInfo(accounts[0])
            //   .call({ from: accounts[0] });
            let userR = await LemonNetworkVaultContract.methods
              .userInfo(accounts[0])
              .call({ from: accounts[0] })

            if (userF['amount'] != 0) {
              setHasDeposit0(true)
            }
            if (userR['amount'] != 0) {
              setHasDeposit1(true)
            }

            setUser0(userF)
            setUser1(userR)

            let depositTimeLine0 = await VaultContract.methods
              .depositTimeLine()
              .call({
                from: accounts[0],
              })

            setDepositTimeLine0(depositTimeLine0)
            let depositTimeLine1 = await LemonNetworkVaultContract.methods
              .depositTimeLine()
              .call({
                from: accounts[0],
              })
            setDepositTimeLine1(depositTimeLine1)

            console.log(depositTimeLine0)
            console.log(depositTimeLine1)

            let withdrawRelease0 = await VaultContract.methods.endTime().call({
              from: accounts[0],
            })
            let withdrawRelease1 = await LemonNetworkVaultContract.methods
              .endTime()
              .call({
                from: accounts[0],
              })
            setWithdrawRelease0(withdrawRelease0)
            setWithdrawRelease1(withdrawRelease1)

            let maxlmnVault = await VaultContract.methods.maxLmnDeposit().call({
              from: accounts[0],
            })
            let maxlmnVault_network = await LemonNetworkVaultContract.methods
              .maxLmnDeposit()
              .call({
                from: accounts[0],
              })
            let total_lmn = await VaultContract.methods.total_lmn().call({
              from: accounts[0],
            })
            let total_lmn_network = await LemonNetworkVaultContract.methods
              .total_lmn()
              .call({
                from: accounts[0],
              })

            let unlocked = await VaultContract.methods
              .unlockList(accounts[0])
              .call({
                from: accounts[0],
              })
            let unlocked1 = await LemonNetworkVaultContract.methods
              .unlockList(accounts[0])
              .call({
                from: accounts[0],
              })

            setUnlockedVault0(unlocked)
            setUnlockedVault1(unlocked1)
            console.log(unlocked)
            console.log(unlocked1)

            maxlmnVault = web3.utils.fromWei(maxlmnVault)
            maxlmnVault_network = web3.utils.fromWei(maxlmnVault_network)
            total_lmn = web3.utils.fromWei(total_lmn)
            total_lmn_network = web3.utils.fromWei(total_lmn_network)

            let ttl_vault_0 = total_lmn
            let max_vault_0 = maxlmnVault

            let ttl_vault_1 = total_lmn_network
            let max_vault_1 = maxlmnVault_network
            setPercentage0(
              (web3.utils.fromWei(userF['amount']) / ttl_vault_0) * 100,
            )
            setPercentage1(
              (web3.utils.fromWei(userR['amount']) / ttl_vault_1) * 100,
            )

            maxlmnVault = parseFloat(maxlmnVault)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            maxlmnVault_network = parseFloat(maxlmnVault_network)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

            setValueLmnVault0(total_lmn)
            setValueLmnVault1(total_lmn_network)

            total_lmn = parseFloat(total_lmn)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            total_lmn_network = parseFloat(total_lmn_network)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

            setMaxLmnVault0(maxlmnVault)
            setMaxLmnVault1(maxlmnVault_network)
            setTotalLmnVault0(total_lmn)
            setTotalLmnVault1(total_lmn_network)

            setValue0((ttl_vault_0 / max_vault_0) * 100)
            setValue1((ttl_vault_1 / max_vault_1) * 100)

            let timer = new Date()
            let timer1 = new Date()

            if (_now <= depositTimeLine0 * 1000) {
              console.log('Pasing A')
              setWithdrawalTime0(false)

              setvaultTime0(timer.setSeconds(depositTimeLine0))
            } else if (_now <= withdrawRelease0 * 1000) {
              console.log('Pasing B')
              setWithdrawalTime0(null)

              setvaultTime0(timer.setSeconds(withdrawRelease0))
            } else {
              console.log('Pasing C')
              setWithdrawalTime0(true)

              setvaultTime0(_now)
            }

            if (_now <= depositTimeLine1 * 1000) {
              console.log('Pasing A')
              setWithdrawalTime1(false)

              setvaultTime1(timer1.setSeconds(depositTimeLine1))
            } else if (_now <= withdrawRelease1 * 1000) {
              console.log('Pasing B')
              setWithdrawalTime1(null)

              setvaultTime1(timer1.setSeconds(withdrawRelease1))
            } else {
              console.log('Pasing C')
              setWithdrawalTime1(true)
              setvaultTime1(_now)
            }
          } catch (e) {
            console.log(e.toString())
          }
        })
      } catch (e) {
        console.log('OMG ...')
      }

      //load contracts
    } else {
      window.alert('Please install MetaMask')
    }
  }

  const unlockVault0 = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          setIsUnlocking0(true)
          const netId = await web3.eth.net.getId()
          const accounts = await web3.eth.getAccounts()

          const VaultContract = new web3.eth.Contract(
            Vault.abi,
            Vault.networks[netId].address,
          )

          const result = await VaultContract.methods.unlock().send({
            from: accounts[0],
            value: 50000000000000000,
          })
          unlockNotifyModal()

          console.log(result)
          setUnlockedVault0(result)
          setIsUnlocking0(false)
        })
      } catch (e) {
        errorNotifyModal()
        setIsUnlocking0(false)

        console.log('OMG ...')
      }
      setIsUnlocking0(false)

      //load contracts
    } else {
      window.alert('Please install MetaMask')
    }
  }

  const unlockVault1 = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          setIsUnlocking1(true)
          const netId = await web3.eth.net.getId()
          const accounts = await web3.eth.getAccounts()

          const VaultContract = new web3.eth.Contract(
            LemonNetworkVault.abi,
            LemonNetworkVault.networks[netId].address,
          )

          const result = await VaultContract.methods.unlock().send({
            from: accounts[0],
            value: 50000000000000000,
          })
          unlockNotifyModal()
          setIsUnlocking1(false)

          setUnlockedVault1(result)
        })
      } catch (e) {
        errorNotifyModal()
        setIsUnlocking1(false)

        console.log('OMG ...')
      }
      setIsUnlocking1(false)

      //load contracts
    } else {
      window.alert('Please install MetaMask')
    }
  }

  const depositVault0 = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId()
          const accounts = await web3.eth.getAccounts()

          setIsDepositing0(true)

          const VaultContract = new web3.eth.Contract(
            Vault.abi,
            Vault.networks[netId].address,
          )

          const token = new web3.eth.Contract(tokenABI, lemonAddress)

          try {
            await token.methods
              .approve(
                Vault.networks[netId].address,
                web3.utils.toWei(valueDraft0),
              )
              .send({
                from: accounts[0],
              })
          } catch (e) {
            setIsDepositing0(false)
          }
          try {
            const result2 = await VaultContract.methods
              .depositVault(web3.utils.toWei(valueDraft0))
              .send({
                from: accounts[0],
              })
            setTimeout(() => {
              window.location.reload(false)
            }, 4500)
          } catch (e) {
            setIsDepositing0(false)
          }
          depositNotifyModal()
          setIsDepositing0(false)
        })
      } catch (e) {
        errorNotifyModal()
        setIsDepositing0(false)

        console.log('OMG ...')
      }
      setIsDepositing0(false)

      //load contracts
    } else {
      window.alert('Please install MetaMask')
    }
  }

  const withdrawVault0 = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId()
          const accounts = await web3.eth.getAccounts()

          const VaultContract = new web3.eth.Contract(
            Vault.abi,
            Vault.networks[netId].address,
          )

          const token = new web3.eth.Contract(tokenABI, lemonAddress)

          const userData = await VaultContract.methods
            .userInfo(accounts[0])
            .call()
          const userDepoAmount = userData['rewardDebt']

          const result2 = await VaultContract.methods.withdrawVault().send({
            from: accounts[0],
          })

          withdrawNotifyModal()
          setTimeout(() => {
            window.location.reload(false)
          }, 4500)
          // window.location.reload(false);
        })
      } catch (e) {
        errorNotifyModal()

        console.log('OMG ...')
      }

      //load contracts
    } else {
      window.alert('Please install MetaMask')
    }
  }

  const depositVault1 = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          setIsDepositing1(true)
          const netId = await web3.eth.net.getId()
          const accounts = await web3.eth.getAccounts()

          const VaultContract = new web3.eth.Contract(
            LemonNetworkVault.abi,
            LemonNetworkVault.networks[netId].address,
          )

          const token = new web3.eth.Contract(tokenABI, lemonAddress)

          try {
            await token.methods
              .approve(
                LemonNetworkVault.networks[netId].address,
                web3.utils.toWei(valueDraft1),
              )
              .send({
                from: accounts[0],
              })
          } catch (e) {
            setIsDepositing1(false)
          }

          try {
            const result2 = await VaultContract.methods
              .depositVault(web3.utils.toWei(valueDraft1))
              .send({
                from: accounts[0],
              })
            setTimeout(() => {
              window.location.reload(false)
            }, 4500)
          } catch (e) {
            setIsDepositing1(false)
          }

          depositNotifyModal()
          setIsDepositing1(false)
        })
      } catch (e) {
        setIsDepositing1(false)

        errorNotifyModal()

        console.log('OMG ...')
      }
      setIsDepositing1(false)

      //load contracts
    } else {
      window.alert('Please install MetaMask')
    }
  }

  const withdrawVault1 = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId()
          const accounts = await web3.eth.getAccounts()

          const LemonNetworkVaultContract = new web3.eth.Contract(
            LemonNetworkVault.abi,
            LemonNetworkVault.networks[netId].address,
          )

          const token = new web3.eth.Contract(tokenABI, lemonAddress)

          const userData = await LemonNetworkVaultContract.methods
            .userInfo(accounts[0])
            .call()
          const userDepoAmount = userData['rewardDebt']
          console.log(userDepoAmount)
          console.log(userDepoAmount)
          console.log(userDepoAmount)
          console.log(userDepoAmount)

          const result2 = await LemonNetworkVaultContract.methods
            .withdrawVault()
            .send({
              from: accounts[0],
            })

          withdrawNotifyModal()
          setTimeout(() => {
            window.location.reload(false)
          }, 4500)
          // window.location.reload(false);
        })
      } catch (e) {
        errorNotifyModal()

        console.log('OMG ...')
      }

      //load contracts
    } else {
      window.alert('Please install MetaMask')
    }
  }

  const calculateEarnings = () => {
    const totalReward = user1['rewardDebt']
    const depositTimestamp = user1['depositTimestamp']
    const web3 = new Web3(window.ethereum)

    if (totalReward == undefined) {
      return 0
    }
    let reward = web3.utils.fromWei(totalReward)

    let now = new Date()
    let depositTime = new Date(depositTimestamp * 1000)
    let withdrawTime = new Date(withdrawRelease1 * 1000)

    let dif = withdrawTime - now
    let difCompute = now - depositTime

    console.log(difCompute)

    if (dif > 0) {
      let allPeriode = withdrawTime - depositTime
      let rewSec = reward / allPeriode

      let earnedReward = rewSec * difCompute

      return earnedReward
        .toFixed(3)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } else if (withdrawRelease1 === 0) {
      return 0
    } else {
      return reward
    }
  }

  useEffect(async () => {
    await getBlockData()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setRewardsVault1(calculateEarnings())
    }, 1000)
  })

  return (
    <div className="container">
      <br></br>
      <br></br>
      <br></br>

      <div className=" nk-block-text-wrap">
        <div className="d-flex align-items-center flex-column justify-content-between">
          <MyTimer
            dateDeposit={depositTimeLine0}
            dateWithdraw={withdrawRelease0}
            className="gauge-timer "
            expiryTimestamp={vaultTime0}
            key={vaultTime0}
          />
          <div
            className="d-flex flex-wrap justify-content-between align-items-center"
            style={{ marginTop: '60px', marginBottom: '60px', width: '100%' }}
          >
            <div className="d-flex  flex-column ">
              <h1 style={{ color: '#7fd705', fontWeight: 'bold' }}>
                <font color="black">LMN ICO</font> Vault
              </h1>
              <div className="d-flex align-items-center">
                <img className="logo-water" src={LMD} alt="" />
                <img src={glass} className="glass" alt="" />
                <LiquidFillGauge
                  width={circleWidth}
                  height={circleWidth}
                  waveFrequency={2}
                  waveAmplitude={4}
                  className="gauge"
                  value={value0}
                  textSize={0}
                  gradient
                  riseAnimation
                  gradientStops={gradientStops}
                  waveAnimation
                  circleStyle={{
                    fill: '#ffff',
                  }}
                  waveStyle={{
                    fill: '#e2ff56',
                  }}
                />
              </div>
            </div>
            <div className="d-flex align-items-center flex-column ">
              <span
                className="align-self-start"
                style={{
                  position: 'absolute',
                  color: '#87d914',
                  fontWeight: 'bold',
                }}
              >
                Unsold LMN ICO
              </span>
              <span className="value-text">
                60% <img className="gauge-logo" src={LMD} alt="" />
              </span>
              <div
                style={{ marginBottom: '20px' }}
                className="gauge-card d-flex flex-column "
              >
                <span>
                  {' '}
                  Locked: {totalLmnVault0}{' '}
                  <img style={{ width: '35px' }} src={LMD} alt=""></img>{' '}
                </span>
                <span>
                  TVL:
                  <font font-weight="lighter">
                    {' '}
                    {(valueLmnVault0 * 1.2)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    $
                  </font>
                </span>
                <span>
                  Max: {maxLmnVault0}{' '}
                  <img style={{ width: '35px' }} src={LMD} alt=""></img>
                </span>
              </div>
              <div className="gauge-card d-flex flex-column ">
                <span>
                  {' '}
                  Deposit DL: <i>15 Jan 2022 </i>
                </span>
                <span>
                  Release Date: <i>30 Apr 2022</i>
                </span>
              </div>
              {hasDeposit0 ? (
                <div className="gauge-card d-flex flex-column ">
                  <span>
                    {' '}
                    <font size="+1" color="black">
                      LMN to Share:
                    </font>{' '}
                    <i>2,382,616.1256 </i>
                    <img style={{ width: '35px' }} src={LMD} alt=""></img>
                  </span>
                  <span>
                    {' '}
                    <font size="+1" color="black">
                      My LMN:
                    </font>{' '}
                    <i>
                      {' '}
                      {(user0['amount'] / 10 ** 18)
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    </i>
                    <img style={{ width: '35px' }} src={LMD} alt=""></img>
                  </span>
                  <span>
                    <font size="+1" color="black">
                      My Vault Share:
                    </font>{' '}
                    <i>
                      {percentage0 < 1
                        ? percentage0.toFixed(8)
                        : percentage0.toFixed(4)}
                      %
                    </i>
                  </span>
                </div>
              ) : (
                <div></div>
              )}

              {!unlockedVault0 ? (
                <button
                  className="gauge-btn"
                  onClick={async (e) => {
                    //! Dispara UNLOCK
                    if (isUnlocking0) {
                    } else {
                      await unlockVault0()
                    }
                  }}
                >
                  Unlock
                </button>
              ) : withdrawalTime0 == true && hasDeposit0 == true ? (
                <form
                  action="submit"
                  className="gauge-form d-flex flex-column justfiy-space-between"
                  onSubmit={handleSubmit}
                >
                  <button
                    className="gauge-btn"
                    onClick={async (e) => {
                      await withdrawVault0()
                    }}
                  >
                    Withdraw
                  </button>
                </form>
              ) : withdrawalTime0 == null ||
                (withdrawalTime0 == true && hasDeposit0 != true) ? (
                <div></div>
              ) : (
                <form
                  action="submit"
                  className="gauge-form d-flex flex-column justfiy-space-between"
                  onSubmit={handleSubmit}
                >
                  <input
                    className="gauge-input"
                    type="number"
                    placeholder="Enter the amount"
                    max={'50000000.000000000000000000000'}
                    min="0.000000000000000000000"
                    step="any"
                    onChange={(e) => setValueDraft0(e.target.value)}
                  />

                  {isDepositing0 ? (
                    <button
                      style={{
                        background: 'grey',
                      }}
                      className="gauge-btn"
                    >
                      Deposit
                    </button>
                  ) : (
                    <button
                      className="gauge-btn"
                      onClick={async (e) => {
                        await depositVault0()
                        setIsDepositing0(false)
                      }}
                    >
                      Deposit
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        <br></br>
        <br></br>
        <div className="d-flex align-items-center flex-column justify-content-between">
          <LemonNetworkTimer
            dateDeposit={depositTimeLine1}
            dateWithdraw={withdrawRelease1}
            className="gauge-timer "
            key={vaultTime0}
            expiryTimestamp={vaultTime0}
          />

          <div
            className="d-flex flex-wrap flex-row-reverse justify-content-between align-items-center"
            style={{ marginTop: '60px', marginBottom: '60px', width: '100%' }}
          >
            <div className="d-flex  flex-column ">
              <h1
                style={{
                  color: '#7fd705',
                  fontWeight: 'bold',
                  alignSelf: 'flex-end',
                }}
              >
                <font color="black">Lemon Network</font> Vault
              </h1>
              <div className="d-flex align-items-center">
                <div className="logo-gauge-container">
                  <img className="logo-gauge" src={networkLogo} alt="" />
                </div>
                <img src={glass} className="gauge-glass" alt="" />
                <LiquidFillGauge
                  width={circleWidth}
                  height={circleWidth}
                  waveFrequency={2}
                  waveAmplitude={4}
                  className="gauge"
                  value={value1}
                  textSize={0}
                  gradient
                  riseAnimation
                  gradientStops={gradientStops2}
                  waveAnimation
                  circleStyle={{
                    fill: '#ffff',
                  }}
                  waveStyle={{
                    fill: '#e2ff56',
                  }}
                />
              </div>
            </div>
            <div className="d-flex align-items-center flex-column ">
              <span
                className="align-self-start"
                style={{
                  position: 'absolute',
                  color: '#87d914',
                  fontWeight: 'bold',
                }}
              >
                Fixed APY
              </span>
              <span className="value-text">
                87,7% <img className="gauge-logo" src={LMD} alt="" />
              </span>
              <div
                style={{ marginBottom: '20px' }}
                className="gauge-card d-flex flex-column "
              >
                <span>
                  Rewards:{' '}
                  {(
                    parseFloat(totalLmnVault1.toString().replace(',', '')) *
                    1.2 *
                    0.877
                  )
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  $
                </span>

                <span>
                  TVL:
                  <font font-weight="lighter">
                    {' '}
                    {(
                      parseFloat(totalLmnVault1.toString().replace(',', '')) *
                      1.2
                    )
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    $
                  </font>
                </span>
                <span>
                  {' '}
                  Locked: {totalLmnVault1}{' '}
                  <img style={{ width: '35px' }} src={LMD} alt=""></img>{' '}
                </span>
              </div>
              <div className="gauge-card d-flex flex-column ">
                <span>
                  {' '}
                  Deposit DL: <i>31 Jan 2022 </i>
                </span>
                <span>
                  Release Date: <i>31 Jan 2023</i>
                </span>
              </div>
              {hasDeposit1 ? (
                <div className="gauge-card d-flex flex-column ">
                  <span>
                    {' '}
                    <font size="+1" color="black">
                      My LMN:
                    </font>{' '}
                    <i>
                      {' '}
                      {(user1['amount'] / 10 ** 18)
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    </i>
                    <img style={{ width: '35px' }} src={LMD} alt=""></img>
                  </span>
                  <span>
                    {' '}
                    <font size="+1" color="black">
                      LMN Rewards:
                    </font>{' '}
                    <i> {rewardsVault1} </i>
                    <img style={{ width: '35px' }} src={LMD} alt=""></img>
                  </span>
                  <span>
                    <font size="+1" color="black">
                      My Vault Share:
                    </font>{' '}
                    <i>
                      {' '}
                      {percentage1 < 1
                        ? percentage1.toFixed(8)
                        : percentage1.toFixed(4)}
                      %
                    </i>
                  </span>
                </div>
              ) : (
                <div></div>
              )}

              {!unlockedVault1 ? (
                <button
                  className="gauge-btn"
                  onClick={async (e) => {
                    //! Dispara UNLOCK
                    if (isUnlocking1) {
                    } else {
                      await unlockVault1()
                    }
                  }}
                >
                  Unlock
                </button>
              ) : withdrawalTime1 == true && hasDeposit1 == true ? (
                <form
                  action="submit"
                  className="gauge-form d-flex flex-column justfiy-space-between"
                  onSubmit={handleSubmit}
                >
                  <button
                    className="gauge-btn"
                    onClick={async (e) => {
                      await withdrawVault1()
                    }}
                  >
                    Withdraw
                  </button>
                </form>
              ) : withdrawalTime1 == null ||
                (withdrawalTime1 == true && hasDeposit1 != true) ? (
                <div></div>
              ) : (
                <form
                  action="submit"
                  className="gauge-form d-flex flex-column justfiy-space-between"
                  onSubmit={handleSubmit}
                >
                  <input
                    className="gauge-input"
                    type="number"
                    placeholder="Enter the amount"
                    max={50000000}
                    step="any"
                    onChange={(e) => setValueDraft1(e.target.value)}
                  />

                  {isDepositing1 ? (
                    <button
                      style={{ background: 'grey' }}
                      className="gauge-btn"
                    >
                      Deposit
                    </button>
                  ) : (
                    <button
                      className="gauge-btn"
                      onClick={async (e) => {
                        await depositVault1()
                        setIsDepositing1(false)
                      }}
                    >
                      Deposit
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gauge
