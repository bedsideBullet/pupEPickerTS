import { useState } from "react";
import { useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Dog } from "../types";
import { boolean } from "zod";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  useEffect(() => {
    Requests.getAllDogs().then(setAllDogs);
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection>
        <FunctionalDogs allDogs={allDogs} />
        <FunctionalCreateDogForm />
      </FunctionalSection>
    </div>
  );
}
