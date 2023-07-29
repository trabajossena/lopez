// const API_URL = 'http://localhost:8000';
const API_URL = 'https://api.zipaquiraturistica.com';

function handleFetchErrors(response, callback) {
	if (response.status == '401') {
		eval(callback);

		throw Error(response.statusText);
	}
	return response;
}
/****************************************************
 * GOOGLE SIGN-IN FUNCTIONS
 ****************************************************
 */
function onGSuccess(googleUser) {
	console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
	console.log('ID: ' + googleUser.getBasicProfile().getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + googleUser.getBasicProfile().getName());
	console.log('Image URL: ' + googleUser.getBasicProfile().getImageUrl());
	console.log('Email: ' + googleUser.getBasicProfile().getEmail()); // This is null if the 'email' scope is not present.
}

function onGFailure(error) {
	Swal.fire({
		icon: "error",
		title: "Oops...",
		text: "Problema al iniciar con google"
	});
}

function renderGSignBtn() {
	gapi.signin2.render('my-signin2', {
		'scope': 'profile email',
		'width': 250,
		'height': 50,
		'longtitle': false,
		'theme': 'light',
		'onsuccess': onGSuccess,
		'onfailure': onGFailure
	});
}


/****************************************************
 * FACEBOOK SIGN-IN FUNCTIONS
 ****************************************************
 */

/**
 * these twice functions allow customForm functionality 
 */

customFormFunc();

function customFormFunc() {
	$(".form-input-container .jff-custom-input").each(function (index) {
		verifyInputValue($(this));
		$(this).on({
			focus: function () {
				$(this).siblings("label").addClass("on-focus");
			},
			focusout: function () {
				verifyInputValue($(this));
			},
		});
	});
}

function verifyInputValue(input) {
	if ($(input).val() != "") {
		$(input).siblings("label").addClass("on-focus");
	} else {
		$(input).siblings("label").removeClass("on-focus");
	}
}

/**
 * @param nombreVariableGet
 * @return valor / null (si no existe)
 */

const getUrlSearch = key => {
	key = key.replace(/[\[]/, '\\[');
	key = key.replace(/[\]]/, '\\]');
	let pattern = "[\\?&]" + key + "=([^&#]*)";
	let regex = new RegExp(pattern);
	let url = unescape(window.location.href);
	let results = regex.exec(url);
	if (results === null) {
		return null;
	} else {
		return results[1];
	}
}

/**
 * Permite ingresar solo números
 */
function soloNumeros(e) {
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla == 8) return true;
	patron = /^[0-9]*$/;

	te = String.fromCharCode(tecla);
	return patron.test(te);
}

/**
 * Permite ingresar solo letras
 */
function soloLetras(e) {
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla == 8) return true;
	patron = /^([A-Za-zÑñáéíóúÁÉÍÓÚ ]+)$/;

	te = String.fromCharCode(tecla);
	return patron.test(te);
}

/**
 * Permite ingresar solo usuario
 */
function soloUsuario(e) {
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla == 8) return true;
	patron = /^([A-Za-zÑñáéíóúÁÉÍÓÚ0-9]+)$/;

	te = String.fromCharCode(tecla);
	return patron.test(te);
}

/**
 * Permite ingresar solo NIT
 */
function soloNit(e) {
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla == 8) return true;
	patron = /^([0-9-]+)$/;

	te = String.fromCharCode(tecla);
	return patron.test(te);
}

/**
 * Permite ingresar correos
 */
function soloEmail(e) {
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla == 8) return true;
	patron = /^([0-9A-Za-zÑñáéíóúÁÉÍÓÚ.@-_]+)$/;

	te = String.fromCharCode(tecla);
	return patron.test(te);
}

/**
 * Permite ingresar solo letras y números
 */
function soloLetrasNumeros(e) {
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla == 8) return true;
	patron = /^([0-9A-Za-zÑñáéíóúÁÉÍÓÚ,. ]+)$/;

	te = String.fromCharCode(tecla);
	return patron.test(te);
}

/**
 * Permite ingresar nombres de productos
 */
function soloNombresProductos(e) {
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla == 8) return true;
	patron = /^([0-9A-Za-zÑñáéíóúÁÉÍÓÚ,.\(\)\/ ]+)$/;

	te = String.fromCharCode(tecla);
	return patron.test(te);
}

/**
 * Permite ingresar solo contraseñas
 */
function soloPass(e) {
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla == 8) return true;
	patron = /^([0-9A-Za-zÑñáéíóúÁÉÍÓÚ@-_;.]+)$/;

	te = String.fromCharCode(tecla);
	return patron.test(te);
}

