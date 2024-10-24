import axios from "axios";
import React, { useEffect, useState } from "react";
import PercentChange from "./PercentChange";
import TableFilters from "./TableFilters";

const HeaderInfos = () => {
  // `headerData` stockera les données de l'API coingecko
  const [headerData, setHeaderData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/global")
      .then((res) => setHeaderData(res.data.data));
  }, []);
  return (
    <div className="header-container">
      <ul className="title">
        <li>
          <h1>
            <img src="./assets/logo.png" alt="logo" /> Watch Tower
          </h1>
        </li>
        {/* On utilise .toLocaleString() pour ajouter des séparateurs de milliers  */}
        <li>
          {/* Le nombre de cryptomonnaie  */}
          Crypto-monnaies :
          {headerData.active_cryptocurrencies &&
            headerData.active_cryptocurrencies.toLocaleString()}
        </li>
        {/* Le nombre de marchés  */}
        <li>Marchés : {headerData.markets && headerData.markets}</li>
      </ul>
      <ul className="infos-mkt">
        {/* moyenne du marché sur 24h */}
        <li className="global-mkt">
          Global Market Cap :
          <PercentChange
            percent={headerData.market_cap_change_percentage_24h_usd}
          />
        </li>
        {/* % du marché du bitcoin   */}
        {/* en mettant "headerData.market_cap_percentage &&" on évite les problèmes potentiels lorsque certaines données peuvent ne pas être disponibles au moment du rendu du composant. */}
        <li>
          BTC dominance :
          {headerData.market_cap_percentage &&
            headerData.market_cap_percentage.btc.toFixed(1) + "%"}
        </li>
        {/* % du marché de l'ethereum   */}
        <li>
          ETH dominance :
          {headerData.market_cap_percentage &&
            headerData.market_cap_percentage.eth.toFixed(1) + "%"}
        </li>
      </ul>
      <TableFilters />
    </div>
  );
};

export default HeaderInfos;
