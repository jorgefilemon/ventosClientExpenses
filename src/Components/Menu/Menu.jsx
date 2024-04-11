//import DatePicker from "react-datepicker";
//import { registerLocale } from "react-datepicker";
import { useContext } from "react";
import Axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "./Menu.css";
//import es from 'date-fns/locale/es';
import { IoHappyOutline } from "react-icons/io5";
import { AuthContext } from "../../Contexts/AuthContext";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "moment/locale/es";

const Menu = () => {
	// registerLocale('es', es)
	//const [startDate, setStartDate] = useState(new Date());

	const { auth, setAuth } = useContext(AuthContext);

	let month = moment().locale("es").format("MMM");
	month = month.replace(".", "");

	const dayYear = moment().format("DD/YYYY");

	const navigate = useNavigate();

	const handleLogout = () => {
		Axios.get("http://localhost:3001/logout", {
			withCredentials: true,
		}).then((res) => {
			setAuth({ logged: false });
			res.data === "cleared cookie" && navigate("/login");
		});
	};

	return (
		<div className="menu-container">
			<div className="dateContainer">{month + "/" + dayYear}</div>

			{/* <DatePicker
        id="fecha"
        locale="es"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="MMM/dd/yyyy"
      /> */}

			<div className="Menu">
				<NavLink to="/" className="link selected">
					PUNTO VENTA
				</NavLink>
				<NavLink to="/corte" className="link notSelected">
					CORTE
				</NavLink>
				<NavLink
					to="/salidaEfe"
					className="link notSelected"
					style={{ borderRight: "1px solid white" }}
				>
					SALIDA EFECTIVO
				</NavLink>
			</div>
			<div className="userlogo">
				{" "}
				<IoHappyOutline />
			</div>
			<div className="user">
				<h2>{auth.name}</h2>
			</div>
			<div className="cerrarSesion">
				<button onClick={handleLogout}>Salir</button>
			</div>
		</div>
	);
};

export default Menu;
