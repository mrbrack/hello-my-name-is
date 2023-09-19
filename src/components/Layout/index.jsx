import { Navbar, Footer } from "@/components";
import styles from "./index.module.scss";
import cl from "classnames";

const Layout = ({ children, className }) => {
  return (
    <div className={cl(className, styles.wrapper)}>
      <main className={cl(className, styles.main)}>{children}</main>
    </div>
  );
};

export default Layout;
