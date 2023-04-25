$(document).ready(function () {

  let amenities = {};

  $('input[type="checkbox"]').change(function() {
    if (this.checked) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    let amenitiesList = Object.values(amenities).join(', ');
    $('.amenities h4').text(amenitiesList);
  });

  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(url, function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: '{}',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(data) {
      for (let i = 0; i < data.length; i++) {
        $('section.places').append(`
          <article>
	  <div class="title_box">
	    <h2>${data[i].name}</h2>
	    <div class="price_by_night">$${data[i].price_by_night}</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">${data[i].max_guest}</div>
            <div class="number_rooms">${data[i].number_rooms}</div>
            <div class="number_bathrooms">${data[i].number_bathrooms}</div>
	  </div>
	  <div class="user">
            <b>Owner:</b>${data[i].user.first_name} ${data[i].user.last_name}
          </div>
          <div class="description">
	    ${data[i].description}
          </div>
	</article>
        `)};
      }
      });
});
