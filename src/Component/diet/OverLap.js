
import React from "react"
 
class OverLap extends React.Component {
	render() {
	  const {children,topDistance, diet, types} = this.props
	  let price = 0, moisture = 0, protein = 0, fat = 0, fiber = 0, ash = 0;
	  if(types.length != 0){
		  for(let i = 0; i < types.length; i++){
			  let type = types[i].name;
			  let recipes = diet[type];
			  if(recipes != undefined){
				for(let j = 0; j < recipes.length; j++){
					let recipe = recipes[j];
					if(Object.keys(recipe.recipe).length != 0){
						protein += recipe.recipe.crudeProtein * recipe.recipeRatio/100;
						moisture += recipe.recipe.moisture * recipe.recipeRatio/100;
						price += recipe.recipe.price * recipe.recipeRatio/100;
						fat += recipe.recipe.crudeFat * recipe.recipeRatio/100;
						fiber += recipe.recipe.crudeFiber * recipe.recipeRatio/100;
						ash += recipe.recipe.ash * recipe.recipeRatio/100;
					}
				}
			  }
		  }
	  }
	  return (
		<div className="air_bubble" style={{top:topDistance+'px'}}>
			Price, $/lb : {price}
			<br />Moisture, max % : {moisture}
			<br />Crude protein,% : {protein}
			<br />Crude fat, % : {fat}
			<br />Crude fiber, % : {fiber}
			<br />Ash, % : {ash}
			<hr/>
			{children}
		</div> 
	  )
	}
  }

export default OverLap;
