import { TokenImage } from '../../src'
import React from 'react'
import ReactDOM from 'react-dom'

describe('ReactTokenImage', () => {
  
  it('Loads token images from Trust Wallet', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.createRoot(
          document.getElementById('app')
        ).render(
          React.createElement(TokenImage, { blockchain: 'ethereum', address: '0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb' }),
        )

        cy.get('img').should('have.attr', 'src', 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xa0bEd124a09ac2Bd941b10349d8d224fe3c955eb/logo.png')
      })
    })
  })

  it('applies given className', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.createRoot(
          document.getElementById('app')
        ).render(
          React.createElement(TokenImage, { blockchain: 'bsc', address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', className: 'custom-class-name' }),
        )

        cy.get('img').should('have.attr', 'class', 'custom-class-name')
      })
    })
  })
  
  it('Loads token images from Trust Wallet correctly for bsc', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.createRoot(
          document.getElementById('app')
        ).render(
          React.createElement(TokenImage, { blockchain: 'bsc', address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82' }),
        )

        cy.get('img').should('have.attr', 'src', 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png')
      })
    })
  })

  it('Loads token images from Trust Wallet correctly for polygon', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.createRoot(
          document.getElementById('app')
        ).render(
          React.createElement(TokenImage, { blockchain: 'polygon', address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' }),
        )

        cy.get('img').should('have.attr', 'src', 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png')
      })
    })
  })

  it('Loads token images from DePay if Trust Wallet image was not found', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.createRoot(
          document.getElementById('app')
        ).render(
          React.createElement(TokenImage, { blockchain: 'ethereum', address: '0xa0bed124a09ac2Bd941b10349d8d224fe3c955eb' }),
        )

        cy.get('img').should('have.attr', 'src', 'https://integrate.depay.com/tokens/ethereum/0xa0bed124a09ac2Bd941b10349d8d224fe3c955eb/image')
      })
    })
  })

  it('Falls back to a "not found" placeholder image', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.createRoot(
          document.getElementById('app')
        ).render(
          React.createElement(TokenImage, { blockchain: 'ethereum', address: '0xxxx' }),
        )

        cy.get('img').should('have.attr', 'src', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjgzLjUgMjgzLjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI4My41IDI4My41OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxjaXJjbGUgZmlsbD0iI0YwRUZFRiIgY3g9IjE0MS43IiBjeT0iMTQxLjciIHI9IjE0MS43Ii8+CjxnPgoJPHBhdGggZmlsbD0iI0FCQUJBQiIgZD0iTTEyNywxNzUuMXYtNC40YzAtOC40LDEuMS0xNS4zLDMuNC0yMC43YzIuMy01LjQsNS4xLTEwLDguNC0xMy44YzMuMy0zLjcsNi42LTcsMTAuMS05LjdzNi4zLTUuNiw4LjYtOC41CgkJYzIuMy0yLjksMy40LTYuNCwzLjQtMTAuNWMwLTUtMS4xLTguNy0zLjMtMTEuMWMtMi4yLTIuNC01LTQtOC40LTQuOGMtMy40LTAuOC02LjktMS4zLTEwLjUtMS4zYy01LjgsMC0xMS44LDEtMTcuOSwyLjkKCQljLTYuMSwxLjktMTEuNSw0LjctMTYsOC40Vjc0YzIuMy0xLjcsNS40LTMuMyw5LjQtNC45YzQtMS42LDguNC0yLjksMTMuNC00YzUtMS4xLDEwLjEtMS42LDE1LjUtMS42YzguMSwwLDE1LjEsMS4xLDIxLjEsMy40CgkJYzYsMi4zLDEwLjgsNS41LDE0LjcsOS41YzMuOCw0LDYuNyw4LjcsOC42LDE0LjFjMS45LDUuMywyLjksMTEuMSwyLjksMTcuMmMwLDYuNi0xLjEsMTItMy40LDE2LjNjLTIuMyw0LjMtNS4xLDgtOC41LDExLjIKCQljLTMuNCwzLjItNi44LDYuNC0xMC4yLDkuNWMtMy40LDMuMS02LjMsNi44LTguNiwxMWMtMi4zLDQuMi0zLjQsOS41LTMuNCwxNS45djMuNEgxMjd6IE0xMjUuMiwyMTguMnYtMjcuN2gzM3YyNy43SDEyNS4yeiIvPgo8L2c+Cjwvc3ZnPgo=')
      })
    })
  })

  it('Uses base64 png for blockchain native token on ethereum', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.createRoot(
          document.getElementById('app')
        ).render(
          React.createElement(TokenImage, { blockchain: 'ethereum', address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' }),
        )

        cy.get('img').should('have.attr', 'src', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPCEtLSBDcmVhdG9yOiBDb3JlbERSQVcgMjAxOSAoNjQtQml0KSAtLT4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZlcnNpb249IjEuMSIgc2hhcGUtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIHRleHQtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIKdmlld0JveD0iMCAwIDc4NC4zNyAxMjc3LjM5IgogeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCiB4bWxuczp4b2RtPSJodHRwOi8vd3d3LmNvcmVsLmNvbS9jb3JlbGRyYXcvb2RtLzIwMDMiPgogPGcgaWQ9IkxheWVyX3gwMDIwXzEiPgogIDxtZXRhZGF0YSBpZD0iQ29yZWxDb3JwSURfMENvcmVsLUxheWVyIi8+CiAgPGcgaWQ9Il8xNDIxMzk0MzQyNDAwIj4KICAgPGc+CiAgICA8cG9seWdvbiBmaWxsPSIjMzQzNDM0IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHBvaW50cz0iMzkyLjA3LDAgMzgzLjUsMjkuMTEgMzgzLjUsODczLjc0IDM5Mi4wNyw4ODIuMjkgNzg0LjEzLDY1MC41NCAiLz4KICAgIDxwb2x5Z29uIGZpbGw9IiM4QzhDOEMiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSIzOTIuMDcsMCAtMCw2NTAuNTQgMzkyLjA3LDg4Mi4yOSAzOTIuMDcsNDcyLjMzICIvPgogICAgPHBvbHlnb24gZmlsbD0iIzNDM0MzQiIgZmlsbC1ydWxlPSJub256ZXJvIiBwb2ludHM9IjM5Mi4wNyw5NTYuNTIgMzg3LjI0LDk2Mi40MSAzODcuMjQsMTI2My4yOCAzOTIuMDcsMTI3Ny4zOCA3ODQuMzcsNzI0Ljg5ICIvPgogICAgPHBvbHlnb24gZmlsbD0iIzhDOEM4QyIgZmlsbC1ydWxlPSJub256ZXJvIiBwb2ludHM9IjM5Mi4wNywxMjc3LjM4IDM5Mi4wNyw5NTYuNTIgLTAsNzI0Ljg5ICIvPgogICAgPHBvbHlnb24gZmlsbD0iIzE0MTQxNCIgZmlsbC1ydWxlPSJub256ZXJvIiBwb2ludHM9IjM5Mi4wNyw4ODIuMjkgNzg0LjEzLDY1MC41NCAzOTIuMDcsNDcyLjMzICIvPgogICAgPHBvbHlnb24gZmlsbD0iIzM5MzkzOSIgZmlsbC1ydWxlPSJub256ZXJvIiBwb2ludHM9IjAsNjUwLjU0IDM5Mi4wNyw4ODIuMjkgMzkyLjA3LDQ3Mi4zMyAiLz4KICAgPC9nPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==')
      })
    })
  })

  it('Uses base64 png for blockchain native token on bsc', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.createRoot(
          document.getElementById('app')
        ).render(
          React.createElement(TokenImage, { blockchain: 'bsc', address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' }),
        )

        cy.get('img').should('have.attr', 'src', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxOTIgMTkyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxOTIgMTkyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0YwQjkwQjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00OS43LDM1LjRMOTYsOC43bDQ2LjMsMjYuN2wtMTcsOS45TDk2LDI4LjVMNjYuNyw0NS4zTDQ5LjcsMzUuNHogTTE0Mi4zLDY5LjJsLTE3LTkuOUw5Niw3Ni4yTDY2LjcsNTkuMwoJbC0xNyw5Ljl2MTkuOEw3OSwxMDUuOHYzMy43bDE3LDkuOWwxNy05Ljl2LTMzLjdsMjkuMy0xNi45TDE0Mi4zLDY5LjJ6IE0xNDIuMywxMjIuN3YtMTkuOGwtMTcsOS45djE5LjhMMTQyLjMsMTIyLjd6IE0xNTQuNCwxMjkuNgoJbC0yOS4zLDE2Ljl2MTkuOGw0Ni4zLTI2LjdWODZsLTE3LDkuOUwxNTQuNCwxMjkuNnogTTEzNy40LDUyLjNsMTcsOS45djE5LjhsMTctOS45VjUyLjNsLTE3LTkuOUwxMzcuNCw1Mi4zeiBNNzksMTUzLjd2MTkuOAoJbDE3LDkuOWwxNy05Ljl2LTE5LjhsLTE3LDkuOUw3OSwxNTMuN3ogTTQ5LjcsMTIyLjdsMTcsOS45di0xOS44bC0xNy05LjlMNDkuNywxMjIuN3ogTTc5LDUyLjNsMTcsOS45bDE3LTkuOWwtMTctOS45TDc5LDUyLjN6CgkgTTM3LjYsNjIuMmwxNy05LjlsLTE3LTkuOWwtMTcsOS45djE5LjhsMTcsOS45TDM3LjYsNjIuMnogTTM3LjYsOTUuOWwtMTctOS45djUzLjVsNDYuMywyNi43di0xOS44bC0yOS4zLTE2LjlWOTUuOXoiLz4KPC9zdmc+Cg==')
      })
    })
  })    

  it('Uses base64 png for blockchain native token on polygon', () => {
    cy.visit('cypress/test.html').then((contentWindow) => {
      cy.document().then((document) => {

        ReactDOM.createRoot(
          document.getElementById('app')
        ).render(
          React.createElement(TokenImage, { blockchain: 'polygon', address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' }),
        )

        cy.get('img').should('have.attr', 'src', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI0LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzOC40IDMzLjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM4LjQgMzMuNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiM4MjQ3RTU7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yOSwxMC4yYy0wLjctMC40LTEuNi0wLjQtMi40LDBMMjEsMTMuNWwtMy44LDIuMWwtNS41LDMuM2MtMC43LDAuNC0xLjYsMC40LTIuNCwwTDUsMTYuMwoJCWMtMC43LTAuNC0xLjItMS4yLTEuMi0yLjF2LTVjMC0wLjgsMC40LTEuNiwxLjItMi4xbDQuMy0yLjVjMC43LTAuNCwxLjYtMC40LDIuNCwwTDE2LDcuMmMwLjcsMC40LDEuMiwxLjIsMS4yLDIuMXYzLjNsMy44LTIuMlY3CgkJYzAtMC44LTAuNC0xLjYtMS4yLTIuMWwtOC00LjdjLTAuNy0wLjQtMS42LTAuNC0yLjQsMEwxLjIsNUMwLjQsNS40LDAsNi4yLDAsN3Y5LjRjMCwwLjgsMC40LDEuNiwxLjIsMi4xbDguMSw0LjcKCQljMC43LDAuNCwxLjYsMC40LDIuNCwwbDUuNS0zLjJsMy44LTIuMmw1LjUtMy4yYzAuNy0wLjQsMS42LTAuNCwyLjQsMGw0LjMsMi41YzAuNywwLjQsMS4yLDEuMiwxLjIsMi4xdjVjMCwwLjgtMC40LDEuNi0xLjIsMi4xCgkJTDI5LDI4LjhjLTAuNywwLjQtMS42LDAuNC0yLjQsMGwtNC4zLTIuNWMtMC43LTAuNC0xLjItMS4yLTEuMi0yLjFWMjFsLTMuOCwyLjJ2My4zYzAsMC44LDAuNCwxLjYsMS4yLDIuMWw4LjEsNC43CgkJYzAuNywwLjQsMS42LDAuNCwyLjQsMGw4LjEtNC43YzAuNy0wLjQsMS4yLTEuMiwxLjItMi4xVjE3YzAtMC44LTAuNC0xLjYtMS4yLTIuMUwyOSwxMC4yeiIvPgo8L2c+Cjwvc3ZnPgo=')
      })
    })
  })    
})
