document.addEventListener("DOMContentLoaded", () => {
	const cepInput = document.querySelector("#cep");
	const resultado = document.querySelector("#resultado");
	const limpaBtn = document.querySelector("#limpar");
	const buscarBtn = document.querySelector("#buscar");

	cepInput.addEventListener("input", cepMask);
	buscarBtn.addEventListener("click", consultaEndereco);
	limpaBtn.addEventListener("click", limpaDados);
});

async function consultaEndereco() {
	const valorCep = document.querySelector("#cep").value;
	const cep = valorCep.replace(/\D/g, "");

	if (cep.length !== 8) {
		alert("CEP inválido!");
		return;
	}

	const url = `https://viacep.com.br/ws/${cep}/json/`;

	try {
		const response = await fetch(url);

		const data = await response.json();
		mostraResultado(data);
		document.querySelector("#cep").value = "";
	} catch (error) {
		console.error("Erro:", error);
		alert("Erro ao buscar dados do CEP. Tente novamente.");
	}
}

function mostraResultado(dados) {
	const resultado = document.querySelector("#resultado");
	if (dados.erro) {
		resultado.innerHTML = "<center>CEP não encontrado.</center>";
	} else {
		resultado.innerHTML = `
			<center>
				<p>Cidade: ${dados.localidade} - ${dados.uf}</p>
				<p>Bairro: ${dados.bairro}</p>
				<p>Endereço: ${dados.logradouro}</p>
				<p>Complemento: ${dados.complemento}</p>
				<p>DDD: ${dados.ddd}</p>
			</center>`;
	}
}

function limpaDados() {
	const resultado = document.querySelector("#resultado");
	resultado.innerHTML = "<p>Seu resultado aqui:</p>";
	document.querySelector("#cep").value = "";
}

function cepMask() {
	const cepInput = document.querySelector("#cep");
	let cep = cepInput.value.replace(/\D/g, "");
	if (cep.length > 5) {
		cepInput.value = cep.substring(0, 5) + "-" + cep.substring(5, 8);
	} else {
		cepInput.value = cep;
	}
}
