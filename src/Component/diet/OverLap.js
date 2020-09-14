import React from "react"
import { Link } from 'react-router-dom';
import { Card, Descriptions, Button, Empty } from "antd";
import DietDiagram from './dietdiagram';

class OverLap extends React.Component {

	state = {
		dietRatio: {},
		currentRecipe: this.props.currentRecipe,
		diet: this.props.diet,
		types: this.props.types
	}

	render() {
		let { currentRecipe, diet, types } = this.props;
		let price = 0, moisture = 0, protein = 0, fat = 0, fiber = 0, ash = 0;
		console.log(diet);
		
		if (types.length != 0) {
			for (let i = 0; i < types.length; i++) {
				let type = types[i].name;
				let recipes = diet[type];
				if (recipes != undefined) {
					for(let i = 0; i < recipes.length; i+=1){
						let recipe = recipes[i];
						if (Object.keys(recipe.recipe).length != 0) {
							protein += recipe.recipe.crudeProtein * recipe.recipeRatio / 100;
							moisture += recipe.recipe.moisture * recipe.recipeRatio / 100;
							price += recipe.recipe.price * recipe.recipeRatio / 100;
							fat += recipe.recipe.crudeFat * recipe.recipeRatio / 100;
							fiber += recipe.recipe.crudeFiber * recipe.recipeRatio / 100;
							ash += recipe.recipe.ash * recipe.recipeRatio / 100;
						}
					}	
				}
			}
		}

		console.log(this.props);

		if (Object.keys(currentRecipe).length === 0) {
			var recipeView = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
		} else {
			var recipeView = (
				<div>
					<div>
						<span>{currentRecipe.name}</span>
					</div>
					<div>
						<span>{currentRecipe.moisture}</span>
					</div>
					<div>
						<span>{currentRecipe.price}</span>
					</div>
				</div>
			);
		}
		return (
			<div>
				<Card title="预览" bordered={true} style={{ width: "100%" }} span={24}>
					<Card type="inner" title="Current Recipe" extra={<Link to={`/recipeupdate/${currentRecipe.id}`}>More</Link>}>
						{recipeView}
					</Card>

					{/* <Card type="inner" title="营养需求参考">
						<DietDiagram data={{
							protein: protein,
							fat: fat
						}}></DietDiagram>
					</Card> */}

					<Descriptions
						bordered
						column={1}
						size={"small"}
					>
						<Descriptions.Item label="Price, $/lb">{price.toFixed(2)}</Descriptions.Item>
						<Descriptions.Item label="Moisture, max %">{moisture.toFixed(2)}</Descriptions.Item>
						<Descriptions.Item label="Crude protein,%">{protein.toFixed(2)}</Descriptions.Item>
						<Descriptions.Item label="Crude fat, %">{fat.toFixed(2)}</Descriptions.Item>
						<Descriptions.Item label="Crude fiber, %">{fiber.toFixed(2)}</Descriptions.Item>
						<Descriptions.Item label="Ash, % ">{ash.toFixed(2)}</Descriptions.Item>
					</Descriptions>
				</Card>
			</div>
		)
	}
}

export default OverLap;