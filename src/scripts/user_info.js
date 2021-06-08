$(document).ready(function () {
    console.log("ready !");
    $(".search").bind("click", getCepAndFillValues);
});

function clearCep() {
    $(".input_data_user_cep").val("");
}

function getCepAndFillValues() {
    //Nova variável "cep" somente com dígitos.
    var cep = $(".input_data_user_cep").val().replace(/\D/g, '');


    //Verifica se campo cep possui valor informado.
    if (cep !== "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            $('.input_data_user_strt').val("...");
            $('.input_data_user_dtrct').val("...");
            $('.input_data_user_city').val("...");
            $('.input_data_user_state').val("...");

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/' + cep + '/json/?callback=onAdressReturned';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            clearCep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        clearCep();
    }
}

function onAdressReturned(adress) {
    if (!("erro" in adress)) {
        //Atualiza os campos com os valores.
        $(".input_data_user_strt").val(adress.logradouro);
        $(".input_data_user_dtrct").val(adress.bairro);
        $(".input_data_user_city").val(adress.localidade);
        $(".input_data_user_state").val(adress.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        clearCep();
        alert("CEP não encontrado.");
        document.getElementById('cep').value = ("");
    }
}


//Créditos totais ao Professor Rommel Carneiro.
const LOGIN_URL = "src/html/login.html";

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = {};

// Objeto para o usuário corrente
var usuarioCorrente = {};

// função para gerar códigos randômicos a serem utilizados como código de usuário
// Fonte: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


// Dados de usuários para serem utilizados como carga inicial
const dadosIniciais = {
    usuarios: [
        { "id": generateUUID(), "login": "admin", "senha": "TIAW1234", "nome": "Victor Colen", "email": "admin@TIAW.com", "bairro": "tristeza", "rua": "felicidade" },
        { "id": generateUUID(), "login": "aaaa", "senha": "123", "nome": "Usuario Comum", "email": "user@abc.com", "bairro": "depressão", "rua": "alegria" },
    ]
};


// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
function initLoginApp() {
    // PARTE 1 - INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
    }

    // PARTE 2 - INICIALIZA BANCO DE DADOS DE USUÁRIOS
    // Obtem a string JSON com os dados de usuários a partir do localStorage
    var usuariosJSON = localStorage.getItem('db_usuarios');

    // Verifica se existem dados já armazenados no localStorage
    if (!usuariosJSON) {  // Se NÃO há dados no localStorage

        // Copia os dados iniciais para o banco de dados
        db_usuarios = dadosIniciais;

        // Salva os dados iniciais no local Storage convertendo-os para string antes
        localStorage.setItem('db_usuarios', JSON.stringify(dadosIniciais));
    }
    else {  // Se há dados no localStorage

        // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
        db_usuarios = JSON.parse(usuariosJSON);
    }
};


// Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial
function loginUser(login, senha) {

    // Verifica todos os itens do banco de dados de usuarios
    // para localizar o usuário informado no formulario de login
    for (var i = 0; i < db_usuarios.usuarios.length; i++) {
        var usuario = db_usuarios.usuarios[i];

        // Se encontrou login, carrega usuário corrente e salva no Session Storage
        if (login == usuario.login && senha == usuario.senha) {
            usuarioCorrente.id = usuario.id;
            usuarioCorrente.login = usuario.login;
            usuarioCorrente.email = usuario.email;
            usuarioCorrente.nome = usuario.nome;
            usuarioCorrente.bairro = usuario.bairro;
            usuarioCorrente.rua = usuario.rua;
            usuarioCorrente.cep = usuario.cep;

            // Salva os dados do usuário corrente no Session Storage, mas antes converte para string
            sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));

            // Retorna true para usuário encontrado
            return true;
        }
    }

    // Se chegou até aqui é por que não encontrou o usuário e retorna falso
    return false;
}

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser() {
    usuarioCorrente = {};
    sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
    window.location = LOGIN_URL;
}

function addUser(nome, login, bairro, rua, email, senha) {

    // Cria um objeto de usuario para o novo usuario
    let newId = generateUUID();
    let usuario = { "id": newId, "Nome": login, "Sobrenome": nome,  "email": email, "Cidade": senha, "bairro": bairro, "CEP": rua };

    // Inclui o novo usuario no banco de dados baseado em JSON
    db_usuarios.usuarios.push(usuario);

    // Salva o novo banco de dados com o novo usuário no localStorage
    localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));
}

function setUserPass() {

}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp();

$(".nome").val(usuarioCorrente.nome);
function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);

            console.log("File buffer" + reader.result);
            localStorage.setItem("profilePic", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}