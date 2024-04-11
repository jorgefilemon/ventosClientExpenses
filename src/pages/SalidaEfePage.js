import SalidaEfe from "../Components/SalidaEfe/SalidaEfe";

import ExpenseProvider from "../Contexts/Expense";

const SalidaPage = () => {
	return (
		<ExpenseProvider>
			<div className="container">
				<SalidaEfe />
			</div>
		</ExpenseProvider>
	);
};

export default SalidaPage;
