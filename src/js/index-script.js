let mediaqueryList = window.matchMedia("(min-width: 992px)");

/*if (mediaqueryList.matches) {
	$('#image-banner').attr('src', '/src/img/commons/banner.jpg');
} else {
	$('#image-banner').attr('src', '/src/img/commons/banner-responsive.jpg');
}*/

$(document).ready(function () {
	var urlParams = new URLSearchParams(window.location.search);
	var id = urlParams.get('id');
	if (id) {
		$('#popup-inicial').removeClass("active");
		$('#popup-transaccion').addClass("active");
	}
});



function round(value, precision) {
	const multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
}

function getCosts() {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `https://zipaquiraturistica.com/catedral-backend/controlador/csendcost.php`,
			method: "GET",
			dataType: "JSON",
			cache: false

		}).done(function (sResponse) {
			if (sResponse['response'] === "ok") {
				//console.log(sResponse);
				resolve(sResponse)

			} else {
				reject("Error al solicitar los costos: ", sResponse)
			}

		}).fail(function (jqXHR, textStatus) {
			if (jqXHR.status === 0) {
				console.log('Not connect: Verify Network.');

			} else if (jqXHR.status == 404) {
				console.log('Requested page not found [404]');

			} else if (jqXHR.status == 500) {
				console.log('Internal Server Error [500].');

			} else if (textStatus === 'parsererror') {
				console.log('Requested JSON parse failed.');

			} else if (textStatus === 'timeout') {
				console.log('Time out error.');

			} else if (textStatus === 'abort') {
				console.log('Ajax request aborted.');

			} else {
				console.log('Uncaught Error: ' + jqXHR.responseText);
			}

			reject(jqXHR.responseText)
		});
	})
}


function calculateTotalCost(
	totalCostAdultosNacional,
	totalCostNinhosNacional,
	totalCostAdultosMayoresNacional,
	totalCostDiscapacitadosNacional,
	totalCostAdultosExtranjero,
	totalCostNinhosExtranjero,
	totalCostAdultosMayoresExtranjero,
	totalCostDiscapacitadosExtranjero,
) {
	let total = totalCostAdultosNacional
		+ totalCostNinhosNacional
		+ totalCostAdultosMayoresNacional
		+ totalCostDiscapacitadosNacional
		+ totalCostAdultosExtranjero
		+ totalCostNinhosExtranjero
		+ totalCostAdultosMayoresExtranjero
		+ totalCostDiscapacitadosExtranjero



	return total = parseFloat(round(total, 2).toFixed(2))
}

function calculateCost(personCategoryCount, personCategoryCost) {
	return (parseInt(personCategoryCount) * parseFloat(personCategoryCost))
}

// * Interface rendering functions
function renderFinalPeopleCuantity(
	cantAdultosNacional,
	cantNinhosNacional,
	cantAdultosMayoresNacional,
	cantDiscapacitadosNacional,
	cantAdultosExtranjero,
	cantNinhosExtranjero,
	cantAdultosMayoresExtranjero,
	cantDiscapacitadosExtranjero
) {
	$('#final-visitante-nacional-adultos, #visitante-nacional-adultos').val(cantAdultosNacional)
	$('#final-visitante-nacional-ninhos, #visitante-nacional-ninhos').val(cantNinhosNacional)
	$('#final-visitante-nacional-adultos-mayores, #visitante-nacional-adultos-mayores').val(cantAdultosMayoresNacional)
	$('#final-visitante-nacional-discapacitados, #visitante-nacional-discapacitados').val(cantDiscapacitadosNacional)
	$('#final-visitante-extranjero-adultos, #visitante-extranjero-adultos').val(cantAdultosExtranjero)
	$('#final-visitante-extranjero-ninhos, #visitante-extranjero-ninhos').val(cantNinhosExtranjero)
	$('#final-visitante-extranjero-adultos-mayores, #visitante-extranjero-adultos-mayores').val(cantAdultosMayoresExtranjero)
	$('#final-visitante-extranjero-discapacitados, #visitante-extranjero-discapacitados').val(cantDiscapacitadosExtranjero)
}

function renderCostsPerPeopleCategory(
	totalCostAdultosNacional,
	totalCostNinhosNacional,
	totalCostAdultosMayoresNacional,
	totalCostDiscapacitadosNacional,
	totalCostAdultosExtranjero,
	totalCostNinhosExtranjero,
	totalCostAdultosMayoresExtranjero,
	totalCostDiscapacitadosExtranjero,
) {
	$('#nacional-adultos-totalcost').text(`$ ${totalCostAdultosNacional.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`)
	$('#nacional-ninhos-totalcost').text(`$ ${totalCostNinhosNacional.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`)
	$('#nacional-adultos-mayores-totalcost').text(`$ ${totalCostAdultosMayoresNacional.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`)
	$('#nacional-discapacitados-totalcost').text(`$ ${totalCostDiscapacitadosNacional.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`)
	$('#extranjero-adultos-totalcost').text(`$ ${totalCostAdultosExtranjero.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`)
	$('#extranjero-ninhos-totalcost').text(`$ ${totalCostNinhosExtranjero.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`)
	$('#extranjero-adultos-mayores-totalcost').text(`$ ${totalCostAdultosMayoresExtranjero.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`)
	$('#extranjero-discapacitados-totalcost').text(`$ ${totalCostDiscapacitadosExtranjero.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`)
}

function getTiketsByCategory(category) {
	$.ajax({
		url: 'https://zipaquiraturistica.com/catedral-backend/controlador/cticket.php',
		data: {
			request: "getTicketsAvailablesByProduct",
			shortName: category
		},
		type: 'POST',
		dataType: 'JSON',
		cache: false,
		beforeSend: function (xhr) { }
	}).done(function (data) {

		if (data.response == "ok") {
			console.log(data);
		}

	}).fail(function (jqXHR, textStatus) {
		if (jqXHR.status === 0) {
			console.log('Not connect: Verify Network.');

		} else if (jqXHR.status == 404) {
			console.log('Requested page not found [404]');

		} else if (jqXHR.status == 500) {
			console.log('Internal Server Error [500].');

		} else if (textStatus === 'parsererror') {
			console.log('Requested JSON parse failed.');

		} else if (textStatus === 'timeout') {
			console.log('Time out error.');

		} else if (textStatus === 'abort') {
			console.log('Ajax request aborted.');

		} else {
			console.log('Uncaught Error: ' + jqXHR.responseText);
		};
	}).always(function () {
	});
}

