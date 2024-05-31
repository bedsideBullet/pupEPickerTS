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

export class ClassApp extends Component<Record<string, never>, ClassAppState> {
  state: ClassAppState = {
    allDogs: [],
    isLoading: false,
    activeTab: "none-selected",
  };

  refetchDogs = () => {
    return Requests.getAllDogs()
      .then((allDogs) => {
        this.setState({ allDogs });
      })
  }

  componentDidMount() {
   this.refetchDogs();
  }

  setIsLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  setAllDogs = (dogs: Dog[]) => {
    this.setState({allDogs: dogs});
  };

  setActiveTab = (
    tab: "none-selected" | "favorited" | "unfavorited" | "create-dog-form"
  ) => {
    const activeTab = this.state.activeTab === tab ? "none-selected" : tab
    this.setState({ activeTab});
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
              refetchDogs={this.refetchDogs}
              isLoading={isLoading}
              setIsLoading={this.setIsLoading}
              activeTab={activeTab}
            />
          ) : (
            <ClassCreateDogForm
            refetchDogs={this.refetchDogs}
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
