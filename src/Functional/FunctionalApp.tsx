import { useState, useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { ActiveTab, Dog } from "../types";
import toast, { Toaster } from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("none-selected");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs);
  }, []);

  const handleSetActiveState = (tabName: ActiveTab) => {
    activeTab !== tabName
      ? setActiveTab(tabName)
      : setActiveTab("none-selected");
  };

  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(() => Requests.getAllDogs().then(setAllDogs))
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
        handleSetActiveState={handleSetActiveState}
      >
        {activeTab === "create-dog-form" ? (
          <FunctionalCreateDogForm
            createDog={createDog}
            isLoading={isLoading}
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
