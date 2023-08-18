import { PublicKey, Buffer } from '@depay/solana-web3.js';
import { request } from '@depay/web3-client';
import Token from '@depay/web3-tokens';
import React, { useState, useEffect } from 'react';
import Blockchains from '@depay/web3-blockchains';

let supported = ['ethereum', 'bsc', 'polygon', 'solana', 'fantom', 'velas'];
supported.evm = ['ethereum', 'bsc', 'polygon', 'fantom', 'velas'];
supported.solana = ['solana'];

const _jsxFileName = "/Users/sebastian/Work/DePay/react-token-image/src/index.js"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

const tokenURIAPI = [{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
const uriAPI = [{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
const UNKNOWN_IMAGE = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjgzLjUgMjgzLjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI4My41IDI4My41OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxjaXJjbGUgZmlsbD0iI0YwRUZFRiIgY3g9IjE0MS43IiBjeT0iMTQxLjciIHI9IjE0MS43Ii8+CjxnPgoJPHBhdGggZmlsbD0iI0FCQUJBQiIgZD0iTTEyNywxNzUuMXYtNC40YzAtOC40LDEuMS0xNS4zLDMuNC0yMC43YzIuMy01LjQsNS4xLTEwLDguNC0xMy44YzMuMy0zLjcsNi42LTcsMTAuMS05LjdzNi4zLTUuNiw4LjYtOC41CgkJYzIuMy0yLjksMy40LTYuNCwzLjQtMTAuNWMwLTUtMS4xLTguNy0zLjMtMTEuMWMtMi4yLTIuNC01LTQtOC40LTQuOGMtMy40LTAuOC02LjktMS4zLTEwLjUtMS4zYy01LjgsMC0xMS44LDEtMTcuOSwyLjkKCQljLTYuMSwxLjktMTEuNSw0LjctMTYsOC40Vjc0YzIuMy0xLjcsNS40LTMuMyw5LjQtNC45YzQtMS42LDguNC0yLjksMTMuNC00YzUtMS4xLDEwLjEtMS42LDE1LjUtMS42YzguMSwwLDE1LjEsMS4xLDIxLjEsMy40CgkJYzYsMi4zLDEwLjgsNS41LDE0LjcsOS41YzMuOCw0LDYuNyw4LjcsOC42LDE0LjFjMS45LDUuMywyLjksMTEuMSwyLjksMTcuMmMwLDYuNi0xLjEsMTItMy40LDE2LjNjLTIuMyw0LjMtNS4xLDgtOC41LDExLjIKCQljLTMuNCwzLjItNi44LDYuNC0xMC4yLDkuNWMtMy40LDMuMS02LjMsNi44LTguNiwxMWMtMi4zLDQuMi0zLjQsOS41LTMuNCwxNS45djMuNEgxMjd6IE0xMjUuMiwyMTguMnYtMjcuN2gzM3YyNy43SDEyNS4yeiIvPgo8L2c+Cjwvc3ZnPgo=';

let TokenImage = function(props){

  const [src, _setSrc] = useState();
  const [source, setSource] = useState();

  const blockchain = props.blockchain.toLowerCase();
  const address = props.address;
  const id = props.id;
  const date = new Date();
  const localStorageKey = ['react-token-image', blockchain, address, [date.getFullYear(), date.getMonth(), date.getDate()].join('-')].join('-');

  const setSrc = (_src)=>{
    localStorage.setItem(localStorageKey, _src);
    _setSrc(_src);
  };

  useEffect(()=>{
    const storedImage = localStorage.getItem(localStorageKey);
    if(storedImage && storedImage.length && storedImage != UNKNOWN_IMAGE) { return setSrc(storedImage) }
    const foundMajorToken = Blockchains[blockchain].tokens.find((token)=> token.address.toLowerCase() === address.toLowerCase());
    if(foundMajorToken) {
      setSrc(foundMajorToken.logo);
    } else {
      if(supported.evm.includes(blockchain)) {
        setSource('repository');
        setSrc(logoFromRepository({ blockchain, address }));
      } else if(blockchain === 'solana') {
        setSource('metaplex');
        logoFromMetaplex({ blockchain, address }).then((image)=>{
          setSrc(image);
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
        
        if(_optionalChain([metaData, 'optionalAccess', _ => _.data, 'optionalAccess', _2 => _2.uri])) {

          const uri = metaData.data.uri.replace(new RegExp('\u0000', 'g'), '');
          if(uri && uri.length) {
            await fetch(uri)
              .then((response) => response.json())
              .then((json)=>{
                if(json && json.image) {
                  resolve(json.image);
                } else {
                  resolve('');
                }
              }).catch(()=>resolve(''));
          } else {
            resolve('');
          }
        } else {
          resolve('');
        }

      } catch (e) { resolve(''); }
    })
  };
  
  const logoFromRepository = ({ blockchain, address })=> {
    if(['ethereum', 'bsc', 'polygon', 'fantom', 'solana'].includes(blockchain)) {
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${mapBlockchainNameToTrustWalletAssets(blockchain)}/assets/${address}/logo.png`
    } else if(blockchain == 'velas'){
      return `https://raw.githubusercontent.com/wagyuswapapp/assets/master/blockchains/velas/assets/${address.toLowerCase()}/logo.png`
    }
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
      default:
        throw('DePayReactTokenImage: Unknown blockchain')
    }
  };

  const setUnknown = ()=>{
    setSource('unknown');
    setSrc(UNKNOWN_IMAGE);
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
          setSource('meta');
          setSrc(image);
        } else {
          setUnknown();
        }
      }
    }).catch(setUnknown);
  };

  const handleLoadError = (error)=> {
    if(source == 'metaplex') {
      setSource('repository');
      setSrc(logoFromRepository({ blockchain, address }));
    } else if(source == 'repository') {
      setSource('depay');
      setSrc(`https://integrate.depay.com/tokens/${blockchain}/${address}/image`);
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

  if(src == undefined) { return null }

  return(
    React.createElement('img', {
      className:  props.className ,
      src:  src ,
      onError:  handleLoadError , __self: this, __source: {fileName: _jsxFileName, lineNumber: 191}}
    )
  )
};

export { TokenImage };
