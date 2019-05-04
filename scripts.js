$(function(){
	$(window).ready(function() {
		$('section').addClass('appear');
		$('div').addClass('appear');
		$('footer').addClass('appear');

	});

	AOS.init({
		once: true,
	});
});