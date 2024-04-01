import React, { useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/images/drinkIcon.jpg";
import {AiOutlineMenu,AiOutlineClose} from "react-icons/ai";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuStyle = isMobileMenuOpen? [styles.menu, styles.active].join(' ') : [styles.menu].join('') ;

  return (
    <header className={styles.navbar}>
      <a href="/">
        <img src={logo} alt="drinks" />
        <h2>Cocktails</h2>
      </a>
      <nav>
        <ul className={menuStyle}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/addNewCocktail">Add a new cocktail</a>
          </li>
        </ul>
      </nav>
      <div className={styles.mobile_menu_btn} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? (
          <AiOutlineClose size={50} />
        ) : (
          <AiOutlineMenu size={50} />
        )}
      </div>
    </header>
  );
};

export default Navbar;