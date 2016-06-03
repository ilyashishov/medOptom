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
});
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
});

$('.close, .close_button').on('click', () =>{
	$('.windows').hide();
	return false;
});



$('.block2 .bl > div').each((index, el) => {
	$(el).find('a').attr('index', index+1);
});



var basket = [];

$('.buy').on('click', function(e){
	var self = this;
	var add = true;
	if($(this).hasClass('hover')){
		$(this).removeClass('hover').text('В карзину');
		basket.forEach(function(item, i, arr) {
			if(item.id == $(self).attr('index')){
				basket.splice(i, 1);
				return false;
			}
		});
	}else{
		$(this).addClass('hover').text('Убрать из карзины');
		basket.forEach(function(item, i, arr) {
			if(item.id == $(self).attr('index')){
				item.count = parseInt(item.count) + 1;
				item.cost = parseInt(item.cost) + parseInt(item.price);
				add = false;
				return false;
			}
		});
		if(!add){
			return false;
		}
		basket.push({
			id: $(this).attr('index'),
			name: $(this).attr('item-name'),
			weight: $(this).attr('item-weight'),
			price: $(this).attr('item-price'),
			count: 1,
			cost: $(this).attr('item-price'),
			img: $(this).parent().find('img').attr('src')
		})
	}
	return false;
});

$('.basket_form').on('change', '.input_count', function(){
	var self = this;
	if($(this).val() > 0 && $(this).val() < 999){
		basket.forEach(function(item, i, arr) {
			if(item.id == $(self).attr('index')){
				item.count = $(self).val();
				item.cost = item.price * $(self).val();
				item.weight = 15 * $(self).val();
				return false;
			}
		});
	}
	var tr = '';
	basket.forEach(function(item, i, arr) {
		tr += '<tr>';
		tr +='<td><img src="'+item.img+'" alt=""><p>'+item.name+'</p></td>';
		tr +='<td>'+item.weight+' кг</td>';
		tr +='<td>'+item.price+' руб.</td>';
		tr +='<td><input min="1" max="999" class="input_count" type="number" index="'+item.id+'" value="'+item.count+'"</td>';
		tr +='<td>'+item.cost+' руб.</td>';
		tr +='<td><a href="#" class="delete_item" index="'+item.id+'"></a></td>';
		tr += '</tr>';
	});
	all();
	$('.basket_form table tbody').html(tr);
	
});

$('.basket_form').on('click', '.delete_item' , function(){
	var self = this;
	basket.forEach(function(item, i, arr) {
		if(item.id == $(self).attr('index')){
			basket.splice(i, 1);
			return false;
		}
	});
	$('.buy').each(function(index, el) {
		if($(el).attr('index') == $(self).attr('index')){
			$(el).removeClass('hover').text('В карзину');
		}
	});
	var tr = '';
	basket.forEach(function(item, i, arr) {
		tr += '<tr>';
		tr +='<td><img src="'+item.img+'" alt=""><p>'+item.name+'</p></td>';
		tr +='<td>'+item.weight+' кг</td>';
		tr +='<td>'+item.price+' руб.</td>';
		tr +='<td><input min="1" max="999" class="input_count" type="number" index="'+item.id+'" value="'+item.count+'"</td>';
		tr +='<td>'+item.cost+' руб.</td>';
		tr +='<td><a href="#" class="delete_item" index="'+item.id+'"></a></td>';
		tr += '</tr>';

	});
	all();
	$('.basket_form table tbody').html(tr);
	return false;
});


$('.basket').on('click', () =>{
	var tr = '';
	basket.forEach(function(item, i, arr) {
		tr += '<tr>';
		tr +='<td><img src="'+item.img+'" alt=""><p>'+item.name+'</p></td>';
		tr +='<td>'+item.weight+' кг</td>';
		tr +='<td>'+item.price+' руб.</td>';
		tr +='<td><input class="input_count" type="number" index="'+item.id+'" value="'+item.count+'"</td>';
		tr +='<td>'+item.cost+' руб.</td>';
		tr +='<td><a href="#" class="delete_item" index="'+item.id+'"></a></td>';
		tr += '</tr>';
	});
	$('.basket_form table tbody').html(tr);
	all();
	$('.windows').show();
	// return false;
});

function all(){
	var weight = 0;
	var cost = 0;
	basket.forEach(function(item, i, arr) {
		weight += parseInt(item.weight);
		cost += parseInt(item.cost);
	});
	$('.all_item .all_weight').text(weight);
	$('.all_item .all_cost').text(cost)
}

$(document).ready(function($) {
	$('.windows').height($('body').height());
});



$('.basket_form form').on('submit', function(e){
	e.preventDefault();
	var name = $(e.target).find('input[name=name]').val();
	var phone = $(e.target).find('input[name=phone]').val();
	var email = $(e.target).find('input[name=emal]').val();
	var address = $(e.target).find('textarea[name=address]').val();

	var formData = {
		name: name,
		phone: phone,
		email: email,
		address: address,
		basket: basket
	}

	$.ajax({
		url: 'http://localhost/send.php',
		type: 'post',
		dataType: 'html',
		data: formData,
		success: function (data) {
			if(data == 1){
				$('.windows').hide();
				$('.blocks').html('<div class="thank-you"><h1>Ваша заявка принята!</h1><h4>Благодарим Вас за заказ, менеджер свяжется <br />с Вами в ближайшее время</h4></div>')
			}
        }
	});
	
});