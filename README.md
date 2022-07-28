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

## Functionalities

### TokenImage

The TokenImage component tries to display a token image for a given `blockchain` and `address` by:

1. Trying to fetch the image from https://github.com/trustwallet/assets

2. Trying to fetch the image from [DePay API](https://depay.fi/documentation/api)

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
