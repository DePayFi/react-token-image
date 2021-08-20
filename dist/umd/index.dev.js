
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('depay-web3-blockchains'), require('depay-web3-constants')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'depay-web3-blockchains', 'depay-web3-constants'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactTokenImage = {}, global.React, global.Web3Blockchains, global.Web3Constants));
}(this, (function (exports, React, depayWeb3Blockchains, depayWeb3Constants) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  const _jsxFileName = "/Users/sebastian/Work/DePay/depay-react-token-image/src/index.jsx";
  let TokenImage = function(props){

    const [src, setSrc] = React.useState();
    const [source, setSource] = React.useState('trustwallet');

    const blockchain = props.blockchain.toLowerCase();
    const address = props.address;

    React.useEffect(()=>{
      if(depayWeb3Constants.CONSTANTS[blockchain].NATIVE.toLowerCase() == address.toLowerCase()) {
        setSrc(depayWeb3Blockchains.Blockchain.findByName(blockchain).logo);
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
      React__default['default'].createElement('img', {
        src:  src ,
        onError:  handleLoadError , __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}
      )
    )
  };

  exports.TokenImage = TokenImage;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
