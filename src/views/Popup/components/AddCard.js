import { Button, Grid, Input } from "@material-ui/core";

const AddCard = () => {
	return (
		<fieldset style={{ borderRadius: "10px", borderColor: "#3f51b5" }}>
			<legend style={{ fontSize: 16 }}>
				<b>Add Card</b>
			</legend>
			<div class="add-card">
				<Input
					id="card-number"
					color="default"
					value={""}
					placeholder="Card Number"
					fullWidth={true}
				/>
				<br />
				<br />
				<Input
					id="card-cvv"
					color="default"
					value={""}
					placeholder="CVV"
					fullWidth={true}
				/>
				<br />
				<br />
				<Input
					id="card-holder-name"
					color="default"
					value={""}
					placeholder="Card Holder Name"
					fullWidth={true}
				/>
				<br />
				<br />
				<b style={{ color: "gray" }}>Expiration date: </b>
				<br />
				<Grid container>
					<Grid xs={5} item>
						<Input
							id="card-expiration-date-month"
							color="default"
							value={""}
							placeholder="Month"
						/>
					</Grid>
					<Grid xs={1} item></Grid>
					<Grid xs={6} item>
						<Input
							id="card-expiration-date-year"
							color="default"
							value={""}
							placeholder="Year"
						/>
					</Grid>
				</Grid>
				<br />
				<br />
				<Button variant="contained" size="small" color="primary">
					Save Card
				</Button>
			</div>
		</fieldset>
	);
};

export default AddCard;
