import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  // new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  // utilisation de soustraction de dates pour comparer les évènements : donne le bon tri 
    (new Date(evtA.date) - new Date(evtB.date)) 
  );

  const nextCard = () => {
    setTimeout(
      () => setIndex(index + 1 < byDateDesc?.length ? index + 1 : 0), 
      // rajout du +1 à l'index avant de vérifier s'il dépasse la longueur de la liste des évènements triés (byDateDesc) + vérification pour éviter les erreurs si la liste est vide (byDatadesc?.length)
      5000
    );
  };

  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title} > 
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
              }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((e, radioIdx) => (
                <input
                  key={e.title}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} 
                  onChange={() => this}
                  // points de repères : on utilise l'index de l'évènement actuellement affiché (index) pour vérifié s'il est égal à l'index de point de repère (radioIdx) : permet de mettre à jour le point de repère actif lors du défilement
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Slider;
