$.ajax({
    url: 'https://corebiz-test.herokuapp.com/api/v1/products',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(data);
        var list = ''; 
        
        $.each(data, function (key, value) { 
            list += '<div class="col"><div class="products-item"><img src="'+value.imageUrl+'">' 
            list += '<div class="name">' + value.productName + '</div>'; 
            list += '<div class="old-price">' + value.listPrice + '</div>'; 
            list += '<div class="price">' + value.price + '</div></div></div>'; 
        }); 
        $('#products').append(list);
    },
    error: function (error) {
        console.log(error);
    }
});
/*

        for (var i=0; i<data.length; i++){
            $('#products').append('<div class="product-item">'+ data[i].productName+'</div>');
        }
*/