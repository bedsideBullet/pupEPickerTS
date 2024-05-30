import { Component } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

type ClassDogProps = {
  allDogs: Dog[];
  setAllDogs: (dogs: Dog[] | ((prevState: Dog[]) => Dog[])) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  activeTab: "none-selected" | "favorited" | "unfavorited" | "create-dog-form";
};

export class ClassDogs extends Component<ClassDogProps> {
  favoriteClick = (dog: Dog) => {
    this.props.setIsLoading(true);
    const updatedDog = { ...dog, isFavorite: !dog.isFavorite };

    Requests.updateDog(updatedDog)
      .then(() => {
        const updatedDogs = this.props.allDogs.map((d) =>
          d.id === dog.id ? updatedDog : d
        );
        this.props.setAllDogs(updatedDogs);
      })
      .finally(() => this.props.setIsLoading(false));
  };

  deleteDog = (dogId: number) => {
    this.props.setIsLoading(true);
    Requests.deleteDog(dogId)
      .then(() => {
        const updatedDogs = this.props.allDogs.filter(
          (dog) => dog.id !== dogId
        );
        this.props.setAllDogs(updatedDogs);
      })
      .finally(() => this.props.setIsLoading(false));
  };

  render() {
    const { allDogs, activeTab } = this.props;

    const favoriteDogs = allDogs.filter((dog) => dog.isFavorite);
    const unfavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);
    const filteredDogs = {
      "none-selected": allDogs,
      favorited: favoriteDogs,
      unfavorited: unfavoriteDogs,
    };

    return (
      <>
        {filteredDogs[activeTab as keyof typeof filteredDogs].map(
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
