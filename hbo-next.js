/**
 * HBO Nordic next button
 *
 * Author: Hanif Bali
 * */


//First we have to determine were we are, and what episode HBO Nordic is playing.

// We support 2 diffrent states of playback, one from season list, one from episode page.

(function () {

    var timeout;

    // Episode page
    $(document).on("click", ".detail-container .poster-container a.watch-action", function () {

        $("#main-modal #hbo-next-btn").remove();

        var current_episode = parseInt($("figcaption .description h3").html().match(/E([0-9]{0,})/)[1]),
            next_episode = current_episode + 1;
        // Build next button;
        var $next_btn = $("<div id=\"hbo-next-btn\">Next Episode</div>").click(function () {
            $("#main-modal .close-modal").click();

            setTimeout(function () {
                $(".detail-container nav li.back a").click();

                if (!$(".episode-number:contains('" + next_episode + "')").length) {
                    return false;
                }
                $(".episode-number:contains('" + next_episode + "')").parents("figure").find("a.watch-action").trigger("click");

            }, 3000);

        });

        $(document).on("opened.hbo-next", "#main-modal", function (ev) {
            $("#main-modal #hbo-next-btn").remove();

            $("#main-modal .content .player-container").prepend($next_btn).mousemove(btnFade);
        });


    });

    // Season list
    $(document).on("click", "ul.media-list-series ul.media-actions a.watch-action", function (ev) {

        console.log("Clicked on list");

        // Get current episode ID
        var current_episode = parseInt($(this).parents("figure").find(".episode-number").html()),
            next_episode = current_episode + 1,
            $next_episode = $(".episode-number:contains('" + next_episode + "')");

        if (!$(".episode-number:contains('" + next_episode + "')").length) {
            return false;
        }

        var $next_btn = $("<div id=\"hbo-next-btn\">Next Episode</div>").click(function () {
            $("#main-modal .close-modal").click();
            setTimeout(function () {
                $(document).off("opened.hbo-next", "#main-modal");
                $next_episode.parents("figure").find("a.watch-action").click();
            }, 300);
        });

        $(document).on("opened.hbo-next", "#main-modal", function (ev) {
            console.log("Modal opened");
            $("#main-modal #hbo-next-btn").remove();

            $("#main-modal .content .player-container").prepend($next_btn).mousemove(function () {
                $next_btn.show("slow");
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(function () {
                    $next_btn.hide("slow")
                }, 3000);
            });
        });

    });

    // Button fade in and out function
    var btnFade = function () {
        $next_btn.show("slow");
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            $next_btn.hide("slow")
        }, 3000);
    }
})();