import React from "react";
import BlocosComponent from "./Blocos"; // ou "../Blocos" se estiver fora da pasta Components

function Blocos() {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Blocos Drag & Drop</h2>
      <BlocosComponent />
    </div>
  );
}

export default Blocos;
