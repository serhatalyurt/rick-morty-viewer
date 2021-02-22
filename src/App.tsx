import { QueryClient, QueryClientProvider } from "react-query";
import CharacterCardList from "./components/character-card-list";
import CharacterListView from "./components/character-list-view";
import { Layout } from "./components/layout";
import { SelectedCharactersContextProvider } from "./context/selectedCharactersContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen /> */}
      <SelectedCharactersContextProvider>
        <Layout left={<CharacterListView />} main={<CharacterCardList />} />
      </SelectedCharactersContextProvider>
    </QueryClientProvider>
  );
};
