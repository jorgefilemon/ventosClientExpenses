import Axios from 'axios';
import styles from "./corteCaja.module.css";
import { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';



const CorteCaja = () => {

    const { auth } = useContext(AuthContext);


    const [openCorte, setOpenCorte] = useState(false)
    const [mensaje, setMensaje] = useState(false)


    const [corte, setCorte] = useState({
        efectivo: "",
        tarjeta: "",
        total: "",
        cambioCliente: "",
    })

    console.log('CorteCaja.jsx - corte', corte)

    const revisarCorte = () => {

        Axios.get('http://localhost:3001/revisarCorte').then((response) => {

            console.log(response.data)
            const newcorte = { ...corte }
            const res = response.data;
            newcorte.efectivo = res.cash;
            newcorte.tarjeta = res.card;
            newcorte.total = res.total;
            newcorte.cambioCliente = res.cambioCliente;

            setCorte(newcorte);
        })

        setOpenCorte(true);
    }

    const hacerCorte = () => {
        Axios.post('http://localhost:3001/corte', { usu_id: auth.id, }).then(
            res => {
                console.log(res.data);
            })
        setOpenCorte(false);
        setMensaje(true);
    }


    return (
        <div className={styles.corteCajaContainer}>

            <div className={styles.generarCorteContainer}>
                <button onClick={revisarCorte}>Generar Corte</button>
            </div>
            {openCorte ?
                <div className={styles.corteCajaTableContainer}>
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Efectivo</td>
                                <td>{new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }).format(corte.efectivo)}</td>
                            </tr>
                            <tr>
                                <td>Tarjeta</td>
                                <td>{new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }).format(corte.tarjeta)}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>{new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }).format(corte.total)}</td>
                            </tr>
                            <tr>
                                <td>Devolucion de efectivo</td>
                                <td>{new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }).format(corte.cambioCliente)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.buttonContainer}>
                        <button
                            className={styles.corteCajaBtn}
                            onClick={hacerCorte}>
                            Aceptar
                        </button >
                        <button
                            className={styles.cancelarCorteCajaBtn}
                            onClick={() => [setOpenCorte(false)]}>
                            Cancelar
                        </button >
                    </div>
                </div>
                :
                null

            }
            {mensaje &&
                <div className={styles.corteExitoso}>Corte realizado con exito </div>}

        </div>


    );
}

export default CorteCaja;