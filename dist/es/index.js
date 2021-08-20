import React, { useState, useEffect } from 'react';
import { Blockchain } from 'depay-web3-blockchains';
import { CONSTANTS } from 'depay-web3-constants';

const _jsxFileName = "/Users/sebastian/Work/DePay/depay-react-token-image/src/index.jsx";
let TokenImage = function(props){

  const [src, setSrc] = useState();
  const [source, setSource] = useState('trustwallet');

  const blockchain = props.blockchain.toLowerCase();
  const address = props.address;

  useEffect(()=>{
    if(CONSTANTS[blockchain].NATIVE.toLowerCase() == address.toLowerCase()) {
      setSrc(Blockchain.findByName(blockchain).logo);
    } else {
      setSrc(trustWalletAddress({ blockchain, address }));
    }
  }, [blockchain, address]);
  
  const trustWalletAddress = ({ blockchain, address })=> {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${mapBlockchainName(blockchain)}/assets/${address}/logo.png`
  };

  const mapBlockchainName = (blockchain)=>{
    switch (blockchain) {
      case 'ethereum':
        return 'ethereum'
      case 'bsc':
        return 'smartchain'
      default:
        throw('DePayReactTokenImage: Unknown blockchain')
    }
  };

  const handleLoadError = (error)=> {
    if(source == 'trustwallet') {
      setSource('depay');
      setSrc(`https://api.depay.pro/v1/images/tokens/${blockchain}/${address}`);
    } else {
      setSource('unknown');
      setSrc('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAGFBMVEVHcEz///////////////////////////8dS1W+AAAAB3RSTlMAHklzmMLqCsLrGwAAAQ9JREFUeNrtlrsOgkAQRRdFbDcae4IFrZEYazXRVitqQ2Hrk/19BVdX7XYuiQX3VDZzMsxrVYQQQkibGIyzLNHi8OHaVJRLWXgwMy8KLYnfGEchEFTxjp2/wHxRalBg9v4CNAXzwxYVXCSC2ypJstx+g6/ATaAdqImvoHxHzEVFcPGqWwtOnoLFx++6DGdgq9NnG+T0K8EVEPTqnrZbEKGCFO1CDs2BG2UZbpnABEwMJIA1IRSeZfdCgV8wsjdVnEBuLyKyBu51Fb+xpfhPRgdsgYqeM6DlQwQmoA62AvISgIsc2j0EaxgDL0ojx/CCCs4KPGYnVHCk4CEg7SbIKqbqfyeRAgoaERBCCCGESLgDeRfMNogh3QMAAAAASUVORK5CYII=');
    }
  };

  if(src == undefined) { return null }

  return(
    React.createElement('img', {
      src:  src ,
      onError:  handleLoadError , __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}
    )
  )
};

export { TokenImage };