function sendPurchaseInfoPayu() {

	let cedula = $("#cedula").val();
	let nombre = $("#nombre").val();
	let apellidos = $("#apellidos").val();
	let indicativo = $("#indicativo").val();
	let celular = $("#celular").val();
	let email = $("#email").val();
	let validate_email = $("#validar-email").val();

	if (cedula == "") {
		notificacion("#cedula", "Ingresa tu número de documento", "#cedula", "bottom center", "error");

	} else if (nombre == "") {
		notificacion("#nombre", "Ingresa tus nombres", "#nombre", "bottom center", "error");

	} else if (apellidos == "") {
		notificacion("#apellidos", "Ingresa tus apellidos", "#apellidos", "bottom center", "error");

	} else if (celular == "") {
		notificacion("#celular", "Ingresa tu número celular", "#celular", "bottom center", "error");

	} else if (email == "") {
		notificacion("#email", "Ingresa el correo electrónico", "#email", "bottom center", "error");

	} else if (!validarEmail(email)) {
		notificacion("#email", "Ingresa un correo electrónico valido", "#email", "bottom center", "error");

	} else if (validate_email == "") {
		notificacion("#validar-email", "Ingresa nuevamente el correo electrónico", "#validar-email", "bottom center", "error");

	} else if (email != validate_email) {
		notificacion("#validar-email", "Los correos electrónicos no coinciden", "#validar-email", "bottom center", "error");

	} else {
		$.ajax({
			url: 'https://zipaquiraturistica.com/catedral-backend/controlador/cpagoform.php',
			data: {
				request: "processPay",
				identificacionUsuario: $("#cedula").val(),
				nombresUsuario: $("#nombre").val(),
				apellidosUsuario: $("#apellidos").val(),
				emailUsuario: $("#email").val(),
				total: total,
				cantidadNacionalAdulto: $("#visitante-nacional-adultos").val(),
				cantidadNacionalNino: $("#visitante-nacional-ninhos").val(),
				cantidadNacionalAdultoMayor: $("#visitante-nacional-adultos-mayores").val(),
				cantidadNacionalDiscapacitado: $("#visitante-nacional-discapacitados").val(),
				cantidadExtAdulto: $("#visitante-extranjero-adultos").val(),
				cantidadExtNino: $("#visitante-extranjero-ninhos").val(),
				cantidadExtAdultoMayor: $("#visitante-extranjero-adultos-mayores").val(),
				cantidadExtDiscapacitado: $("#visitante-extranjero-discapacitados").val(),
				porcentajeServicioOnline: 0,
				fechaVisita: $("#fecha-de-visita").val(),
				indicativo: indicativo,
				celular: celular
			},
			type: 'POST',
			dataType: 'JSON',
			cache: false,
			beforeSend: function (xhr) { }
		}).done(function (data) {

			console.log(data);

			if (data.response == "ok") {
				//console.log(data);
				$("#accountId").val(data.accountId);
				$("#apiKey").val(data.apiKey);
				$("#currency").val(data.currency);
				$("#buyerEmail").val(data.buyerEmail);
				$("#mobilePhone").val(data.mobilePhone);
				$("#payerDocument").val(data.payerDocument);
				$("#merchantId").val(data.merchantId);
				$("#description").val(data.description);
				$("#amount").val(data.amount);
				$("#payerFullName").val(data.payerFullName);
				$("#referenceCode").val(data.referenceCode);
				$("#signature").val(data.signature);
				$("#confirmationUrl").val(data.confirmationUrl);
				$("#responseUrl").val(data.responseUrl);

				//$("#form-sent-purchase").submit();
			} else {
				console.log("Error in response data");
				//console.log(data.response);
			}


		}).fail(function (jqXHR, textStatus) {
			if (jqXHR.status === 0) {
				console.log('Not connect: Verify Network.');

			} else if (jqXHR.status == 404) {
				console.log('Requested page not found [404]');

			} else if (jqXHR.status == 500) {
				console.log('Internal Server Error [500].');

			} else if (textStatus === 'parsererror') {
				console.log('Requested JSON parse failed.');

			} else if (textStatus === 'timeout') {
				console.log('Time out error.');

			} else if (textStatus === 'abort') {
				console.log('Ajax request aborted.');

			} else {
				console.log('Uncaught Error: ' + jqXHR.responseText);
			};
		}).always(function () {
		});
	}
}

function getWompiData() {

	let cedula = $("#cedula").val();

	if (cedula == "") {
		notificacion("#cedula", "Ingresa tu número de documento", "#cedula", "bottom center", "error");

	} else {
		$.ajax({
			url: 'https://zipaquiraturistica.com/catedral-backend/controlador/cpagoform.php',
			data: {
				request: "getWompiData",
				identificacionUsuario: $("#cedula").val(),
				total: total,
				cantidadNacionalAdulto: $("#visitante-nacional-adultos").val(),
				cantidadNacionalNino: $("#visitante-nacional-ninhos").val(),
				cantidadNacionalAdultoMayor: $("#visitante-nacional-adultos-mayores").val(),
				cantidadNacionalDiscapacitado: $("#visitante-nacional-discapacitados").val(),
				cantidadExtAdulto: $("#visitante-extranjero-adultos").val(),
				cantidadExtNino: $("#visitante-extranjero-ninhos").val(),
				cantidadExtAdultoMayor: $("#visitante-extranjero-adultos-mayores").val(),
				cantidadExtDiscapacitado: $("#visitante-extranjero-discapacitados").val(),
				porcentajeServicioOnline: 0,
				fechaVisita: $("#fecha-de-visita").val()
			},
			type: 'POST',
			dataType: 'JSON',
			cache: false,
			beforeSend: function (xhr) { }
		}).done(function (data) {
			if (data.response == "ok") {
				//console.log(data);
				var checkout = new WidgetCheckout({
					currency: data.currency,
					amountInCents: data.amountInCents,
					reference: data.reference,
					publicKey: data.publicKey,
					redirectUrl: "https://zipaquiraturistica.com/"
				});

				checkout.open(function (result) {
					//var transaction = result.transaction
					//console.log(transaction)
					//updateTransactionResponseWompi(transaction);
					$('#popup-transaccion').addClass("active");
					setTimeout(function () { resetForm(); }, 3000);
				});

			} else {
				Swal.fire({
					position: 'center',
					icon: "error",
					title: "Ups...",
					text: "La transacción no pudo ser procesada"
				}).then(() => {
				});
			}
		}).fail(function (jqXHR, textStatus) {
			if (jqXHR.status === 0) {
				console.log('Not connect: Verify Network.');

			} else if (jqXHR.status == 404) {
				console.log('Requested page not found [404]');

			} else if (jqXHR.status == 500) {
				console.log('Internal Server Error [500].');

			} else if (textStatus === 'parsererror') {
				console.log('Requested JSON parse failed.');

			} else if (textStatus === 'timeout') {
				console.log('Time out error.');

			} else if (textStatus === 'abort') {
				console.log('Ajax request aborted.');

			} else {
				console.log('Uncaught Error: ' + jqXHR.responseText);
			};
		}).always(function () {
		});
	}
}

