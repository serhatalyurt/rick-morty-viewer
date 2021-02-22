import { FunctionComponent, useState } from "react";
import {
  QueryObserverResult,
  useQueries,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import { Character, Episode } from "../../api/interfaces";
import { TabView, Tab } from "../tab";
import "./styles.css";

type CharacterCardProps = { id: number };

const CharacterCard: FunctionComponent<CharacterCardProps> = ({ id }) => {
  const [showDetails, setShowDetails] = useState(true);
  const queryClient = useQueryClient();
  //the data of the character is already cached. So, no need to refetch
  const character = queryClient.getQueryData<Character>(
    `https://rickandmortyapi.com/api/character/${id}`
  )!;

  const episodeUrls = character?.episode || [];
  //fetches episodes in parallel
  const episodes = useQueries(
    episodeUrls.map<UseQueryOptions<unknown, unknown, unknown>>((i) => {
      return {
        queryKey: i,
        queryFn: () => fetch(i).then((res) => res.json()),
        //start to fetch when episodes tab is selected
        enabled: character && !showDetails,
      };
    })
  ) as QueryObserverResult<Episode>[];

  return (
    <div className="character-card">
      <div className="character-card-header">
        <img src={character.image} alt={character.name} />{" "}
        <div>
          <div>
            <strong>{character.name}</strong>
          </div>
          <div>{character.status}</div>
          <div>{character.gender}</div>
        </div>
      </div>
      <TabView onSelected={(index) => setShowDetails(index === 0)}>
        <Tab title="Details" className="character-card-details">
          <div>
            <strong>Location</strong>
            <span>{character.location.name}</span>
          </div>
          <div>
            <strong>Origin</strong>
            <span>{character.origin.name}</span>
          </div>
        </Tab>
        <Tab title="Episodes" className="character-card-episode-list">
          {episodes.map((episode, index) => {
            return episode.isSuccess ? (
              <div key={episode.data.id}>
                <span>{episode.data.name}</span>
                <em> ({episode.data.air_date})</em>
              </div>
            ) : (
              <div key={"l" + index}>Loading...</div>
            );
          })}
        </Tab>
      </TabView>
    </div>
  );
};

export default CharacterCard;
