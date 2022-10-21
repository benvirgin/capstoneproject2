var authToken = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer BQDwBeEuyYEbIHtM55DhSwwDTx4aXldFAcnyzO33ju2R6kL3JBOHgOsEX8m1X2pyfiKft9TNdq4xYW8y8nsSp7GeT_9R9Zd0fEjYpgj9ELsQfIautegqNMwje6EHame6_752mWwPwVI8zYiEer00aw35s0GzACe-kXtwHJAZLji4qYvo5sUtoWJX8uWzfqcgW1a01gryXSKrHAxa0LxSFYgptUi5Gibj7NfQcl9aG3GYkPNUGfY'
};

async function addToPlaylist(id) {
    fetch('https://api.spotify.com/v1/playlists/2vKdozL3KSdkA9TrKlo3nA/tracks?uris=spotify%3Atrack%3A' + id, {
        method: 'POST',
        headers: authToken
    }).then((response) => response.json())
    .then((json) => console.log(json))
    .catch(error => console.log(error))
}

  var pre = document.getElementById('requested')
  window.onload = fetch('https://api.spotify.com/v1/playlists/2vKdozL3KSdkA9TrKlo3nA/tracks?fields=items(track(name%2Cartists(name)))', {
    method: 'GET',
    headers: authToken
  })
    .then((response) => {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        data.items.forEach((item)=>{
            var artistString = getArtist(item.track['artists']);
            $("#requested").append(`<pre>${item.track.name} - ${artistString}</pre>`);
        })
    })
    .catch(error => console.log(error));

    function getArtist(artists) {
        let artistString = '';
        var counter = 1;
        artists.forEach((artist)=>{
            if (counter == 1) {
                artistString = artistString + ' ' + artist.name;
            } else {
                artistString = artistString + ' / ' + artist.name;
            } 
            counter++;
        });
        return artistString;
    }

    $(function() {
        $(".rslides").responsiveSlides();
      });
    
    $('.at_expand').on('focus', function () {
        $(this).attr('height-default', 47);
        $(this).animate({height: 57}, 'slow');
    }).on('blur', function () {
        var default_height = $(this).attr('height-default');
        $(this).animate({height: default_height}, 'slow');
    });
    
    (function() {
        $('form > input').on('keyup', function() {
            var x = $("#song").val();
            x = $('<div>').text(x).html();
            var options = getSearchResults(x);
            var empty = false;
            $('form > input').each(function() {
                if ($(this).val() == '') {
                    empty = true;
                }
            });
            if (empty) {
                $('#song').css('background-color', 'var(--primary-color)');
                $('#song').attr('placeholder', '');
            } else {
                $('#song').css('background-color', 'white');
            }
        });
    })();
    
    function getSearchResults(search) {
        $.ajax({
            url: "https://api.spotify.com/v1/search?type=track&limit=10&q=" + search, 
            headers: authToken,
            success: function(result){
                $('#results').html('');
                console.log(result);
                var counter = 1;
                var spacer = '';
                result.tracks.items.forEach((song)=>{
                    var requestedTrackButton = '<div class="result"><button type="button" class="btn btn-outline-dark" id="buttonAdd'+counter+'" onclick="addToPlaylist(\'' + song.id + '\')" style="width: 100%; border: 1px black;"></button></div>';
                    if (counter > 1) {
                        spacer = ' / ';
                    }
                    $('#results').append(requestedTrackButton);
                    var artistString = getArtist(song.artists);
                    $('#buttonAdd'+counter).html(song.name + " - " + artistString);
                    counter++;
                })
            }
        });
    }

    var form = document.querySelector('form');
    $("#refreshButton").on('click', function (e) {
        e.preventDefault();
        form.submit();
        setTimeout(pageReload, 1000);
    });
    
    function pageReload() {
        window.location.reload();
    };