function updateTransactionResponseWompi(transaction) {

	$.ajax({
		url: 'https://zipaquiraturistica.com/catedral-backend/controlador/confirmation-wompi.php',
		data: {
			request: "updateTransactionWompi",
			amountInCents: transaction.amountInCents,
			createdAt: transaction.createdAt,
			currency: transaction.currency,
			customerData_fullName: transaction.customerData.fullName,
			customerData_phoneNumber: transaction.customerData.phoneNumber,
			customerEmail: transaction.customerEmail,
			id_transaction: transaction.id,
			paymentMethod_extra_brand: transaction.paymentMethod.extra.brand,
			paymentMethod_extra_externalIdentifier: transaction.paymentMethod.extra.externalIdentifier,
			paymentMethod_extra_lastFour: transaction.paymentMethod.extra.lastFour,
			paymentMethod_extra_name: transaction.paymentMethod.extra.name,
			paymentMethod_installments: transaction.paymentMethod.installments,
			paymentMethod_type: transaction.paymentMethod.type,
			reference: transaction.reference,
			status: transaction.status
		},
		type: 'POST',
		dataType: 'JSON',
		cache: false,
		beforeSend: function (xhr) { }
	}).done(function (data) {
		//console.log(data);
		if (data.response == "ok") {
			$('#popup-transaccion').addClass("active");
		} else {
			Swal.fire({
				position: 'center',
				icon: "error",
				title: "Ups...",
				text: "No fue posible actualizar la transacción"
			}).then(() => {
			});
		}
		resetForm();
	}).fail(function (jqXHR, textStatus) {
		if (jqXHR.status === 0) {
			console.log('Not connect: Verify Network.');

		} else if (jqXHR.status == 404) {
			console.log('Requested page not found [404]');

		} else if (jqXHR.status == 500) {
			console.log('Internal Server Error [500].');

		} else if (textStatus === 'parsererror') {
			console.log('Requested JSON parse failed.');

		} else if (textStatus === 'timeout') {
			console.log('Time out error.');

		} else if (textStatus === 'abort') {
			console.log('Ajax request aborted.');

		} else {
			console.log('Uncaught Error: ' + jqXHR.responseText);
		};
	}).always(function () {
	});
}

function resetForm() {

	//Global params
	cantAdultosNacional = 0
	cantNinhosNacional = 0
	cantAdultosMayoresNacional = 0
	cantDiscapacitadosNacional = 0
	cantAdultosExtranjero = 0
	cantNinhosExtranjero = 0
	cantAdultosMayoresExtranjero = 0
	cantDiscapacitadosExtranjero = 0

	total = 0
	totalCostAdultosNacional = 0
	totalCostNinhosNacional = 0
	totalCostAdultosMayoresNacional = 0
	totalCostDiscapacitadosNacional = 0
	totalCostAdultosExtranjero = 0
	totalCostNinhosExtranjero = 0
	totalCostAdultosMayoresExtranjero = 0
	totalCostDiscapacitadosExtranjero = 0

	//Second form
	$("#final-visitante-nacional-adultos").val("0");
	$("#final-visitante-nacional-ninhos").val("0");
	$("#final-visitante-nacional-adultos-mayores").val("0");
	$("#final-visitante-nacional-discapacitados").val("0");
	$("#final-visitante-extranjero-adultos").val("0");
	$("#final-visitante-extranjero-ninhos").val("0");
	$("#final-visitante-extranjero-adultos-mayores").val("0");
	$("#final-visitante-extranjero-discapacitados").val("0");
	$("#cedula").val("");
	$("#final-total").val("");

	$("#principal-content-form").removeClass("active");

	//First form
	$("#visitante-nacional-adultos").val("0");
	$("#visitante-nacional-ninhos").val("0");
	$("#visitante-nacional-adultos-mayores").val("0");
	$("#visitante-nacional-discapacitados").val("0");
	$("#visitante-extranjero-adultos").val("0");
	$("#visitante-extranjero-ninhos").val("0");
	$("#visitante-extranjero-adultos-mayores").val("0");
	$("#visitante-extranjero-discapacitados").val("0");
	$("#total").val("$ 0 COP");
}

