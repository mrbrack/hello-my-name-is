import styles from "./index.module.scss";
import cl from "classnames";
import Link from "next/link";

// Not currently in use. Will be used in final release.

const Footer = (className) => {
  return (
    <footer className={cl(className, styles.footer)}>
      <small>
        &copy; Copyright 2023, Amber Buckley and Nigel Fryatt. All Rights
        Reserved.
      </small>
    </footer>
  );
};

export default Footer;
