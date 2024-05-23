import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { Dog } from "../types";
import { Toaster } from "react-hot-toast";

type ClassAppState = {
  allDogs: Dog[];
  favoriteIsActive: boolean;
  createIsActive: boolean;
  unfavoriteIsActive: boolean;
  isLoading: boolean;
};

export class ClassApp extends Component<{}, ClassAppState> {
  state: ClassAppState = {
    allDogs: [],
    createIsActive: false,
    favoriteIsActive: false,
    unfavoriteIsActive: false,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    Requests.getAllDogs()
      .then((allDogs) => {
        this.setState({ allDogs });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  setCreateActive = () => {
    console.log("Toggling Create Form");
    this.setState(() => ({
      createIsActive: true,
      favoriteIsActive: false,
      unfavoriteIsActive: false,
    }));
  };

  setFavoriteActive = () => {
    this.setState((prevState) => ({
      favoriteIsActive: !prevState.favoriteIsActive,
      createIsActive: false,
      unfavoriteIsActive: false,
    }));
  };

  setUnfavoriteActive = () => {
    this.setState((prevState) => ({
      unfavoriteIsActive: !prevState.unfavoriteIsActive,
      createIsActive: false,
      favoriteIsActive: false,
    }));
  };

  setIsLoading = (isLoading: boolean) => {
    console.log("Setting Loading State:", isLoading);
    this.setState({ isLoading });
  };

  setAllDogs = (dogs: Dog[] | ((prevState: Dog[]) => Dog[])): void => {
    console.log("Setting All Dogs");
    this.setState((prevState) => ({
      allDogs: typeof dogs === "function" ? dogs(prevState.allDogs) : dogs,
    }));
  };

  render() {
    const {
      allDogs,
      createIsActive,
      isLoading,
      unfavoriteIsActive,
      favoriteIsActive,
    } = this.state;

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          allDogs={allDogs}
          createIsActive={createIsActive}
          favoriteIsActive={favoriteIsActive}
          unfavoriteIsActive={unfavoriteIsActive}
          setCreateActive={this.setCreateActive}
          setFavoriteActive={this.setFavoriteActive}
          setUnfavoriteActive={this.setUnfavoriteActive}
        >
          {!createIsActive ? (
            <ClassDogs
              allDogs={allDogs}
              setAllDogs={this.setAllDogs}
              favoriteIsActive={favoriteIsActive}
              createIsActive={createIsActive}
              unfavoriteIsActive={unfavoriteIsActive}
              isLoading={isLoading}
              setIsLoading={this.setIsLoading}
            />
          ) : (
            <ClassCreateDogForm
              setAllDogs={this.setAllDogs}
              isLoading={isLoading}
              setIsLoading={this.setIsLoading}
            />
          )}
        </ClassSection>
        <Toaster />
      </div>
    );
  }
}