async function main() {
	$('#total').val(`$ ${total.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`)
	$('#final-total').val(`$ ${total.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`)

	$('#fecha-de-visita').attr("min", `${thisYear}-${thisMonth}-${today}`);
	$('#fecha-de-visita').attr("value", `${thisYear}-${thisMonth}-${today}`);

	renderFinalPeopleCuantity(
		cantAdultosNacional,
		cantNinhosNacional,
		cantAdultosMayoresNacional,
		cantDiscapacitadosNacional,
		cantAdultosExtranjero,
		cantNinhosExtranjero,
		cantAdultosMayoresExtranjero,
		cantDiscapacitadosExtranjero
	)

	renderCostsPerPeopleCategory(
		totalCostAdultosNacional,
		totalCostNinhosNacional,
		totalCostAdultosMayoresNacional,
		totalCostDiscapacitadosNacional,
		totalCostAdultosExtranjero,
		totalCostNinhosExtranjero,
		totalCostAdultosMayoresExtranjero,
		totalCostDiscapacitadosExtranjero
	)

	lightGallery(document.getElementById('content-galery'), {
		width: '100%',
		thumbnail: true,
		animateThumb: true,
		showThumbByDefault: true,
		progressBar: true,
		escKey: true,
		download: false
	});

	$('.tooltip').tooltipster({
		animation: 'swing',
		tema: 'tooltipster-noir'
	});

	banner_carousel.owlCarousel({
		loop: false,
		nav: false,
		dots: false,
		autoplay: false,
		autoplayTimeout: 8000,
		autoplaySpeed: 8000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
				margin: 0,
				center: true,
			},
			992: {
				items: 1,
				margin: 0,
			},
		},
	});

	try {

		$('.visitante-select').on("change", function (e) {

			var quantity = parseInt($('#' + e.target.id).val());

			if (quantity > 0) {

				var shortName = getShortNameBySelectId(e.target.id);

				$.when(getAvailability(shortName)).done(function (responseAvailibality) {

					if (SHORT_NAME_NINO_ADM_NAL == shortName) {

						quantity = 0;
						quantity += parseInt($('#visitante-nacional-ninhos').val());
						quantity += parseInt($('#visitante-nacional-adultos-mayores').val());
						quantity += parseInt($('#visitante-nacional-discapacitados').val());
					}

					if (SHORT_NAME_NINO_ADM_EXT == shortName) {

						quantity = 0;
						quantity += parseInt($('#visitante-extranjero-ninhos').val());
						quantity += parseInt($('#visitante-extranjero-adultos-mayores').val());
						quantity += parseInt($('#visitante-extranjero-discapacitados').val());
					}

					if (quantity > responseAvailibality.ticketsAvailables) {

						Swal.fire({
							position: 'center',
							icon: "error",
							title: "Ups...",
							text: "Solo quedan " + responseAvailibality.ticketsAvailables + " pasaportes disponibles para este tipo de persona"
						}).then(() => {
						});

						$('#' + e.target.id).val(0);

						recalculatePricesFromSelects();

					} else {

						recalculatePricesFromSelects();
					}

				});

			} else {

				recalculatePricesFromSelects();
			}
		})

		$('.btn-pc-add').click(function (e) {

			const finalPeopleInputCount = $(this).siblings("input")
			const inputId = $(finalPeopleInputCount).attr("id")
			const inputPeopleCount = $(finalPeopleInputCount).val()

			if (inputPeopleCount >= 30) {
				return
			}

			switch (inputId) {

				case "final-visitante-nacional-adultos":

					var quantity = parseInt($('#final-visitante-nacional-adultos').val());
					var shortName = getShortNameByInputId('final-visitante-nacional-adultos');

					$.when(getAvailability(shortName)).done(function (responseAvailibality) {

						if (quantity > responseAvailibality.ticketsAvailables) {
							showErrorAvailibality(responseAvailibality.ticketsAvailables);
							$('#final-visitante-nacional-adultos').val(0);
							recalculatePricesFromInputs();
						} else {
							cantAdultosNacional++
							recalculatePricesFromInputs();
						}
					});

					break;

				case "final-visitante-nacional-ninhos":

					var quantity = parseInt($('#final-visitante-nacional-ninhos').val());
					quantity += parseInt($('#final-visitante-nacional-adultos-mayores').val());
					quantity += parseInt($('#final-visitante-nacional-discapacitados').val());
					var shortName = getShortNameByInputId('final-visitante-nacional-ninhos');

					$.when(getAvailability(shortName)).done(function (responseAvailibality) {

						if (quantity > responseAvailibality.ticketsAvailables) {
							showErrorAvailibality(responseAvailibality.ticketsAvailables);
							$('#final-visitante-nacional-ninhos').val(0);
							recalculatePricesFromInputs();
						} else {
							cantNinhosNacional++;
							recalculatePricesFromInputs();
						}
					});

					break;

				case "final-visitante-nacional-adultos-mayores":

					var quantity = parseInt($('#final-visitante-nacional-adultos-mayores').val());
					quantity += parseInt($('#final-visitante-nacional-ninhos').val());
					quantity += parseInt($('#final-visitante-nacional-discapacitados').val());
					var shortName = getShortNameByInputId('final-visitante-nacional-adultos-mayores');

					$.when(getAvailability(shortName)).done(function (responseAvailibality) {

						if (quantity > responseAvailibality.ticketsAvailables) {
							showErrorAvailibality(responseAvailibality.ticketsAvailables);
							$('#final-visitante-nacional-adultos-mayores').val(0);
							recalculatePricesFromInputs();
						} else {
							cantAdultosMayoresNacional++
							recalculatePricesFromInputs();
						}
					});

					break;

				case "final-visitante-nacional-discapacitados":

					var quantity = parseInt($('#final-visitante-nacional-discapacitados').val());
					quantity += parseInt($('#final-visitante-nacional-ninhos').val());
					quantity += parseInt($('#final-visitante-nacional-adultos-mayores').val());
					var shortName = getShortNameByInputId('final-visitante-nacional-discapacitados');

					$.when(getAvailability(shortName)).done(function (responseAvailibality) {

						if (quantity > responseAvailibality.ticketsAvailables) {
							showErrorAvailibality(responseAvailibality.ticketsAvailables);
							$('#final-visitante-nacional-discapacitados').val(0);
							recalculatePricesFromInputs();
						} else {
							cantDiscapacitadosNacional++
							recalculatePricesFromInputs();
						}
					});

					break;

				case "final-visitante-extranjero-adultos":

					var quantity = parseInt($('#final-visitante-extranjero-adultos').val());
					var shortName = getShortNameByInputId('final-visitante-extranjero-adultos');

					$.when(getAvailability(shortName)).done(function (responseAvailibality) {

						if (quantity > responseAvailibality.ticketsAvailables) {
							showErrorAvailibality(responseAvailibality.ticketsAvailables);
							$('#final-visitante-extranjero-adultos').val(0);
							recalculatePricesFromInputs();
						} else {
							cantAdultosExtranjero++
							recalculatePricesFromInputs();
						}
					});

					break;

				case "final-visitante-extranjero-ninhos":

					var quantity = parseInt($('#final-visitante-extranjero-ninhos').val());
					quantity += parseInt($('#final-visitante-extranjero-adultos-mayores').val());
					quantity += parseInt($('#final-visitante-extranjero-discapacitados').val());
					var shortName = getShortNameByInputId('final-visitante-extranjero-ninhos');

					$.when(getAvailability(shortName)).done(function (responseAvailibality) {

						if (quantity > responseAvailibality.ticketsAvailables) {
							showErrorAvailibality(responseAvailibality.ticketsAvailables);
							$('#final-visitante-extranjero-ninhos').val(0);
							recalculatePricesFromInputs();
						} else {
							cantNinhosExtranjero++
							recalculatePricesFromInputs();
						}
					});

					break;

				case "final-visitante-extranjero-adultos-mayores":

					var quantity = parseInt($('#final-visitante-extranjero-adultos-mayores').val());
					quantity += parseInt($('#final-visitante-extranjero-ninhos').val());
					quantity += parseInt($('#final-visitante-extranjero-discapacitados').val());
					var shortName = getShortNameByInputId('final-visitante-extranjero-adultos-mayores');

					$.when(getAvailability(shortName)).done(function (responseAvailibality) {

						if (quantity > responseAvailibality.ticketsAvailables) {
							showErrorAvailibality(responseAvailibality.ticketsAvailables);
							$('#final-visitante-extranjero-adultos-mayores').val(0);
							recalculatePricesFromInputs();
						} else {
							cantAdultosMayoresExtranjero++
							recalculatePricesFromInputs();
						}
					});

					break;

				case "final-visitante-extranjero-discapacitados":

					var quantity = parseInt($('#final-visitante-extranjero-discapacitados').val());
					quantity += parseInt($('#final-visitante-extranjero-ninhos').val());
					quantity += parseInt($('#final-visitante-extranjero-adultos-mayores').val());
					var shortName = getShortNameByInputId('final-visitante-extranjero-discapacitados');

					$.when(getAvailability(shortName)).done(function (responseAvailibality) {

						if (quantity > responseAvailibality.ticketsAvailables) {
							showErrorAvailibality(responseAvailibality.ticketsAvailables);
							$('#final-visitante-extranjero-discapacitados').val(0);
							recalculatePricesFromInputs();
						} else {
							cantDiscapacitadosExtranjero++
							recalculatePricesFromInputs();
						}
					});

					break;

				default:
					break;
			}

			recalculatePricesFromInputs();
		})

		$('.btn-pc-substract').click(function (e) {

			const finalPeopleInputCount = $(this).siblings("input")
			const inputId = $(finalPeopleInputCount).attr("id")
			const inputPeopleCount = $(finalPeopleInputCount).val()

			if (inputPeopleCount <= 0) {
				return
			}

			switch (inputId) {
				case "final-visitante-nacional-adultos":
					cantAdultosNacional--
					break;

				case "final-visitante-nacional-ninhos":
					cantNinhosNacional--
					break;

				case "final-visitante-nacional-adultos-mayores":
					cantAdultosMayoresNacional--
					break;

				case "final-visitante-nacional-discapacitados":
					cantDiscapacitadosNacional--
					break;

				case "final-visitante-extranjero-adultos":
					cantAdultosExtranjero--
					break;

				case "final-visitante-extranjero-ninhos":
					cantNinhosExtranjero--
					break;

				case "final-visitante-extranjero-adultos-mayores":
					cantAdultosMayoresExtranjero--
					break;

				case "final-visitante-extranjero-discapacitados":
					cantDiscapacitadosExtranjero--
					break;

				default:
					break;
			}

			recalculatePricesFromInputs();
		})
	} catch (error) {
		console.error(error)
	}
}

