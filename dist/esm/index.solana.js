import { PublicKey, Buffer } from '@depay/solana-web3.js';
import { request } from '@depay/web3-client-solana';
import Token from '@depay/web3-tokens-solana';
import React, { useState, useEffect } from 'react';
import Blockchains from '@depay/web3-blockchains';

let supported = ['solana'];
supported.evm = [];
supported.solana = ['solana'];

const _jsxFileName = "/Users/sebastian/Work/DePay/react-token-image/src/index.js"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

const tokenURIAPI = [{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
const uriAPI = [{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
const UNKNOWN_IMAGE = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjgzLjUgMjgzLjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI4My41IDI4My41OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxjaXJjbGUgZmlsbD0iI0YwRUZFRiIgY3g9IjE0MS43IiBjeT0iMTQxLjciIHI9IjE0MS43Ii8+CjxnPgoJPHBhdGggZmlsbD0iI0FCQUJBQiIgZD0iTTEyNywxNzUuMXYtNC40YzAtOC40LDEuMS0xNS4zLDMuNC0yMC43YzIuMy01LjQsNS4xLTEwLDguNC0xMy44YzMuMy0zLjcsNi42LTcsMTAuMS05LjdzNi4zLTUuNiw4LjYtOC41CgkJYzIuMy0yLjksMy40LTYuNCwzLjQtMTAuNWMwLTUtMS4xLTguNy0zLjMtMTEuMWMtMi4yLTIuNC01LTQtOC40LTQuOGMtMy40LTAuOC02LjktMS4zLTEwLjUtMS4zYy01LjgsMC0xMS44LDEtMTcuOSwyLjkKCQljLTYuMSwxLjktMTEuNSw0LjctMTYsOC40Vjc0YzIuMy0xLjcsNS40LTMuMyw5LjQtNC45YzQtMS42LDguNC0yLjksMTMuNC00YzUtMS4xLDEwLjEtMS42LDE1LjUtMS42YzguMSwwLDE1LjEsMS4xLDIxLjEsMy40CgkJYzYsMi4zLDEwLjgsNS41LDE0LjcsOS41YzMuOCw0LDYuNyw4LjcsOC42LDE0LjFjMS45LDUuMywyLjksMTEuMSwyLjksMTcuMmMwLDYuNi0xLjEsMTItMy40LDE2LjNjLTIuMyw0LjMtNS4xLDgtOC41LDExLjIKCQljLTMuNCwzLjItNi44LDYuNC0xMC4yLDkuNWMtMy40LDMuMS02LjMsNi44LTguNiwxMWMtMi4zLDQuMi0zLjQsOS41LTMuNCwxNS45djMuNEgxMjd6IE0xMjUuMiwyMTguMnYtMjcuN2gzM3YyNy43SDEyNS4yeiIvPgo8L2c+Cjwvc3ZnPgo=';

let TokenImage = function(props){

  const [src, setSrc] = useState();
  const [source, _setSource] = useState();

  const blockchain = props.blockchain.toLowerCase();
  const address = props.address;
  const id = props.id;
  const getLocalStorageKey = (blockchain, address)=>{
    return [
      'react-token-image',
      'v5.0.2',
      blockchain,
      address,
    ].join('-')
  };

  const setSource = (src, source)=>{
    setSrc(src);
    _setSource(source);
    if(source != 'unknown') {
      localStorage.setItem(getLocalStorageKey(blockchain, address), JSON.stringify({ src, expiresAt: Date.now() + (24 * 60 * 60 * 1000) })); // 24 hours
    }
  };

  useEffect(()=>{
    let storedImage = localStorage.getItem(getLocalStorageKey(blockchain, address));
    if(storedImage && storedImage.length) {
      try { 
        storedImage = JSON.parse(storedImage);
      } catch (e) {}
    }
    if(storedImage && storedImage.src && storedImage.expiresAt > Date.now() && storedImage.src != UNKNOWN_IMAGE) {
      return setSource(storedImage.src, 'stored')
    }
    const foundMajorToken = Blockchains[blockchain].tokens.find((token)=> token.address.toLowerCase() === _optionalChain([address, 'optionalAccess', _ => _.toLowerCase, 'call', _2 => _2()]));
    if(foundMajorToken) {
      setSource(foundMajorToken.logo, 'web3-blockchains');
    } else {
      if(supported.evm.includes(blockchain)) {
        setSource(logoFromRepository({ blockchain, address }), 'repository');
      } else if(blockchain === 'solana') {
        logoFromMetaplex({ blockchain, address }).then((image)=>{
          setSource(image, 'metaplex');
        }).catch((error)=>{
          setSource(logoFromRepository({ blockchain, address }), 'repository');
        });
      }
    }
  }, [blockchain, address]);

  const logoFromMetaplex = ({ blockchain, address }) => {
    return new Promise(async(resolve, reject)=>{
      try {

        let mintPublicKey = new PublicKey(address);
        let metaDataPublicKey = new PublicKey(Token.solana.METADATA_ACCOUNT);

        let seed = [
          Buffer.from('metadata'),
          metaDataPublicKey.toBuffer(),
          mintPublicKey.toBuffer()  
        ];

        let tokenMetaDataPublicKey = (await PublicKey.findProgramAddress(seed, metaDataPublicKey))[0];

        let metaData = await request({
          blockchain, 
          address: tokenMetaDataPublicKey.toString(),
          api: Token.solana.METADATA_LAYOUT,
          cache: 86400000, // 1 day
        });

        
        if(_optionalChain([metaData, 'optionalAccess', _3 => _3.data, 'optionalAccess', _4 => _4.uri])) {

          const uri = metaData.data.uri.replace(new RegExp('\u0000', 'g'), '');
          if(uri && uri.length) {
            await fetch(uri)
              .then((response) => response.json())
              .then((json)=>{
                if(json && json.image) {
                  resolve(json.image);
                } else {
                  reject('image not found on metaplex');
                }
              }).catch(()=>reject('image not found on metaplex'));
          } else {
            reject('image not found on metaplex');
          }
        } else {
          reject('image not found on metaplex');
        }

      } catch (e2) { reject('image not found on metaplex'); }
    })
  };
  
  const logoFromRepository = ({ blockchain, address })=> {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${mapBlockchainNameToTrustWalletAssets(blockchain)}/assets/${address}/logo.png`
  };

  const mapBlockchainNameToTrustWalletAssets = (blockchain)=>{
    switch (blockchain) {
      case 'ethereum':
        return 'ethereum'
      case 'bsc':
        return 'smartchain'
      case 'polygon':
        return 'polygon'
      case 'solana':
        return 'solana'
      case 'fantom':
        return 'fantom'
      case 'arbitrum':
        return 'arbitrum'
      case 'avalanche':
        return 'avalanchec'
      case 'gnosis':
        return 'xdai'
      case 'optimism':
        return 'optimism'
      case 'base':
        return 'base'
      case 'worldchain':
        return 'optimism'
      default:
        throw('DePayReactTokenImage: Unknown blockchain')
    }
  };

  const setUnknown = ()=>{
    setSource(UNKNOWN_IMAGE, 'unknown');
  };

  const uriToImage = (tokenURI)=>{
    if(tokenURI.match(/^ipfs/)) {
      tokenURI = `https://ipfs.io/ipfs/${tokenURI.split('://')[1]}`;
    }
    fetch(tokenURI).then((response) => {
      if (response.ok) { return response.json() }
      setUnknown();
    })
    .then((responseJson) => {
      if(responseJson) {
        let image = responseJson.image;
        if(image){
          if(image.match(/^ipfs/)) {
            image = `https://ipfs.io/ipfs/${image.split('://')[1]}`;
          } 
          setSource(image, 'meta');
        } else {
          setUnknown();
        }
      }
    }).catch(setUnknown);
  };

  const handleLoadError = (error)=> {
    delete localStorage[getLocalStorageKey(blockchain, address)];
    if(source == 'metaplex') {
      setSource(logoFromRepository({ blockchain, address }), 'repository');
    } else if(source == 'web3-blockchains') {
      setSource(logoFromRepository({ blockchain, address }), 'repository');
    } else if(source == 'repository') {
      setSource(`https://integrate.depay.com/tokens/${blockchain}/${address}/image`, 'depay');
    } else if (source == 'depay' && supported.evm.includes(blockchain)) {
      if(id) {
        request({ blockchain, address, api: uriAPI, method: 'uri', params: [id] }).then((uri)=>{
          uri = uri.match('0x{id}') ? uri.replace('0x{id}', id) : uri;
          uriToImage(uri);
        }).catch(setUnknown);
      } else {
        request({ blockchain, address, api: tokenURIAPI, method: 'tokenURI', params: [1] }).then(uriToImage).catch(setUnknown);
      }
    } else {
      setUnknown();
    }
  };

  if(src == undefined) {
    return(
      React.createElement('div', { className:  props.className , __self: this, __source: {fileName: _jsxFileName, lineNumber: 209}} )
    )
  }

  return(
    React.createElement('img', {
      className:  props.className ,
      src:  src ,
      onError:  handleLoadError , __self: this, __source: {fileName: _jsxFileName, lineNumber: 214}}
    )
  )
};

export { TokenImage };
