var commondataformat = 'dd-mm-yyyy';
$(function () {
    
    $(document).on('click', '.openForm', function(){
            	if(!$('.collapse-form').hasClass('open')){
            		$('.collapse-form').slideDown();
            		$('.collapse-form').addClass('open');
            		$('.openForm').html("Hide Filter");



            	}
            	else{
            		$('.collapse-form').slideUp();
            		$('.collapse-form').removeClass('open');
            		$('.openForm').html("Show Filter");

            	}
            });
            
            
	$('.kt-select2').select2({
		placeholder: "Please Select"
	});

	$(document).off('click', '#status-record').on('click', '#status-record', function(){
		var dataaction 	= 	$(this).data('action');
		var dataid 		= 	$(this).data('id');
		var url 		=	baseurl+'/status/'+dataaction+'/'+dataid;
		swal.fire({
			buttonsStyling: false,
			text: $(this).attr('data-text'),
			type: "warning",
			confirmButtonText: $(this).attr('data-confirmButtonText'),
			confirmButtonClass: "btn btn-sm btn-bold btn-danger",
			showCancelButton: true,
			cancelButtonText: $(this).attr('data-cancelButtonText'),
			cancelButtonClass: "btn btn-sm btn-bold btn-brand"
		}).then(function (result) {
			if (result.value) {
				$.ajax({
					url 	: 	url,
					method 	: 	'POST',
					data 	: 	{ "_token": $('meta[name="csrf-token"]').attr('content') },
					beforeSend: loaderOn,
					complete: loaderOff,
					success: function(data) {
						if(data.status){
							toastr.success(data.msg);
							KTAppUserListDatatable.refresh();
						}
						else{
							toastr.error(data.msg);
						}
					}
				});
			}
		});
	});

	$(document).off('click', '#delete-record').on('click', '#delete-record', function(){
		var dataaction 	= 	$(this).data('action');
		var dataid 		= 	$(this).data('id');
		var url 		=	baseurl+'/admin/destroy/'+dataaction+'/'+dataid;
		swal.fire({
			buttonsStyling: false,
			text: $(this).attr('data-text'),
			type: "danger",
			confirmButtonText: $(this).attr('data-confirmButtonText'),
			confirmButtonClass: "btn btn-sm btn-bold btn-danger",
			showCancelButton: true,
			cancelButtonText: $(this).attr('data-cancelButtonText'),
			cancelButtonClass: "btn btn-sm btn-bold btn-brand"
		}).then(function (result) {
			if (result.value) {
				$.ajax({
					url 	: 	url,
					method 	: 	'POST',
					data 	: 	{ "_token": $('meta[name="csrf-token"]').attr('content') },
					beforeSend: loaderOn,
					complete: loaderOff,
					success: function(data) {
						if(data.status){
							toastr.success(data.msg);
							KTAppUserListDatatable.refresh();
						}
						else{
							toastr.error(data.msg);
						}
					}
				});
			}
		});
	});

	setTimeout(function(){
		$('.alert').fadeOut();
	},4000);
});

/** create random string javascript****/
function getRandomString(){
	var uid = (new Date().getTime());
	return uid;
}

/*** select 2 ***/
$(document).ready(function(){
	$('.select2-sel').select2();
});


/** Loader On ****/
function loaderOn(){
	$(".loader").show();
}

/** Loader Off ****/
function loaderOff(){
	$(".loader").hide();
}

$(document).ready(function(){
	$(document).on("click", "#saveSubmitButton", function(){
		swal.fire({
			buttonsStyling: false,
			text: $(this).attr('data-confirmpopuptext'),
			type: "danger",
			confirmButtonText: $(this).attr('data-confirmpopupyes'),
			confirmButtonClass: "btn btn-sm btn-bold btn-danger",
			showCancelButton: true,
			cancelButtonText: $(this).attr('data-confirmpopupno'),
			cancelButtonClass: "btn btn-sm btn-bold btn-brand"
		}).then(function (result) {
			if (result.value) {
				$('#confirmemail').val(1);
			}
			else{
				$('#confirmemail').val(0);
			}
			$('#donation-confirm-form').append("<input type='hidden' name='saveSubmitButton' value='1' />");
			$("#donation-confirm-form").submit();
		});
	});
});