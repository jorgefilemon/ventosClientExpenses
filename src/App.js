import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SalidaPage from "./pages/SalidaEfePage";

import Corte from "./pages/Corte";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthContext } from "../src/Contexts/AuthContext";
import Menu from "./Components/Menu/Menu";

function App() {
	const [auth, setAuth] = useState({
		logged: null,
		user: "",
		id: "",
	});

	return (
		<Router>
			<AuthContext.Provider value={{ auth, setAuth }}>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<Login />} />
					<Route element={<PrivateRoutes />}>
						<Route
							element={
								<>
									<Menu />
									<Outlet />
								</>
							}
						>
							<Route path="/" element={<Home />} exact />
							<Route path="/corte" element={<Corte />} />
							<Route path="/salidaEfe" element={<SalidaPage />} />
						</Route>
					</Route>
				</Routes>
			</AuthContext.Provider>
		</Router>
	);
}

export default App;
