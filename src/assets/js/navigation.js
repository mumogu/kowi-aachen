$(document).ready(function() {

    $('div#nav-hamburger').click(function() {

        $('div#nav-hamburger').toggleClass('nav-rotated');

        $('div#nav-mobile').slideToggle('slow', function() {
            //complete
        })

    })

})