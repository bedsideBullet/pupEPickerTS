// you can use this type for react children if you so choose
import { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ActiveTab, Dog } from "../types";

export const FunctionalSection = ({
  allDogs,
  children,
  activeTab,
  setCreateActive,
  setFavoriteActive,
  setUnfavoriteActive,
}: {
  allDogs: Dog[];
  children: ReactNode;
  activeTab: ActiveTab;
  setCreateActive: MouseEventHandler<HTMLDivElement>;
  setFavoriteActive: MouseEventHandler<HTMLDivElement>;
  setUnfavoriteActive: MouseEventHandler<HTMLDivElement>;
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
            className={`selector ${activeTab === "favorited" ? "active" : ""}`}
            onClick={setFavoriteActive}
          >
            favorited ({favoriteList.length})
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeTab === "unfavorited" ? "active" : ""
            }`}
            onClick={setUnfavoriteActive}
          >
            unfavorited ({unfavoriteList.length})
          </div>
          <div
            className={`selector ${
              activeTab === "create-dog-form" ? "active" : ""
            }`}
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
