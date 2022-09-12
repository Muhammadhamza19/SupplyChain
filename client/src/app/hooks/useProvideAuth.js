import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'
import { loadContract } from "../../utils/load-contract";
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null
  })
  const [account, setAccount] = useState(null)
  console.log(account)
  
  const loadProvider = async () => {
    const provider = await detectEthereumProvider();
    console.log(provider);
    const contract = await loadContract("SupplyChain", provider);
    console.log(contract);
    if (provider) {
      provider.request({method: "eth_requestAccounts"})
      setWeb3Api({
        web3: new Web3(provider),
        provider,
        contract
      })
      
    }
    
    else {
      // if the provider is not detected, detectEthereumProvider resolves to null
      console.log('Please install MetaMask!')
    }
  }
  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }

    web3Api.web3 && getAccount()
  }, [web3Api.web3])

  const signIn = (name, token, image) => {
    localStorage.setItem('token', token)
    localStorage.setItem('name', name);
    localStorage.setItem('image', image);
    setUser({ name, token, image })
    loadProvider()
  }

  const signOut = () => {
    toast.success('Logout Successfully!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    localStorage.clear()
    setUser(null)

  }

  const verifyToken = () => {
    const token = localStorage.getItem('token')
    const name  = localStorage.getItem('name')
    const image = localStorage.getItem('image');

    if (token) {
      setUser({ name, token, image })
      loadProvider()
    }
  }

  return {
    user,
    signIn,
    signOut,
    verifyToken,
  };
}

export default useProvideAuth;