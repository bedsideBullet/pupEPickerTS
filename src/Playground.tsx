import { Requests } from "./api";

const messAround = async () => {
  // Write your test code in this function
  fetch("http://localhost:3000/dogs/8")
    .then((response) => response.json())
    .then(console.log);
  await Requests.dummyFunction();
};

export const Playground = () => {
  return (
    <div>
      <h1>Functions Playground</h1>;
      <button
        onClick={() => {
          messAround();
        }}
      >
        Press This Button To Trigger `messAround`
      </button>
    </div>
  );
};
