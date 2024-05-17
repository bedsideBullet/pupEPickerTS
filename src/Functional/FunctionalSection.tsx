// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";

export const FunctionalSection = ({
  allDogs,
  children,
  createIsActive,
  favotiteIsActive,
  unfavotiteIsActive,
  setCreateActive,
  setFavoriteActive,
  setUnfavortiteActive,
}: {
  allDogs: Dog[];
  children: ReactNode;
  createIsActive: boolean;
  favotiteIsActive: boolean;
  unfavotiteIsActive: boolean;
  setCreateActive: () => void;
  setFavoriteActive: () => void;
  setUnfavortiteActive: () => void;
}) => {
  const favoriteList = allDogs
    .filter((dog) => dog.isFavorite)
    .map((dog) => {
      return dog;
    });

  const unfavoriteList = allDogs
    .filter((dog) => !dog.isFavorite)
    .map((dog) => {
      return dog;
    });

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${favotiteIsActive ? "active" : ""}`}
            onClick={setFavoriteActive}
          >
            favorited ({favoriteList.length})
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${unfavotiteIsActive ? "active" : ""}`}
            onClick={setUnfavortiteActive}
          >
            unfavorited ({unfavoriteList.length})
          </div>
          <div
            className={`selector ${createIsActive ? "active" : ""}`}
            id={"create-btn"}
            onClick={setCreateActive}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
