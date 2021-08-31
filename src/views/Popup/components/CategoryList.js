import { BEST_CARD_PAGE } from "../../../common/constant";
import NoDataFound from "./NoDataFound";

const CategoryList = (props) => {
	const { storageData, setStorageData, setPageNo } = props;
	const categoryData = storageData.category_data;
	const selectedCategory = storageData.selected_category;

	const handleInputChange = ({ target }) => {
		setStorageData({
			...storageData,
			selected_category: target.value,
		});
		setPageNo(BEST_CARD_PAGE);
	};

	console.log(storageData);

	return (
		<div className="category-list">
			{categoryData.length > 0 && (
				<center>
					<h2>Preferred Credit Card Rewards</h2>
				</center>
			)}
			<div style={{ margin: 20 }}>
				{categoryData.map((category) => (
					<div id={category} style={{ margin: 10 }}>
						<input
							key={category}
							value={category}
							name="category"
							type="radio"
							defaultChecked={category === selectedCategory}
							onChange={handleInputChange}
							onClick={handleInputChange}
						/>
						<b style={{ padding: 5, fontSize: 16 }}>{category}</b>
					</div>
				))}
			</div>
			{categoryData.length === 0 && <NoDataFound />}
		</div>
	);
};

export default CategoryList;
