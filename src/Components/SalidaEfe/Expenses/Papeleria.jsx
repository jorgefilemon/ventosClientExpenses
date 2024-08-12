import { useState } from "react";
import styles from "../modal/modal.module.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import ModalCantidad from "./ModalCantidad";

function Papeleria({ closeModal, modalName }) {
	const { auth } = useContext(AuthContext);
	// 1 state
	const [modalCantidad, setModalCantidad] = useState(false);

	const [expense, setExpense] = useState({
		type: modalName,
		expenseName: "",
		cantidad: 0,
	});

	const [expenseList, setExpenseList] = useState([]);

	// creates expense object.
	const createexpense = (e) => {
		setExpense((prevExpense) => ({
			type: modalName,
			cantidad: 0,
			expenseName: e.target.id,
		}));
		setModalCantidad(true);
	};

	const sendExpense = async (e) => {
		e.preventDefault();

		try {
			await axios.post("http://localhost:3001/expense", {
				expenseList: expenseList, // Use the updated list directly here
				usu_id: auth.id,
			});
			console.log("Expenses sent successfully");
		} catch (error) {
			console.error("Error sending expenses:", error);
		}
		// Reset the input form
		setExpense({ type: "", expenseName: "", cantidad: 0 });
		setExpenseList([]);
		//closes a modal
		closeModal();
	};

	const deleteproduct = (myIndex) => {
		// Use the callback form of setExpenseList to ensure you are working with the latest state
		setExpenseList((prevexpenseList) =>
			prevexpenseList.filter((expense, index) => index !== myIndex)
		);
	};

	const resultado = expenseList.reduce(
		(total, currentValue) =>
			(total = total + parseFloat(currentValue.cantidad)),
		0
	);

	return (
		<>
			<div className={styles.options}>
				<button
					id="foyo"
					className={styles.rosaFuerte}
					onClick={(e) => createexpense(e)}
				>
					foyo
				</button>
				<button
					id="tony"
					className={styles.rosa}
					onClick={(e) => createexpense(e)}
				>
					tony
				</button>

				<button
					id="alex"
					className={styles.naranja}
					onClick={(e) => createexpense(e)}
				>
					alex
				</button>

				<button
					id="otro"
					className={styles.morado}
					onClick={(e) => createexpense(e)}
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
						{expenseList.map((item, index) => (
							<tr key={index}>
								<td>
									<button
										onClick={() => deleteproduct(index)}
									>
										X
									</button>
								</td>
								<td>{item.expenseName}</td>
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
				<button className={styles.aceptarBtn} onClick={sendExpense}>
					Aceptar
				</button>
				<button
					className={styles.cancelarBtn}
					onClick={() => closeModal()}
				>
					Cancelar
				</button>
			</div>

			{modalCantidad && (
				<ModalCantidad
					expense={expense}
					setExpense={setExpense}
					setModalCantidad={setModalCantidad}
					expenseList={expenseList}
					setExpenseList={setExpenseList}
				/>
			)}
		</>
	);
}

export default Papeleria;
