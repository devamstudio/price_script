//data
var price_list = new Array();
//triggers
var price_count = 1;
var coef = 1;
var parent_section = 1;
////
var option_edition_title = '';
var option_edition = new Array();
//
var option_attrib_title = 'Цветность';
var option_attrib = new Array();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// get coef
    coef = parseFloat($("#coef").text());
	//get triggers globe
	price_count = $('.price_section').length;
	//get options edition
	$('.price_section:first-child table tr').eq(0).find('td').each(function(){
		option_edition.push( $(this).text() );
	})
	option_edition_title = option_edition.splice(0, 1);
	//get options color
	
	$('.price_section:first-child table tr').each(function(){
		option_attrib.push( $(this).find('td:first-child').text() );
	})
	option_attrib.splice(option_attrib.indexOf('Тираж'), 1);
	
	// get data
	$('.price_section').each(function(){
		//get/write
		var price_table = new Object();
		price_table.title = $(this).find('.title').text();
		price_table.descr = $(this).find('.descr').text();
		//ghost data
		var gh_prices = new Array();
		var gh_height = $(this).find('tbody > tr').length;
		var gh_width = $(this).find('tbody > tr:first-child td').length - 1;
		console.log(gh_height)
		console.log(gh_width)
		for(var i = 0; i < gh_height; i++)
		{
			for(var j = 0; j < gh_width; j++)
			{
				var gh_obj = new Object();
				gh_obj.edition = option_edition[j];
				gh_obj.attrib = option_attrib[i];
				gh_obj.price = $(this).find('table tbody tr').eq(i).find('td').eq(j+1).text();
				//push
				gh_prices.push(gh_obj);
			}
		}
		//
		price_table.table = gh_prices;
		console.log(price_table.table[0])
		//push
		price_list.push(price_table);
	})
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	//write calc
	$(".calculator").append('<div class="calculator_form"></div><p class="clearfix summ text-center">Цена: <b><span id="price_value">500</span> руб.</b></p>');
	////variants
	if(price_count != 1)
	{
		$('.calculator_form').append('<div class="row"><select class="price_list_type col-12"></select></div>');
		for(var i = 0; i < price_list.length; i++)
		{
			$('.price_list_type').append("<option val="+i+">"+price_list[i].title+"</option>");
		}
	}
	$('.calculator_form').append('<div class="row"><div class="col-5 text-right">'+option_edition_title+'</div><select class="price_option_edition col-7"></select></div>');
	for(var i = 0; i < option_edition.length; i++)
	{
		$('.price_option_edition').append("<option val="+i+">"+option_edition[i]+"</option>");
	}
	if(option_attrib.length != 1)
	{
		$('.calculator_form').append('<div class="row"><div class="col-5 text-right">'+option_attrib_title+'</div><select class="price_option_attrib col-7"></select></div>');
		for(var i = 0; i < option_attrib.length; i++)
		{
			$('.price_option_attrib').append("<option val="+i+">"+option_attrib[i]+"</option>");
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	//operate calc
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	//console log
	console.log('Кол-во таблиц: '+price_count)
	console.log('Опции тираж: '+option_edition)
	console.log('Опции цветность: '+option_attrib)
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
});