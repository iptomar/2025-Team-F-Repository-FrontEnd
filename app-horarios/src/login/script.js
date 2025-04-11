function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");
  
    // Credenciais fixas (exemplo)
    if (user === "ipt" && pass === "1234") {
      alert("Login com sucesso!");
      errorMsg.innerText = "";
    } else {
      errorMsg.innerText = "Credenciais inválidas. Tente novamente.";
    }
  }
  