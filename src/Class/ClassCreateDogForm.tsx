import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

type ClassCreateDogFormProps = {
  setAllDogs: (dogs: Dog[] | ((prevState: Dog[]) => Dog[])) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

type ClassCreateDogFormState = {
  nameInput: string;
  descriptionInput: string;
  imageInput: string;
};

export class ClassCreateDogForm extends Component<ClassCreateDogFormProps, ClassCreateDogFormState> {
  state: ClassCreateDogFormState = {
    nameInput: "",
    descriptionInput: "",
    imageInput: defaultSelectedImage,
  };

  createDog = (dog: Omit<Dog, "id">) => {
    console.log("Creating Dog:", dog);
    this.props.setIsLoading(true);
    Requests.postDog(dog)
      .then(() => Requests.getAllDogs().then(this.props.setAllDogs))
      .then(() => toast.success("Whoa dog, you just created a new dog! 🐶"))
      .finally(() => this.props.setIsLoading(false));
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nameInput, descriptionInput, imageInput } = this.state;
    this.createDog({
      name: nameInput,
      description: descriptionInput,
      image: imageInput,
      isFavorite: false,
    });
    this.setState({
      nameInput: "",
      descriptionInput: "",
      imageInput: defaultSelectedImage,
    });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log("Handling Change:", name, value);
    this.setState({ [name]: value } as Pick<ClassCreateDogFormState, keyof ClassCreateDogFormState>);
  };

  render() {
    const { isLoading } = this.props;
    const { nameInput, descriptionInput, imageInput } = this.state;

    return (
      <form
        className=""
        action=""
        id="create-dog-form"
        onSubmit={this.handleSubmit}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          name="nameInput"
          disabled={isLoading}
          value={nameInput}
          onChange={this.handleChange}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="descriptionInput"
          id=""
          cols={80}
          rows={10}
          disabled={isLoading}
          value={descriptionInput}
          onChange={this.handleChange}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          name="imageInput"
          onChange={this.handleChange}
          value={imageInput}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          ))}
        </select>
        <input type="submit" disabled={isLoading} />
      </form>
    );
  }
}
