import React from "react";

function TipoHorario({ schedule, setSchedule }) {
  return (
    <div className="card p-4 shadow-sm border mb-4">
      <h5 className="mb-3">Tipo de Horário</h5>
      <div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="scheduleType"
            id="modular"
            value="modular"
            checked={schedule === "modular"}
            //onChange={() => setSchedule("modular")}
          />
          <label className="form-check-label" htmlFor="modular">
            Horário Modular
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="scheduleType"
            id="semestral"
            value="semestral"
            checked={schedule === "semestral"}
            //onChange={() => setSchedule("semestral")}
          />
          <label className="form-check-label" htmlFor="semestral">
            Horário Semestral
          </label>
        </div>
      </div>
    </div>
  );
}

export default TipoHorario;