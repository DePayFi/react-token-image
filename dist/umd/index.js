(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactTokenImage = {}, global.React));
}(this, (function (exports, React) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  const _jsxFileName = "/Users/sebastian/Work/DePay/depay-react-token-image/src/index.jsx";
  let TokenImage = function(props){

    const [src, setSrc] = React.useState();
    const [source, setSource] = React.useState('trustwallet');

    const blockchain = props.blockchain.toLowerCase();
    const address = props.address;

    React.useEffect(()=>setSrc(trustWalletAddress({ blockchain, address })), [blockchain, address]);
    
    const trustWalletAddress = ({ blockchain, address })=> {
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${blockchain}/assets/${address}/logo.png`
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

    return(
      React__default['default'].createElement('img', {
        src:  src ,
        onError:  handleLoadError , __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}
      )
    )
  };

  exports.TokenImage = TokenImage;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
