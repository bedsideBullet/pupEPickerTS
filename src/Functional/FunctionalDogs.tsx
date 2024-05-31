import React from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";
import { ActiveTab } from "../types";

type FunctionalDogProps = {
  allDogs: Dog[];
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: ActiveTab;
  refetchDogs: () => Promise<void>;
};

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs: React.FC<FunctionalDogProps> = ({
  allDogs,
  activeTab,
  isLoading,
  setIsLoading,
  refetchDogs
}) => {
  const favoriteClick = (dog: Dog) => {
    setIsLoading(true);
    const updatedDog = { ...dog, isFavorite: !dog.isFavorite };

    return Requests.updateDog(updatedDog)
      .then(() => {
        refetchDogs()
      })
      .finally(() => setIsLoading(false));
  };

  const deleteDog = (dogId: number) => {
    setIsLoading(true);
    return Requests.deleteDog(dogId)
      .then(() => {
        refetchDogs()
      })
      .finally(() => setIsLoading(false));
  };

  const favoriteDogs = allDogs.filter((dog) => dog.isFavorite);
  const unfavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);

  const filteredDogs: Record<ActiveTab, Dog[]> = {
    "none-selected": allDogs,
    favorited: favoriteDogs,
    unfavorited: unfavoriteDogs,
    "create-dog-form": []
  };

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element

    <>
      {filteredDogs[activeTab].map((dog: Dog) => {
        return (
          <DogCard
            key={dog.id}
            dog={dog}
            onTrashIconClick={() => {
              deleteDog(dog.id);
            }}
            onEmptyHeartClick={() => {
              favoriteClick(dog);
            }}
            onHeartClick={() => {
              favoriteClick(dog);
            }}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
