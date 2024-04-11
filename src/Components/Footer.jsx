import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../Contexts/Context";
import "./footer.css";

const Footer = ({
	setOpenVenta,
	setOpenModal,
	setOpenAjuste,
	resultado,
	modalsActive,
	setModalsActive,
	openCambioModal,
	setOpenCambioModal,
	setOpenDevolucionDinero,
	setOpenGenerarVale,
	setOpenUsarVale,
}) => {
	const { products } = useContext(ProductsContext);
	const [conexion] = useState(false);
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.keyCode === 27) {
				if (modalsActive) {
					setModalsActive(false);
					setOpenModal(false);
					setOpenAjuste(false);
					setOpenDevolucionDinero(false);
					setOpenGenerarVale(false);
					setOpenUsarVale(false);
				}

				if (
					resultado >= 0 &&
					products.length > 0 &&
					modalsActive === false &&
					!openCambioModal
				) {
					setOpenVenta((prevOpenVenta) => !prevOpenVenta);
				}

				if (openCambioModal) {
					window.location.reload();
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [
		resultado,
		products,
		setOpenVenta,
		modalsActive,
		openCambioModal,
		setModalsActive,
		setOpenAjuste,
		setOpenCambioModal,
		setOpenDevolucionDinero,
		setOpenGenerarVale,
		setOpenModal,
		setOpenUsarVale,
	]);

	return (
		<div className="footer-container">
			<div className="status_container">
				<p>Mercado Libre</p>
				<h4
					className={
						conexion ? "mercadoConectado" : "mercadoSinConexion"
					}
				>
					{conexion ? "Contectado" : "Sin conexion"}
				</h4>
			</div>
			<div className="button-container">
				<button
					onClick={
						resultado >= 0 && products.length > 0
							? () => [setOpenVenta(true)]
							: null
					}
				>
					vender
				</button>
			</div>
			<div className="total-container">
				{new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(resultado)}
			</div>
		</div>
	);
};

export default Footer;
