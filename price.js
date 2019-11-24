// INIT SETTINGS
var tbf_s = new Object();
// Design
tbf_s.d_header = 'mb-3 text-center';
tbf_s.d_fields = new Object();
tbf_s.d_fields.offset = 'py-1';
// INIT SETTINGS END

// INIT DATA
var tbf_class = new Array();
var tbf_object_parent = 0;

// INIT DATA END


$(document).ready(function(){
	if( $(".tbf_object").length > 0 ){
		// SET AND GET SETTINGS
		// Properties
		tbf_s.p_multiplier = 1;
		tbf_s.p_result = 0;
		tbf_s.p_number = $('.tbf_object').length;
		tbf_s.p_categories = $(".tbf_filter").data('property-categories');
		tbf_s.p_edition = new Array();
		tbf_s.p_second_parametr = new Array();
		// Triggers
		if( $(".tbf_filter").data('property-categories') ) tbf_s.tr_categories = true;
		tbf_s.tr_description = $(".tbf_filter").data('trigger-description');
		tbf_s.tr_categories_click_reload = $(".tbf_filter").data('trigger-categories-click-reload');
		//tbf_s.tr_ = ;
		// Titles
		tbf_s.t_header = 'Расчет стоимости'; //Default value
		if( $(".tbf_filter").data('title-header') ) tbf_s.t_header = $(".tbf_filter").data('title-header');
		tbf_s.t_edition_title = 'Тираж'; //Default value
		if( $(".tbf_filter").data('title-edition-parametr') ) tbf_s.t_edition_title = $(".tbf_filter").data('title-edition-parametr');
		tbf_s.t_second_parametr_title = $('.tbf_object').eq(0).find('table tr').eq(0).find('td').eq(0).text();
		if( $(".tbf_filter").data('title-additional-parametr') ) tbf_s.t_second_parametr_title = $(".tbf_filter").data('title-additional-parametr');
		//tbf_s.r_ = ;
		// SET AND GET SETTINGS END

		get_values();
		write_on_page();
		price_output();
	}
	
	//operate calc
	$(document).on('change', '.tbf_property', function(){
		price_output();
	})
	//
	$('.tbf_property_type').on('change', function(){
		if( tbf_class[0].table[0].edition != tbf_class[1].table[0].edition )
		{
			var tmp_current = $('.tbf_property_type').val()
			get_edition( tmp_current );
			get_second_attrib( tmp_current );
			output_edition('reload');
			output_second_parametr();
		}
		price_output();
	})
	//view categories
	$('.tbf_property_category label').click(function(){
		setTimeout(function(){
			category_output();
		}, 10)
	})
});

