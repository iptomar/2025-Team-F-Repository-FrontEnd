document.getElementById("loginBtn").addEventListener("click", function () {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  if (user === "ipt" && pass === "1234") {
    // Login com sucesso → redireciona
    window.location.href = "home.html";
  } else {
    // Credenciais erradas
    errorMsg.innerText = "Credenciais inválidas. Tente novamente.";
  }
});
