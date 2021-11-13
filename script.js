"use strict"

var cores = [
  "Green",
  "Aqua",
  "AquaMarine",
  "Cyan",
  "CadetBlue",
  "Chartreuse",
  "Dark<wbr/>Cyan",
  "DarkGreen",
  "Dark<wbr/>Khaki",
  "Dark<wbr/>OliveGreen",
  "Dark<wbr/>SeaGreen",
  "Dark<wbr/>SlateGray",
  "Dark<wbr/>Turquoise",
  "ForestGreen",
  "Green<wbr/>Yellow",
  "LawnGreen",
  "lightGreen",
  "Light<wbr/>SeaGreen",
  "Lime",
  "LimeGreen",
  "Medium<wbr/>Spring<wbr/>Green",
  "Medium<wbr/>Turquoise",
  "Olive",
  "OliveDrab",
  "PaleGreen",
  "SeaGreen",
  "Spring<wbr/>Green",
  "Teal",
  "Turquoise",
  "Yellow<wbr/>Green"
  ]
const cards = document.querySelectorAll("#cards div")
const cardcor = document.querySelector("#cardcor")
const shadows= [1]
var pontos = 0
var vidas = 3
var cardCerta
var removed = []

function aleat(max) {
	//random from 0 to max
	return Math.floor(Math.random() * max)
}

function sortCor() {
	
	for(let i = 0; i < 3; i++) {
		cards[i].classList.remove("certo")
		cards[i].classList.remove("errado")
		removed[i] = cores.splice(aleat(cores.length),1)[0]
		cards[i].innerHTML = "<p>"+removed[i]+"</p>"
	//	cards[i].style.backgroundColor = removed[i].replace("</wbr>", "")
	}
	
	cardCerta = aleat(3)
	cardcor.style.backgroundColor = removed[cardCerta].replace("<wbr/>", "")
	
	for(let i = 0; i < 3; i++) {
		cores.push(removed[i])
	}
	
	loadShadow()
}
function test(n) {
	var err = cards[n].classList.contains("errado")
	if(err) return
	
	if(n == cardCerta) {
		cards[n].classList.add("certo")
		pontos++
		setTimeout(sortCor, 1000)
		document.querySelector("#pontuacao p").innerText = pontos
	}else {
		cards[n].classList.add("errado")
		vidas--
		if(vidas < 0) loose()
	}
}
function loadShadow() {
	var string = ""
	for(var c = pontos; c > 0; c -= 10) {
		console.clear()
		string += "0 0 "
		string += c*3 + "px "
		string += cardcor.style.backgroundColor
		if(c >= 10) string += ", "
			console.log(string)
	}
	cardcor.style.boxShadow = string
}
function loose() {
	vidas = 3
	alert("Fim de jogo.\nPontuacao: "+pontos)
	pontos = 0
	document.querySelector("#pontuacao p").innerText = pontos
	sortCor()
}

function init() {
	sortCor()
}

cards[0].addEventListener("click", function() {test(0)})
cards[1].addEventListener("click", function() {test(1)})
cards[2].addEventListener("click", function() {test(2)})
window.addEventListener("load", init)