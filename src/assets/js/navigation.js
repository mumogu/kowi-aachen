$(document).ready(function() {

    $('div#nav-hamburger').click(function() {

        console.log("clicked")

        $('div#nav-mobile').slideToggle('slow', function() {
            //complete
        })
    })

})