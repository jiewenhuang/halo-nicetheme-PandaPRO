/*
            /$$
    /$$    /$$$$
   | $$   |_  $$    /$$$$$$$
 /$$$$$$$$  | $$   /$$_____/
|__  $$__/  | $$  |  $$$$$$
   | $$     | $$   \____  $$
   |__/    /$$$$$$ /$$$$$$$/
          |______/|_______/
================================
        Keep calm and get rich.
                    Is the best.
*/
/* ---------------------------------------------- /*
	* POPUP 
/* ---------------------------------------------- */
if (typeof jQuery != "undefined") {
    var $ = jQuery.noConflict();
}

function cookieExists(id) {
    return document.cookie.split(";").some((item) => item.includes(`${id}=`));
}

function ncPopupTips(type, msg) {
    var c = type ? "success" : "error";
    var html =
        '<div class="nice-popup nice-popup-sm nice-popup-error ' +
        c +
        '">' +
        '<div class="nice-popup-body">' +
        '<div class="nice-popup-content">' +
        msg +
        "</div>" +
        "</div>" +
        "</div>";
    var tips = $(html);
    $("body").append(tips);
    setTimeout(function () {
        tips.addClass("nice-popup-open");
    }, 300);
    if (typeof lazyLoadInstance !== "undefined") {
        lazyLoadInstance.update();
    }

    setTimeout(function () {
        tips.removeClass("nice-popup-open");
        setTimeout(function () {
            setTimeout(function () {
                tips.remove();
            }, 300);
        }, 600);
    }, 1200);
}

function ncPopup(type, html, maskStyle, btnCallBack) {
    var maskStyle = maskStyle ? 'style="' + maskStyle + '"' : "";

    var size = "";

    if (type == "big") {
        size = "nice-popup-lg";
    } else if (type == "no-padding") {
        size = "nice-popup-nopd";
    } else if (type == "cover") {
        size = "nice-popup-cover nice-popup-nopd";
    } else if (type == "full") {
        size = "nice-popup-xl";
    } else if (type == "scroll") {
        size = "nice-popup-scroll";
    } else if (type == "middle") {
        size = "nice-popup-md";
    } else if (type == "small") {
        size = "nice-popup-sm";
    }

    var template =
        '\
	<div class="nice-popup nice-popup-center ' +
        size +
        '">\
		<div class="nice-popup-overlay" ' +
        maskStyle +
        '></div>\
		<div class="nice-popup-body">\
			<div class="nice-popup-close">\
				<span class="svg-white"></span>\
				<span class="svg-dark"></span>\
			</div>\
			<div class="nice-popup-content">\
				' +
        html +
        "\
			</div>\
		</div>\
	</div>\
	";

    var popup = $(template);
    $("body").append(popup);
    $("body").addClass("nice-popup-hidden");
    setTimeout(function () {
        popup.addClass("nice-popup-open");
    }, 300);
    if (typeof lazyLoadInstance !== "undefined") {
        lazyLoadInstance.update();
    }

    var close = function () {
        $("body").removeClass("nice-popup-hidden");
        $(popup).removeClass("nice-popup-open");
        setTimeout(function () {
            setTimeout(function () {
                popup.remove();
            }, 300);
        }, 600);
    };

    $(popup).on(
        "click touchstart",
        ".nice-popup-close, .nice-popup-overlay",
        function (event) {
            event.preventDefault();
            close();
        }
    );

    if (typeof btnCallBack == "object") {
        Object.keys(btnCallBack).forEach(function (key) {
            $(popup).on("click touchstart", key, function (event) {
                var ret = btnCallBack[key](event, close);
            });
        });
    }
    return popup;
}

$(document).on("click", ".switch-dark-mode", function (event) {
    event.preventDefault();
    setColorScheme(currentColorScheme === "dark" ? "light" : "dark", true);
});

$(document).on("click", ".wechat-popup", function (event) {
    event.preventDefault();
    var img = $(this).data("img");
    var html =
        '<div class="text-center"> \
				<img src="' +
        img +
        '" style="width:100%;height:auto;">\
				</div>';
    ncPopup("small", html);
});


/* ---------------------------------------------- /*
    * Pwd Input type
/* ---------------------------------------------- */

