import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import GradeHorarioV2 from '../Components/GradeHorarioV2';
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
    fetchSalas,
    fetchProfessores,
    fetchHorariosPorLocalidade,
    fetchHorariosPorEscola,
    fetchHorariosPorCurso,
    fetchHorariosPorSala,
    fetchHorariosPorProfessor,
} from '../Services/api';

function HomePage() {
    const [filtroAtivo, setFiltroAtivo] = useState(null);
    const [opcoes, setOpcoes] = useState([]);
    const [selecao, setSelecao] = useState(null);
    const [semanaAtual, setSemanaAtual] = useState(1);
    const [gradeBlocos, setGradeBlocos] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [indiceHorario, setIndiceHorario] = useState(0);

    const icones = [
        { id: 'localizacao', label: 'Localidade', icon: <BiMap size={30} /> },
        { id: 'escola', label: 'Escola', icon: <BiBuildingHouse size={30} /> },
        { id: 'curso', label: 'Curso', icon: <BiBookAlt size={30} /> },
        { id: 'sala', label: 'Sala', icon: <BiDoorOpen size={30} /> },
        { id: 'professor', label: 'Professor', icon: <BiUser size={30} /> }
    ];

    // Carrega opções ao escolher filtro
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
                    const data = await fetchSalas();
                    setOpcoes(data.map(item => ({ value: item.id, label: item.nome })));
                } else if (filtroAtivo === 'professor') {
                    const data = await fetchProfessores();
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

    // Função para buscar horários ao clicar no botão Pesquisar
    const buscarHorarios = async () => {
        if (!selecao) return;

        try {
            let data = [];
            let blocos = [];

            if (filtroAtivo === 'localizacao') {
                data = await fetchHorariosPorLocalidade(selecao.value);
            } else if (filtroAtivo === 'escola') {
                data = await fetchHorariosPorEscola(selecao.value);
            } else if (filtroAtivo === 'curso') {
                data = await fetchHorariosPorCurso(selecao.value);
            } else if (filtroAtivo === 'sala') {
                data = await fetchHorariosPorSala(selecao.value);
                // ⚠️ Sala retorna lista direta de blocos
                blocos = data.map(bloco => ({
                    id: bloco.id,
                    dia: bloco.diaSemana,
                    horaInicio: bloco.horaInicio,
                    horaFim: bloco.horaFim,
                    disciplina: bloco.disciplina,
                    tipoAula: bloco.tipoAula,
                    professores: bloco.professores,
                    sala: bloco.sala,
                    turma: bloco.turmaNome || "", // se vier
                    curso: bloco.cursoNome || "",
                }));
                setHorarios([]); // não usar navegação por semana
                setGradeBlocos(blocos);
                setIndiceHorario(0);
                setSemanaAtual(1);
                return;
            } else if (filtroAtivo === 'professor') {
                data = await fetchHorariosPorProfessor(selecao.value);
                // ⚠️ Professor retorna lista direta de blocos
                blocos = data.map(bloco => ({
                    id: bloco.id,
                    dia: bloco.diaSemana,
                    horaInicio: bloco.horaInicio,
                    horaFim: bloco.horaFim,
                    disciplina: bloco.disciplina,
                    tipoAula: bloco.tipoAula,
                    professores: bloco.professores,
                    sala: bloco.sala,
                    turma: bloco.turmaNome || "", // se vier
                    curso: bloco.cursoNome || "",
                }));
                setHorarios([]); // não usar navegação por semana
                setGradeBlocos(blocos);
                setIndiceHorario(0);
                setSemanaAtual(1);
                return;
            }

            console.log("Horários brutos:", data);
            setHorarios(data);
            setIndiceHorario(0);
            setSemanaAtual(1);

            if (data.length > 0) {
                const blocosMapped = data[0].blocosHorarios.map(bloco => ({
                    id: bloco.id,
                    dia: bloco.diaSemana,
                    horaInicio: bloco.horaInicio,
                    horaFim: bloco.horaFim,
                    disciplina: bloco.disciplina,
                    tipoAula: bloco.tipoAula,
                    professores: bloco.professores,
                    sala: bloco.sala,
                    turma: data[0].turma.nome,
                    curso: data[0].turma.curso?.nome || "",
                }));

                console.log("Blocos mapeados:", blocosMapped);
                setGradeBlocos(blocosMapped);
            } else {
                setGradeBlocos([]);
            }
        } catch (error) {
            console.error("Erro ao buscar horários:", error);
            setHorarios([]);
            setGradeBlocos([]);
        }
    };


    // Avançar ou retroceder entre os horários (se houver vários)
    const handleSemana = (delta) => {
        const novoIndice = indiceHorario + delta;

        if (novoIndice >= 0 && novoIndice < horarios.length) {
            setIndiceHorario(novoIndice);
            setSemanaAtual(novoIndice + 1);

            const horarioSelecionado = horarios[novoIndice];
            const blocos = horarioSelecionado.blocosHorarios.map(bloco => ({
                id: bloco.id,
                dia: bloco.diaSemana,
                horaInicio: bloco.horaInicio,
                horaFim: bloco.horaFim,
                disciplina: bloco.disciplina,
                tipoAula: bloco.tipoAula,
                professores: bloco.professores,
                sala: bloco.sala,
                turma: horarioSelecionado.turma.nome,
            }));

            setGradeBlocos(blocos);
        }
    };

    return (
        <div className="container my-4">
            {/* Barra de ícones */}
            <div className="d-flex justify-content-between flex-wrap gap-3 mb-4">
                {icones.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => {
                            if (filtroAtivo === item.id) {
                                setFiltroAtivo(null);
                                setSelecao(null);
                                setGradeBlocos([]);
                                setHorarios([]);
                                setIndiceHorario(0);
                                setSemanaAtual(1);
                            } else {
                                setFiltroAtivo(item.id);
                                setSelecao(null);
                                setGradeBlocos([]);
                                setHorarios([]);
                                setIndiceHorario(0);
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

            {/* Select + botão pesquisar */}
            {filtroAtivo && (
                <div className="card p-4 shadow-sm mb-4">
                    <h5 className="fw-bold mb-3">Selecionar {filtroAtivo}</h5>
                    <Select
                        options={opcoes}
                        value={selecao}
                        onChange={(opt) => setSelecao(opt)}
                        placeholder={`Selecione um(a) ${filtroAtivo}`}
                    />

                    <button
                        className="btn btn-primary mt-3"
                        onClick={buscarHorarios}
                        disabled={!selecao}
                    >
                        Pesquisar
                    </button>
                </div>
            )}

            {/* Botões de semana */}
            {horarios.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleSemana(-1)}
                        disabled={indiceHorario === 0}
                    >
                        ← Anterior
                    </button>

                    <h6 className="fw-bold mb-0">Horário Nº {semanaAtual}</h6>

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleSemana(1)}
                        disabled={indiceHorario === horarios.length - 1}
                    >
                        Próximo →
                    </button>
                </div>
            )}

            {/* Grade horária */}
            <GradeHorarioV2 blocos={gradeBlocos} />
        </div>
    );
}

export default HomePage;
