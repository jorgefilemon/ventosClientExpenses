import React, { createContext, useState } from "react";

export const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
	const [gasto, setGasto] = useState({
		type: "",
		gastoName: "",
		cantidad: 0,
	});

	return (
		<ExpenseContext.Provider value={{ gasto, setGasto }}>
			{children}
		</ExpenseContext.Provider>
	);
};

export default ExpenseProvider;
