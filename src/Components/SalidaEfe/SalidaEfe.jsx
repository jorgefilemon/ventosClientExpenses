import styles from "./salidaEfe.module.css";
import { useState, useContext } from "react";
import { ExpenseContext } from "../../Contexts/Expense";
import Modal from "./modal/Modal";
import OxxoRafiaOtros from "./Expenses/OxxoRafiaOtros";

const SalidaEfe = () => {
	// const { auth } = useContext(AuthContext);

	const Fletes = "Fletes"; // Define Fletes as a string
	const Donativos = "Donativos";
	const Papeleria = "Papeleria";

	// context for Oxxo Rafia otros
	const { gasto, setGasto } = useContext(ExpenseContext);
	console.log(gasto);
	// opens Donativos, Fletes, Papeleria Modal
	const [isModalOpen, setIsModalOpen] = useState(false);

	// opens oxxoRafiaOtros.jsx
	const [oxxoRafiaOtrosModal, setOxxoRafiaOtrosModal] = useState(false);

	const [modalName, setModalName] = useState(null);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={styles.salidaEfeContainer}>
			<div className={styles.row1}>
				<button
					className={styles.rosa}
					onClick={() => {
						setModalName(Fletes);
						setIsModalOpen(true);
					}}
				>
					fletes
				</button>
				<button
					className={styles.rosaFuerte}
					onClick={() => {
						setModalName(Donativos);
						setIsModalOpen(true);
					}}
				>
					donativos
				</button>
				<button
					className={styles.naranja}
					onClick={() => {
						setModalName(Papeleria);
						setIsModalOpen(true);
					}}
				>
					papeleria
				</button>
				<button
					className={styles.orange}
					onClick={() => {
						setGasto({
							...gasto,
							cantidad: 0,
							type: "agua",
							gastoName: "Agua oxxo",
						});
						setOxxoRafiaOtrosModal(true);
					}}
				>
					agua oxxo
				</button>
			</div>
			<div className={styles.row2}>
				<button
					className={styles.morado}
					onClick={() => {
						setGasto({
							...gasto,
							cantidad: 0,
							type: "limpieza",
							gastoName: "limpieza",
						});
						setOxxoRafiaOtrosModal(true);
					}}
				>
					limpieza
				</button>
				<button className={styles.moradoClaro}>salarios</button>
				<button
					className={styles.verdeClaro}
					onClick={() => {
						setGasto({
							...gasto,
							type: "papeleria",
							gastoName: "rafia",
						});
						setOxxoRafiaOtrosModal(true);
					}}
				>
					rafia
				</button>
				<button
					className={styles.verde}
					onClick={() => {
						setGasto({
							...gasto,
							type: "otro",
							gastoName: "otros gastos",
						});
						setOxxoRafiaOtrosModal(true);
					}}
				>
					otros gastos
				</button>
			</div>

			{isModalOpen && (
				<Modal modalName={modalName} closeModal={closeModal} />
			)}
			{oxxoRafiaOtrosModal && (
				<OxxoRafiaOtros
					setOxxoRafiaOtrosModal={setOxxoRafiaOtrosModal}
				/>
			)}
		</div>
	);
};

export default SalidaEfe;
