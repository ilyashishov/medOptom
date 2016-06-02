$('.block3 .slider .img').each((index, el) => {
	if(index > 2){
		$(el).hide();
	}
	$(el).attr('index', index+1);
});

var coutSertificat = $('.block3 .slider .img').length + 1;
$('.block3 .next').on('click', () => {
	$('.block3 .back').show()
	var i = parseInt($($('.block3 .slider .img:visible')[2]).attr('index'))+1;
	if(coutSertificat == i+1){
		$('.block3 .next').hide();
	}
	$($('.block3 .slider .img:visible')[0]).hide();
	$('.block3 .slider .img').each((index, el) => {
		if($(el).attr('index') == i){
			$(el).show();
		}
	});
})
$('.block3 .back').on('click', () => {
	$('.block3 .next').show();
	var i = parseInt($($('.block3 .slider .img:visible')[0]).attr('index'))-1;
	if(i == 1){
		$('.block3 .back').hide();
	}
	$($('.block3 .slider .img:visible')[2]).hide();
	$('.block3 .slider .img').each((index, el) => {
		if($(el).attr('index') == i){
			$(el).show();
		}
	});
})

$('.close, .close_button').on('click', () =>{
	$('.windows').hide();
	return false;
})

$('.basket').on('click', () =>{
	$('.windows').show();
	return false;
})