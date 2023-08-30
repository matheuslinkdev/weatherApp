const apiKey = "4db257998d46b9769c5706ab42f4b4e5"
const searchBtn = document.getElementById("buscarCidade")

async function buscarCidade(city){
    try {
      const dados = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`
      ).then((response) => response.json());

      if (dados.cod === "404") {
        throw new Error("City not found");
      }
      renderData(dados);
    } catch (error) {
      handleError(error.message);
    }
}

function buttonClick(){
    const cityInput = document.querySelector("#inputCidade").value;
    buscarCidade(cityInput)
}

function handleError(errorMessage) {
  document.querySelector("#nomeCidade").innerHTML = "Erro: " + errorMessage;
  document.querySelector(".temperatura").innerHTML = "";
  document.querySelector(".textoCondicao").innerHTML = "";
  document.querySelector(".humidade-do-ar").innerHTML = "";
  document.querySelector(".imagem-da-condicao").src = "";
  document.querySelector(".velocidade-do-vento").innerHTML = "";
}

function renderData(dados){
 document.querySelector("#nomeCidade").innerHTML = "Weather at " + dados.name + ", " + dados.sys.country;
 document.querySelector(".temperatura").innerHTML = Math.floor(dados.main.temp) + "°C";
 document.querySelector(".textoCondicao").innerHTML = dados.weather[0].description;
 document.querySelector(".humidade-do-ar").innerHTML = "Air humidity: " + dados.main.humidity + "%";
 document.querySelector(".imagem-da-condicao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
 document.querySelector(".velocidade-do-vento").innerHTML = "Wind: " + Math.floor(dados.wind.speed) + "Km/h"
}