function recalculatePricesFromSelects() {

	cantAdultosNacional = $('#visitante-nacional-adultos').val();
	cantNinhosNacional = $('#visitante-nacional-ninhos').val();
	cantAdultosMayoresNacional = $('#visitante-nacional-adultos-mayores').val();
	cantDiscapacitadosNacional = $('#visitante-nacional-discapacitados').val();
	cantAdultosExtranjero = $('#visitante-extranjero-adultos').val();
	cantNinhosExtranjero = $('#visitante-extranjero-ninhos').val();
	cantAdultosMayoresExtranjero = $('#visitante-extranjero-adultos-mayores').val();
	cantDiscapacitadosExtranjero = $('#visitante-extranjero-discapacitados').val();

	totalCostAdultosNacional = calculateCost(cantAdultosNacional, adultoNacional);
	totalCostNinhosNacional = calculateCost(cantNinhosNacional, ninoNacional);
	totalCostAdultosMayoresNacional = calculateCost(cantAdultosMayoresNacional, adultoMayorNacional);
	totalCostDiscapacitadosNacional = calculateCost(cantDiscapacitadosNacional, discapacitadoNacional);
	totalCostAdultosExtranjero = calculateCost(cantAdultosExtranjero, adultoExtranjero);
	totalCostNinhosExtranjero = calculateCost(cantNinhosExtranjero, ninoExtranjero);
	totalCostAdultosMayoresExtranjero = calculateCost(cantAdultosMayoresExtranjero, adultoMayorExtranjero);
	totalCostDiscapacitadosExtranjero = calculateCost(cantDiscapacitadosExtranjero, discapacitadoExtranjero);

	//cost without discount
	rawTotalCostAdultosNacional = calculateCost(cantAdultosNacional, rawAdultoNacional);
	rawTotalCostNinhosNacional = calculateCost(cantNinhosNacional, rawNinoNacional);
	rawTotalCostAdultosMayoresNacional = calculateCost(cantAdultosMayoresNacional, rawAdultoMayorNacional);
	rawTotalCostDiscapacitadosNacional = calculateCost(cantDiscapacitadosNacional, rawDiscapacitadoNacional);
	rawTotalCostAdultosExtranjero = calculateCost(cantAdultosExtranjero, rawAdultoExtranjero);
	rawTotalCostNinhosExtranjero = calculateCost(cantNinhosExtranjero, rawNinoExtranjero);
	rawTotalCostAdultosMayoresExtranjero = calculateCost(cantAdultosMayoresExtranjero, rawAdultoMayorExtranjero);
	rawTotalCostDiscapacitadosExtranjero = calculateCost(cantDiscapacitadosExtranjero, rawDiscapacitadoExtranjero);

	total = calculateTotalCost(
		totalCostAdultosNacional,
		totalCostNinhosNacional,
		totalCostAdultosMayoresNacional,
		totalCostDiscapacitadosNacional,
		totalCostAdultosExtranjero,
		totalCostNinhosExtranjero,
		totalCostAdultosMayoresExtranjero,
		totalCostDiscapacitadosExtranjero,
	);

	//total without discount
	rawTotal = calculateTotalCost(
		rawTotalCostAdultosNacional,
		rawTotalCostNinhosNacional,
		rawTotalCostAdultosMayoresNacional,
		rawTotalCostDiscapacitadosNacional,
		rawTotalCostAdultosExtranjero,
		rawTotalCostNinhosExtranjero,
		rawTotalCostAdultosMayoresExtranjero,
		rawTotalCostDiscapacitadosExtranjero,
	);

	var descuento_aplicado = rawTotal - total;



	$('#total').val(`$ ${total.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`);
	$('#final-total').val(`$ ${total.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`);

	//total without discount
	$('#rawTotal').val(`$ ${rawTotal.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`);

	$('#descuentoAplicado').val(`$ ${descuento_aplicado.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`);

	//


	renderFinalPeopleCuantity(
		cantAdultosNacional,
		cantNinhosNacional,
		cantAdultosMayoresNacional,
		cantDiscapacitadosNacional,
		cantAdultosExtranjero,
		cantNinhosExtranjero,
		cantAdultosMayoresExtranjero,
		cantDiscapacitadosExtranjero
	);

	renderCostsPerPeopleCategory(
		totalCostAdultosNacional,
		totalCostNinhosNacional,
		totalCostAdultosMayoresNacional,
		totalCostDiscapacitadosNacional,
		totalCostAdultosExtranjero,
		totalCostNinhosExtranjero,
		totalCostAdultosMayoresExtranjero,
		totalCostDiscapacitadosExtranjero
	);
}

