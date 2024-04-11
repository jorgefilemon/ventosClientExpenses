import { useState } from "react";
import styles from "../modal/modal.module.css";

import ModalCantidad from "./Cantidad";

function Donativos({ closeModal, modalName }) {
	const [modalCantidad, setModalCantidad] = useState(false);

	// const { gasto, setGasto } = useContext(ExpenseContext);

	const [gasto, setGasto] = useState({
		type: modalName,
		gastoName: "",
		cantidad: 0,
	});

	const [gastoList, setGastoList] = useState([]);

	console.log(gasto, modalCantidad);
	// creates gasto object.
	const createGasto = (e) => {
		setGasto({
			...gasto,
			type: modalName,
			cantidad: 0,
			gastoName: e.target.id,
		});
		setModalCantidad(true);
		console.log("setModalCantidad:", modalCantidad); // Log here
	};

	const deleteproduct = (myIndex) => {
		// Use the callback form of setGastoList to ensure you are working with the latest state
		setGastoList((prevGastoList) =>
			prevGastoList.filter((gasto, index) => index !== myIndex)
		);
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
					id="nino obrero"
					className={styles.rosaFuerte}
					onClick={(e) => createGasto(e)}
				>
					escuela niño del obrero
				</button>
				<button
					id="gabriel aguirre"
					className={styles.rosa}
					onClick={(e) => createGasto(e)}
				>
					asilo gabriel aguirre
				</button>

				<button
					id="misioneros"
					className={styles.naranja}
					onClick={(e) => createGasto(e)}
				>
					misioneros
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
					onClick={() => closeModal()}
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

export default Donativos;
