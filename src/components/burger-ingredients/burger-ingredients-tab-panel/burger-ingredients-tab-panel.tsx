import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./burger-ingredients-tab-panel.module.css";
import { IBurgerIngredientsTabPanel } from "../../../types/types";

const BurgerIngredientsTabPanel: React.FC<IBurgerIngredientsTabPanel> = ({
  currentTab,
  setCurrentTab,
}) => {
  return (
    <div className={styles.tab}>
      <Tab value="bun" active={currentTab === "bun"} onClick={setCurrentTab}>
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={currentTab === "sauce"}
        onClick={setCurrentTab}
      >
        Соусы
      </Tab>
      <Tab value="main" active={currentTab === "main"} onClick={setCurrentTab}>
        Начинки
      </Tab>
    </div>
  );
};

export default BurgerIngredientsTabPanel;
