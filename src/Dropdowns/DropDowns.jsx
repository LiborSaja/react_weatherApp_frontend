import React from "react";
import "./DropDowns.css";

const DropDowns = ({ cities, onSelectCity }) => {
    return (
        <div className="dropdown">
            <button
                className="btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Vyberte město
            </button>
            <ul
                className="dropdown-menu scrollable-menu"
                aria-labelledby="dropdownMenuButton">
                {cities.map((city, index) => (
                    <li key={index}>
                        <a
                            className="dropdown-item"
                            href="#!"
                            onClick={() => onSelectCity(city)}>
                            {city.location}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DropDowns;
