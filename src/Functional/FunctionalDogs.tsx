import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

type FunctionalDogProps = { allDogs: Dog[] };
// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs: React.FC<FunctionalDogProps> = ({ allDogs }) => {
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
