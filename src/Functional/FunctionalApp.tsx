import { useState, useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Dog } from "../types";
import { Toaster } from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [createIsActive, setCreateIsActive] = useState<boolean>(false);
  const [favotiteIsActive, setFavoriteIsActive] = useState<boolean>(false);
  const [unfavoriteIsActive, setUnfavoriteIsActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const setCreateActive = () => {
    if (!createIsActive) {
      setCreateIsActive(true),
        setFavoriteIsActive(false),
        setUnfavoriteIsActive(false);
    } else {
      setCreateIsActive(false);
    }
  };

  const setFavoriteActive = () => {
    if (!favotiteIsActive) {
      setFavoriteIsActive(true),
        setCreateIsActive(false),
        setUnfavoriteIsActive(false);
    } else {
      setFavoriteIsActive(false);
    }
  };

  const setUnfavoriteActive = () => {
    if (!unfavoriteIsActive) {
      setUnfavoriteIsActive(true),
        setCreateIsActive(false),
        setFavoriteIsActive(false);
    } else {
      setUnfavoriteIsActive(false);
    }
  };

  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs);
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}> 
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Toaster />
      <FunctionalSection
        allDogs={allDogs}
        createIsActive={createIsActive}
        favotiteIsActive={favotiteIsActive}
        unfavotiteIsActive={unfavoriteIsActive}
        setCreateActive={setCreateActive}
        setFavoriteActive={setFavoriteActive}
        setUnfavoriteActive={setUnfavoriteActive}
      >
        {!createIsActive ? (
          <FunctionalDogs
            allDogs={allDogs}
            setAllDogs={setAllDogs}
            favotiteIsActive={favotiteIsActive}
            createIsActive={createIsActive}
            unfavoriteIsActive={unfavoriteIsActive}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <FunctionalCreateDogForm 
          setAllDogs={setAllDogs} 
          isLoading={isLoading}
          setIsLoading={setIsLoading} />
        )}
      </FunctionalSection>
    </div>
  );
}
