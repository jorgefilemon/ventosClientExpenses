import styles from "./cantidad.module.css";
import "../../myColors.module.css";
import { useContext } from "react";

import { ExpenseContext } from "../../../Contexts/Expense";

function OxxoRafiaOtros({ setOxxoRafiaOtrosModal }) {
	const { gasto, setGasto } = useContext(ExpenseContext);
	console.log(gasto);
	const handleAccept = (e) => {
		e.preventDefault();

		setGasto({ ...gasto, gastoName: "", cantidad: 0 });
		setOxxoRafiaOtrosModal(false);
	};

	const handleChange = (event) => {
		setGasto((prevGasto) => ({
			...prevGasto,

			cantidad: parseFloat(event.target.value) || 0,
		}));
	};

	// chooses background color
	const pickColor = ({ gasto }) => {
		const color = {
			"Agua oxxo": "orange",
			rafia: "var(--verde-bg)",
			"otros gastos": "var(--verdeClaro-bg)",
			limpieza: "var(--morado-bg)",
		};
		return color[gasto.gastoName];
	};

	return (
		<div className={styles.modalBackgroundCantidad}>
			<div className={styles.modalContainerCantidad}>
				<div
					className={styles.expenseNameContainer}
					style={{ backgroundColor: pickColor({ gasto }) }}
				>
					<h2>{gasto.gastoName}</h2>
				</div>

				<div className={styles.inputContainer}>
					<form onSubmit={handleAccept}>
						<input
							autoFocus
							type="number"
							onFocus={(e) => e.target.select()}
							value={gasto.cantidad || ""}
							onChange={handleChange}
						/>
					</form>
				</div>
				<div className={styles.buttonContainer}>
					<button
						className={styles.aceptarButton}
						style={{ backgroundColor: pickColor({ gasto }) }}
						onClick={handleAccept}
					>
						aceptar
					</button>
					<button onClick={() => setOxxoRafiaOtrosModal(false)}>
						cancelar
					</button>
				</div>
			</div>
		</div>
	);
}

export default OxxoRafiaOtros;