function handleToc() {
    if ($(".toc").length === 0) return;

    var headerEl = "h2,h3,h4",
        content = ".toc-class",
        idArr = {};

    if ($(".post-content").find(headerEl).length === 0) {
        $("#widget-toc").hide();
        return;
    }

    $(".post-content").find(headerEl).parent().addClass("toc-class");

    $(content)
        .children(headerEl)
        .each(function () {
            var headerId = $(this)
                .text()
                .replace(
                    /[\s|\~|`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\+|\=|\||\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\：|\，|\。]/g,
                    ""
                );

            headerId = headerId.toLowerCase();
            if (idArr[headerId]) {
                $(this).attr("id", headerId + "-" + idArr[headerId]);
                idArr[headerId]++;
            } else {
                idArr[headerId] = 1;
                $(this).attr("id", headerId);
            }
        });

    tocbot.init({
        tocSelector: ".toc",
        contentSelector: content,
        headingSelector: headerEl,
        positionFixedSelector: ".toc",
        positionFixedClass: "is-position-fixed",
        scrollSmooth: true,
        scrollSmoothOffset: -100,
        headingsOffset: 100,
    });
}

$(document).ready(function () {
    $("[v-cloak]").removeAttr("v-cloak");

    var $body = $("body");
    /* ---------------------------------------------- /*
    * Header Fixed
/* ---------------------------------------------- */
    if ($("header").length) {
        var innerHeight = window.innerHeight;
        var mainHeight = $(".site-main").innerHeight() - 100;
        var menuOffset = $(".site-navbar").offset().top;
        $(window).scroll(function () {
            var amountScrolled = $(window).scrollTop();
            if (innerHeight < mainHeight) {
                if (amountScrolled > menuOffset) {
                    $(".site-navbar").addClass("navbar-sticky");
                } else {
                    $(".site-navbar").removeClass("navbar-sticky");
                }
            }
        });
    }

    handleToc();

    $(".sidebar").theiaStickySidebar({
        additionalMarginTop: 20,
        additionalMarginBottom: 100,
    });
    /*
        site mobile-sidebar-tab-menu
        ----------------------------------------------------
    */
    if ($(".navbar-site li").hasClass("menu-item-has-children")) {
        $(".navbar-site .menu-item-has-children")
            .children("a")
            .append('<span class="menu-sign"></span>');
    }
    /*
  site aside toggle
  ----------------------------------------------------
  */
    $body = $("body");
    $overflow = $(".mobile-overflow");
    $aside = $(".mobile-aside");
    $toggle_button = $(".aside-toggle");
    $toggle_button.click(function (event) {
        event.preventDefault();
        $body.toggleClass("mobile-active");
    });

    $overflow.click(function (event) {
        event.preventDefault();
        $body.removeClass("mobile-active");
        $toggle_button.removeClass("aside-toggle");
    });

    /*
        site aside menu
        ----------------------------------------------------
    */
    $(".aside-menu>li.menu-item-has-children>a").append(
        '<div class="menu-sign"></div>'
    );
    $(".aside-menu>li.menu-item-has-children>a").on("click", function (event) {
        event.preventDefault();
        $(".aside-menu>li.menu-item-has-children>a").removeClass("active");
        $(".aside-menu>li>ul").slideUp("normal");
        if ($(this).next().is(":hidden") == true) {
            $(this).addClass("active");
            $(this).parent().addClass("active");
            $(this).parent().siblings(".active").removeClass("active");
            $(this).next().slideDown("normal");
        }
    });
    $(".aside-menu>li>ul").hide();

    if ($(".totop-progress-parent").length) {
        var progressPath = document.querySelector(
            ".totop-progress-parent path"
        );
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition =
            "none";
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition =
            "stroke-dashoffset 10ms linear";
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = progress;
        };
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on("scroll", function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(".totop-progress-parent").addClass("backto-top-active");
            } else {
                jQuery(".totop-progress-parent").removeClass(
                    "backto-top-active"
                );
            }
        });
        jQuery(".totop-progress-parent").on("click", function (event) {
            event.preventDefault();
            jQuery("html, body").animate({ scrollTop: 0 }, duration);
            return false;
        });
    }

    if ($(".banner-section .swiper").length > 0) {
        new Swiper(".banner-section .swiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
            },
        });
    }

    var clipboard = new ClipboardJS(".copy-permalink");

    clipboard.on("success", function (e) {
        ncPopupTips(true, "复制成功！");
        e.clearSelection();
    });

    clipboard.on("error", function (e) {
        ncPopupTips(false, "复制失败！");
    });
});

document.addEventListener("alpine:init", () => {
    Alpine.data("postMetaData", () => ({
        loading: false,
        liked: false,
        like() {
            if (this.loading || this.liked) return;

            this.loading = true;
            $.ajax({
                url: "/apis/api.halo.run/v1alpha1/trackers/upvote",
                type: "post",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    group: "content.halo.run",
                    plural: "posts",
                    name: this.postId,
                }),
            })
                .done(() => {
                    this.liked = true;

                    // set cookie
                    const d = new Date();
                    d.setTime(d.getTime() + 999 * 24 * 60 * 60 * 1000);
                    let expires = "expires=" + d.toUTCString();
                    document.cookie =
                        "suxing_ding_" +
                        this.postId +
                        "=1" +
                        ";" +
                        expires +
                        ";path=/";

                    this.likesCount += 1;
                })
                .always(() => {
                    this.loading = false;
                });
        },
        init() {
            this.liked = cookieExists("suxing_ding_" + this.postId);
        },
    }));
});
