import React, { useState, useEffect } from 'react'
import { Blockchain } from '@depay/web3-blockchains'
import { CONSTANTS } from '@depay/web3-constants'
import { request } from '@depay/web3-client'
import { supported } from './blockchains'

const tokenURIAPI = [{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]
const uriAPI = [{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]
const UNKNOWN_IMAGE = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjgzLjUgMjgzLjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI4My41IDI4My41OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxjaXJjbGUgZmlsbD0iI0YwRUZFRiIgY3g9IjE0MS43IiBjeT0iMTQxLjciIHI9IjE0MS43Ii8+CjxnPgoJPHBhdGggZmlsbD0iI0FCQUJBQiIgZD0iTTEyNywxNzUuMXYtNC40YzAtOC40LDEuMS0xNS4zLDMuNC0yMC43YzIuMy01LjQsNS4xLTEwLDguNC0xMy44YzMuMy0zLjcsNi42LTcsMTAuMS05LjdzNi4zLTUuNiw4LjYtOC41CgkJYzIuMy0yLjksMy40LTYuNCwzLjQtMTAuNWMwLTUtMS4xLTguNy0zLjMtMTEuMWMtMi4yLTIuNC01LTQtOC40LTQuOGMtMy40LTAuOC02LjktMS4zLTEwLjUtMS4zYy01LjgsMC0xMS44LDEtMTcuOSwyLjkKCQljLTYuMSwxLjktMTEuNSw0LjctMTYsOC40Vjc0YzIuMy0xLjcsNS40LTMuMyw5LjQtNC45YzQtMS42LDguNC0yLjksMTMuNC00YzUtMS4xLDEwLjEtMS42LDE1LjUtMS42YzguMSwwLDE1LjEsMS4xLDIxLjEsMy40CgkJYzYsMi4zLDEwLjgsNS41LDE0LjcsOS41YzMuOCw0LDYuNyw4LjcsOC42LDE0LjFjMS45LDUuMywyLjksMTEuMSwyLjksMTcuMmMwLDYuNi0xLjEsMTItMy40LDE2LjNjLTIuMyw0LjMtNS4xLDgtOC41LDExLjIKCQljLTMuNCwzLjItNi44LDYuNC0xMC4yLDkuNWMtMy40LDMuMS02LjMsNi44LTguNiwxMWMtMi4zLDQuMi0zLjQsOS41LTMuNCwxNS45djMuNEgxMjd6IE0xMjUuMiwyMTguMnYtMjcuN2gzM3YyNy43SDEyNS4yeiIvPgo8L2c+Cjwvc3ZnPgo='

let TokenImage = function(props){

  const [src, setSrc] = useState()
  const [source, setSource] = useState('repository')

  const blockchain = props.blockchain.toLowerCase()
  const address = props.address
  const id = props.id

  useEffect(()=>{
    if(CONSTANTS[blockchain].NATIVE.toLowerCase() == address.toLowerCase()) {
      setSrc(Blockchain.findByName(blockchain).logo)
    } else {
      setSrc(logoFromRepository({ blockchain, address }))
    }
  }, [blockchain, address])
  
  const logoFromRepository = ({ blockchain, address })=> {
    if(['ethereum', 'bsc', 'polygon', 'solana'].includes(blockchain)) {
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${mapBlockchainName(blockchain)}/assets/${address}/logo.png`
    } else if(blockchain == 'velas'){
      return `https://raw.githubusercontent.com/wagyuswapapp/assets/master/blockchains/velas/assets/${address.toLowerCase()}/logo.png`
    }
  }

  const mapBlockchainName = (blockchain)=>{
    switch (blockchain) {
      case 'ethereum':
        return 'ethereum'
        break;
      case 'bsc':
        return 'smartchain'
        break;
      case 'polygon':
        return 'polygon'
        break;
      case 'solana':
        return 'solana'
        break;
      default:
        throw('DePayReactTokenImage: Unknown blockchain')
    }
  }

  const setUnknown = ()=>{
    setSource('unknown')
    setSrc(UNKNOWN_IMAGE)
  }

  const uriToImage = (tokenURI)=>{
    if(tokenURI.match(/^ipfs/)) {
      tokenURI = `https://ipfs.io/ipfs/${tokenURI.split('://')[1]}`
    }
    fetch(tokenURI).then((response) => {
      if (response.ok) { return response.json() }
      setUnknown()
    })
    .then((responseJson) => {
      if(responseJson) {
        let image = responseJson.image
        if(image){
          if(image.match(/^ipfs/)) {
            image = `https://ipfs.io/ipfs/${image.split('://')[1]}`
          } 
          setSource('meta')
          setSrc(image)
        } else {
          setUnknown()
        }
      }
    }).catch(setUnknown)
  }

  const handleLoadError = (error)=> {
    if(source == 'repository') {
      setSource('depay')
      setSrc(`https://integrate.depay.com/tokens/${blockchain}/${address}/image`)
    } else if (source == 'depay' && supported.evm.includes(blockchain)) {
      if(id) {
        request({ blockchain, address, api: uriAPI, method: 'uri', params: [id] }).then((uri)=>{
          uri = uri.match('0x{id}') ? uri.replace('0x{id}', id) : uri
          uriToImage(uri)
        }).catch(setUnknown)
      } else {
        request({ blockchain, address, api: tokenURIAPI, method: 'tokenURI', params: [1] }).then(uriToImage).catch(setUnknown)
      }
    } else {
      setUnknown()
    }
  }

  if(src == undefined) { return null }

  return(
    <img
      className={ props.className }
      src={ src }
      onError={ handleLoadError }
    />
  )
}

export {
  TokenImage
}
