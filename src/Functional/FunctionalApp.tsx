import { useState, useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Dog } from "../types";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [createIsActive, setCreateIsActive] = useState<boolean>(false);
  const [favotiteIsActive, setFavoriteIsActive] = useState<boolean>(false);
  const [unfavotiteIsActive, setUnfavoriteActive] = useState<boolean>(false);

  const setCreateActive = () => {
    if (!createIsActive) {
      setCreateIsActive(true),
        setFavoriteIsActive(false),
        setUnfavoriteActive(false);
    } else {
      setCreateIsActive(false);
    }
  };

  const setFavoriteActive = () => {
    if (!favotiteIsActive) {
      setFavoriteIsActive(true),
        setCreateIsActive(false),
        setUnfavoriteActive(false);
    } else {
      setFavoriteIsActive(false);
    }
  };

  const setUnfavotiteActive = () => {
    if (!unfavotiteIsActive) {
      setUnfavoriteActive(true),
        setCreateIsActive(false),
        setFavoriteIsActive(false);
    } else {
      setUnfavoriteActive(false);
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
      <FunctionalSection
        allDogs={allDogs}
        createIsActive={createIsActive}
        favotiteIsActive={favotiteIsActive}
        unfavotiteIsActive={unfavotiteIsActive}
        setCreateActive={setCreateActive}
        setFavoriteActive={setFavoriteActive}
        setUnfavotiteActive={setUnfavotiteActive}
      >
        {!createIsActive ? (
          <FunctionalDogs
            allDogs={allDogs}
            setAllDogs={setAllDogs}
            favotiteIsActive={favotiteIsActive}
            unfavotiteIsActive={unfavotiteIsActive}
            createIsActive={createIsActive}
          />
        ) : (
          <FunctionalCreateDogForm />
        )}
      </FunctionalSection>
    </div>
  );
}
