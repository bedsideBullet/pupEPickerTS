import { useState } from "react";
import { useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Dog } from "../types";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isFavoritem, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs);
  }, []);

  // const createDog = (dog: Omit<Dog, "id">) => {
  //   Requests.postDog(dog).then(() => {
  //     Requests.getAllDogs().then(setAllDogs);
  //   });
  // };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection>
        <FunctionalDogs allDogs={allDogs} />
        <FunctionalCreateDogForm /*createDog={createDog} */ />
      </FunctionalSection>
    </div>
  );
}
