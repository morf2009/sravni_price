//Функции инициализирующиеся или срабатывающие по document.ready
$(function () {
	
	function table() {
		$('.sortable__cards').removeClass('active').addClass('no-active');
		$('#popular').find('.col-12').removeClass('col-lg-4').removeClass('col-md-6').removeClass('col-sm-6');
		$('.popular__card').addClass('reverse-card');
	}
	
	function cards() {
		$('.sortable__tables').removeClass('active').addClass('no-active');
		$('#popular').find('.col-12').addClass('col-lg-4').addClass('col-md-6').addClass('col-sm-6');
		$('.popular__card').removeClass('reverse-card');
	}
	
	var myCookie = Cookies.get('type');
	
	if (myCookie == "table") {
		$('.sortable__tables').removeClass('no-active').addClass('active');
		table();
		
	}
	else if (myCookie == "cards") {
		$('.sortable__cards').removeClass('no-active').addClass('active');
		cards();
	}
	
	// Убираем плейсхолдер у поля формы при фокусе на нем
	if ($('input, textarea').length > 0) {
		$('input, textarea').focus(function () {
			$(this).data('placeholder', $(this).attr('placeholder'))
			.attr('placeholder', '');
		}).blur(function () {
			$(this).attr('placeholder', $(this).data('placeholder'));
		});
	}
	
	// //Все инпуты с типом tel имеют маску +7 (999) 999 99 99
	if ($('input[type=tel]').length > 0) {
		$('input[type=tel]').mask('+7 (999) 999 99 99');
	}
	
	//меню
	$('#menuBtn').on('click', function(e) {
		
		e.preventDefault();
		
		if ($(window).width() <= 991) {
			
			$(this).toggleClass('menu-btn_active');
			$('.drop-down').toggleClass('hidden').toggleClass('nav-opacity');
			$("#drop-down").animate({width:'100%'}, 300);
			$('header, main').toggleClass('opacity');
		}
		else {
			
			$(this).toggleClass('menu-btn_active');
			$('.drop-down').toggleClass('hidden');
		}
	});
	
	//стрелка в фильтре
	$('body').on('click', '.choose__mini-title-block', function(e) {
		$(this).next('ul').slideToggle();
		$(this).closest('.choose').find('.choose__filter-button').fadeToggle();
		$(this).find('img').toggleClass('rotate');
	});
	
	//стрелка в фильтре
	$('.ui-slider__mini-title-block').on('click', function(e) {
		$(this).next('.ui-slider__amounts').slideToggle();
		$(this).find('img').toggleClass('rotate');
	});
	
	$('.title-goods__choose').on('click', function(e) {
		$('.filter, .selection').slideToggle();
	});
	
	// $('.choose__row').on('mouseup', function(e) {
	//
	//     if ( $(this).find('input').prop('checked') == true ) {
	//
	//         $('.selection__wrapper').find('.choose__amount-block').hide();
	//         $('.choose__amount').text('ищем...');
	//
	//         // $('.selection__wrapper').find('.choose__input:checked:first').closest('.choose__label').find('.choose__amount-block').css('display', 'flex');
	//         $(this).find('.choose__amount-block').css('display', 'flex');
	//         setTimeout(function () {
	//             $('.choose__amount').text('123');
	//         }, 1500);
	//     }
	//
	//     else {
	//
	//         $('.choose__amount-block').hide();
	//         $(this).find('.choose__amount-block').css('display', 'flex');
	//         $('.choose__amount').text('ищем...');
	//
	//         setTimeout(function () {
	//             $('.choose__amount').text('123');
	//         }, 1500);
	//     }
	// });
	
	//переключить сортировку в карточный вид
	$('.sortable__tables').on('click', function(e) {
		
		e.preventDefault();
		
		if ( $(this).hasClass('no-active') ) {
			$(this).removeClass('no-active').addClass('active');
			table();
			Cookies.set('type', 'table');
		}
	});
	
	//переключить сортировку в табличный вид
	$('.sortable__cards').on('click', function(e) {
		
		e.preventDefault();
		
		if ( $(this).hasClass('no-active') ) {
			$(this).removeClass('no-active').addClass('active');
			cards();
			Cookies.set('type', 'cards');
		}
	});
	
	//закрытие модалки по крестику
	$('.modal__close-modal').on('click', function(e) {
		
		$("#drop-down").animate({width:'1%'}, 300);
		
		setTimeout(function () {
			
			$('.drop-down').toggleClass('hidden').toggleClass('nav-opacity');
		}, 290);
		
		$('#menuBtn').toggleClass('menu-btn_active');
		$('header, main').toggleClass('opacity');
	});
	
	//json города в шапке
	var countryArray = [
		
		{id:0, text:'Москва', city: ['Апрелевка', 'Балашиха', 'Домодедово'] },
		{id:1, text:'Санкт - Петербург', city: ['Пушкин', 'Петергоф'] } ,
		{id:2, text:'Нижний - Новгород', city: ['Боровичи', 'Великий Новгород', 'Чудово'] }
	
	];
	
	//выбор региона из селекта в шапке и добавление в textarea там же
	function changeSelect() {
		switchCity = $("#countrySelect").val();
		
		var tempCity = countryArray[switchCity].city;
		
		$('.add-shop__regions-block').html('');
		
		for (i=0; i<tempCity.length; i++) {
			console.log(tempCity[i]);
			
			var transferInput = '<a class="add-shop__region" href="#" title="#">' + tempCity[i] + '</a>';
			
			$('.add-shop__regions-block').append(transferInput);
		}
	}
	
	//вызов выбор региона из селекта в шапке и добавление в textarea там же
	$('#countrySelect').on('change', function() {
		changeSelect();
	});
	
	//оверлей на поиск в шапке
	$('#search-input').focus(function() {
		
		$('#overlay').show();
		$('.header__search').addClass('input-overlay');
	});
	
	//оверлей на поиск в шапке скрытие
	$('#overlay').on('click', function() {
		
		$(this).hide();
	});
	
	//вы успешно подписались на главной
	/*   $('#subscribeForm').submit(function( e ) {
 
				 e.preventDefault();
				 $('#email, #sucsessBtn').hide();
				 $('#subscrSuccsess').show();
		 });*/
	
	//добавление магазина из субфутера
	$('.sub-footer__add-shop').magnificPopup({
		// type: 'inline',
		preloader: true,
		focus: '#fio',
		// closeBtnInside: true,
		
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});
	
	//добавление магазина из блока поделиться
	$('.shop-add__shop-card-no-border').magnificPopup({
		
		preloader: true,
		focus: '#fio',
		
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					$('#addShop').find('button').css('pointer-events', 'unset');
					this.st.focus = false;
				} else {
					$('#addShop').find('button').css('pointer-events', 'unset');
					this.st.focus = '#name';
				}
			}
		}
	});
	
	//открытие модалки на выбор города
	$('.header__select-block').magnificPopup({
		
		preloader: true,
		
		callbacks: {
			beforeOpen: function() {
				
				$('#countrySelect').select2({
					data: countryArray,
				});
				
				changeSelect();
				
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});
	
	//передача города в шапку
	$('body').on('click', '.add-shop__region', function() {
		var region = $(this).text();
		$('.header__select').text(region);
	});
	
	//закрытие модалки после окончательного выбора региона из textarea в шапке селекта
	$('body').on('click', '.add-shop__close, .add-shop__region', function() {
		$.magnificPopup.close();
		$('input, textarea, select').val('');
	});
	
	//вы успешно добавили магазин, вызов второй модалки после заполнения полей в первой при подключении магазина
	/* $('#addShop').submit(function( e ) {

			 e.preventDefault();

			 // $.ajax({
			 //     type: "POST",
			 //     url: "mail",
			 //     data: $(this).serialize()
			 // }).done();

			 $.magnificPopup.close();
			 $('input, textarea').val('');
			 $.magnificPopup.open({
					 items: {
							 src: '#thanks'
					 },
					 // type: 'inline'
			 });
	 });*/
	
	// $( "#slider" ).on( "slidestop", function( event, ui ) {
	//     alert('2');
	// } );
	//
	// //слайдер цены в фильтре
	// $("#slider").slider({
	//     range: true,
	//     min: 0,
	//     max: maxPrice,
	//     values: [ 0, maxPrice ],
	//     slide: function( event, ui ) {
	//         $( ".ui-slider__from-input" ).val(ui.values[0] );
	//         $( ".ui-slider__to-input" ).val(ui.values[1] );
	//     }
	// });
	//
	// //начальное значение цены в слайдере цены
	// $(".ui-slider__from-input").change(function () {
	//     var value = $(this).val();
	//     console.log(typeof(value));
	//     $("#slider").slider("values", 0, value);
	// });
	//
	// //конечное значение цены в слайдере цены
	// $(".ui-slider__to-input").change(function () {
	//     var value = $(this).val();
	//     console.log(typeof(value));
	//     $("#slider").slider("values", 1, value);
	// });
});
