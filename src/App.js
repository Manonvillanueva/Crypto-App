import React, { useEffect, useState } from "react";
import HeaderInfos from "./components/HeaderInfos";
import GlobalChart from "./components/GlobalChart";
import axios from "axios";

const App = () => {
  const [coinsData, setCoinsData] = useState([]);

  // => Dans le lien de l'API nou savons 250 coins , qui triées du plus gros au plus petit  et nous pouvons voir les données à l'toHaveFormValues, sur une journée, sur une semaine , sur un mois sur 1an
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y"
      )
      .then((res) => setCoinsData(res.data));
  }, []);
  return (
    <div className="app-container">
      <header>
        <HeaderInfos />
        <GlobalChart coinsData={coinsData} />
      </header>
    </div>
  );
};

export default App;
