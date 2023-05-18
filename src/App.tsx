import { useState } from "react";
import "./App.scss";
import { Form } from "./components/Form/Form";
import homeImage from "./assets/Blobex-1.png";

const App = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleClick = () => {
    setIsModalOpened(!isModalOpened);
    console.log(isModalOpened);
  };

  return (
    <>
      <span className="home__image--container" onClick={handleClick}>
        <img src={homeImage} className="home__image" />
      </span>

      {isModalOpened && (
        <div className="modal">
          <div className="overlay" onClick={handleClick}></div>
          <div className="modal-content">
            <Form handleCloseModal={handleClick} />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
