// $(window).on('scroll', function () {
// 	if ($(window).scrollTop() > 90) {
// 		$("header").css("background-color", "rgba(0,0,0,0.8)");
// 	} else if ($(window).scrollTop() < 90) {
// 		$("header").css("background-color", "rgba(0,0,0,0)");
// 	}
// });


$(".skiptranslate").css("display", "none !important");

$('#menu-btn').click(function (e) {
	e.preventDefault();

	$('header').toggleClass("extended");
});

$("#sec-cont").click(function (event) {
	event.preventDefault();

	window.location = "index.php#footer";
});

function createMenuLeft() {
	var arrayPathname = window.location.pathname.replace("index.php", "").split("/");

	$('.menu-left>ul li.selected').removeClass("selected");

	arrayPathname.splice(0, 1);
	arrayPathname.splice(arrayPathname.length - 1, 1);

	arrayPathname.forEach(itemLink => {
		if (itemLink != "") {
			$('.menu-left').find('a[menu-link="' + itemLink + '"]').addClass("selected");
		}
	});

	$('.menu-left a').click(function (e) {
		e.preventDefault();

		if (($(this).attr("href") == "#") && ($(this).siblings("ul.sub-list") || $(this).siblings("ul.second-sub-list") || $(this).siblings("ul.third-sub-list") || $(this).siblings("ul.four-sub-list"))) {
			if (!$(this).hasClass("selected")) {

				if ($(this).parents("li.w-sublist").siblings(".w-sublist").find('a.selected')) {
					$(this).parents("li.w-sublist").siblings(".w-sublist").find('a.selected').removeClass("selected");

				}

				$(this).addClass("selected");
			} else {
				$(this).removeClass("selected");
			}

		} else if ($(this).attr("href") != "#") {
			window.location.href = $(this).attr("href");
		}
	});
}
createMenuLeft();

$("#btn-send-newsletter").click(function (event) {
	event.preventDefault();

	createNewsletter();
});

function createNewsletter() {
	let email = $("#email-newsletter").val();

	if (email == "") {
		notificacion("#email-newsletter", "Ingresa un correo electrónico", "#email-newsletter", "bottom center", "error");

	} else if (!validarEmail(email)) {
		notificacion("#email-newsletter", "Ingresa un correo electrónico valido", "#email-newsletter", "bottom center", "error");

	} else {
		fetch(`${API_URL}/newsletter/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'default',
			body: JSON.stringify({
				email
			})
		})
			.then((response) => handleFetchErrors(response, 'Swal.fire({ position: "top-end",icon: "error", title: "Oops...", text: "Ya estas inscrito en nuestro newsletter" })'))
			.then(response => response.json())
			.then(data => {
				Swal.fire({
					position: 'top-end',
					icon: "success",
					title: "Hecho",
					text: "Fuiste añadido a nuestro Newsletter",
					showConfirmButton: false,
					timer: 1500
				});


				$("#email-newsletter").val("");
			})
			.catch(error => console.log(error));
	}
}

