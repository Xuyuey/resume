$(function(){
	$('.del').click(function(e){
		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.item-id-'+id)
		var from = target.data('from')
		
		if (from =='paper'){
			$.ajax({
				type: 'DELETE',
				url: '/admin/paper/list?id=' +id
			})
			.done(function(results){
				if(results.success ===1){
					if (tr.length > 0){
						tr.remove()
					}
				}
			})
		}else if(from =='patent'){
			$.ajax({
				type: 'DELETE',
				url: '/admin/patent/list?id=' +id
			})
			.done(function(results){
				if(results.success ===1){
					if (tr.length > 0){
						tr.remove()
					}
				}
			})
		}
	})
})