import { useState } from "react";
import axios from "axios";
import styles from "../modal/modal.module.css";

import ModalCantidad from "./Cantidad";

function Fletes({ closeModal, modalName }) {
	const [modalCantidad, setModalCantidad] = useState(false);

	const [gasto, setGasto] = useState({
		type: modalName,
		gastoName: "",
		cantidad: 0,
	});

	// console.log(gasto);

	const [gastoList, setGastoList] = useState([]);

	const createGasto = (e) => {
		setGasto({ ...gasto, cantidad: 0, gastoName: e.target.id });
		setModalCantidad(true);
	};

	const deleteproduct = (myIndex) => {
		// Use the callback form of setGastoList to ensure you are working with the latest state
		setGastoList((prevGastoList) =>
			prevGastoList.filter((gasto, index) => index !== myIndex)
		);
	};

	const sendExpense = () => {
		axios.post();
	};
	const cancelarCerrar = () => {
		closeModal();
	};

	const resultado = gastoList.reduce(
		(total, currentValue) =>
			(total = total + parseFloat(currentValue.cantidad)),
		0
	);

	return (
		<>
			<div className={styles.options}>
				<button
					id="inter bajio"
					className={styles.rosaFuerte}
					onClick={(e) => createGasto(e)}
				>
					inter bajio
				</button>
				<button
					id="castores"
					className={styles.rosa}
					onClick={(e) => createGasto(e)}
				>
					castores
				</button>
				<button
					id="julian de obregon"
					className={styles.naranja}
					onClick={(e) => createGasto(e)}
				>
					julian de
					<br />
					obregon
				</button>
				<button
					id="otro"
					className={styles.morado}
					onClick={(e) => createGasto(e)}
				>
					otro
				</button>
			</div>
			<div className={styles.modalTable}>
				<table>
					<thead>
						<tr>
							<th>borrar</th>
							<th>nombre</th>
							<th>cantidad</th>
						</tr>
					</thead>

					<tbody>
						{gastoList.map((item, index) => (
							<tr key={index}>
								<td>
									<button
										onClick={() => deleteproduct(index)}
									>
										X
									</button>
								</td>
								<td>{item.gastoName}</td>
								<td>
									{new Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
									}).format(item.cantidad)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className={styles.footer}>
				<div className={styles.totalText}>total</div>
				<div className={styles.totalQuantity}>
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(resultado)}
				</div>
			</div>
			<div className={styles.aceptarCancelar}>
				<button className={styles.aceptarBtn}>Aceptar</button>
				<button
					className={styles.cancelarBtn}
					onClick={() => {
						cancelarCerrar();
					}}
				>
					Cancelar
				</button>
			</div>

			{modalCantidad && (
				<ModalCantidad
					gasto={gasto}
					setGasto={setGasto}
					setModalCantidad={setModalCantidad}
					gastoList={gastoList}
					setGastoList={setGastoList}
				/>
			)}
		</>
	);
}

export default Fletes;
