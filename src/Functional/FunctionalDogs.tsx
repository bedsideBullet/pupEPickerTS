import React from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

type FunctionalDogProps = {
  allDogs: Dog[];
  setAllDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
  favotiteIsActive: boolean;
  createIsActive: boolean;
  unfavotiteIsActive: boolean;
};

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs: React.FC<FunctionalDogProps> = ({
  allDogs,
  setAllDogs,
  favotiteIsActive,
  createIsActive,
  unfavotiteIsActive,
}) => {
  const favoriteClick = (dog: Dog) => {
    const updatedDog = { ...dog, isFavorite: !dog.isFavorite };

    Requests.updateDog(updatedDog).then(() => {
      const updatedDogs = allDogs.map((d) => {
        if (d.id === dog.id) {
          return updatedDog;
        }
        return d;
      });
      setAllDogs(updatedDogs);
    });
  };

  const deleteDog = (dogId: number) => {
    Requests.deleteDog(dogId).then(() => {
      const updatedDogs = allDogs.filter((dog) => dog.id !== dogId);
      setAllDogs(updatedDogs);
    });
  };

  const dogList = (dogs: Dog[]) => {
    return dogs.map((dog) => (
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
        isLoading={false}
      />
    ));
  };

  const showAllDogs =
    !favotiteIsActive && !createIsActive && !unfavotiteIsActive;
  const favoriteDogs = allDogs.filter((dog) => dog.isFavorite);
  const unfavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element

    <>
      {showAllDogs
        ? dogList(allDogs)
        : favotiteIsActive
        ? dogList(favoriteDogs)
        : dogList(unfavoriteDogs)}
    </>
  );
};
