"use strict";function all(){var t=0,e=0;basket.forEach(function(i,a,n){t+=parseInt(i.weight),e+=parseInt(i.cost)}),$(".all_item .all_weight").text(t),$(".all_item .all_cost").text(e)}function updateBasket(){var t="";basket.forEach(function(e,i,a){t+="<tr>",t+='<td><img src="'+e.img+'" alt=""><p>'+e.name+"</p></td>",t+="<td>"+e.weight+" кг</td>",t+="<td>"+e.price+" руб.</td>",t+='<td><input class="input_count" type="number" index="'+e.id+'" value="'+e.count+'"</td>',t+="<td>"+e.cost+" руб.</td>",t+='<td><a href="#" class="delete_item" index="'+e.id+'"></a></td>',t+="</tr>"}),$(".basket_form table tbody").html(t),all()}$(".block3 .slider .img").each(function(t,e){t>2&&$(e).hide(),$(e).attr("index",t+1)});var coutSertificat=$(".block3 .slider .img").length+1;$(".block3 .next").on("click",function(){$(".block3 .back").show();var t=parseInt($($(".block3 .slider .img:visible")[2]).attr("index"))+1;coutSertificat==t+1&&$(".block3 .next").hide(),$($(".block3 .slider .img:visible")[0]).hide(),$(".block3 .slider .img").each(function(e,i){$(i).attr("index")==t&&$(i).show()})}),$(".block3 .back").on("click",function(){$(".block3 .next").show();var t=parseInt($($(".block3 .slider .img:visible")[0]).attr("index"))-1;1==t&&$(".block3 .back").hide(),$($(".block3 .slider .img:visible")[2]).hide(),$(".block3 .slider .img").each(function(e,i){$(i).attr("index")==t&&$(i).show()})}),$(".close, .close_button").on("click",function(){return $(".windows").hide(),!1}),$(".block2 .bl > div").each(function(t,e){$(e).find("a").attr("index",t+1)});var basket=[];$(".buy").on("click",function(t){var e=this,i=!0;if($(this).hasClass("hover"))$(this).removeClass("hover").text("В корзину"),basket.forEach(function(t,i,a){return t.id==$(e).attr("index")?(basket.splice(i,1),!1):void 0});else{if($(this).addClass("hover").text("Убрать из корзины"),basket.forEach(function(t,a,n){return t.id==$(e).attr("index")?(t.count=parseInt(t.count)+1,t.cost=parseInt(t.cost)+parseInt(t.price),i=!1,!1):void 0}),!i)return!1;basket.push({id:$(this).attr("index"),name:$(this).attr("item-name"),weight:$(this).attr("item-weight"),price:$(this).attr("item-price"),count:1,cost:$(this).attr("item-price"),img:$(this).parent().find("img").attr("src")})}return!1}),$(".basket_form").on("change",".input_count",function(){var t=this;$(this).val()>0&&$(this).val()<999&&basket.forEach(function(e,i,a){return e.id==$(t).attr("index")?(e.count=$(t).val(),e.cost=e.price*$(t).val(),e.weight=15*$(t).val(),!1):void 0});var e="";basket.forEach(function(t,i,a){e+="<tr>",e+='<td><img src="'+t.img+'" alt=""><p>'+t.name+"</p></td>",e+="<td>"+t.weight+" кг</td>",e+="<td>"+t.price+" руб.</td>",e+='<td><input min="1" max="999" class="input_count" type="number" index="'+t.id+'" value="'+t.count+'"</td>',e+="<td>"+t.cost+" руб.</td>",e+='<td><a href="#" class="delete_item" index="'+t.id+'"></a></td>',e+="</tr>"}),all(),$(".basket_form table tbody").html(e)}),$(".basket_form").on("click",".delete_item",function(){var t=this;basket.forEach(function(e,i,a){return e.id==$(t).attr("index")?(basket.splice(i,1),!1):void 0}),$(".buy").each(function(e,i){$(i).attr("index")==$(t).attr("index")&&$(i).removeClass("hover").text("В корзину")});var e="";return basket.forEach(function(t,i,a){e+="<tr>",e+='<td><img src="'+t.img+'" alt=""><p>'+t.name+"</p></td>",e+="<td>"+t.weight+" кг</td>",e+="<td>"+t.price+" руб.</td>",e+='<td><input min="1" max="999" class="input_count" type="number" index="'+t.id+'" value="'+t.count+'"</td>',e+="<td>"+t.cost+" руб.</td>",e+='<td><a href="#" class="delete_item" index="'+t.id+'"></a></td>',e+="</tr>"}),all(),$(".basket_form table tbody").html(e),!1}),$(".basket").on("click",function(){var t="";return basket.forEach(function(e,i,a){t+="<tr>",t+='<td><img src="'+e.img+'" alt=""><p>'+e.name+"</p></td>",t+="<td>"+e.weight+" кг</td>",t+="<td>"+e.price+" руб.</td>",t+='<td><input class="input_count" type="number" index="'+e.id+'" value="'+e.count+'"</td>',t+="<td>"+e.cost+" руб.</td>",t+='<td><a href="#" class="delete_item" index="'+e.id+'"></a></td>',t+="</tr>"}),$(".basket_form table tbody").html(t),all(),$(".windows").show(),!1}),$(document).ready(function(t){t(".windows").height(t("body").height())}),$(".basket_form form").on("submit",function(t){t.preventDefault();var e=$(t.target).find("input[name=name]").val(),i=$(t.target).find("input[name=phone]").val(),a=$(t.target).find("input[name=emal]").val(),n=$(t.target).find("textarea[name=address]").val(),d={name:e,phone:i,email:a,address:n,basket:basket};$.ajax({url:"./php/send.php",type:"post",dataType:"html",data:d,success:function(t){1==t&&($(".windows").hide(),$(".blocks").html('<div class="thank-you"><h1>Ваша заявка принята!</h1><h4>Благодарим Вас за заказ, менеджер свяжется <br />с Вами в ближайшее время</h4></div>'),setTimeout(function(){location.reload()},3e3))}})});