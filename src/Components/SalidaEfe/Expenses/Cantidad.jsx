import styles from "./cantidad.module.css";
import "../../myColors.module.css";

function ModalCantidad({
	gasto,
	setGasto,
	setModalCantidad,
	gastoList,
	setGastoList,
}) {
	const handleAccept = (e) => {
		e.preventDefault();
		setGasto(gasto);
		const newList = [...gastoList, gasto];
		setGastoList(newList);
		setGasto({ ...gasto, gastoName: "", cantidad: 0 });
		setModalCantidad(false);
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
			"inter bajio": "var(--rosaFuerte-bg)",
			castores: "var(--rosa-bg)",
			"julian de obregon": "var(--naranja-bg)",
			otro: "var(--morado-bg)",
			"nino obrero": "var(--rosaFuerte-bg)",
			"gabriel aguirre": "var(--rosa-bg)",
			misioneros: "var(--naranja-bg)",
			foyo: "var(--rosaFuerte-bg)",
			tony: "var(--rosa-bg)",
			alex: "var(--naranja-bg)",
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
							type="number"
							autoFocus
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
					<button onClick={() => setModalCantidad(false)}>
						cancelar
					</button>
				</div>
			</div>
		</div>
	);
}

export default ModalCantidad;
