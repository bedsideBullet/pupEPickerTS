import { Component } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

type ClassDogProps = {
  allDogs: Dog[];
  setAllDogs: (dogs: Dog[] | ((prevState: Dog[]) => Dog[])) => void;
  favoriteIsActive: boolean;
  createIsActive: boolean;
  unfavoriteIsActive: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
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
        const updatedDogs = this.props.allDogs.filter((dog) => dog.id !== dogId);
        this.props.setAllDogs(updatedDogs);
      })
      .finally(() => this.props.setIsLoading(false));
  };

  dogList = (dogs: Dog[]) => {
    return dogs.map((dog) => (
      <DogCard
        key={dog.id}
        dog={dog}
        onTrashIconClick={() => this.deleteDog(dog.id)}
        onEmptyHeartClick={() => this.favoriteClick(dog)}
        onHeartClick={() => this.favoriteClick(dog)}
        isLoading={this.props.isLoading}
      />
    ));
  };

  render() {
    const { allDogs, favoriteIsActive, unfavoriteIsActive, createIsActive } = this.props;

    const showAllDogs =
      !favoriteIsActive && !createIsActive && !unfavoriteIsActive;
    const favoriteDogs = allDogs.filter((dog) => dog.isFavorite);
    const unfavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);

    return (
      <>
        {showAllDogs
          ? this.dogList(allDogs)
          : favoriteIsActive
          ? this.dogList(favoriteDogs)
          : this.dogList(unfavoriteDogs)}
      </>
    );
  }
}