/**
 * Permite ingresar solo fechas
 */
function soloFecha(e) {
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla == 8) return true;
	patron = /^([0-9/]+)$/;

	te = String.fromCharCode(tecla);
	return patron.test(te);
}

/**
 * Permite solo direccion
 */
function soloDireccion(e) {
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla == 8) return true;
	patron = /^([0-9A-Za-zÑñáéíóúÁÉÍÓÚ#-. ]+)$/;

	te = String.fromCharCode(tecla);
	return patron.test(te);
}

/**
 * Permite solo pagina web
 */
function soloDireccionWeb(e) {
	tecla = (document.all) ? e.keyCode : e.which;
	if (tecla == 8) return true;
	patron = /^([0-9A-Za-z-./:]+)$/;

	te = String.fromCharCode(tecla);
	return patron.test(te);
}

/**
 * Permite validar un campo select
 */
function validarSelect(texto, identificador) {

	if (texto != '') {
		$(identificador).val(texto);
	}
}

/**
 * Permite validar correo electrónico
 */
function validarEmail(txtMail) {
	var patron = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

	return patron.test(txtMail);
}

/**
 * Permite que solo se ingrese un maximo de caracteres en el input
 */
function validaMaximo(elemento, numMax) {
	var numTxt = elemento.val().length; // Número de caracteres actuales en el input
	var numero_maximo = numMax - 1;

	if (numTxt > numero_maximo) {
		return false;
	} else {
		return true;
	}
}

function validaMayorDeEdad(userBirthDate) {
	const thisYear = new Date().getFullYear();
	const eighteenYearsAgo = thisYear - 18;
	let userYear = new Date(userBirthDate).getFullYear();

	if (userYear > eighteenYearsAgo) {
		return false;
	}
	return true;
}

/**
 * Genera una notificacion
 * Param @id String -> Id del elemento sobre el que se va ubicar
 * Param @text String -> Texto que se desea mostrar
 * Param @arg_focus String -> elemento al que se le debe dar el foco
 * Param @position String ["y x"] {"bottom center"}
 * Param @classColor String {success/error/info/warn}
 */
function notificacion(arg_id, arg_text, arg_focus, arg_position, arg_classColor, arg_segundos) {

	if (arg_focus != "") {
		$(arg_id).focus();
	}

	if (arg_segundos == undefined) {
		arg_segundos = 1800;

	}

	$(arg_id).notify(arg_text, {
		position: arg_position,
		className: arg_classColor,
		autoHideDelay: arg_segundos
	});
}

function closeSession() {
	fetch('/controller/CloseSession.php', {
		method: 'POST',
		mode: 'same-origin',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'default',
		body: JSON.stringify({
			apiToken: user['api_token'],
		})
	})
		.then(response => response.json())
		.then(data => {
			localStorage.clear();
			user = undefined;
			eval(data["action"]);
		})
		.catch(error => console.log(error));
}


$('#btn-logout').click(function (e) {
	e.preventDefault();


	fetch(`${API_URL}/users/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'default',
		body: JSON.stringify({
			api_token: user["api_token"],
		})
	})
		.then(response => response.json())
		.then(data => {
			closeSession();
		})
		.catch(error => console.log(error));
});

let normalize = (function () {
	let from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
		to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
		mapping = {};

	for (let i = 0, j = from.length; i < j; i++)
		mapping[from.charAt(i)] = to.charAt(i);

	return function (str) {
		let ret = [];
		for (let i = 0, j = str.length; i < j; i++) {
			let c = str.charAt(i);
			if (mapping.hasOwnProperty(str.charAt(i)))
				ret.push(mapping[c]);
			else
				ret.push(c);
		}
		return ret.join('').replace(/[^-A-Za-z0-9]+/g, '-').toLowerCase();
	}
})();

// $('select').formSelect();
// $('.dropdown-user').dropdown();
// $('.tooltipped').tooltip();


let urlPathname = window.location.pathname.replace("index.php", "").split("/");

urlPathname.splice(0, 1);

let link_to_active = urlPathname[1];
let link_to_active_sub = urlPathname[1];

$(".item-menu.active").removeClass("active");
$('.item-menu[data-link="' + link_to_active + '"]').addClass("active");


$('.cortina-popup').click(function () {
	$('.popup').removeClass("active");
});

$('.btn-cerrar-popup').click(function () {
	event.preventDefault();
	$('.popup').removeClass("active");
});
