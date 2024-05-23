import { Dispatch, SetStateAction } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

// use this as your default selected image

export const FunctionalCreateDogForm = ({
  isLoading,
  createDog,
  nameInput,
  descriptionInput,
  imageInput,
  setNameInput,
  setDescriptionInput,
  setImageInput,
}: {
  setAllDogs: Dispatch<SetStateAction<Dog[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  createDog: (dog: Omit<Dog, "id">) => void;
  nameInput: string;
  descriptionInput: string;
  imageInput: string;
  setNameInput: Dispatch<SetStateAction<string>>;
  setDescriptionInput: Dispatch<SetStateAction<string>>;
  setImageInput: Dispatch<SetStateAction<string>>;
}) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionInput(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setImageInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createDog({
      name: nameInput,
      description: descriptionInput,
      image: imageInput,
      isFavorite: false,
    });
  };
  return (
    <form className="" action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={false}
        value={nameInput}
        onChange={handleNameChange}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={false}
        value={descriptionInput}
        onChange={handleDescriptionChange}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select id="" onChange={handleImageChange} value={imageInput}>
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
