function BotaoGuardar({ isBlocked }) {
  const handleSave = () => {
    if (isBlocked) return;
      const data = localStorage.getItem("gradeBlocos");
      const blocos = data ? JSON.parse(data) : [];

      // Save under "turmas"
      blocos.push({
        type: "turma",
        data: JSON.parse(localStorage.getItem("gradeBlocosTemp") || "[]"),
      });

      localStorage.setItem("gradeBlocos", JSON.stringify(blocos));
      alert("Horário salvo!");
  };

  return (
    <div className="col-1 mt-3 pb-3">
      <button className="btn btn-lg btn-primary" onClick={handleSave} disabled={isBlocked}>
        Guardar
      </button>
    </div>
  );
}

export default BotaoGuardar;