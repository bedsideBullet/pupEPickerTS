import { useState, useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Dog } from "../types";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [createIsActive, setCreateIsActive] = useState<boolean>(false);

  const setActive = () => {
    setCreateIsActive((prev) => !prev);
  };

  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs);
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection setActive={setActive} createIsActive={createIsActive}>
        {!createIsActive ? (
          <FunctionalDogs allDogs={allDogs} setAllDogs={setAllDogs} />
        ) : (
          <FunctionalCreateDogForm />
        )}
      </FunctionalSection>
    </div>
  );
}