function get_values()
{
	//get triggers globe
	tbf_s.p_number = $('.tbf_object').length;
	get_edition(0);
	get_second_attrib(0);
	// get data
	$('.tbf_object').each(function(){
		//get/write
		var tbf_object = new Object();
		if( $(this).data('category') ) tbf_object.category = $(this).data('category');
		tbf_object.title = $(this).data('title');
		if( $(this).data('description') ) tbf_object.descr = $(this).data('description');
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
		}
		else 
		{
			start_string = 1;
		}
		for(var i = start_string; i < gh_height; i++)
		{
			for(var j = 0; j < gh_width; j++)
			{
				
				var gh_obj = new Object();
				//
				gh_obj.edition = $(this).find('table tr').eq(0).find('td').eq(j+1).text().trim().replace(/ /g,'_');
//				var gh_edition_from_table = $(this).find('table tr').eq(0).find('td').eq(j+1).text().replace(/ /g,'_').trim();
				//console.log('Вертикаль: '+(i+1))
				//console.log('Горизонталь: '+(j+1))
//				console.log(gh_edition_from_table);
//				if ( gh_edition_from_table != tbf_s.p_edition[j].replace(/ /g,'_').trim() ) gh_obj.edition = gh_edition_from_table;
//				else gh_obj.edition = tbf_s.p_edition[j].replace(/ /g,'_').trim();
				//
				gh_obj.attrib = $(this).find('table tbody tr').eq(i).find('td:first-child').text().trim();
//				var gh_attrib_from_table = $(this).find('table tbody tr').eq(i).find('td:first-child').text().trim();
//				if ( gh_attrib_from_table != tbf_s.p_second_parametr[i] ) gh_obj.attrib = gh_attrib_from_table;
//				else gh_obj.attrib = tbf_s.p_second_parametr[i];
				//console.log(gh_obj.attrib)
				
				//gh_obj.price = $(this).find('table tbody tr').eq(i).find('td').eq(j+1).text().trim(); // Только текст
				gh_obj.price = $(this).find('table tbody tr').eq(i).find('td').eq(j+1).html().trim();
				//console.log(gh_obj.price);
				//push
				gh_prices.push(gh_obj);
				
			}
			
		}
		//
		tbf_object.table = gh_prices;
		//push
		tbf_class.push(tbf_object);
	})
	//console.log(tbf_class);
}
function get_edition(counter)
{
	tbf_s.p_edition.splice(0, tbf_s.p_edition.length);
	//get options edition
	$('.tbf_object').eq(counter).find('table tr').eq(0).find('td').each(function(){
		tbf_s.p_edition.push( $(this).text().trim() );
	})
	tbf_s.p_edition.splice(0, 1);
}
function get_second_attrib(counter)
{
	tbf_s.p_second_parametr.splice(0, tbf_s.p_second_parametr.length);
	$('.tbf_object').eq(counter).find('table tr').each(function(){
		tbf_s.p_second_parametr.push( $(this).find('td:first-child').text().trim() );
	})
	tbf_s.p_second_parametr.splice(0, 1);
}


function write_on_page()
{
	//write calc
	$(".tbf_filter").prepend('<h4 class="h3 '+tbf_s.d_header+'">'+tbf_s.t_header+'</h4>');
	$(".tbf_filter").append('<div class="tbf_filter_form col-12 pb-3"></div><p class="text-center">Цена: <b class="text-primary"><span id="tbf_result"></span> руб.</b></p>');
	if( tbf_s.tr_description != false )
	{
		$(".tbf_filter").append('<p class="text-center"><small id="tbf_result_description"></small></p>');
	}
	//output elements
	output_categories();
	output_variants();
	output_edition();
	output_second_parametr();
	//output elements END
}
function output_categories(action)
{
	////categories
	if( tbf_s.tr_categories )
	{
		$('.tbf_filter_form').append('<div class="row"><div class="btn-group col px-0 mb-3 tbf_property tbf_property_category" data-toggle="buttons"></div></div>');
		for(var i = 0; i < tbf_s.p_categories.length; i++)
		{
			if( i==0 ) 
			{
				$('.tbf_property_category').append('<label class="btn btn-primary col-form-label active"><input class="tbf_property_category_input" type="radio" value="'+tbf_s.p_categories[i]+'" name="price_category" id="option'+i+'" autocomplete="off" checked>'+tbf_s.p_categories[i]+'</label>');
			}
			else
			{
				$('.tbf_property_category').append('<label class="btn btn-primary col-form-label"><input class="tbf_property_category_input" type="radio" value="'+tbf_s.p_categories[i]+'" name="price_category" id="option'+i+'" autocomplete="off">'+tbf_s.p_categories[i]+'</label>');
			}
		}
	}
	////categories END
}
function output_variants(action)
{
	////variants
	if( tbf_s.p_number != 1 )
	{
		$('.tbf_filter_form').append('<div class="row form-group '+tbf_s.d_fields.offset+'"><select class="tbf_property tbf_property_type col-12 form-control"></select></div>');
		for(var i = 0; i < tbf_class.length; i++)
		{
			if( tbf_s.tr_categories )
			{
				if( tbf_class[i].category == $('.tbf_property_category label.active input').val() )
				{
					$('.tbf_property_type').append("<option value='"+i+"' data-category='"+tbf_class[i].category+"'>"+tbf_class[i].title+"</option>");
				}
			}
			else
			{
				$('.tbf_property_type').append("<option value='"+i+"'>"+tbf_class[i].title+"</option>");
			}
		}
	}
	////variants END
}
function output_edition(action)
{
	////edition
	if( action == 'reload' )
	{
		$('.tbf_filter_form').find('.tbf_property_edition option').remove();
	}
	else
	{
		$('.tbf_filter_form').append('<div class="row form-group '+tbf_s.d_fields.offset+'"><div class="col-5 text-right col-form-label">'+tbf_s.t_edition_title+'</div><select class="tbf_property tbf_property_edition col-7 form-control"></select></div>');
	}
	//console.log(tmp_current_variant);
	for(var i = 0; i < tbf_s.p_edition.length; i++)  //tbf_s.p_edition.length
	{
		$('.tbf_property_edition').append("<option value="+tbf_s.p_edition[i].replace(/ /g,'_')+">"+tbf_s.p_edition[i]+"</option>");
	}
	////edition END
}
function output_second_parametr(action)
{
	$('.tbf_property_attrib').parent('.row').remove();
	////addition attribute
	if( action == 'reload' )
	{
		$('.tbf_filter_form').find('.tbf_property_attrib').find('option').remove();
	}
	if(tbf_s.p_second_parametr.length != 1)
	{
		$('.tbf_filter_form').append('<div class="row form-group '+tbf_s.d_fields.offset+'"><div class="col-5 text-right col-form-label">'+tbf_s.t_second_parametr_title+'</div><select class="tbf_property tbf_property_attrib col-7 form-control"></select></div>');
		for(var i = 0; i < tbf_s.p_second_parametr.length; i++)
		{
			
			$('.tbf_property_attrib').append("<option value="+tbf_s.p_second_parametr[i].replace(/ /g,'_')+">"+tbf_s.p_second_parametr[i]+"</option>");
		}
	}
	////addition attribute END
}

