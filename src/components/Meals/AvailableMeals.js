import classes from "./AvailableMeals.module.css";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [items, setItems] = useState([]);

  const { isLoading, error, sendRequest: fetchData } = useHttp();

  useEffect(() => {
    console.log("Is Running");
    const applyData = (foodsData) => {
      const objs = [];
      for (const key in foodsData) {
        objs.push({
          id: key,
          title: foodsData[key].title,
          description: foodsData[key].description,
          price: foodsData[key].price,
        });
      }

      setItems(objs);
    };

    fetchData(
      {
        url: "https://http-food-orders-app-default-rtdb.firebaseio.com/meals.json",
      },
      applyData
    );
  }, [fetchData]);

  let mealsList = <p>No foods availables</p>;

  const hasItems = items.length > 0;

  if (hasItems) {
    mealsList = items.map((meal) => (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.title}
        description={meal.description}
        price={meal.price}
      />
    ));
  }

  if (error) {
    mealsList = <p>{error}</p>;
  }

  if (isLoading) {
    mealsList = <p>Loading.....</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
