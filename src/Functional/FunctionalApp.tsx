import { useState, useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { ActiveTab, Dog } from "../types";
import toast, { Toaster } from "react-hot-toast";
import { dogPictures } from "../dog-pictures";

const defaultSelectedImage: string = dogPictures.BlueHeeler;

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("none-selected");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [imageInput, setImageInput] = useState<string>(defaultSelectedImage);

  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs);
  }, []);

  const reset = () => {
    setNameInput(""),
      setDescriptionInput(""),
      setImageInput(defaultSelectedImage);
  };

  const setCreateActive = () => {
    activeTab !== "create-dog-form"
      ? setActiveTab("create-dog-form")
      : setActiveTab("none-selected");
  };

  const setFavoriteActive = () => {
    activeTab !== "favorited"
      ? setActiveTab("favorited")
      : setActiveTab("none-selected");
  };

  const setUnfavoriteActive = () => {
    activeTab !== "unfavorited"
      ? setActiveTab("unfavorited")
      : setActiveTab("none-selected");
  };

  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(() => Requests.getAllDogs().then(setAllDogs))
      .then(() => {
        reset();
      })
      .then(() => toast.success("Whoa dog, you just created a new dog! 🐶"))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Toaster />
      <FunctionalSection
        allDogs={allDogs}
        activeTab={activeTab}
        setCreateActive={setCreateActive}
        setFavoriteActive={setFavoriteActive}
        setUnfavoriteActive={setUnfavoriteActive}
      >
        {activeTab === "create-dog-form" ? (
          <FunctionalCreateDogForm
            setAllDogs={setAllDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            createDog={createDog}
            nameInput={nameInput}
            descriptionInput={descriptionInput}
            imageInput={imageInput}
            setNameInput={setNameInput}
            setDescriptionInput={setDescriptionInput}
            setImageInput={setImageInput}
          />
        ) : (
          <FunctionalDogs
            allDogs={allDogs}
            setAllDogs={setAllDogs}
            activeTab={activeTab}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
