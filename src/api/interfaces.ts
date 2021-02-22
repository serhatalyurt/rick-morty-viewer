export type Character = {
  id: number;
  name: string;
  status: string;
  type: string;
  gender: string;
  url: string;
  image: string;
  episode: string[];
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
};

type ListInfo = {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
};
type List<T> = {
  info: ListInfo;
  results: T[];
};

export type CharacterList = List<Character>;
export type EpisodeList = List<Episode>;
