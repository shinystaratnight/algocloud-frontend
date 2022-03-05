import React, { Component } from "react";
import Pipeline from "@pipeline-ui-2/pipeline";
import renderTable from "../../Portfolio/components/tables";

interface IProps {
}

interface IState {
  myAddress?: string;
  walletBalance?: number;
  toggle?: string;
}

export const fetchDetails = async (address) => {
  let data = await fetch("https://algoexplorerapi.io/idx2/v2/accounts/" + address)
  let dataJson = await data.json()
  console.log(dataJson)
  let assets = []
  dataJson.account.assets.forEach(asset => {
    let row = []
    row.push(asset["asset-id"])
    row.push((asset.amount / 1000000))
    assets.push(row)
  })
  document.getElementById("table").innerHTML = renderTable(assets, ["asset", "amount"])
}

const wallet = Pipeline.init()
Pipeline.main = false
class PipeConnect extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      myAddress: "",
      walletBalance: 0

    }
  }

  switchWallet = (event) => {
    Pipeline.pipeConnector = event.target.id
    Pipeline.connect(wallet).then(data => {
      document.getElementById("wallet-connect-2").style.display = "none";
      document.getElementById("wallet-connected").style.display = "flex";
      this.setState({ myAddress: data })
      Pipeline.balance(data).then(data2 => {
        document.getElementById("modal-root-1").style.display = "none";
        document.getElementById("modal-root-2").style.display = "none";
        this.setState({ walletBalance: data2 })
      })
    })
  }


  render() {
    return (

      <div>
        <div id="modal-root-2" className="modal-backdrop show" style={{ display: "none" }}></div>
        <div
          id="modal-root-1" className="modal fade show"

          tabIndex={-1}

          aria-labelledby="exampleModalLabel"
          aria-modal="true"
          role="dialog"
          style={{ display: "none", paddingRight: "0.333374px" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content border-0">
              <div className="modal-header bg-card light">
                <h5 className="modal-title text-white" id="exampleModalLabel">
                  Algo Wallets
                </h5>

                <button type="button" className="btn-close btn-close-white text-white" data-bs-dismiss="modal" data-dismiss="modal" aria-label="Close"
                  onClick={() => {
                    document.getElementById(
                      "modal-root-2"
                    ).style.display = "none"
                    document.getElementById(
                      "modal-root-1"
                    ).style.display = "none";
                    ;
                  }}></button>
              </div>
              <div className="modal-body">
                <button id="WalletConnect" className="crayons-btn w-100" onClick={this.switchWallet}>
                  WalletConnect
                </button>
                <button id="AlgoSigner" className="crayons-btn w-100" onClick={this.switchWallet}>
                  AlgoSigner
                </button>
                <button id="myAlgoWallet" className="crayons-btn w-100" onClick={this.switchWallet}>
                  MyAlgoWallet
                </button>
              </div>
            </div>
          </div>
        </div>
        <button className="crayons-btn crayons-btn--secondary" id="wallet-connect-2"
          aria-haspopup="true" data-toggle="modal" data-target="modal-root-1" aria-expanded="true"
          onClick={() => {
            document.getElementById(
              "modal-root-2"
            ).style.display = "block"
            document.getElementById(
              "modal-root-1"
            ).style.display = "block";
            ;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="currentColor"
            className="bi bi-wallet"
            viewBox="0 0 16 16"
          >
            <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
          </svg>
          <span className="count__title-2">Connect Wallet</span>
        </button>
        <div id="wallet-connected" className="crayons-select" style={{ display: "none" }}>

          <div id="my-balance" className="own-balance">
            <p style={{ marginBottom: "0px" }}>{this.state.walletBalance + " Algo"}</p>
            <span className="currency" />
          </div>
          <div className="dropdown">
            <button id="own-address" className="own-address">
              {this.state.myAddress}
            </button>
            <div className="dropdown__content dropdown__content-wallet">
              <button className="dropdown-item">
                <div className="copyable">
                  <div className="copyable__text">copy address</div>
                  <span className="copy" />
                </div>
              </button>
              <a
                className="dropdown-item"
                id="algoexplorer"
                target="_blank"
                rel="noreferrer"
                href={
                  "https://algoexplorer.io/address/" +
                  this.state.myAddress
                }
              >
                AlgoExplorer
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-box-arrow-up-right"
                  viewBox="0 0 16 16"
                >

                  <path
                    fillRule="evenodd"
                    d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                  />
                </svg>
              </a>
              <button
                id="disconnect-me"
                className="dropdown-item"
              >
                Disconnect
              </button>

            </div>
          </div>
        </div>
        <div id="table"></div>
      </div>
    )
  }

}


export default PipeConnect