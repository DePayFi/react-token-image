import { TokenImage } from '../../src'
import React from 'react'
import ReactDOM from 'react-dom'

describe('ReactTokenImage', () => {
  
  it('Loads token images from Trust Wallet', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.render(
          React.createElement(TokenImage, { blockchain: 'ethereum', address: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb' }),
          document.getElementById('app')
        )

        cy.get('img').should('have.attr', 'src', 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb/logo.png')
      })
    })
  })

  it('Loads token images from DePay PRO if Trust Wallet image was not found', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.render(
          React.createElement(TokenImage, { blockchain: 'ethereum', address: '0xa0bed124a09ac2Bd941b10349d8d224fe3c955eb' }),
          document.getElementById('app')
        )

        cy.get('img').should('have.attr', 'src', 'https://api.depay.pro/v1/images/tokens/ethereum/0xa0bed124a09ac2Bd941b10349d8d224fe3c955eb')
      })
    })
  })

  it.only('Falls back to a "not found" placeholder image', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.render(
          React.createElement(TokenImage, { blockchain: 'ethereum', address: '0xxxx' }),
          document.getElementById('app')
        )

        cy.get('img').should('have.attr', 'src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAGFBMVEVHcEz///////////////////////////8dS1W+AAAAB3RSTlMAHklzmMLqCsLrGwAAAQ9JREFUeNrtlrsOgkAQRRdFbDcae4IFrZEYazXRVitqQ2Hrk/19BVdX7XYuiQX3VDZzMsxrVYQQQkibGIyzLNHi8OHaVJRLWXgwMy8KLYnfGEchEFTxjp2/wHxRalBg9v4CNAXzwxYVXCSC2ypJstx+g6/ATaAdqImvoHxHzEVFcPGqWwtOnoLFx++6DGdgq9NnG+T0K8EVEPTqnrZbEKGCFO1CDs2BG2UZbpnABEwMJIA1IRSeZfdCgV8wsjdVnEBuLyKyBu51Fb+xpfhPRgdsgYqeM6DlQwQmoA62AvISgIsc2j0EaxgDL0ojx/CCCs4KPGYnVHCk4CEg7SbIKqbqfyeRAgoaERBCCCGESLgDeRfMNogh3QMAAAAASUVORK5CYII=')
      })
    })
  })
})
