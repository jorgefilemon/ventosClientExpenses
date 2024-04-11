import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Axios from "axios";

const PrivateRoutes = () => {
	const { setAuth } = useContext(AuthContext);

	const [authorized, setAuthorized] = useState(null);

	useEffect(() => {
		const verify = async () => {
			try {
				Axios.defaults.withCredentials = true;
				const res = await Axios.get("http://localhost:3001/verify");

				const data = res.data;
				// console.log("data from jwt", data);
				setAuth({
					logged: data.logged,
					id: data.usu_id,
					name: data.nombre,
				});

				data.logged ? setAuthorized(true) : setAuthorized(false);
			} catch (err) {
				setAuthorized(false);
			}
		};
		verify();
	}, [setAuth]);

	if (authorized === null) {
		return null;
	}

	return authorized ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
