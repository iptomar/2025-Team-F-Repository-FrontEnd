import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import GradeHorario from '../Components/GradeHorario';
import { DragDropContext } from "@hello-pangea/dnd";
import {
    BiBuildingHouse,
    BiMap,
    BiBookAlt,
    BiUser,
    BiDoorOpen
} from 'react-icons/bi';

import {
    fetchLocalizacoes,
    fetchEscolas,
    fetchCursos,
    fetchTurmas,
    fetchBlocos,
    fetchUsers
} from '../Services/api'; // Certifica-te que o caminho está certo!

function HomePage() {
    const [filtroAtivo, setFiltroAtivo] = useState(null);
    const [opcoes, setOpcoes] = useState([]);
    const [selecao, setSelecao] = useState(null);
    const [semanaAtual, setSemanaAtual] = useState(1);
    const [gradeBlocos, setGradeBlocos] = useState([]);

    const icones = [
        { id: 'localizacao', label: 'Localidade', icon: <BiMap size={30} /> },
        { id: 'escola', label: 'Escola', icon: <BiBuildingHouse size={30} /> },
        { id: 'curso', label: 'Curso', icon: <BiBookAlt size={30} /> },
        { id: 'sala', label: 'Sala', icon: <BiDoorOpen size={30} /> },
        { id: 'professor', label: 'Professor', icon: <BiUser size={30} /> }
    ];

    // Carrega opções ao ativar filtro
    useEffect(() => {
        const carregarOpcoes = async () => {
            try {
                if (filtroAtivo === 'localizacao') {
                    const data = await fetchLocalizacoes();
                    setOpcoes(data.map(item => ({ value: item.id, label: item.nome })));
                } else if (filtroAtivo === 'escola') {
                    const data = await fetchEscolas();
                    setOpcoes(data.map(item => ({ value: item.id, label: item.nome })));
                } else if (filtroAtivo === 'curso') {
                    const data = await fetchCursos();
                    setOpcoes(data.map(item => ({ value: item.id, label: item.nome })));
                } else if (filtroAtivo === 'sala') {
                    const data = await fetchTurmas(); // Exemplo: ou fetchSalas se tiveres
                    setOpcoes(data.map(item => ({ value: item.id, label: item.nome })));
                } else if (filtroAtivo === 'professor') {
                    const data = await fetchUsers();
                    setOpcoes(data.map(item => ({ value: item.id, label: item.nome })));
                } else {
                    setOpcoes([]);
                }
            } catch (error) {
                console.error("Erro ao carregar opções:", error);
                setOpcoes([]);
            }
        };

        if (filtroAtivo) {
            carregarOpcoes();
        }
    }, [filtroAtivo]);

    // Carregar blocos ao selecionar uma opção
    useEffect(() => {
        const carregarBlocos = async () => {
            if (filtroAtivo === 'curso' && selecao) {
                try {
                    // Exemplo: sempre ano 1, semestre 1, podes ajustar
                    const blocos = await fetchBlocos(selecao.value, 1, 1);
                    setGradeBlocos(blocos);
                } catch (error) {
                    console.error("Erro ao buscar blocos:", error);
                    setGradeBlocos([]);
                }
            } else {
                setGradeBlocos([]);
            }
        };

        carregarBlocos();
    }, [selecao, filtroAtivo]);

    const handleSemana = (delta) => {
        setSemanaAtual((prev) => prev + delta);
        // Podes recarregar blocos de acordo com semana se necessário
    };

    const habilitarBotoesSemana = gradeBlocos.length > 1;

    return (
        <div className="container my-4">
            {/* Barra de ícones de filtro */}
            <div className="d-flex justify-content-between flex-wrap gap-3 mb-4">
                {icones.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => {
                            if (filtroAtivo === item.id) {
                                setFiltroAtivo(null);
                                setSelecao(null);
                                setGradeBlocos([]);
                                setSemanaAtual(1);
                            } else {
                                setFiltroAtivo(item.id);
                                setSelecao(null);
                                setGradeBlocos([]);
                                setSemanaAtual(1);
                            }
                        }}
                        className={`text-center p-3 rounded border ${filtroAtivo === item.id ? 'bg-primary text-white' : 'bg-light'}`}
                        style={{ cursor: 'pointer', width: '120px' }}
                    >
                        {item.icon}
                        <div className="fw-semibold mt-2">{item.label}</div>
                    </div>
                ))}
            </div>

            {/* Select do filtro */}
            {filtroAtivo && (
                <div className="card p-4 shadow-sm mb-4">
                    <h5 className="fw-bold mb-3">Selecionar {filtroAtivo}</h5>
                    <Select
                        options={opcoes}
                        value={selecao}
                        onChange={(opt) => setSelecao(opt)}
                        placeholder={`Selecione um(a) ${filtroAtivo}`}
                    />
                </div>
            )}

            {/* Botões de semana */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleSemana(-1)}
                    disabled={!habilitarBotoesSemana}
                >
                    ← Anterior
                </button>

                <h6 className="fw-bold mb-0">Semana {semanaAtual}</h6>

                <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleSemana(1)}
                    disabled={!habilitarBotoesSemana}
                >
                    Próxima →
                </button>
            </div>

            {/* Grade horária */}
            <DragDropContext onDragEnd={(result) => console.log("Drag ended", result)}>
                <GradeHorario blocos={gradeBlocos} />
            </DragDropContext>
        </div>
    );
}

export default HomePage;
