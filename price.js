//data
var price_list = new Array();
//triggers
var price_count = 1;
var coef = 1;
var parent_section = 0;
var price_current = 0;
////
var option_edition_title = 'Тираж';
var option_edition = new Array();
//
var option_attrib_title = '';
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
	option_attrib_title = option_edition.splice(0, 1);
	//get options color
	
	$('.price_section:first-child table tr').each(function(){
		option_attrib.push( $(this).find('td:first-child').text() );
	})
	option_attrib.splice(0, 1);
	
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
		//console.log(gh_height)
		//console.log(gh_width)
		var start_string = 0;
		if( $(this).find('table *').is('thead') ) 
		{
			start_string = 0;
			//option_attrib_title = $(this).find('table thead tr').eq(0).find('td').eq(0).text;
		}
		else 
		{
			start_string = 1;
			//option_attrib_title = $(this).find('table tr td').eq(0).text;
		}
		for(var i = start_string; i < gh_height; i++)
		{
			for(var j = 0; j < gh_width; j++)
			{
				var gh_obj = new Object();
				gh_obj.edition = option_edition[j];
				gh_obj.attrib = option_attrib[i];
				gh_obj.price = $(this).find('table tbody tr').eq(i).find('td').eq(j+1).text();
				//console.log(gh_obj.price)
				//push
				gh_prices.push(gh_obj);
			}
		}
		//
		price_table.table = gh_prices;
		//push
		price_list.push(price_table);
	})
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	//write calc
	$(".calculator").append('<div class="calculator_form col-12 pb-3"></div><p class="clearfix summ text-center">Цена: <b><span id="price_value"></span> руб.</b></p><p><small id="price_descr"></small></p>');
	////variants
	if(price_count != 1)
	{
		$('.calculator_form').append('<div class="row form-group"><select class="price_option price_option_type col-12 form-control"></select></div>');
		for(var i = 0; i < price_list.length; i++)
		{
			$('.price_option_type').append("<option value="+i+">"+price_list[i].title+"</option>");
		}
	}
	$('.calculator_form').append('<div class="row form-group"><div class="col-5 text-right my-1 col-form-label">'+option_edition_title+'</div><select class="price_option price_option_edition col-7 my-1 form-control"></select></div>');
	for(var i = 0; i < option_edition.length; i++)
	{
		$('.price_option_edition').append("<option value="+option_edition[i]+">"+option_edition[i]+"</option>");
	}
	if(option_attrib.length != 1)
	{
		$('.calculator_form').append('<div class="row form-group"><div class="col-5 text-right my-1 col-form-label">'+option_attrib_title+'</div><select class="price_option price_option_attrib col-7 my-1 form-control"></select></div>');
		for(var i = 0; i < option_attrib.length; i++)
		{
			$('.price_option_attrib').append("<option value="+option_attrib[i].replace(/ /g,'_')+">"+option_attrib[i]+"</option>");
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	//init price on page
	price_output();
	//init price on page END
	
	//operate calc
	$('.price_option').on('change', function(){
		price_output();
	})
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	//console log
	//console.log('Кол-во таблиц: '+price_count)
	//console.log('Опции тираж: '+option_edition)
	//console.log('Опции цветность: '+option_attrib)
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
});

//output price
function price_output()
{
	var tmp_case = 0;
	var tmp_parent = 0;
	var tmp_attrib = 0;
	//check type
	if( $('*').is('.price_option_type') )
	{
		tmp_parent = $('.price_option_type').val();
		console.log('Есть родитель: '+tmp_parent)
	}
	else 
	{
		tmp_parent = parent_section;
		console.log('Нет родителя: '+tmp_parent)
	}
	//check type END
	//check edition
	var tmp_edition = $('.price_option_edition').val();
	//check edition END
	//check second attrib
	if( $('*').is('.price_option_attrib') )
	{
		tmp_attrib = $('.price_option_attrib').val().replace(/ /g,"_");
		tmp_case = 1;
	}
	//check second attrib
	
	//compare object
	console.log(price_list[tmp_parent].table.length)
	for(var i = 0; i < price_list[tmp_parent].table.length; i++)
	{
		if(tmp_case === 0)
		{
			if(price_list[tmp_parent].table[i].edition == tmp_edition)
			{
				price_current = price_list[tmp_parent].table[i].price
			}
		}
		else if(tmp_case === 1)
		{
			if(price_list[tmp_parent].table[i].edition == tmp_edition && price_list[tmp_parent].table[i].attrib.replace(/ /g,'_') == tmp_attrib)
			{
				price_current = price_list[tmp_parent].table[i].price
			}
		}
	}
	//compare object END
	// write price
	$('#price_value').text(price_current*coef)
	$('#price_descr').text(price_list[tmp_parent].descr)
	
}