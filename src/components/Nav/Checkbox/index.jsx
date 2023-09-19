import styles from "./index.module.scss";
import cl from "classnames";

const Checkbox = ({ title, className }) => {
  return (
    <div className={cl(className, styles.wrapper)}>
      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
      <label for="vehicle1">{title}</label>
    </div>
  );
};

export default Checkbox;
