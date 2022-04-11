import React, { useState } from "react";
import { ethers } from "ethers";
const Finance = () => {
  const [error, seterror] = useState("");
  const [defaultAccount, setDefaultAccount] = useState();
  const [userBalance, setuserBalance] = useState();
  const [openMetamaskModel, setopenMetamaskModel] = useState(false);

  const openMetamask = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        accounChangeHandler(res[0]);
      });
    } else {
      seterror("install metamask");
    }
  };
  const doopenMetamaskModel = () => {
    setopenMetamaskModel(true);
  };
  const accounChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
  };
  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setuserBalance(ethers.utils.formatEther(balance));
      });
  };
  window.ethereum.on("accountsChanged", accounChangeHandler);
  return (
    <div className="card">
      <div className="row">
        <h2>Finance</h2>
        <div className="col-1"></div>
        <button className="button col-2" onClick={doopenMetamaskModel}>
          Add Wallet
        </button>
      </div>
      {openMetamaskModel ? (
        <div class="wallet">
          <aside class="left-wallet">
            <div class="wallet-head">
              <h1> My Wallets </h1>
              <div class="modal-open" onClick={openMetamask}>
                +
              </div>
            </div>
            '
            <div class="cc-select">
              <div id="'+data.id+'" class="cc mc">
                <div class="cc-img-main"></div>
                <div class="cc-num">{defaultAccount}</div>
              </div>
              "
            </div>
          </aside>
          <content className="right-trans">
            <h1> Current Balance </h1>
            <h4 id="balance">
              {userBalance} ETH
              {error}
            </h4>
            <div class="trans-list"></div>
          </content>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Finance;
