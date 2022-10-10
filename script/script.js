function consultaEndereco() {
    let valorCep = document.querySelector('#cep').value;
    let cep = valorCep.replace(/\D/g, '');
    if (cep.length != 8) {
        alert("CEP inválido!");
        return;
    }
    let url = `https://viacep.com.br/ws/${cep}/json/`
    fetch(url).then((response) => {
        response.json().then(function (data) {
            console.log(data);
            mostraResultado(data)
        })
    }).catch((err) => {
        console.log("Erro")
    })
}
function mostraResultado(dados) {
    let resultado = document.querySelector("#resultado");
    if (resultado)
        resultado.innerHTML = `<center>
                            <p>Cidade: ${dados.localidade} - ${dados.uf}<p>
                            <p>Bairro: ${dados.bairro}
                            <p>Endereço: ${dados.logradouro}<p>
                            <p>Complemento: ${dados.complemento}<p>
                            <p>DD: ${dados.ddd}<p>
                            <center>`
}

function limpaDados() {
    let limpaDivResultado = `
    <p>Seu resultado Aqui: </p>
    `;
    document.querySelector("#resultado").innerHTML = limpaDivResultado;
}

const cepMask = () => {
    let cep = document.querySelector('#cep').value;
    if (cep.length < 5) {
    } else {
        document.getElementById('cep').value = cep.substring(0, 5)
            + "-"
            + cep.substring(6);
    }
}

