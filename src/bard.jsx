import styles from "./salidaEfe.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import Modal from "./modal/Modal";

const SalidaEfe = () => {
	const { auth } = useContext(AuthContext);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [, setModalName] = useState(null);

	return (
		<div className={styles.corteCajaContainer}>
			<div className={styles.row1}>
				<button
					className={styles.rosa}
					onClick={() => {
						setIsModalOpen(true);
						setModalName("Fletes");
					}}
				>
					fletes
				</button>
				<button
					className={styles.rosaFuerte}
					onClick={() => setIsModalOpen(true)}
				>
					donativos
				</button>
			</div>
			{isModalOpen && (
				<Modal
					setIsModalOpen={setIsModalOpen}
					setModalName={setModalName}
				/>
			)}
		</div>
	);
};

export default SalidaEfe;