function recalculatePricesFromInputs() {
	totalCostAdultosNacional = calculateCost(cantAdultosNacional, adultoNacional);
	totalCostNinhosNacional = calculateCost(cantNinhosNacional, ninoNacional);
	totalCostAdultosMayoresNacional = calculateCost(cantAdultosMayoresNacional, adultoMayorNacional);
	totalCostDiscapacitadosNacional = calculateCost(cantDiscapacitadosNacional, discapacitadoNacional);
	totalCostAdultosExtranjero = calculateCost(cantAdultosExtranjero, adultoExtranjero);
	totalCostNinhosExtranjero = calculateCost(cantNinhosExtranjero, ninoExtranjero);
	totalCostAdultosMayoresExtranjero = calculateCost(cantAdultosMayoresExtranjero, adultoMayorExtranjero);
	totalCostDiscapacitadosExtranjero = calculateCost(cantDiscapacitadosExtranjero, discapacitadoExtranjero);

	//cost without discount
	rawTotalCostAdultosNacional = calculateCost(cantAdultosNacional, rawAdultoNacional);
	rawTotalCostNinhosNacional = calculateCost(cantNinhosNacional, rawNinoNacional);
	rawTotalCostAdultosMayoresNacional = calculateCost(cantAdultosMayoresNacional, rawAdultoMayorNacional);
	rawTotalCostDiscapacitadosNacional = calculateCost(cantDiscapacitadosNacional, rawDiscapacitadoNacional);
	rawTotalCostAdultosExtranjero = calculateCost(cantAdultosExtranjero, rawAdultoExtranjero);
	rawTotalCostNinhosExtranjero = calculateCost(cantNinhosExtranjero, rawNinoExtranjero);
	rawTotalCostAdultosMayoresExtranjero = calculateCost(cantAdultosMayoresExtranjero, rawAdultoMayorExtranjero);
	rawTotalCostDiscapacitadosExtranjero = calculateCost(cantDiscapacitadosExtranjero, rawDiscapacitadoExtranjero);

	total = calculateTotalCost(
		totalCostAdultosNacional,
		totalCostNinhosNacional,
		totalCostAdultosMayoresNacional,
		totalCostDiscapacitadosNacional,
		totalCostAdultosExtranjero,
		totalCostNinhosExtranjero,
		totalCostAdultosMayoresExtranjero,
		totalCostDiscapacitadosExtranjero,
	);

	//total without discount
	rawTotal = calculateTotalCost(
		rawTotalCostAdultosNacional,
		rawTotalCostNinhosNacional,
		rawTotalCostAdultosMayoresNacional,
		rawTotalCostDiscapacitadosNacional,
		rawTotalCostAdultosExtranjero,
		rawTotalCostNinhosExtranjero,
		rawTotalCostAdultosMayoresExtranjero,
		rawTotalCostDiscapacitadosExtranjero,
	);

	var descuento_aplicado = rawTotal - total;

	$('#total').val(`$ ${total.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`);
	$('#final-total').val(`$ ${total.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`);

	//total without discount
	$('#rawTotal').val(`$ ${rawTotal.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`);

	$('#descuentoAplicado').val(`$ ${descuento_aplicado.toString().replace(/\D/g, "").replace(/([0-9])([0-9]{3})$/, "$1.$2").replace(/\B(?=(\d{3})+(?!\d).?)/g, ".")} COP`);





	renderFinalPeopleCuantity(
		cantAdultosNacional,
		cantNinhosNacional,
		cantAdultosMayoresNacional,
		cantDiscapacitadosNacional,
		cantAdultosExtranjero,
		cantNinhosExtranjero,
		cantAdultosMayoresExtranjero,
		cantDiscapacitadosExtranjero
	);

	renderCostsPerPeopleCategory(
		totalCostAdultosNacional,
		totalCostNinhosNacional,
		totalCostAdultosMayoresNacional,
		totalCostDiscapacitadosNacional,
		totalCostAdultosExtranjero,
		totalCostNinhosExtranjero,
		totalCostAdultosMayoresExtranjero,
		totalCostDiscapacitadosExtranjero
	);
}

