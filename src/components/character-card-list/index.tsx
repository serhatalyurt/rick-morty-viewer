import { FunctionComponent, useContext } from "react";
import { SelectedCharactersContext } from "../../context/selectedCharactersContext";
import CharacterCard from "../character-card";
import "./styles.css";

const CharacterCardList: FunctionComponent<{}> = () => {
  const { selectedCharacterIds } = useContext(SelectedCharactersContext);
  return (
    <div className="character-card-list">
      {selectedCharacterIds.map((s) => (
        <CharacterCard key={s} id={s} />
      ))}
    </div>
  );
};

export default CharacterCardList;
