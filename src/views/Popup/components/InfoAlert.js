import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const InfoAlert = (props) => {
	const { alertData, setAlertData } = props;

	const closeSnackbar = () => {
		setAlertData({
			...alertData,
			isOpen: false,
		});
	};

	return (
		<Snackbar
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center",
			}}
			open={alertData.isOpen}
			autoHideDuration={alertData.hideDuration}
			onClose={() => closeSnackbar()}
		>
			<Alert onClose={() => closeSnackbar()} severity={alertData.severity}>
				{alertData.message}
			</Alert>
		</Snackbar>
	);
};

export default InfoAlert;
