var authToken = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer BQBQ56qt6F-tC--4JOJfoYAvfqrpszxXHm8Izi3ITWqxDJMQz2SDjFPdAuDQS1cNLQqasb1FaLx2n-CgsRbDLWxTBCOTEhoHONMBZHczDfrzLtu9BmYd9_uX-I20PDddmKUl-p1K9IQyTmHJs1faByX5rjM0-bN90L18VS_t1r8Mc48-QzE52KBtMQbGNhk737GeqAuk7qVMv0E09NVvM0mYXe_lPDgrBIvmKRP5htTbI1w5vXI'
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
        var pre = document.getElementById('requested')
        fetch('https://api.spotify.com/v1/playlists/2vKdozL3KSdkA9TrKlo3nA/tracks?fields=items(track(name%2Cartists(name)))', {
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
    });