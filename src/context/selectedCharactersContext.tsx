import React, { FunctionComponent, ReactNode, useState } from "react";

export type SelectedCharactersContextProps = {
  selectedCharacterIds: number[];
  addCharacter: (id: number) => void;
  removeCharacter: (id: number) => void;
};

/**
 * This context is synchronizing left and main pane
 * Stores only id's of character because of react-query already caches the data
 */
export const SelectedCharactersContext = React.createContext<SelectedCharactersContextProps>(
  null!
);

type Props = {
  children: ReactNode;
};

export const SelectedCharactersContextProvider: FunctionComponent<Props> = ({
  children,
}) => {
  const [characterIds, setCharacterIds] = useState<number[]>([]);
  const addCharacter = (id: number) => setCharacterIds([...characterIds, id]);
  const removeCharacter = (id: number) =>
    setCharacterIds(characterIds.filter((c) => c !== id));
  return (
    <SelectedCharactersContext.Provider
      value={{
        addCharacter,
        removeCharacter,
        selectedCharacterIds: characterIds,
      }}
    >
      {children}
    </SelectedCharactersContext.Provider>
  );
};
