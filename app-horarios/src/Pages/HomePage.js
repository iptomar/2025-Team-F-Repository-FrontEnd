import React, { useState } from 'react';
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

function HomePage() {
    const [filtroAtivo, setFiltroAtivo] = useState(null);
    const [selecao, setSelecao] = useState(null);
    const [semanaAtual, setSemanaAtual] = useState(1);
    const [gradeBlocos, setGradeBlocos] = useState([]);

    // Mock de opções (depois substitui com dados reais)
    const opcoesMock = [
        { value: 1, label: 'Opção 1' },
        { value: 2, label: 'Opção 2' },
        { value: 3, label: 'Opção 3' }
    ];

    const icones = [
        { id: 'localizacao', label: 'Localidade', icon: <BiMap size={30} /> },
        { id: 'escola', label: 'Escola', icon: <BiBuildingHouse size={30} /> },
        { id: 'curso', label: 'Curso', icon: <BiBookAlt size={30} /> },
        { id: 'sala', label: 'Sala', icon: <BiDoorOpen size={30} /> },
        { id: 'professor', label: 'Professor', icon: <BiUser size={30} /> }
    ];

    const handleSemana = (delta) => {
        setSemanaAtual((prev) => prev + delta);
        // Aqui você pode chamar a API novamente para atualizar gradeBlocos
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
                                // Se clicar novamente no mesmo ícone, fecha o filtro
                                setFiltroAtivo(null);
                                setSelecao(null);
                                setGradeBlocos([]);
                                setSemanaAtual(1);
                            } else {
                                // Caso contrário, ativa o novo filtro
                                setFiltroAtivo(item.id);
                                setSelecao(null);
                                setGradeBlocos([]);
                                setSemanaAtual(1);
                            }
                        }}

                        className={`text-center p-3 rounded border ${filtroAtivo === item.id ? 'bg-primary text-white' : 'bg-light'
                            }`}
                        style={{ cursor: 'pointer', width: '120px' }}
                    >
                        {item.icon}
                        <div className="fw-semibold mt-2">{item.label}</div>
                    </div>
                ))}
            </div>

            {/* Select do filtro (aparece após clicar no ícone) */}
            {filtroAtivo && (
                <div className="card p-4 shadow-sm mb-4">
                    <h5 className="fw-bold mb-3">Selecionar {filtroAtivo}</h5>
                    <Select
                        options={opcoesMock}
                        value={selecao}
                        onChange={(opt) => {
                            setSelecao(opt);
                            // Aqui você deve carregar blocos reais da API
                            setGradeBlocos([]); // ← para teste, vazia
                        }}
                        placeholder={`Selecione um(a) ${filtroAtivo}`}
                    />
                </div>
            )}

            {/* Botões de navegação de semana (sempre visíveis) */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleSemana(-1)}
                    disabled={!habilitarBotoesSemana}
                >
                    ← Anterior
                </button>

                <h6 className="fw-bold mb-0">{semanaAtual}</h6>

                <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleSemana(1)}
                    disabled={!habilitarBotoesSemana}
                >
                    Próxima →
                </button>
            </div>

            {/* Grade horária (sempre visível) */}
            <DragDropContext onDragEnd={(result) => console.log("Drag ended", result)}>
                <GradeHorario blocos={gradeBlocos} />
            </DragDropContext>
        </div>
    );
}

export default HomePage;
