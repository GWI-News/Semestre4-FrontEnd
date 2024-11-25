import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import Card from '../../components/Card/Card';
import styles from './Pesquisa.module.css';
import { Search } from 'react-bootstrap-icons';
import Col from 'react-bootstrap/Col';

const PesquisaTempoReal = () => {
    const [Pesquisa, setPesquisa] = useState('');
    const [Results, setResults] = useState([]);
    const [Buscar, setBuscar] = useState(false); // Controle para buscar resultados
    const [Historico, setHistorico] = useState(() => {
        const storedHistorico = localStorage.getItem('historicoPesquisas');
        return storedHistorico ? JSON.parse(storedHistorico) : [];
    });

    const db = getFirestore();

    useEffect(() => {
        if (Buscar && Pesquisa.trim()) {
            const q = query(
                collection(db, 'Noticias'),
                where('titulo', '>=', Pesquisa),
                where('titulo', '<=', Pesquisa + '\uf8ff')
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const Noticias = [];
                querySnapshot.forEach((doc) => {
                    Noticias.push(doc.data());
                });
                setResults(Noticias);
                setBuscar(false); // Reseta o controle após a busca
            });

            return () => unsubscribe();
        }
    }, [Buscar, Pesquisa, db]);

    const handlePesquisaChange = (e) => {
        setPesquisa(e.target.value);
    };

    const handlePesquisaSubmit = () => {
        if (Pesquisa.trim()) {
            setBuscar(true); // Ativa a busca

            // Atualiza o histórico de pesquisas
            const novoHistorico = [Pesquisa, ...Historico.filter(item => item !== Pesquisa)].slice(0, 10);
            setHistorico(novoHistorico);
            localStorage.setItem('historicoPesquisas', JSON.stringify(novoHistorico));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handlePesquisaSubmit();
        }
    };

    const handleClearHistorico = () => {
        setHistorico([]);
        localStorage.removeItem('historicoPesquisas');
    };

    const [showPesquisa, setShowPesquisa] = useState(false);

    const handleClosePesquisa = () => {
        setShowPesquisa(false);
        setPesquisa('');
    };

    const handleShowPesquisa = () => {
        setShowPesquisa(true);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <div className={`${styles.pesquisa}`}>
                <button
                    className={`${styles.searchButton} ${styles.searchIcon}`}
                    onClick={() => {
                        showPesquisa ? handleClosePesquisa() : handleShowPesquisa();
                    }}
                >
                    <Search />
                </button>
                {!showPesquisa ? null : (
                    <input
                        className={`${styles.formInputMobile} ${styles.botaoContainer}`}
                        type="text"
                        name="Pesquisa"
                        placeholder="Buscar..."
                        value={Pesquisa}
                        onChange={handlePesquisaChange}
                        onKeyDown={handleKeyDown} // Captura a tecla Enter
                    />
                )}
                {Historico.length > 0 && showPesquisa && (
                    <ul className={styles.historicoLista}>
                        {Historico.map((item, index) => (
                            <li
                                key={index}
                                className={styles.historicoItem}
                                onClick={() => {
                                    setPesquisa(item);
                                    setBuscar(true); // Ativa a busca ao clicar no histórico
                                }}
                            >
                                {item}
                            </li>
                        ))}
                        <button className={styles.limparHistorico} onClick={handleClearHistorico}>
                            Limpar Histórico
                        </button>
                    </ul>
                )}
            </div>
            {Results.length === 0 ? null : (
                <Col
                    xs={12}
                    className={`${styles.linha} m-0 flex-column p-0 pb-4 d-flex justify-content-center align-items-center`}
                >
                    <h1 className={styles.tituloPages}>Resultados</h1>
                    {Results.map((Result, i) => (
                        <Card key={i} noticia={Result}></Card>
                    ))}
                </Col>
            )}
        </>
    );
};

export default PesquisaTempoReal;
