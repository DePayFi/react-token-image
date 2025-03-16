## Quickstart

```
yarn add @depay/react-token-image
```

or 

```
npm install --save @depay/react-token-image
```

```javascript
import { TokenImage } from '@depay/react-token-image'

render() {
  return(
    <TokenImage
      className="custom-img-class-name"
      blockchain={'ethereum'}
      address={'0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb'}
    />
  )
}
```

## Support

This library supports the following blockchains:

- [Ethereum](https://ethereum.org)
- [BNB Smart Chain](https://www.binance.org/smartChain)
- [Polygon](https://polygon.technology)
- [Solana](https://solana.com)
- [Fantom](https://fantom.foundation)
- [Arbitrum](https://arbitrum.io)
- [Avalanche](https://www.avax.network)
- [Gnosis](https://gnosis.io)
- [Optimism](https://www.optimism.io)
- [Base](https://base.org)
- [Worldchain](https://worldcoin.org/world-chain)

## Platform specific packaging

In case you want to use and package only specific platforms, use the platform-specific package:

### EVM (Ethereum Virtual Machien) platform specific packaging

```javascript
import { TokenImage } from '@depay/react-token-image-evm'
```

### SVM (Solana Virtual Machine) platform specific packaging

```javascript
import { TokenImage } from '@depay/react-token-image-svm'
```


## Functionalities

### TokenImage

The TokenImage component tries to display a token image for a given `blockchain` and `address` by:

1. Trying to fetch the image from https://github.com/trustwallet/assets, or https://github.com/wagyuswapapp/assets (Velas)

2. Trying to fetch the image from [DePay API](https://depay.com/documentation/api)

3. Trying to fetch an image through NFT token meta data

### NFT Images

Pass an additional `id` if token address contains multiple NFTs:

```javascript
<TokenImage
  blockchain={'ethereum'}
  address={'0x495f947276749ce646f68ac8c248420045cb7b5e'}
  id={'42745998150656004690816543961586238000273307462307754421658803578179357246440'}
/>
```


## Development

### Get started

```
yarn install
yarn dev
```

### Release

```
npm publish
```

### Testing
