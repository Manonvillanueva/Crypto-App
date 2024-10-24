import React, { useEffect, useState } from "react";
import { Tooltip, Treemap } from "recharts";
import colors from "../styles/_settings.scss";

const GlobalChart = ({ coinsData }) => {
  // `dataArray` stockera les données que l'on passera à la Treemap
  const [dataArray, setDataArray] = useState([]);

  // Fonction pour choisir une couleur de fond pour les boîtes de la Treemap en fonction de la variation de prix d'une cryptomonnaie
  const colorPicker = (number) => {
    if (number >= 20) {
      return colors.color1;
    } else if (number >= 5) {
      return colors.green2;
    } else if (number >= 0) {
      return colors.green1;
    } else if (number >= -5) {
      return colors.red1;
    } else if (number >= -20) {
      return colors.red2;
    } else {
      return colors.black2;
    }
  };

  // Fonction pour exclure certaine cryptomonnaies de la Treemap
  const excludeCoin = (coin) => {
    const excludedCoins = ["usdt", "usdc", "busd", "dai", "ust", "mim"];
    return !excludedCoins.includes(coin);
  };

  // `useEffect` qui se déclenche au chargement du composant et à chaque fois que `coinsData` est mis à jour
  useEffect(() => {
    let chartData = [];

    // Le if vérifie si il y a des éléments dans coinsData
    // La boucle for limite 45 éléments dans la Treemap , pour un meilleur affichage
    // Création d'objet dans chartData pour chaque cryptomonnaie :
    // `size` détermine la taille de chaque boîte dans la Treemap en fonction de la capitalisation boursière
    // `fill` détermine la couleur de l'élément dans la Treemap, en fonction de la variation de prix sur 24h
    if (coinsData.length > 0) {
      for (let i = 0; i < 45; i++) {
        if (excludeCoin(coinsData[i].symbol)) {
          chartData.push({
            name:
              coinsData[i].symbol.toUpperCase() +
              " " +
              coinsData[i].market_cap_change_percentage_24h.toFixed(1) +
              "%",
            size: coinsData[i].market_cap,
            fill: colorPicker(coinsData[i].price_change_percentage_24h),
          });
        }
      }
    }
    setDataArray(chartData);
  }, [coinsData]);

  // Fonction pour afficher une infobulle au survol des boîtes dans la treemap
  // Payload est un tableau contenant des objets de données associés à l'élément survolé.
  // Active : Un booléen qui indique si le tooltip doit être affiché ou non, si l'utilisateur survole un élément de la treemap
  // La vérification payload.length est nécessaire pour s'assurer que le tableau contient réellement des éléments avant d'essayer d'accéder à son contenu.
  const TreemapToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.name}</p>
        </div>
      );
    }
  };
  return (
    <div className="global-chart">
      {/* Affichage de la Treemap grâce à recharts (téléchargé dans la console)*/}
      <Treemap
        width={730}
        height={181}
        data={dataArray} // Données reçues par la treemap
        dataKey="size" // Clé pour déterminer la taille des boîtes
        stroke="rgb(51,51,51)" // Couleur des bordures des boîtes
        fill="black" // Couleur du contenu
        aspectRatio="1" // Forme des boîtes
      >
        <Tooltip content={<TreemapToolTip />} />
      </Treemap>
    </div>
  );
};

export default GlobalChart;
