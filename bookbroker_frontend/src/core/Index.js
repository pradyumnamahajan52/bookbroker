import React from "react";
import { Link } from "react-router-dom";
import Styles from "../App.css";
// import "../App.css";

// import bg1 from "./cover4.jpg";

// const background = {
//   margin: "0",
//   padding: "0",
//   backgroundImage: `url('${bg1}')`,
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "auto",
// };

const App = () => {
  return (
    <div className={Styles.Entry_option}>
      <div className={Styles.logo}>
        <h1>B</h1>
        <div className="logo_circle">
          <h1>B</h1>
        </div>
      </div>

      <h1>BookBroker.com</h1>
      <h5>What do you want to do here?</h5>
      <Link to="/home">Buy Products</Link>
      <br />
      <Link to="#">Sell Products</Link>
    </div>
  );
};

export default App;
