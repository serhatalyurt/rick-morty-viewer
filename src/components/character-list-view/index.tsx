import { FunctionComponent, useEffect, useRef } from "react";
import "./styles.css";
import { useInfiniteQuery, useQueryClient } from "react-query";
import React, { useContext } from "react";
import { CharacterList } from "../../api/interfaces";
import { SelectedCharactersContext } from "../../context/selectedCharactersContext";

const fetchCharacters = ({
  pageParam = `https://rickandmortyapi.com/api/character/?page=1`,
}) => fetch(pageParam).then((res) => res.json());

const CharacterListView: FunctionComponent<{}> = () => {
  //update context when a character selected or deselected
  const { addCharacter, removeCharacter } = useContext(
    SelectedCharactersContext
  );

  const queryClient = useQueryClient();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<CharacterList, Error, CharacterList>(
    "characters",
    fetchCharacters,
    {
      //@see https://rickandmortyapi.com/documentation/#info-and-pagination
      getNextPageParam: (lastPage) => lastPage.info.next,
      onSuccess: (data) => {
        //The data will be used in the character card directly.
        //so, to prevent unnecessary request, we can store it in the cache
        data.pages.forEach((p) =>
          p.results.forEach((r) =>
            queryClient.setQueryData(
              `https://rickandmortyapi.com/api/character/${r.id}`,
              r
            )
          )
        );
      },
    }
  );

  //the scrollable list
  const listEl = useRef<HTMLDivElement>(null);

  //the api returns n items that does not fill the scrollable content
  //this effect fetches the characters until a scrollbar is seemed
  useEffect(
    () => {
      if (
        listEl.current &&
        hasNextPage &&
        listEl.current.clientHeight >= listEl.current.scrollHeight //controls the scroll bar is seemed
      ) {
        fetchNextPage();
      }
    },
    //the effect is triggered when new pages received
    [fetchNextPage, hasNextPage, data?.pages.length]
  );

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    //when the scrollbar reached the end of content, fetch next page
    if (
      e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
      e.currentTarget.scrollHeight
    ) {
      fetchNextPage();
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : isError ? (
    <p>Error: {error?.message}</p>
  ) : (
    <>
      <div className="character-list-header">Choose characters</div>
      <div ref={listEl} className="character-list" onScroll={onScroll}>
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.results.map((character) => (
              <label key={character.id} className="character-list-item">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    e.target.checked
                      ? addCharacter(character.id)
                      : removeCharacter(character.id)
                  }
                />
                <img src={character.image} alt={character.name} />
                <span>{character.name}</span>
              </label>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="fetching-bottom-info">
        {isFetchingNextPage ? "Fetching..." : null}
      </div>
    </>
  );
};

export default CharacterListView;
