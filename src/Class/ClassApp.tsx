import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { Dog } from "../types";
import { Toaster } from "react-hot-toast";

type ClassAppState = {
  allDogs: Dog[];
  activeTab: "none-selected" | "favorited" | "unfavorited" | "create-dog-form";
  isLoading: boolean;
};

export class ClassApp extends Component<{}, ClassAppState> {
  state: ClassAppState = {
    allDogs: [],
    isLoading: false,
    activeTab: "none-selected",
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

  setIsLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  setAllDogs = (dogs: Dog[] | ((prevState: Dog[]) => Dog[])): void => {
    this.setState((prevState) => ({
      allDogs: typeof dogs === "function" ? dogs(prevState.allDogs) : dogs,
    }));
  };

  setActiveTab = (
    tab: "none-selected" | "favorited" | "unfavorited" | "create-dog-form"
  ) => {
    this.setState((prevState) => ({
      activeTab: prevState.activeTab === tab ? "none-selected" : tab,
    }));
  };

  render() {
    const { allDogs, isLoading, activeTab } = this.state;

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          allDogs={allDogs}
          activeTab={activeTab}
          setActiveTab={this.setActiveTab}
        >
          {activeTab !== "create-dog-form" ? (
            <ClassDogs
              allDogs={allDogs}
              setAllDogs={this.setAllDogs}
              isLoading={isLoading}
              setIsLoading={this.setIsLoading}
              activeTab={activeTab}
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
