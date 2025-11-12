import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { PATHS } from "../../constants/paths";

const Header: React.FC = () => {
  const [showDropdown, setShowDropDown] = React.useState(false);

  return (
    <header className={styles.header}>
      <section className={styles.leftMenu}>
        <nav>
          <ul>
            <li className={styles.menuItemWrapper}>
              <div className={styles.menuTrigger}>
                SHOP{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={styles.menuDownArrowIcon}
                  style={{
                    transform: showDropdown ? "scale(1.2)" : "scale(1)",
                    transition: "transform 0.2s ease-in-out",
                  }}
                  onMouseEnter={() => setShowDropDown(true)}
                />
              </div>
              <section
                className={styles.dropDownMenu}
                onMouseLeave={() => setShowDropDown(false)}
                style={{
                  opacity: showDropdown ? 1 : 0,
                  pointerEvents: showDropdown ? "auto" : "none",
                }}
              >
                <h6> Explore collection</h6>
                <ul>
                  <li>
                    <Link to={PATHS.NEW_ARRIVALS}>NEW ARRIVALS</Link>
                  </li>
                  <li>
                    <Link to={PATHS.BEST_SELLERS}>BEST SELLERS</Link>
                  </li>
                  <li>
                    <Link to={PATHS.SHOP_ALL}>SHOP ALL</Link>
                  </li>
                  <li>
                    <Link to={PATHS.UNISEX}>UNISEX</Link>
                  </li>
                  <li>
                    <Link to={PATHS.COLORS}>COLORS</Link>
                  </li>
                </ul>
              </section>
            </li>
            <li>
              <Link to={PATHS.WISHLIST}>WISHLIST</Link>
            </li>
            <li>
              <Link to={PATHS.DASHBOARD}>DASHBOARD</Link>
            </li>
          </ul>
        </nav>
      </section>

      <Link to={PATHS.HOME} className={styles.brandText}>
        C2N
      </Link>

      <section className={styles.rightMenu}>
        <nav>
          <ul>
            <li>
              <Link to="">SEARCH</Link>
            </li>
            <li>
              <Link to={PATHS.CART}>CART</Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
