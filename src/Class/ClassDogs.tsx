import { Component } from "react";
import { DogCard } from "../Shared/DogCard";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";

type ClassDogProps = {
  allDogs: Dog[];
  refetchDogs: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  activeTab: "none-selected" | "favorited" | "unfavorited" | "create-dog-form";
};

export class ClassDogs extends Component<ClassDogProps> {
  favoriteClick = (dog: Dog) => {
    const { refetchDogs, setIsLoading } = this.props
    setIsLoading(true);
    const updatedDog = { ...dog, isFavorite: !dog.isFavorite };

    return Requests.updateDog(updatedDog)
      .then(() => {
        refetchDogs();
      })
      .finally(() => setIsLoading(false));
  };

  deleteDog = (dogId: number) => {
    const { refetchDogs, setIsLoading } = this.props
    setIsLoading(true);
    Requests.deleteDog(dogId)
      .then(() => {
        refetchDogs();
      })
      .finally(() => setIsLoading(false));
  };

  render() {
    const { allDogs, activeTab } = this.props;

    const favoriteDogs = allDogs.filter((dog) => dog.isFavorite);
    const unfavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);
    const filteredDogs: Record<ActiveTab, Dog[]> = {
      "none-selected": allDogs,
      favorited: favoriteDogs,
      unfavorited: unfavoriteDogs,
      "create-dog-form": []
    };

    return (
      <>
        {filteredDogs[activeTab].map(
          (dog: Dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              onTrashIconClick={() => this.deleteDog(dog.id)}
              onEmptyHeartClick={() => this.favoriteClick(dog)}
              onHeartClick={() => this.favoriteClick(dog)}
              isLoading={this.props.isLoading}
            />
          )
        )}
      </>
    );
  }
}