function getAvailability(shortName) {

	return $.ajax({
		url: 'https://zipaquiraturistica.com/catedral-backend/controlador/cticket.php',
		data: {
			request: "getTicketsAvailablesByProductGet",
			shortName: shortName
		},
		type: 'GET',
		dataType: 'JSON',
		cache: false,
		beforeSend: function (xhr) { }
	}).done(function (data) {
	}).fail(function (jqXHR, textStatus) {

		if (jqXHR.status === 0) {
			console.log('Not connect: Verify Network.');

		} else if (jqXHR.status == 404) {
			console.log('Requested page not found [404]');

		} else if (jqXHR.status == 500) {
			console.log('Internal Server Error [500].');

		} else if (textStatus === 'parsererror') {
			console.log('Requested JSON parse failed.');

		} else if (textStatus === 'timeout') {
			console.log('Time out error.');

		} else if (textStatus === 'abort') {
			console.log('Ajax request aborted.');

		} else {
			console.log('Uncaught Error: ' + jqXHR.responseText);
		};
	}).always(function () {
	});
}

function getShortNameBySelectId(selectId) {

	switch (selectId) {
		case 'visitante-nacional-adultos':
			return SHORT_NAME_ADULT_NAL;
		case 'visitante-nacional-ninhos':
			return SHORT_NAME_NINO_ADM_NAL;
		case 'visitante-nacional-adultos-mayores':
			return SHORT_NAME_NINO_ADM_NAL;
		case 'visitante-nacional-discapacitados':
			return SHORT_NAME_NINO_ADM_NAL;
		case 'visitante-extranjero-adultos':
			return SHORT_NAME_ADULT_EXT;
		case 'visitante-extranjero-ninhos':
			return SHORT_NAME_NINO_ADM_EXT;
		case 'visitante-extranjero-adultos-mayores':
			return SHORT_NAME_NINO_ADM_EXT;
		case 'visitante-extranjero-discapacitados':
			return SHORT_NAME_NINO_ADM_EXT;
		default:
			console.log("Error for get selectId: " + selectId);
	}
}

function getShortNameByInputId(inputId) {

	switch (inputId) {
		case 'final-visitante-nacional-adultos':
			return SHORT_NAME_ADULT_NAL;
		case 'final-visitante-nacional-ninhos':
			return SHORT_NAME_NINO_ADM_NAL;
		case 'final-visitante-nacional-adultos-mayores':
			return SHORT_NAME_NINO_ADM_NAL;
		case 'final-visitante-nacional-discapacitados':
			return SHORT_NAME_NINO_ADM_NAL;
		case 'final-visitante-extranjero-adultos':
			return SHORT_NAME_ADULT_EXT;
		case 'final-visitante-extranjero-ninhos':
			return SHORT_NAME_NINO_ADM_EXT;
		case 'final-visitante-extranjero-adultos-mayores':
			return SHORT_NAME_NINO_ADM_EXT;
		case 'final-visitante-extranjero-discapacitados':
			return SHORT_NAME_NINO_ADM_EXT;
		default:
			console.log("Error for get inputId: " + inputId);
	}
}

function showErrorAvailibality(tickets) {

	Swal.fire({
		position: 'center',
		icon: "error",
		title: "Ups...",
		text: "Solo quedan " + tickets + " pasaportes disponibles para este tipo de persona"
	}).then(() => {
	});
}

/**
 * * INITIALIZATION
 */
const banner_carousel = $("#banner-carousel");
let thisYear = new Date().getFullYear();
let thisMonth = new Date().getMonth() + 1; // plus one beacouse is an array index
if (thisMonth < 10) {
	thisMonth = "0" + thisMonth;
}
let today = new Date().getDate();
if (today < 10) {
	today = "0" + today;
}

let cantAdultosNacional = 0
let cantNinhosNacional = 0
let cantAdultosMayoresNacional = 0
let cantDiscapacitadosNacional = 0
let cantAdultosExtranjero = 0
let cantNinhosExtranjero = 0
let cantAdultosMayoresExtranjero = 0
let cantDiscapacitadosExtranjero = 0

let total = 0
let totalCostAdultosNacional = 0
let totalCostNinhosNacional = 0
let totalCostAdultosMayoresNacional = 0
let totalCostDiscapacitadosNacional = 0
let totalCostAdultosExtranjero = 0
let totalCostNinhosExtranjero = 0
let totalCostAdultosMayoresExtranjero = 0
let totalCostDiscapacitadosExtranjero = 0

const SHORT_NAME_ADULT_EXT = 'ADULT_EXT';
const SHORT_NAME_ADULT_NAL = 'ADULT_NAL';
const SHORT_NAME_NINO_ADM_EXT = 'NINO_ADM_EXT';
const SHORT_NAME_NINO_ADM_NAL = 'NINO_ADM_NAL';

var adultoNacional = 0;
var ninoNacional = 0;
var adultoMayorNacional = 0;
var discapacitadoNacional = 0;
var adultoExtranjero = 0;
var ninoExtranjero = 0;
var adultoMayorExtranjero = 0;
var discapacitadoExtranjero = 0;

var rawAdultoNacional = 0;
var rawNinoNacional = 0;
var rawAdultoMayorNacional = 0;
var rawDiscapacitadoNacional = 0;
var rawAdultoExtranjero = 0;
var rawNinoExtranjero = 0;
var rawAdultoMayorExtranjero = 0;
var rawDiscapacitadoExtranjero = 0;

$.when(getCosts()).done(function (responseCosts) {

	//console.log(responseCosts);
	adultoNacional = responseCosts.adultoNacional;
	ninoNacional = responseCosts.ninoNacional;
	adultoMayorNacional = responseCosts.adultoMayorNacional;
	discapacitadoNacional = responseCosts.discapacitadoNacional;
	adultoExtranjero = responseCosts.adultoExtranjero;
	ninoExtranjero = responseCosts.ninoExtranjero;
	adultoMayorExtranjero = responseCosts.adultoMayorExtranjero;
	discapacitadoExtranjero = responseCosts.discapacitadoExtranjero;

	rawAdultoNacional = responseCosts.rawAdultoNacional;
	rawNinoNacional = responseCosts.rawNinoNacional;
	rawAdultoMayorNacional = responseCosts.rawAdultoMayorNacional;
	rawDiscapacitadoNacional = responseCosts.rawDiscapacitadoNacional;
	rawAdultoExtranjero = responseCosts.rawAdultoExtranjero;
	rawNinoExtranjero = responseCosts.rawNinoExtranjero;
	rawAdultoMayorExtranjero = responseCosts.rawAdultoMayorExtranjero;
	rawDiscapacitadoExtranjero = responseCosts.rawDiscapacitadoExtranjero;
});

