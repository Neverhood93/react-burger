import React, { useCallback, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list";
import BurgerIngredientsTabPanel from "./burger-ingredients-tab-panel/burger-ingredients-tab-panel";
import { BurgerIngredientsProps } from "../../types/types";

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ data }) => {
  const [currentTab, setCurrentTab] = React.useState<string>("bun");

  const topRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);

  const setTab = useCallback((tab: string) => {
    setCurrentTab(tab);
    const elementRef =
      tab === "bun" ? bunRef : tab === "sauce" ? sauceRef : mainRef;
    if (elementRef.current)
      elementRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    const topPosition = topRef?.current?.getBoundingClientRect();
    const bunPosition = bunRef?.current?.getBoundingClientRect();
    const saucePosition = sauceRef?.current?.getBoundingClientRect();
    const mainPosition = mainRef?.current?.getBoundingClientRect();

    if (!topPosition || !bunPosition || !saucePosition || !mainPosition) return;

    const bunDistance = Math.abs(topPosition.top - bunPosition.top);
    const sauceDistance = Math.abs(topPosition.top - saucePosition.top);
    const mainDistance = Math.abs(topPosition.top - mainPosition.top);

    const minDistance = Math.min(bunDistance, sauceDistance, mainDistance);
    const tabName =
      minDistance === bunDistance
        ? "bun"
        : minDistance === sauceDistance
          ? "sauce"
          : "main";

    setCurrentTab((prevState) => (tabName === prevState ? prevState : tabName));
  }, []);

  return (
    <section>
      <p className="text text_type_main-large">Соберите бургер</p>

      <BurgerIngredientsTabPanel
        currentTab={currentTab}
        setCurrentTab={setTab}
      />
      <div className={styles.container}></div>

      <div className={styles.column} onScroll={handleScroll} ref={topRef}>
        <h2 className="text text_type_main-medium" ref={bunRef}>
          Булки
        </h2>
        <BurgerIngredientsList data={data} type="bun" />

        <h2 className="text text_type_main-medium" ref={sauceRef}>
          Соусы
        </h2>
        <BurgerIngredientsList data={data} type="sauce" />

        <h2 className="text text_type_main-medium" ref={mainRef}>
          Начинки
        </h2>
        <BurgerIngredientsList data={data} type="main" />
      </div>
    </section>
  );
};

export default BurgerIngredients;
