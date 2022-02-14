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

  it('applies given className', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.render(
          React.createElement(TokenImage, { blockchain: 'bsc', address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', className: 'custom-class-name' }),
          document.getElementById('app')
        )

        cy.get('img').should('have.attr', 'class', 'custom-class-name')
      })
    })
  })
  
  it('Loads token images from Trust Wallet correctly for bsc', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.render(
          React.createElement(TokenImage, { blockchain: 'bsc', address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82' }),
          document.getElementById('app')
        )

        cy.get('img').should('have.attr', 'src', 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png')
      })
    })
  })

  it('Loads token images from DePay if Trust Wallet image was not found', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.render(
          React.createElement(TokenImage, { blockchain: 'ethereum', address: '0xa0bed124a09ac2Bd941b10349d8d224fe3c955eb' }),
          document.getElementById('app')
        )

        cy.get('img').should('have.attr', 'src', 'https://integrate.depay.fi/tokens/ethereum/0xa0bed124a09ac2Bd941b10349d8d224fe3c955eb/image')
      })
    })
  })

  it('Falls back to a "not found" placeholder image', () => {
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

  it('Uses base64 png for blockchain native token on ethereum', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.render(
          React.createElement(TokenImage, { blockchain: 'ethereum', address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' }),
          document.getElementById('app')
        )

        cy.get('img').should('have.attr', 'src', 'data:image/png;base64,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')
      })
    })
  })

  it('Uses base64 png for blockchain native token on bsc', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.render(
          React.createElement(TokenImage, { blockchain: 'bsc', address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' }),
          document.getElementById('app')
        )

        cy.get('img').should('have.attr', 'src', 'data:image/png;base64,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')
      })
    })
  })    

})
