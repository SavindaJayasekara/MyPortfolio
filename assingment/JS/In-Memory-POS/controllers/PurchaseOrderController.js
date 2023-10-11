let today = new Date().toISOString().slice(0, 10);

$('#txtDate').css({
    color: 'green',
    fontWeight: '500'
});

$('#txtDate').val(today);

let finalTotal = 0;

$('#btnAddOrder').on('click', function () {

    let price = parseFloat($('#orderItemPrice').val());

    let total = price * parseInt($('#getQty').val());

    let list = $(`#order-tbl-body > tr > td:nth-child(1)`);

    for (const td of list) {
        if ($(td).text() == $('#selItemId').val()){
            let row  = $(td).parent();
            $(row).remove();
        }
    }

    $(`#order-tbl-body`).append(`<tr>
        <td>${$('#selItemId').val()}</td>
        <td>${$('#orderItemDesc').val()}</td>
        <td>${$('#orderItemPrice').val()}</td>
        <td>${$('#getQty').val()}</td>
        <td>${total}</td>
    </tr>`);


    let totalList = $(`#order-tbl-body > tr > td:nth-child(5)`);



    for (const total of totalList) {
        finalTotal += parseFloat( $(total).text());
    }

    $('#total').text(' '+ finalTotal + '/=');

    $('#subTotal').text(finalTotal + '/=');


});

function loadCustomerId() {
    for (const customer of customerDB) {
        $('#selCusId').append(`<option>${customer.id}</option>`);
    }
}

$('#selCusId').on('change', function () {
    let id = $('#selCusId').val();
    for (const customer of customerDB) {
        if (customer.id == id) {
            $('#orderCusName').val(customer.name);
            $('#orderCusAddres').val(customer.address);
            $('#orderCusTp').val(customer.tp);
        }
    }
    $('#selItemId').focus();
});


function loadAllItemId() {
    for (const item of itemDB) {
        $('#selItemId').append(`<option>${item.code}</option>`)
    }
}

$('#selItemId').on('change', function () {
    let id = $('#selItemId').val();
    for (const item of itemDB) {
        if (item.code == id) {
            $('#orderItemDesc').val(item.description);
            $('#orderItemPrice').val(item.unitPrice);
            $('#orderQty').val(item.qtyOnHand);
        }
    }
    $('#getQty').focus();
});

$('#txtDiscount').on('keyup change',function (){
    let currentDiscount = parseFloat($('#txtDiscount').val());

    let subTotal = finalTotal/100*currentDiscount;

    let final = finalTotal - subTotal;

    $('#subTotal').text(final + '/=');

});

$('#txtDiscount').val(0);

loadAllItemId();

loadCustomerId();