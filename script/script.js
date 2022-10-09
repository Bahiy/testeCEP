function consultaEndereco() {
    let cep = document.querySelector('#cep').value;

    if (cep.length != 8) {
        alert("CEP inválido!");
        return;
    }


    let url = `https://viacep.com.br/ws/${cep}/json/`

    fetch(url).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            mostraResultado(data)
        })
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
                            <center>`
}