(function() {

    var quotes = $(".quotes");
    var quoteIndex = -1;

    function showNextQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(750)
            .delay(750)
            .fadeOut(750, showNextQuote);
    }

    showNextQuote();

})();
