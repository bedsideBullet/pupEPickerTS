import React from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

type FunctionalDogProps = {
  allDogs: Dog[];
  setAllDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
};

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs: React.FC<FunctionalDogProps> = ({
  allDogs,
  setAllDogs,
}) => {
  const deleteDog = (dogId: number) => {
    Requests.deleteDog(dogId).then(() => {
      const updatedDogs = allDogs.filter((dog) => dog.id !== dogId);
      setAllDogs(updatedDogs);
    });
  };

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element

    <>
      {allDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={() => {
            alert("clicked trash");
            deleteDog(dog.id);
          }}
          onEmptyHeartClick={() => {
            alert("clicked empty heart");
          }}
          onHeartClick={() => {
            alert("clicked heart");
          }}
          isLoading={false}
        />
      ))}
    </>
  );
};
