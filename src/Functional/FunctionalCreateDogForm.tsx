import { Dispatch, SetStateAction, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({setAllDogs, isLoading, setIsLoading}: { setAllDogs: Dispatch<SetStateAction<Dog[]>>, isLoading: boolean, setIsLoading: Dispatch<SetStateAction<boolean>>}) => {
  const [nameInput, setNameInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [imageInput, setImageInput] = useState<string>("")

  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    Requests.postDog(dog)
      .then(() => Requests.getAllDogs().then(setAllDogs))
      .then(() => toast.success("Whoa dog, you just created a new dog! 🐶"))
      .finally(() => setIsLoading(false));
  };
  return (
    <form
      className=""
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog({
          name: nameInput,
          description: descriptionInput,
          image: imageInput ?  imageInput : defaultSelectedImage,
          isFavorite: false
        })
        setNameInput(""),
        setDescriptionInput(""),
        setImageInput(defaultSelectedImage)
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={false}
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={false}
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select id="" onChange={(e) => setImageInput(e.target.value)} value={imageInput}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue} >
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
