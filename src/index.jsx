import React, { useState, useEffect } from 'react'

let TokenImage = function(props){

  const [src, setSrc] = useState()
  const [source, setSource] = useState('trustwallet')

  const blockchain = props.blockchain.toLowerCase()
  const address = props.address

  useEffect(()=>setSrc(trustWalletAddress({ blockchain, address })), [blockchain, address])
  
  const trustWalletAddress = ({ blockchain, address })=> {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${blockchain}/assets/${address}/logo.png`
  }

  const handleLoadError = (error)=> {
    if(source == 'trustwallet') {
      setSource('depay')
      setSrc(`https://api.depay.pro/v1/images/tokens/${blockchain}/${address}`)
    } else {
      setSource('unknown')
      setSrc('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAGFBMVEVHcEz///////////////////////////8dS1W+AAAAB3RSTlMAHklzmMLqCsLrGwAAAQ9JREFUeNrtlrsOgkAQRRdFbDcae4IFrZEYazXRVitqQ2Hrk/19BVdX7XYuiQX3VDZzMsxrVYQQQkibGIyzLNHi8OHaVJRLWXgwMy8KLYnfGEchEFTxjp2/wHxRalBg9v4CNAXzwxYVXCSC2ypJstx+g6/ATaAdqImvoHxHzEVFcPGqWwtOnoLFx++6DGdgq9NnG+T0K8EVEPTqnrZbEKGCFO1CDs2BG2UZbpnABEwMJIA1IRSeZfdCgV8wsjdVnEBuLyKyBu51Fb+xpfhPRgdsgYqeM6DlQwQmoA62AvISgIsc2j0EaxgDL0ojx/CCCs4KPGYnVHCk4CEg7SbIKqbqfyeRAgoaERBCCCGESLgDeRfMNogh3QMAAAAASUVORK5CYII=')
    }
  }

  return(
    <img
      src={ src }
      onError={ handleLoadError }
    />
  )
}

export {
  TokenImage
}
