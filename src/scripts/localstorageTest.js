$(document).ready(function () {

    OnShowLogin();
    var _data = new data();
    console.log(loadedData.getData());

    //login elements
    let inputUser = $(".input_user");
    let inputPass = $(".input_pass");
    let loginButton = $(".login");
    let registerButton = $(".register");

    registerButton.click(function () {

        OnShowRegister();

        let register_button = $(".back_login");
        register_button.unbind("click", onRegister);
        register_button.bind("click", onRegister);
    });
});

function onRegister() {

    let register_user = $(".create_input_user");
    let register_email = $(".create_input_email");
    let register_pass = $(".create_input_pass");
    let register_confirmpass = $(".create_confirm_input_pass");
    var emptyvalues = [];

    if (register_user.val() == "") { emptyvalues.push(register_user); }
    if (register_email.val() == "") { emptyvalues.push(register_email); }
    if (register_pass.val() == "") { emptyvalues.push(register_pass); }
    if (register_confirmpass.val() == "") { emptyvalues.push(register_confirmpass); }

    if (!register_email.val().includes("@") || !register_email.val().includes("mail") || !register_email.val().includes(".com")) {
        alert("insira um email válido");
        return;
    }

    if (emptyvalues.length > 0) {
        alert("Preencha todos os campos !");
        return;
    }

    if (register_pass.val() != register_confirmpass.val()) {
        alert("Senhas não batem, certifique-se que digitou corretamente no segundo campo");
    }

    CreateUser(register_user.val(), register_pass.val(), register_email.val());
    OnShowLogin();
    alert("Cadastro realizado com sucesso !");

    console.log(emptyvalues.length);
}

function OnShowRegister() {

    $(".forms_login").css("display", "none");
    $(".forms_register").css("display", "block");
}

function OnShowLogin() {

    $(".forms_login").css("display", "block");
    $(".forms_register").css("display", "none");
}

function CreateUser(username, password, email) {
    // JSON.stringify
    var newUser = new user(username, email, password);
    var db = new data();
    loadedData.registerUser(newUser);
}