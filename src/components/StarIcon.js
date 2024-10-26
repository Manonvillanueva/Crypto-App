import React, { useEffect, useState } from "react";

const StarIcon = ({ coinId }) => {
  // `like` stockera un booléen qui va gérer l'affichage de l'étoile (pleine ou vide)
  const [like, setLike] = useState(false);

  // Effet qui s'exécute seulement au chargement de la page
  useEffect(() => {
    // Vérifier si des favoris existent déjà dans le localStorage
    let favList = window.localStorage.coinList
      ? window.localStorage.coinList.split(",")
      : [];

    // Si la crypto actuelle est dans les favoris, on met à jour l'état de like => ce qui nous affichera les étoiles pleines si la crypto est dans les fav
    if (favList.includes(coinId)) {
      setLike(true);
    }
  }, []);

  // Add and delete du localStorage
  const idChecker = (id) => {
    // Initialise la liste des favoris : soit depuis le localStorage, soit un tableau vide
    let favList = window.localStorage.coinList
      ? window.localStorage.coinList.split(",")
      : [];

    // Vérifie si la crypto est déjà dans les favoris
    if (favList.includes(id)) {
      // Si oui, on la retire
      favList = favList.filter((coin) => coin !== id);
      // Met à jour l'état `like` pour afficher l'étoile vide
      setLike(false);
    } else {
      // Si non, on l'ajoute
      favList.push(id);
      // Met à jour l'état `like` pour afficher l'étoile pleine
      setLike(true);
    }
    // Met à jour coinList dans le localStorage avec JSON.stringify
    window.localStorage.setItem("coinList", favList.join(","));
  };

  return (
    <img
      onClick={() => idChecker(coinId)}
      src={like ? "./assets/star-full.svg" : "./assets/star-empty.svg"}
      alt="icon-star"
    />
  );
};

export default StarIcon;
