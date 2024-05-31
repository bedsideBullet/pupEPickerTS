import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

// use this as your default selected image
const defaultSelectedImage: string = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  isLoading,
  createDog,
}: {
  isLoading: boolean;
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
}) => {
  const [nameInput, setNameInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [imageInput, setImageInput] = useState<string>(defaultSelectedImage);

  const reset = () => {
    setNameInput("");
    setDescriptionInput("");
    setImageInput(defaultSelectedImage);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createDog({
      name: nameInput,
      description: descriptionInput,
      image: imageInput,
      isFavorite: false,
    });
    reset();
  };
  return (
    <form className="" action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isLoading}
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) => setImageInput(e.target.value)}
        value={imageInput}
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