//output category
function category_output()
{
	$('.tbf_property_type option').remove();
	for(var i = 0; i < tbf_class.length; i++)
	{
		if( tbf_class[i].category == $('.tbf_property_category .active input').val() )
		{
			$('.tbf_property_type').append("<option value='"+i+"' data-category='"+tbf_class[i].category+"'>"+tbf_class[i].title+"</option>");
		}
	}
	if( tbf_s.tr_categories_click_reload == true )
	{
		
	}
	price_output();
}
//output category END

//output price
function price_output()
{
	var tmp_case = 0;
	var tmp_parent = 0;
	var tmp_attrib = 0;
	//check type
	if( $('*').is('.tbf_property_type') )
	{
		tmp_parent = $('.tbf_property_type').val();
		//console.log('Есть родитель: '+tmp_parent)
	}
	else 
	{
		tmp_parent = tbf_object_parent;
		//console.log('Нет родителя: '+tmp_parent)
	}
	//check type END
	//check edition
	var tmp_edition = $('.tbf_property_edition').val();
	//check edition END
	//check second attrib
	if( $('*').is('.tbf_property_attrib') )
	{
		tmp_attrib = $('.tbf_property_attrib').val().replace(/ /g,"_");
		tmp_case = 1;
	}
	//check second attrib
	//compare object
	
	//console.log(tbf_class[tmp_parent].table)
	for(var i = 0; i < tbf_class[tmp_parent].table.length; i++)
	{
		
		if(tmp_case === 0)
		{
			if(tbf_class[tmp_parent].table[i].edition == tmp_edition)
			{
				tbf_s.p_result = tbf_class[tmp_parent].table[i].price
			}
		}
		else if(tmp_case === 1)
		{
			
			if(tbf_class[tmp_parent].table[i].edition == tmp_edition && tbf_class[tmp_parent].table[i].attrib.replace(/ /g,'_') == tmp_attrib)
			{
				tbf_s.p_result = tbf_class[tmp_parent].table[i].price
			}
		}
	}
	//compare object END
	// write price
	//$('#tbf_result').text(tbf_s.p_result*tbf_s.p_multiplier) С множителем
	$('#tbf_result').html(tbf_s.p_result)
	$('#tbf_result_description').html(tbf_class[tmp_parent].descr)
	
}
//output price END