import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({}: {}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  return (
    <form
      className=""
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={false}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={false}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select id="">
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" />
    </form>
  );
};