setTimeout(() => {
	//console.log(adultoNacional);
	//console.log(ninoNacional);
	//console.log(adultoMayorNacional);
	//console.log(discapacitadoNacional);
	//console.log(adultoExtranjero);
	//console.log(ninoExtranjero);
	//console.log(adultoMayorExtranjero);
	//console.log(discapacitadoExtranjero);
}, 2000);


$("#bnn-izq").click(function () {
	banner_carousel.trigger("prev.owl.carousel", [500]);
});

$("#bnn-der").click(function () {
	banner_carousel.trigger("next.owl.carousel", [500]);
});

$("#sec-donde-estamos").click(function (event) {
	event.preventDefault();
	$("html, body").animate(
		{ scrollTop: 0 },
		$("#s-map").offset().top - 65,
		800
	);
});

$("#btn-planes-card").click(function (event) {
	event.preventDefault();
	$("html, body").animate(
		{
			scrollTop: $("#s-planes").offset().top - 65,
		},
		800
	);
});

$("#sec-c").click(function (event) {
	event.preventDefault();
	$("html, body").animate(
		{
			scrollTop: $("#s-cat").offset().top - 65,
		},
		800
	);
});

$("#sec-t-n").click(function (event) {
	event.preventDefault();
	$("html, body").animate(
		{
			scrollTop: $("#s-a-c-n").offset().top - 65,
		},
		800
	);
});

$("#sec-m").click(function (event) {
	event.preventDefault();
	$("html, body").animate(
		{
			scrollTop: $("#s-mej-mar").offset().top - 65,
		},
		800
	);
});

$("#sec-q-s").click(function (event) {
	event.preventDefault();
	$("html, body").animate(
		{
			scrollTop: $("#s-q-s").offset().top - 65,
		},
		800
	);
});

$("#sec-cont").click(function (event) {
	event.preventDefault();
	$("html, body").animate(
		{
			scrollTop: $("footer").offset().top - 65,
		},
		800
	);
});

$(".btn-go-to-compra").click(function (event) {
	event.preventDefault();
	$("html, body").animate(
		{
			scrollTop: $("#s-compre").offset().top - 65,
		},
		800
	);
	$("#popup-inicial").removeClass("active");
	$("#popup-img-n").removeClass("active");
});

$("#btn-enviar-hv").click(function (event) {
	event.preventDefault();
	enviarHv();
});

$("#comprar-tiquete").click(function (event) {
	event.preventDefault();
	if (total == 0) {
		Swal.fire({
			position: 'center',
			icon: "error",
			title: "Ups...",
			text: "Selecciona alguna de las opciones"
		}).then(() => {
		});
	} else {
		$("#principal-content-form").addClass("active");
	}
});

$('#btn-volver').click(function (event) {
	event.preventDefault()
	$("#principal-content-form").removeClass("active");
})

$("#btn-info").click(function (event) {
	event.preventDefault();
	$('#popup-pregunta').addClass("active");
});

$("#btn-porque-visitarnos").click(function (event) {
	event.preventDefault();
	$('#popup-porque-visitarnos').addClass("active");
});

$('#tren').css("display", "none");

$("#btn-tierra").click(function (event) {
	event.preventDefault();
	$('#tren').css("display", "none");
	$('#tierra').css("display", "flex");
});

$("#btn-tren").click(function (event) {
	event.preventDefault();
	$('#tierra').css("display", "none");
	$('#tren').css("display", "flex");
});

$("#btn-pagar-boletos").click(function (event) {
	event.preventDefault();
	if (total == 0) {
		Swal.fire({
			position: 'center',
			icon: "error",
			title: "Ups...",
			text: "Selecciona alguna de las opciones"
		}).then(() => {
		});
	} else {

		getWompiData()
	}
});


$(document).on('click', '#comprar-precios', function (e) {
	$('#popup-compara-precios').addClass('active');
});

$(document).on('click', '#btn-beneficios', function (e) {
	$('#popup-beneficios').addClass('active');
});



$("#cedula").change(function () {
	/*
	let cedula = $("#cedula").val()

	$.ajax({
		url: 'https://zipaquiraturistica.com/catedral-backend/controlador/cpagoform.php',
		data: {
			request: "getBasicDataOfUser",
			identificacionUsuario: cedula
		},
		type: 'POST',
		dataType: 'JSON',
		cache: false,
		beforeSend: function (xhr) { }
	}).done(function (data) {

		if (data.response == "ok") {
			$('#nombre').val(data.nombres);
			$('#apellidos').val(data.apellidos);
			$('#email').val(data.email);
			data.indicativo == "" ? "+57" : $('#indicativo').val(data.indicativo);
			$('#celular').val(data.celular);
		}

	}).fail(function (jqXHR, textStatus) {
		if (jqXHR.status === 0) {
			console.log('Not connect: Verify Network.');

		} else if (jqXHR.status == 404) {
			console.log('Requested page not found [404]');

		} else if (jqXHR.status == 500) {
			console.log('Internal Server Error [500].');

		} else if (textStatus === 'parsererror') {
			console.log('Requested JSON parse failed.');

		} else if (textStatus === 'timeout') {
			console.log('Time out error.');

		} else if (textStatus === 'abort') {
			console.log('Ajax request aborted.');

		} else {
			console.log('Uncaught Error: ' + jqXHR.responseText);
		};
	}).always(function () {
	});
	*/
});


$("#cedula").keypress(function (e) {
	return soloLetrasNumeros(e);
});

$("#celular").keypress(function (e) {
	return soloNumeros(e);
});

$("#nombre, #apellidos").keypress(function (e) {
	return soloLetras(e);
});

//getTiketsByCategory("ADULT_EXT");
main()

