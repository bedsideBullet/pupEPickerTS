import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";

type ClassSectionProps = {
  allDogs: Dog[];
  children: ReactNode;
  createIsActive: boolean;
  favoriteIsActive: boolean;
  unfavoriteIsActive: boolean;
  setCreateActive: () => void;
  setFavoriteActive: () => void;
  setUnfavoriteActive: () => void;
};

export class ClassSection extends Component<ClassSectionProps> {
  render() {
    const {
      allDogs,
      children,
      createIsActive,
      favoriteIsActive,
      unfavoriteIsActive,
      setCreateActive,
      setFavoriteActive,
      setUnfavoriteActive,
    } = this.props;

    const favoriteList = allDogs.filter((dog) => dog.isFavorite);
    const unfavoriteList = allDogs.filter((dog) => !dog.isFavorite);

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>
          <div className="selectors">
            <div
              className={`selector ${favoriteIsActive ? "active" : ""}`}
              onClick={setFavoriteActive}
            >
              favorited ({favoriteList.length})
            </div>

            <div
              className={`selector ${unfavoriteIsActive ? "active" : ""}`}
              onClick={setUnfavoriteActive}
            >
              unfavorited ({unfavoriteList.length})
            </div>
            <div
              className={`selector ${createIsActive ? "active" : ""}`}
              id={"create-btn"}
              onClick={
                setCreateActive
              }
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}

