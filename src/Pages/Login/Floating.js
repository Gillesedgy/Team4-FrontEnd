import React from "react";
import "./floating.css";
import { countryFlagImages } from "../../constants";

function Floating() {
  return (
    <div>
      <section className="background-area-wrapper">
        <div className="area">
          <ul className="circles">
            {countryFlagImages.map((flagUrl) => (
              <li>
                <img className="flag" src={flagUrl} alt="flag" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Floating;
