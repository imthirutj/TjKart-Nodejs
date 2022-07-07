function ConfirmForm(id) {
    $("#prodId").val(id);
	$("#BlockUIConfirm").show();
}

function ConfirmFormDet(id,qty) {
    $("#prodId").val(id);
	$("#xqty").val(qty);

	console.log(qty);
	$("#BlockUIConfirm").show();
}

function Submit() {
	
	$('#BlockUIConfirm').hide();
}