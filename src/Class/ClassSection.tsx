import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ActiveTab, Dog } from "../types";

type ClassSectionProps = {
  allDogs: Dog[];
  children: ReactNode;
  activeTab: "none-selected" | "favorited" | "unfavorited" | "create-dog-form";
  setActiveTab: (tab: ActiveTab) => void;
};

export class ClassSection extends Component<ClassSectionProps> {
  render() {
    const { allDogs, children, activeTab, setActiveTab } = this.props;

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
              className={`selector ${
                activeTab === "favorited" ? "active" : ""
              }`}
              onClick={() => setActiveTab("favorited")}
            >
              favorited ({favoriteList.length})
            </div>

            <div
              className={`selector ${
                activeTab === "unfavorited" ? "active" : ""
              }`}
              onClick={() => setActiveTab("unfavorited")}
            >
              unfavorited ({unfavoriteList.length})
            </div>
            <div
              className={`selector ${
                activeTab === "create-dog-form" ? "active" : ""
              }`}
              id={"create-btn"}
              onClick={() => setActiveTab("create-dog-form")}
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
