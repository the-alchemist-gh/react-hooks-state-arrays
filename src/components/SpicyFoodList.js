import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState('All');
  const foodFilter = foods.filter((food)=> {
        if(filterBy === 'All'){
          return true;
        } else {
          return food.cuisine === filterBy;
        }
      });

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
    // console.log(newFoodArray);
  }

  function handleUpdateFood(id){
    // const newFoodRem = foods.filter((food)=>food.id !== id);
    const newFoodUp = foods.map((food)=>{
      if (food.id===id) {
        return {
          ...food, heatLevel: food.heatLevel+1,
        }
      }else {
        return food;
      }
    });
    setFoods(newFoodUp);
  }

  function handleChange(event){
    setFilterBy(event.target.value);
  }

  const foodList = foodFilter.map((food) => (
    <li onClick={()=>handleUpdateFood(food.id)} key={food.id}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      <select name="filter" onChange={handleChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
