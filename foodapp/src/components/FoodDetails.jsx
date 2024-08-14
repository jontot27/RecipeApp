import { useEffect, useState } from "react";

import style from "./fooddetails.module.css";
export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "68047e7ddc81442c82fcce7c937837da";
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);
  return (
    <div className={style.recipeCard}>
      <div>
        <h1 className={style.recipeName}>{food.title}</h1>
        <img className={style.recipeImage} src={food.image} atl="" />
        <div className={style.recipeDetails}>
          <span>
            <strong>⏲️{food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            <strong> 👩🏻‍👧‍👦Serves: {food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? " 🥕Vegetarian" : " 🥩Non-Vegetarian"}
            </strong>
          </span>
          <span>
            <strong> {food.vegan ? " 🐮 Vegan" : ""} </strong>{" "}
          </span>
        </div>
        <div>
          <span>
            <strong>
              💲{Math.ceil(food.pricePerServing) / 100} Per Serving
            </strong>
          </span>
        </div>
      </div>

      <div>
        <h2>Instructions</h2>
        <div className={style.recipeInstructions}>
          <ol>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
