/* ==================
   EP Intranet scripts CSC
   ================== 
   
Sommaire :
------------------------

01 - Function for set height for aside background
02 - Popover (contacts)
03 - Joyride tour (Welcome overlay)
04 - Carousel initialisation (Bootstrap)
05 - Menu Mobile initialisation (jPanel plugin)
06 - Initialise Tooltip (Bootstrap)
07 - Switch view (EP DIR)
08 - Add support for Placeholder IE9
09 - Add class 'ios' on body in case of iphone ipad 
10 - Add functionality to BlueImp gallery 
11 - Search header Auto-Suggestion
12 - Drag/drop & delete Widgets (dependance : Jquery UI sortable)
13 - Initialise Datepicket (dependence : Jquery UI)
14 - Accessibility : Focus on element for 'Skip to content' link
15 - Accessibility : detect TAB navigation and change the outline on focus
16 - Scroll to animation
17 - Scroll to top button
18 - PERSONA
19 - Carousel news homepage
20 - Slider 3D My contacts (EPDIR)
21 - Rating (TODO replace with Jahia OOTB)
22 - Button to edit a change on a page (EP Dir)
23 - Alert for save and send change on edit page
24 - Custom bootstrap Select with redirect url
25 - Form file upload text
26 - Profile template scripts 
27 - Table sortable (dependance: jquery-ui)
28 - Jahiets scripts (dependance: jquery-ui)
29 - Bookmarks (jquery.mjs.nestedSortable)
30 - EPnet Logout interception
31 - Swith enable/disable search input EP DIR with Advanced Search

32 - Parse XML for OrganisationChart (TODO : delete this part)
33 - ODA Management of persona
34 - ODA Management of sorting
 
Cookies utilisations (jquery.cookies) : 
------------------------
Create session cookie:
$.cookie('name', 'value');
Create expiring cookie, 7 days from then:
$.cookie('name', 'value', { expires: 7 });
Read cookie: $.cookie('name');
Delete cookie: $.removeCookie('name');
EP Intranet utilisation :
    1 - Affichage overlay welcometour
    2 - grid or list view in epdir
    3 - Contrast activation
*/

/* ==========================================================
     01 - Function for set height for aside background
   ========================================================*/
function AsideHeight() {
    $("aside").each(function() {
        $(this).height('auto');
        var colcontent = $(this).prev();
        if ($(this).outerHeight() < colcontent.outerHeight()) {
            $(this).css("min-height", colcontent.outerHeight()); //min-height to keep aside height variable (with collapse/expand elements)
            //$(this).height(colcontent.outerHeight()); 
        }
    });
}

$(window).load(function () {
    
    AsideHeight(); //Set height for aside background
    
});

$(document).ready(function () {
    
    AsideHeight(); //Set height for aside background

  /* ==========================================================
         02 - Popover (contacts)
     ========================================================*/  

   $(".list-results [data-toggle=popover]").popover({
       html: true,
       trigger: 'focus',
       placement: 'bottom',
       delay: {
           "show": 1000,
           "hide": 500
       },
       content: function () {
           return $(this).parent().find(".popover-content").html();
       }
   });
   $('.list-results [data-toggle=popover] > .row').hover(function () {
       $(this).parents('[data-toggle=popover]').focus();
   })

   
    /* ==========================================================
        03 - Joyride tour (Welcome overlay and EP DIR Help)
        ========================================================*/
   /* Parametres pour le tour Welcome de la homepage (avec cookies)*/
    var WelcomeTourParam = {
        scrollSpeed: 900, // Page scrolling speed in ms
        tipAnimation: 'fade', // 'pop' or 'fade' in each tip
        autoStart: true,
        prev_button: true,
        // Fonction avant que le tour commence :
        preRideCallback: function (index, tip) {
            var nbtip=$('.joyride-tip-guide').length;
            var palier=Math.round((100/nbtip)*100)/100;
            $('.joyride-tip-guide').each(function (i) {
                var actual= (i)*palier;
                $(this).find('.progress-bar').attr('aria-valuenow',(i+1)*palier);
                $(this).find('.progress-bar').css("width",actual+"%");
                $(this).find('.progress-txt').html((i+1)+"/"+nbtip);
            });
        },
        // Fonction une fois le tour terminé ou fermé :
        postRideCallback: function (index, tip) {
            // On prépare et affiche la vignette welcome tour
            $('.alert-welcome-tour').addClass('animated bounceInRight');
            $('.scrollToTop').click();
            $('.alert-welcome-tour').delay(550).show(10);
        },
        // Fonction avant qu'un tip s'affiche :
        postStepCallback: function (index, tip) {
            // On programme la progresse bar
            var nbtip=$('.joyride-tip-guide').length;
            var palier=Math.round((100/nbtip)*100)/100;
            var actual= (index+2)*palier;
            $('.joyride-tip-guide').eq(index+1).find('.progress-bar').animate({width:actual+"%"},400);
        },
        modal: true,
        expose: true,
        cookieMonster: true, // true/false for whether cookies are used
        cookieName: 'WelcomeTour', // choose your own cookie name
        cookieDomain: false, // set to false or yoursite.com
        tipContainer: 'body', // Where the tip be attached if not inline
        // postRideCallback: $noop, // a method to call once the tour closes
        //postStepCallback: $noop, // A method to call after each step
        template: { // HTML segments for tip layout
            link: '<a href="#close" class="joyride-close-tip"><i class="icon-remove"></i></a>',
            timer: '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
            tip: '<div class="joyride-tip-guide hidden-sm hidden-xs"><span class="joyride-nub"></span></div>',
            wrapper: '<div class="joyride-content-wrapper"><div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><div class="progress-txt"></div></div>',
            button: '<a href="#" class="btn joyride-next-tip pull-right"></a>',
            modal: '<div class="joyride-modal-bg hidden-sm hidden-xs"></div>',
            expose: '<div class="joyride-expose-wrapper"></div>',
            expose_cover: '<div class="joyride-expose-cover"></div>',
            prev_button: '<a href="#" class="btn btn-secondary btn-sm joyride-prev-tip"></a>',
        }
    };
    /* Parametres par defaut sans cookies */
    var DefaultTourParam = {
        scrollSpeed: 900, // Page scrolling speed in ms
        tipAnimation: 'fade', // 'pop' or 'fade' in each tip
        autoStart: true,
        prev_button: true,
        // Fonction avant que le tour commence :
        preRideCallback: function (index, tip) {
            var nbtip=$('.joyride-tip-guide').length;
            var palier=Math.round((100/nbtip)*100)/100;
            $('.joyride-tip-guide').each(function (i) {
                var actual= (i)*palier;
                $(this).find('.progress-bar').attr('aria-valuenow',(i+1)*palier);
                $(this).find('.progress-bar').css("width",actual+"%");
                $(this).find('.progress-txt').html((i+1)+"/"+nbtip);
            });
        },
        // Fonction avant qu'un tip s'affiche :
        postStepCallback: function (index, tip) {
            // On programme la progresse bar
            var nbtip=$('.joyride-tip-guide').length;
            var palier=Math.round((100/nbtip)*100)/100;
            var actual= (index+2)*palier;
            $('.joyride-tip-guide').eq(index+1).find('.progress-bar').animate({width:actual+"%"},400);
        },
        modal: true,
        expose: true,
        cookieMonster: false, // true/false for whether cookies are used
        tipContainer: 'body', // Where the tip be attached if not inline
        // postRideCallback: $noop, // a method to call once the tour closes
        //postStepCallback: $noop, // A method to call after each step
        template: { // HTML segments for tip layout
            link: '<a href="#close" class="joyride-close-tip"><i class="icon-remove"></i></a>',
            timer: '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
            tip: '<div class="joyride-tip-guide hidden-sm hidden-xs"><span class="joyride-nub"></span></div>',
            wrapper: '<div class="joyride-content-wrapper"><div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><div class="progress-txt"></div></div>',
            button: '<a href="#" class="btn joyride-next-tip pull-right"></a>',
            modal: '<div class="joyride-modal-bg hidden-sm hidden-xs"></div>',
            expose: '<div class="joyride-expose-wrapper"></div>',
            expose_cover: '<div class="joyride-expose-cover"></div>',
            prev_button: '<a href="#" class="btn btn-secondary btn-sm joyride-prev-tip"></a>',
        }
    };
    
    // On lance le tour au clic sur la vignette
    $('.alert-welcome-tour a').click(function () {
        $('.alert-welcome-tour').hide();
        $.removeCookie("WelcomeTour");
        $("#WelcomeTour").joyride(WelcomeTourParam);
    });
    
    // On lance le tour pour EP DIR
    $('.helpEPDir').click(function () {
        $("#helpEPDir").joyride(DefaultTourParam);
    });
    var cookieWelcomeTour = $.cookie("WelcomeTour"); // value ridden if was lunched;
    if (cookieWelcomeTour != 'ridden') {
        $('.alert-welcome-tour').hide();
        $("#WelcomeTour").joyride(WelcomeTourParam);
    }

    
    /* ==========================================================
        04 - Carousel initialisation (Bootstrap)
     ========================================================*/
    /* other option :via data attribute : data-ride="carousel" (auto start)*/

    $('.carousel').carousel({
        interval: 8000
    })

    /* ==========================================================
       05 - Menu Mobile initialisation (jPanel plugin)
     ========================================================*/
    /* menu left parametres : */
    var jPM = $.jPanelMenu({
        menu: '#nav-left',
        panel: "body",
        trigger: '.navbar-toggle',
        excludedPanelContent: "style, script, .blueimp-gallery, .scrollToTop",
        // blueimp-gallery must be excluded to keep image center
        clone: !0,
        keepEventHandlers: !1,
        direction: 'left',
        openPosition: '250px',
        openDuration: 300,
        closeDuration: 300,
        easing: 'ease-in-out',
        beforeOpen: function() {
            /* Initiate state of collapse button (X version)*/
            $('.navbar-toggle').removeClass('collapsed');
            $('.navbar-toggle').attr('aria-expanded','true');
        },
        beforeClose: function() {
            /* Initiate state of collapse button (bar version)*/
            $('.navbar-toggle').addClass('collapsed');
            $('.navbar-toggle').attr('aria-expanded','false');
        }
    });
    /* menu right (user) parametres : */
    var jPM2 = $.jPanelMenu({
        menu: '.navuser',
        panel: "body",
        menuClass: 'jPanelMenu-menu2',
        trigger: '.profile>a',
        excludedPanelContent: "style, script, .blueimp-gallery, .scrollToTop",
        // blueimp-gallery must be excluded to keep image center
        clone: !0,
        keepEventHandlers: !1,
        direction: 'right',
        openPosition: '250px',
        openDuration: 300,
        closeDuration: 300,
        easing: 'ease-in-out'
    });
    //jPM.on(); (used with breackpoint in JRespond)

    // call jRespond and add breakpoints
    var jRes = jRespond([
        {
            label: 'mobile',
            enter: 0,
            exit: 991
        }
    ]);
    // register enter and exit functions for a single breakpoint
    jRes.addFunc({
        breakpoint: 'mobile',
        enter: function () {
            jPM.on();
            duplicateMenuID();// fonction pour remettre des id unique pour les menus collapse (menu dupliqué en mobile)
            jPM2.on();
        },
        exit: function () {
            jPM.off();
            jPM2.off();
        }
    });
    // fonction pour remettre des id unique pour les menus collapse :
    function duplicateMenuID () {
        $('#nav-left.jPanelMenu-menu').find('button').each(function (index) { 
            var IDAttr = $(this).attr('data-target');
           if (IDAttr){
               $(this).attr('data-target',IDAttr+"-mobile");
               $(this).next('ul').attr('id',(IDAttr+"-mobile").substring(1));
           }
        });
    }
    /* ==========================================================
      06 - Initialise Tooltip (Bootstrap)
     ========================================================*/
    /* tooltip light for topic page */
    /* $('.topics-page [data-toggle="tooltip"]').tooltip({
         'selector': '',
         'container': 'body',
         template: '<div class="tooltip light" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
     });*/
    /* tooltip normal */
    $('[data-toggle="tooltip"]').tooltip({
        'selector': '',
        'container': 'body'
    });
    /* ==========================================================
        07 - Switch view (EP DIR, News list, Gallery, Organisation Chart)
        ========================================================*/ 
    function list_gridview(template, cookie_name) {
        $(template + ' ul.list-results').removeClass('grid animated fadeIn');
        setTimeout(function () {
            $(template + ' ul.list-results').addClass("grid animated fadeIn");
            AsideHeight(); //Set height for aside background
        }, 10);
        $(template + ' .switch-view button.grid').addClass('active');
        $(template + ' .switch-view button.list').removeClass('active');
        $.cookie(cookie_name, 'true');
    };
    function list_listview(template, cookie_name) {
       $(template + ' ul.list-results').removeClass('grid animated fadeIn');
            setTimeout(function(){
                $(template + ' ul.list-results').addClass("animated fadeIn");
                AsideHeight(); //Set height for aside background
            }, 10);
            $(template + ' .switch-view button.list').addClass('active');
            $(template + ' .switch-view button.grid').removeClass('active');
            $.cookie(cookie_name, 'false');
    };
    function gallery_gridview(template, cookie_name) {
            $(template + ' ul.gallery > li').each(function() {
                $(this).removeClass('col-xs-8 col-lg-3ths').addClass('col-xs-8 col-lg-4');
                $(this).parent('ul').hide().show(20);
           });
            setTimeout(function () {
                AsideHeight(); //Set height for aside background
            }, 200);
            $(template + ' .switch-view button.grid').addClass('active');
            $(template + ' .switch-view button.grid-xl').removeClass('active');
            $.cookie(cookie_name, 'true');
    };
    function gallery_largeview(template, cookie_name) {
            $(template + ' ul.gallery > li').each(function () {
                $(this).removeClass('col-xs-8 col-lg-4').addClass('col-xs-8 col-lg-3ths');
                $(this).parent('ul').hide().show(20);
            });
            setTimeout(function () {
                $(template + ' ul.gallery').addClass("animated fadeIn");
                AsideHeight(); //Set height for aside background
            }, 200);
            $(template + ' .switch-view button.grid-xl').addClass('active');
            $(template + ' .switch-view button.grid').removeClass('active');
            $.cookie(cookie_name, 'false');
    };
    function orgChart_rowview(template, cookie_name) {
        $(template + ' .org-chart').removeClass('org-chart-row animated fadeIn');
        $(template + ' .org-chart').addClass("org-chart-row animated fadeIn");
        $(template + ' .switch-view button.orgChart-row').addClass('active');
        $(template + ' .switch-view button.orgChart-column').removeClass('active');
        $.cookie(cookie_name, 'true');
    };
    function orgChart_colview(template, cookie_name) {
       $(template + ' .org-chart').removeClass('org-chart-row');
        $(template + ' .switch-view button.orgChart-column').addClass('active');
        $(template + ' .switch-view button.orgChart-row').removeClass('active');
        $.cookie(cookie_name, 'false');
    };
    /* Read cookies to set default view */
    if ($.cookie('epdir-gridview')=="true") {
        list_gridview('.epdirectory-page', 'epdir-gridview');
    } 
    else {
        list_listview('.epdirectory-page', 'epdir-gridview');
    }
    if ($.cookie('newslist-gridview')=="true") {
        list_gridview('.newslist-page', 'newslist-gridview');
    } 
    else {
        list_listview('.newslist-page', 'newslist-gridview');
    }
    if ($.cookie('gallery-gridview')=="true") {
        gallery_gridview('.gallery-page', 'gallery-gridview');
    } 
    else {
        gallery_largeview('.gallery-page', 'gallery-largeview');
    }
    if ($.cookie('orgChart-rowview')=="true") {
        orgChart_rowview('.epdirectory-page', 'orgChart-rowview');
    } 
    else {
        orgChart_colview('.epdirectory-page', 'orgChart-rowview');
    }
    if ($.cookie('mycontacts-gridview')=="true") {
        list_gridview('.profile-page', 'mycontacts-gridview');
    } 
    else {
        list_listview('.profile-page', 'mycontacts-gridview');
    }
    $('.switch-view button').on('click', function (e) {
        if ($(this).hasClass('grid')) {
            if ('.epdirectory-page'.length){
                list_gridview('.epdirectory-page', 'epdir-gridview');
            }
            if ('.newslist-page'.length){
                list_gridview('.newslist-page', 'newslist-gridview');
            }
            if ('.gallery-page'.length){
                gallery_gridview('.gallery-page', 'gallery-gridview');
            }
            if ('.profile-page'.length){
                list_gridview('.profile-page', 'mycontacts-gridview');
            }
            
        } else if ($(this).hasClass('list') || $(this).hasClass('grid-xl')) {
            if ('.epdirectory-page'.length){
                list_listview('.epdirectory-page', 'epdir-gridview');
            }
            if ('.newslist-page'.length){
                list_listview('.newslist-page', 'newslist-gridview');
            }
            if ('.gallery-page'.length){
                gallery_largeview('.gallery-page', 'gallery-gridview');
            }
            if ('.profile-page'.length){
                list_listview('.profile-page', 'mycontacts-gridview');
            }
        } else if ($(this).hasClass('orgChart-column')) {
            orgChart_colview('.epdirectory-page','orgChart-rowview');
        } else if ($(this).hasClass('orgChart-row')) {
            orgChart_rowview('.epdirectory-page','orgChart-rowview');
        }
    });

    /* ==========================================================
        08 - Add support for Placeholder IE9
        ========================================================*/
    // Si le navigateur ne prend pas en charge le placeholder
    if (document.createElement('input').placeholder == undefined) {
        // Champ avec un attribut HTML5 placeholder
        $('[placeholder]')
            // Au focus on clean si sa valeur équivaut à celle du placeholder
            .focus(function () {
                if ($(this).val() == $(this).attr('placeholder')) {
                    $(this).val('');
                }
            })
            // Au blur on remet le placeholder si le champ est laissé vide
            .blur(function () {
                if ($(this).val() == '') {
                    $(this).val($(this).attr('placeholder'));
                }
            })
            // On déclenche un blur afin d'initialiser le champ
            .blur()
            // Au submit on clean pour éviter d'envoyer la valeur du placeholder
            .parents('form').submit(function () {
                $(this).find('[placeholder]').each(function () {
                    if ($(this).val() == $(this).attr('placeholder')) {
                        $(this).val('');
                    }
                });
            });
    }

    /* ==========================================================
      09 - Add class 'ios' on body in case of iphone ipad (to prevent zoom
       in input (via ep-queries.less)
     ========================================================*/
    /**/
    var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
    if (isiDevice) {
        $('body').addClass('ios');
    }
    /* ==========================================================
        10 - Add functionality to BlueImp gallery lightbox (autoplay video, audio support)
        ========================================================*/
        /* Start extend Blueimp gallery to audio */
    blueimp.Gallery.prototype.audioFactory = function (obj, callback) {
        var $element = $('<div class="audio-content"><i class="icon-music"></i><audio src="' + obj.href + '" title="' + obj.title + '" controls="controls" frameborder="0">')
            // $.get(obj.href)
        $.get(obj)
            .done(function () {
                callback({
                    type: 'load',
                    target: $element[0]
                });
            })
            .fail(function () {
                callback({
                    type: 'error',
                    target: $element[0]
                });
            });

        return $element[0];
    };
    /* End extend Blueimp gallery to audio */
    $('#blueimp-gallery')
        .on('open', function (event) {
            var gallery = $(this).data('gallery');
            $(this).data('gallery').container.addClass('blueimp-gallery-controls');
            // parametrage des options de la gallery (voir API)
            $.extend(true, gallery.options, {

            });
        })
        .on('opened', function () {
            $("#blueimp-gallery").focus();
        })
        // ajout de la description / deplacement du titre
        .on('slide', function (event, index, slide) {
            // on récupere le titre dans l'attribut data-title (cas des collections)
            var title = $(this).data('gallery').list[index].getAttribute('data-title');
            // Si pas de valeur on le recupere le titre dans l'attribut alt
            if (title == null) {
                var title = $(this).data('gallery').list[index].getElementsByTagName('img')[0].getAttribute('alt');
            }
            var desc = $(this).data('gallery').list[index].getAttribute('title');
            if (desc.length) {                     
                $(this).data('gallery').container.find('.description').html(desc);
            }
            else {
                $(this).data('gallery').container.find('.description').html('');
            }
            if (title.length) {
                $(this).data('gallery').container.find('.title').html(title);
            }
            else {
                $(this).data('gallery').container.find('.title').html('');
            }
            // autoplay 
            var autoplay = $(this).data('gallery').list[index].getAttribute('data-autoplay');
            if (autoplay == "autoplay"){
                if ($(this).find('video').length) {
                    $(this).find('video').next('a').click();
                    $(this).data('gallery').container.addClass('blueimp-gallery-controls');
                }
                if ($(this).find('audio').length) {
                    $(this).find('audio').trigger('play');
                }
                
            }

        });    
    
    /* ==========================================================
      11 - Search header Auto-Suggestion & EP DIR auto-suggestion
     ========================================================*/
    $('header .search input[type=text]').on('keyup',function(e){
		   var charCount = $(this).val().replace(/\s/g, '').length;
            if (charCount >= 2){
                $(this).parents('.search').children('.auto-suggestion').addClass('open'); 
            }
            else if (charCount < 2){
                $(this).parents('.search').children('.auto-suggestion').removeClass('open');
            }
		});
    
    $('header .search input[type=text]').focusout(function () {
        $(this).parents('.search').children('.auto-suggestion').removeClass('open');
    });
    
    $('.epdirectory-page .search input[type=text]').on('keyup',function(){
		   var charCount = $(this).val().replace(/\s/g, '').length;
            if (charCount >= 2){    $(this).parents('.search').children('.auto-suggestion').addClass('open');
            }
            else if (charCount < 2){
            $(this).parents('.search').children('.auto-suggestion').removeClass('open');
        }
    });
    
    $('.epdirectory-page .search input[type=text]').focusout(function () {
        $(this).parents('.search').children('.auto-suggestion').removeClass('open');
    });
    
    /* input auto-suggestion EP DIR Advanced search */
    $('.auto-complete input[type=text]').on('keyup',function(){
		   var charCount = $(this).val().replace(/\s/g, '').length;
            if (charCount >= 1){    $(this).parents('.auto-complete').children('.auto-suggestion').addClass('open');
            }
            else if (charCount < 1){
            $(this).parents('.auto-complete').children('.auto-suggestion').removeClass('open');
        }
    });
    $('.auto-complete input[type=text]').focusout(function () {
        $(this).parents('.auto-complete').children('.auto-suggestion').removeClass('open');
    });
  

    /* ==========================================================
       12 - Drag/drop & delete Widgets (dependance : Jquery UI sortable)
     ========================================================*/
    var panelList = $('#widgetsList');
    panelList.sortable({
        // Only make the controls "mouve" child elements support dragging.
        // Omit this to make then entire list draggable.
        handle: '.controls .move',
        update: function () {
            $('.widget', panelList).each(function (index, elem) {
                var $listItem = $(elem),
                    newIndex = $listItem.index();
                // Persist the new indices.
            });
        },
        sort: function(e) {
          //  $(e).parents('.widget').addClass('hover');
        },
        over : function(event, ui){
           // ui.item.addClass('hover');
        },
        stop: function( event, ui ) {
            $('.widget').removeClass('hover');
            $('.widget').removeAttr('style');
        }
    });
    /* Prevend gototop on clic on Mouve btn */
    $('.widget > .controls > .move').click(function () {
        return false;
    });
    /* Add class css hover on the widget */
    $('.widget > .controls > .move').hover(function () {
        $(this).parents('.widget').addClass('hover');
    }, function() {
        $(this).parents('.widget').removeClass( "hover" );
    });
    /* Delete a widget */
    $('.widget > .controls > .remove').click(function () {
        $(this).parents('.widget').remove();
        return false;
    });


    /* ==========================================================
        13 - Initialise Datepicket (dependence : Jquery UI) with delegate on body (for widget modal (ex todolist))
     ========================================================*/
    
    $("body").delegate(".datepicker", "focusin", function() {
        $(this).datepicker({
                dateFormat: "dd/mm/yy"
            }
        );
    });
    // action for the button
    $("body").delegate(".date-input button", "click", function() {
       $(this).parent().find(".datepicker").focus();
    });
    
    /* version whith time */
    $("body").delegate(".datetimepicker", "focusin", function() {
        $(this).datetimepicker({
                controlType: 'select',
                closeText:'OK',
                currentText:"Now",
                showButtonPanel:false,
                dateFormat: "dd/mm/yy",
                timeFormat: 'HH:mm'
            }
        );
    });
    // action for the button
    $("body").delegate(".datetimepicker + button", "click", function() {
        $(this).parent().find(".datetimepicker").focus();
    });
    
    /* ==========================================================
        14 - Focus on element for 'Skip to content' link
        ========================================================*/
    // bind a click event to the 'skip' link
    $("#skip a").click(function (event) {

        // strip the leading hash and declare
        // the content we're skipping to
        var skipTo = "#" + this.href.split('#')[1];

        // Setting 'tabindex' to -1 takes an element out of normal
        // tab flow but allows it to be focused via javascript
        $(skipTo).attr('tabindex', -1).on('blur focusout', function () {

            // when focus leaves this element,
            // remove the tabindex attribute
            $(this).removeAttr('tabindex');

        }).focus(); // focus on the content container
    });
    /* Gestion du contrast */ 
    var cookieContrast = $.cookie("Contrast");
    if (cookieContrast == 'true') {
        $('body').addClass('contrast');
    }
    $("#skip #contrast").click(function (event) {
        if($('body').hasClass('contrast')){
            $('body').removeClass('contrast');
            $.cookie("Contrast","false");
        }
        else {
            $('body').addClass('contrast');
            $.cookie("Contrast","true");
        }
    });
/* ==========================================================
        15 - Accessibility : detect TAB navigation and change the outline on focus
        ========================================================*/
    $("body").on("keydown", function(n) {
        var t = n.keyCode || n.which;
        var keytab= "9";
        var tabcount;
        t == keytab && (tabcount++, $("body").removeClass("disable-focus-state"))
    });
    $("body").on("mousedown", function() {
        $("body").hasClass("disable-focus-state") || $("body").addClass("disable-focus-state")
    });
    /* ==========================================================
        16 - Scroll to animation
    ========================================================*/
    $('.scrollTo').click(function () { // Au clic sur un élément
        var page = $(this).attr('href'); // Page cible
        var speed = 750; // Durée de l'animation (en ms)
        $('html, body').animate({
            scrollTop: $(page).offset().top
        }, speed); // Go
        return false;
    });
    /* ==========================================================
      17 - Scroll to top button
     ========================================================*/
    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 350) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //smooth scroll to top
    $('.scrollToTop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    /* ==========================================================
      18 - PERSONA
         ========================================================*/
    $('a[id^="browseAsPersona-"]').click(function () {
        var persona = this.id.split("browseAsPersona-");
        if (persona != null) {
            var urlParts = document.URL.split("?");
            if (urlParts != null) {
                var url = urlParts[0] + '?';
                if (urlParts.length > 1) {
                    var params = urlParts[1].split("&");
                    if (params != null) {
                        for (i = 0; i < params.length; i++) {
                            if (params[i].indexOf('persona=') == -1) {
                                url = url + params[i] + "&";
                            }
                        }
                    }
                }
            }
            url = url + "persona=" + persona[1];

            if (document.location != url) {
                $(this).attr("href", url);
            }
        }
    });

    /* =====================================================
     19 - Carousel news homepage
    ======================================================== */
    if ($('[id^="news-headlines"]').length) {
        
        $('[id^="news-headlines"]').each(function(){
            /* gestion dans le cas de plusieurs carousels */
            var headline = $(this).attr('id');
            var carousel = $(this).next().attr('id');
            var Interval = $(this).next().attr('data-interval');
            var gallery = blueimp.Gallery(document.getElementById(headline).getElementsByTagName('a'), {
                    container: '#'+carousel,
                    urlProperty:'image',
                    slideshowInterval:Interval,
                    preloadRange: 3,
                    transitionSpeed: 800,
                    //stretchImages: true,
                    carousel: true,
                    startSlideshow: true,
                    enableKeyboardNavigation:true,
                    toggleControlsOnReturn: false,
                    onopen: function (){
                        var container= this.container;
                        container.find('.play-pause').attr('href','#');
                        container.find('.play-pause').attr('role','button');
                        container.find('.play-pause').attr('title','Play/pause');
                        this.container.find('.slide a').attr('tabindex','-1');
                    },
                    onopened: function (){
                        this.initSlides(true);// fix bug carrousel non initialisé au chargement
                        /* var container= this.container;
                        container.find('.slide').attr('role','tabpanel');
                        //suppression du focus clavier :
                        container.find('.slide').attr('tabindex','-1');*/

                        /* Fonction pour ajouter les liens sur les images du carousel */
                         addUrl();
                    },
                    onslide: function (index, slide) { 
                        // Ajout du titre
                        var title = $(this.list[index]).attr('title');
                        nodetitle = this.container.find('h3');
                        nodetitle.empty();
                        if (title) {
                           $(nodetitle[0]).html(title);
                        }
                        // Ajout de la description
                        var text = $(this.list[index]).find('.description').html(),
                            node = this.container.find('.description');
                        node.empty();
                        if (text) {
                           $(node[0]).html(text);
                        }
                        // Activation de la tab correspondante 
                        $('#'+headline+' li').attr('aria-selected','false');
                        $('#'+headline+' li').removeClass('selected');
                        $('#'+headline+' li').eq(index).attr('aria-selected','true');
                        $('#'+headline+' li').eq(index).addClass('selected');
                    }
            }); 
            function addUrl() {  
                $(gallery.list).each(function (index) {
                    // Ajout du lien
                    var link = $(this).attr('href');
                    // recupération du target du lien
                    var target = $(this).attr('data-target');
                    /* encapsule l'image avec le lien apres son chargement seulement (bug avec l'autoplay autrement)*/
                    $(gallery.container.find('.slides .slide').eq(index).find('img')).one("load", function() {
                      // do stuff
                        if (target){
                            $(this).wrap("<a target='"+target+"' href='" + link + "'></a>"); 
                        }
                        else {
                            $(this).wrap("<a href='" + link + "'></a>"); 
                        }
                    }).each(function() {
                      if(this.complete) $(this).load(); /* To fix bug when image are in cache (and don't catch load function)*/
                    });
                });
            }
            /* Liens tabs */
            $('#'+headline+' li').click(function (e){
                    e.preventDefault();
                    gallery.slide($(this).index());
            });
            /* Liens direct si clic via clavier */
            $('#'+headline+' li').keydown(function (e) {
                 if (e.keyCode == 13) {
                     var url = $(this).attr('href');
                     window.location.href = url;
                 }
             });
        });
    }
    /* ==========================================================
       20 - Slider 3D My contacts (EPDIR)
    ========================================================*/
    var slider3D=(function(){
        var buArr =[],arlen;
        return {
            init:function(){
                this.addCN();this.clickReg();
            },
            addCN:function(){
                var buarr=["awayL2","awayL1","center","awayR1","awayR2"];
                for(var i=1;i<=buarr.length;++i){
                    $("#item"+i).removeClass().addClass(buarr[i-1]+" holder_bu");
                }
            },
            clickReg:function(){
                $(".holder_bu").each(function(){
                    buArr.push($(this).attr('class'));
                    
                });
                arlen=buArr.length;
                for(var i=0;i<arlen;++i){
                    buArr[i]=buArr[i].replace(" holder_bu","");
                };
                
                $(".holder_bu").click(function(buid){
                    // Desactivation du lien pour les items autour
                    $(this).find('a').click(function(e){
                        if ($(this).parents('.holder_bu').hasClass('awayL2') || $(this).parents('.holder_bu').hasClass('awayL1')|| $(this).parents('.holder_bu').hasClass('awayR2')|| $(this).parents('.holder_bu').hasClass('awayR1')) {
                            e.preventDefault();
                        }
                    });
                    var me=this,id=this.id||buid,joId=$("#"+id),joCN=joId.attr("class").replace(" holder_bu","");
                    var cpos=buArr.indexOf(joCN),mpos=buArr.indexOf("center");
                   
                    if(cpos!=mpos){
                        tomove=cpos>mpos?arlen-cpos+mpos:mpos-cpos;
                        while(tomove){
                            var t=buArr.shift();
                            buArr.push(t);
                            for(var i=1;i<=arlen;++i){
                                $("#item"+i).removeClass().addClass(buArr[i-1]+" holder_bu");
                            }
                            --tomove;
                        }
                    }
                })
            },
            auto:function(){
                for(i=1;i<=4;++i){              
                    $(".holder_bu").delay(2000).trigger('click',"item"+i).delay(2000);
                }
            }
	   };
})();
   //" window['slider3d']=slider3D;
	slider3D.init();
    slider3D.auto();
    
    /* ==========================================================
       21 - Rating & Favorite select
    ========================================================*/
    if ($('select.rating').length) {
        if ($('select.rating').hasClass('readonly')) {
            $('select.rating').barrating({
                theme: 'stars',
                showSelectedRating: false,
                readonly: true
            });
        } else {
            $('select.rating').barrating({
                theme: 'stars',
                deselectable: true,
                showSelectedRating: false
            });
        }
    }
    if ($('select.favorite').length) {
        if ($('select.favorite').hasClass('readonly')) {
            $('select.favorite').barrating({
                theme: 'stars',
                showSelectedRating: false,
                readonly: true
            });
        } else {
            $('select.favorite').barrating({
                theme: 'stars',
                deselectable: true,
                showSelectedRating: false
            });
        }
    }
    /* ==========================================================
       22 - Button to edit a change on a page (EP Dir)
    ========================================================*/
    $('#suggestChangev1 a').click(function(e){
        e.preventDefault();
        var fieldEdit = $('.editable');
        fieldEdit.each(function() {
            $(this).wrap("<span class='btn-edit'></span>");
            //$(this).closest('div[class^="col-"]').after( "<a class='edit-link' href='#' title='Edit this information'><i aria-hidden='true' class='icon-edit'></i></a>" );
           $(this).after( "<a class='btn btn-secondary edit-link animated fadeInLeft' href='#' title='Edit this information'><i aria-hidden='true' class='icon-edit'></i></a>" );
        });
        $(this).parent().hide();
        $('#suggestChangev2').hide();
    })
    $('#suggestChangev2 a').click(function(e){
        e.preventDefault();
        var fieldEdit = $('.editable'), isEditable= fieldEdit.is('.editable');
        fieldEdit.prop('contenteditable',isEditable).toggleClass('editable');
        $("#edit-profile").show();
        $(this).parent().hide();
        $('#suggestChangev1').hide();
    })
    /* ==========================================================
       23 - Alert for save and send change on edit page
    ========================================================*/
    $('#edit-profile button#cancel-edit').click(function(){
        location.reload();
    })
    /* ==========================================================
       24 - Custom bootstrap Select with redirect url
    ========================================================*/
    if ($('.selectpicker-redirect').length){
        $('.selectpicker-redirect').val('title');
        $('.selectpicker-redirect').selectpicker('render');
        $(this).change(function() {
            var url = $(this).find('option:selected').val();
            var target = $(this).find('option:selected').attr('data-target');
           
            $('.selectpicker-redirect').selectpicker('val', 'title');
            // reset the select to prevent second clic on same element
           
            if (url){
                if (target=='_blank'){
                    window.open(url,'_blank');
                }
                else {
                    window.location.href = url;
                }
            }
        });   
    }
    /* ==========================================================
       25 - Form file upload text and img preview
     ========================================================*/
    if ($('.input-file-container').length) {
        var fileInput  = document.querySelector( ".input-file" ), 
        the_return = document.querySelector(".file-return");
        fileInput.addEventListener( "change", function( event ) {  
            the_return.innerHTML = this.value;  
        });
    }
    /* img preview */
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#image-preview').css('display','block');
                $('#image-preview img').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
     
    $("#avatar-file").change(function(){
        readURL(this);
    });
     /* ==========================================================
       26 - Profile template scripts
     ========================================================*/
    $('#avatoronoffswitch').click(function(){
        if ($(this).is(':checked')) {
            $(".input-file-avatar").hide(400);
        }
        else {
            $(".input-file-avatar").show(400);
        }
        
    })
    /* ==========================================================
       27 - Table sortable (dependance: jquery-ui)
     ========================================================*/
    $('.table-sortable tbody').sortable().disableSelection();
    
    /* ==========================================================
       28 - Jahiets scripts (dependance: jquery-ui)
    ========================================================*/

    /* Liste sortable (Jahiet Applications) 
    ========= */
    function initialiseModalWidgetsApplications(list1,list2) {
         $(list1+', '+list2).sortable({
             connectWith: ".connectedSortable",
             items: "li:not(.title)",
             cancel: ".title",
             change:  function (event, ui) {
                 //var currPos2 = ui.item.index();
            },
            update: function(event, ui) {
                $(".box-applications select").change();
                // update input of if item to set new position
                   $(list2).find('li').each( function(e) {
                       var input= $(this).find('input');
                       if (input){
                        input.attr('value',$(this).index() + 1);
                       }
                   })
            }
         }).disableSelection();
        /* filtrage de la liste en fonction du persona en edition */
        $(".box-applications select").change(function() {
            var applicationPersona = "";
            $(this).find("option:selected" ).each(function() {
                applicationPersona += $(this).val();
                /* filtrage */
                $(this).parents('.box-applications').find('li').each(function (index) {
                    var itemPersona = $(this).attr('data-persona');
                    if ((itemPersona.indexOf(applicationPersona) > -1)||(applicationPersona=="all")){
                        $(this).show();
                    }
                    else {                    
                        $(this).hide();
                    }
                })
            });
        });
    }
    /* TODO List filter (Jahiet TODO List) 
    ========= */ 
    FilterTodoList(); // lancement du filtrage au chargement de la page
    function FilterTodoList() {
        var todoStateFilter = "";
        $(".todoList select").find("option:selected").each(function () {
            todoStateFilter += $(this).val();
            /* filtrage */
            if (todoStateFilter == "all") {
                $(this).parents('.todoList').find('.todo li').each(function (index) {
                    $(this).show();
                })
            }
            if (todoStateFilter == "completed") {
                $(this).parents('.todoList').find('.todo li').each(function (index) {
                    if ($(this).find("input").is(':checked')) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                })
            }
            if (todoStateFilter == "uncompleted") {
                $(this).parents('.todoList').find('.todo li').each(function (index) {
                    if ($(this).find("input").is(':checked')) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                })
            }
        });
    }
    $(".todoList select").change(function () {
        FilterTodoList();
    });
    /* Refresh the list on checkbox clic */
    $(".todoList .todo input[type=checkbox]").on('change', function () {
        FilterTodoList();
    })
    
    /*
    -------
    Reset modal configuration on close */
    var modalWidgetConfig;
     $('body').on('show.bs.modal', '.widget .modal, .jahiet .modal', function(e) {    
        var applicationsList1='#'+$(this).find('.connectedSortable').attr('id');
        var applicationsList2='#'+$(this).find('.connectedSortable:eq(1)').attr('id');
        initialiseModalWidgetsApplications(applicationsList1,applicationsList2);
        
        modalWidgetConfig=$(this).find('.modal-body').html();
    })
     
    $('body').on('hidden.bs.modal', '.widget .modal, .jahiet .modal', function(e) {
        $(this).find('.modal-body').html(modalWidgetConfig);
        
        /* Reset the bootstrap-select plugin in modale */
        $(this).find('.modal-body').find('.bootstrap-select').each(function (index) {
            var bootstrapSelect=$(this).find('select');
            $(this).replaceWith(bootstrapSelect);
        });
        $(this).find('.selectpicker').selectpicker('render');
        
    }) 
    /* ==========================================================
       29 - Bookmarks
        (jquery.mjs.nestedSortable)
    ========================================================*/ 
    if (typeof BookmarksActionPath !== 'undefined'){
       initSortableBookmarks(BookmarksActionPath); 
    }    
    function initSortableBookmarks(actionPath){
       $('#bookmarks').nestedSortable({
            handle: 'div, .move',
            items: 'li',
            protectRoot:false,
            disableNestingClass:'item',
            toleranceElement: '> div',
            isTree : true,
            forcePlaceholderSize: true,
            opacity: .6,
            revert: 250,
            tolerance: 'pointer',
            relocate: function(e,ui){
                var itemID = ui.item.attr('id');
                var parentID = ui.item.parentsUntil('.folder').attr('id');
               // var itemIndex = ui.item.index(); 
                var destID = ui.item.next('.item, .folder').attr('id');
                if (!destID){
                    destID = ui.item.parents('.folder').next('.folder').attr('id');
                }
                console.log("item = " + itemID + " parent=" + parentID + " destID="+destID);
                moveBookmarks(itemID,parentID,destID,actionPath);
            }
        }); 
    } 
    function moveBookmarks(itemID,parentID,destID,actionPath){
        $.ajax({
            type: "POST",
            url : actionPath,
            data: {
                "itemID": itemID,
                "parentID": parentID,
                "destID": destID
            }
        });
    }
    function dump(arr,level) {
			var dumped_text = "";
			if(!level) level = 0;
	
			//The padding given at the beginning of the line.
			var level_padding = "";
			for(var j=0;j<level+1;j++) level_padding += "    ";
	
			if(typeof(arr) == 'object') { //Array/Hashes/Objects
				for(var item in arr) {
					var value = arr[item];
	
					if(typeof(value) == 'object') { //If it is an array,
						dumped_text += level_padding + "'" + item + "' ...\n";
						dumped_text += dump(value,level+1);
					} else {
						dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
					}
				}
			} else { //Strings/Chars/Numbers etc.
				dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
			}
			return dumped_text;
		}
    /* ==========================================================
       30 - EPnet Logout interception
    ========================================================*/
    if ($('#dsl0').length){
        
        /* Recover original url of lougout */
        var urlLogout = $(this).find('#dslMain table tr a[href*="logout"]').attr('href');
        
        /* Build new logout HTML template */
        var HTMLlogout='<li class="logout"><a href='+ urlLogout +'><i aria-hidden="true" class="icon-power"></i> Log out from EPNet<span class="timeout"></span></a></li>';
        $(HTMLlogout).appendTo('header .profile ul.navuser');
        
        /* Detach original timeout to new HTML logout */
        var session = $(this).find('#liveclock');
        var sessionHTML=$('header .profile ul.navuser .logout .timeout');
        $(session).detach().appendTo(sessionHTML);
        /*Erase inline style of liveclock */
        $(sessionHTML).find('#liveclock').attr('style','');
        $(sessionHTML).find('#liveclock br').replaceWith(' ');
        /* Delete original logout popup */
        $('#dsl0').remove();
    }
    /* ==========================================================
       31 - Swith enable/disable search input EP DIR with Advanced Search
    ========================================================*/
     /* in homepage EPDIR */
      $('#btn-advanced-search').click(function () {
          if ($(this).hasClass("collapsed")) {
              $('#search-epdir, .home-epdir .search button').attr('disabled','true');
          }
          else {
               $('#search-epdir, .home-epdir .search button').removeAttr('disabled');
          }
      });
    /* in search-result EPDIR */
    $('#btn-advanced-search-results').click(function () {
          if ($(this).hasClass("collapsed")) {
              $('.search-page .search input, .search-page .search button').attr('disabled','true');
          }
          else {
               $('.search-page .search input, .search-page .search button').removeAttr('disabled');
          }
      });
    /* ==========================================================
       32 - Parse XML for OrganisationChart (TODO : delete this part)
    ======================================================== */
    // change org-chart to org-chart0 to hide this part
   if ($('#org-chart-static').length) {
       $.ajax({
           type: "GET",
           url: "https://dl.dropboxusercontent.com/u/8833496/Clients/Sword-Technologies/Parlement-Europeen/Intranet/Redesign/HTML/organisation.xml",
           dataType: "xml",
           success: function (xml) {
               $('<ul class="departments"></ul>').appendTo('.org-chart');
               $(xml).find('lvl1').each(function (index) {
                   var title = $(this).find('>title').text();
                   var urlTitle = $(this).find('>title').attr('link');
                   var responsible = $(this).find('> responsible').text();
                   var urlResponsible = $(this).find('>responsible').attr('link');
                   /* on construit le niveau 1*/
                   $('<li class="department"><div class="lvl-b"></div></li>').appendTo('.departments');
                   if (title) {
                       $('<span class="service"></span>').html('<a href="' + urlTitle + '">' + title + '</a>').appendTo('.department:eq(' + index + ') .lvl-b');
                   }
                   if (responsible) {
                       $('<span class="person"></span>').html('<a href="' + urlResponsible + '">' + responsible + '</a>').appendTo('.department:eq(' + index + ') .lvl-b');
                   }
                   /* on construit le niveau 2 */
                   if ($(this).find('lvl2').length) {
                       $('<ul class="sections"></ul>').appendTo('.department:eq(' + index + ')');
                   };
                   $(this).find('lvl2').each(function (index2) {
                       var title = $(this).find('>title').text();
                       var urlTitle = $(this).find('>title').attr('link');
                       var responsible = $(this).find('>responsible').text();
                       var urlResponsible = $(this).find('>responsible').attr('link');

                       $('<li class="section"><div class="lvl-c"></div></li>').appendTo('.department:eq(' + index + ') ul.sections');
                       if (title) {
                           $('<span class="service"></span>').html('<a href="' + urlTitle + '">' + title + '</a>').appendTo('.department:eq(' + index + ') .section:eq(' + index2 + ') > .lvl-c');
                       }
                       if (responsible) {
                           $('<span class="person"></span>').html('<a href="' + urlResponsible + '">' + responsible + '</a>').appendTo('.department:eq(' + index + ') .section:eq(' + index2 + ') > .lvl-c');
                       }
                       /* on construit le niveau 3 */
                       if ($(this).find('lvl3').length) {
                           $('<ul class="lvl-d"></ul>').appendTo('.department:eq(' + index + ') ul.sections .section:eq(' + index2 + ') > .lvl-c');
                       };
                       $(this).find('lvl3').each(function (index3) {
                           var title = $(this).find('>title').text();
                           var urlTitle = $(this).find('>title').attr('link');
                           var responsible = $(this).find('>responsible').text();
                           var urlResponsible = $(this).find('>responsible').attr('link');
                           $('<li></li>').appendTo('.department:eq(' + index + ') ul.sections .section:eq(' + index2 + ') .lvl-d');
                           if (title) {
                               $('<span class="service"></span>').html('<a href="' + urlTitle + '">' + title + '</a>').appendTo('.department:eq(' + index + ') .section:eq(' + index2 + ') .lvl-c .lvl-d > li:eq(' + index3 + ')');
                           }
                           if (responsible) {
                               $('<span class="person"></span>').html('<a href="' + urlResponsible + '">' + responsible + '</a>').appendTo('.department:eq(' + index + ') .section:eq(' + index2 + ') .lvl-c .lvl-d > li:eq(' + index3 + ')');
                           }
                           /* on construit le niveau 4 */
                           if ($(this).find('lvl4').length) {
                               $('<ul class="lvl-e"></ul>').appendTo('.department:eq(' + index + ') ul.sections .section:eq(' + index2 + ') .lvl-c .lvl-d > li:eq(' + index3 + ')');
                           };
                           $(this).find('lvl4').each(function (index4) {
                               var title = $(this).find('>title').text();
                               var urlTitle = $(this).find('>title').attr('link');
                               var responsible = $(this).find('>responsible').text();
                               var urlResponsible = $(this).find('>responsible').attr('link');
                               $('<li></li>').appendTo('.department:eq(' + index + ') ul.sections .section:eq(' + index2 + ') .lvl-d > li:eq(' + index3 + ') .lvl-e');
                               if (title) {
                                   $('<span class="service"></span>').html('<a href="' + urlTitle + '">' + title + '</a>').appendTo('.department:eq(' + index + ') .section:eq(' + index2 + ') .lvl-c .lvl-d > li:eq(' + index3 + ') .lvl-e > li:eq(' + index4 + ')');
                               }
                               if (responsible) {
                                   $('<span class="person"></span>').html('<a href="' + urlResponsible + '">' + responsible + '</a>').appendTo('.department:eq(' + index + ') .section:eq(' + index2 + ') .lvl-c .lvl-d > li:eq(' + index3 + ') .lvl-e > li:eq(' + index4 + ')');
                               }
                               /* on construit le niveau 5 */
                               if ($(this).find('lvl5').length) {
                                   $('<ul class="lvl-f"></ul>').appendTo('.department:eq(' + index + ') ul.sections .section:eq(' + index2 + ') .lvl-c .lvl-d > li:eq(' + index3 + ') .lvl-e > li:eq(' + index4 + ')');
                               };
                               $(this).find('lvl5').each(function (index5) {
                                   var title = $(this).find('>title').text();
                                   var urlTitle = $(this).find('>title').attr('link');
                                   var responsible = $(this).find('>responsible').text();
                                   var urlResponsible = $(this).find('>responsible').attr('link');
                                   $('<li></li>').appendTo('.department:eq(' + index + ') ul.sections .section:eq(' + index2 + ') .lvl-d > li:eq(' + index3 + ') .lvl-e > li:eq(' + index4 + ') .lvl-f');
                                   if (title) {
                                       $('<span class="service"></span>').html('<a href="' + urlTitle + '">' + title + '</a>').appendTo('.department:eq(' + index + ') .section:eq(' + index2 + ') .lvl-c .lvl-d > li:eq(' + index3 + ') .lvl-e > li:eq(' + index4 + ') .lvl-f > li:eq(' + index5 + ')');
                                   }
                                   if (responsible) {
                                       $('<span class="person"></span>').html('<a href="' + urlResponsible + '">' + responsible + '</a>').appendTo('.department:eq(' + index + ') .section:eq(' + index2 + ') .lvl-c .lvl-d > li:eq(' + index3 + ') .lvl-e > li:eq(' + index4 + ') .lvl-f > li:eq(' + index5 + ')');
                                   }
                                   /* on construit le niveau 6 */
                                   if ($(this).find('lvl6').length) {
                                       $('<ul class="lvl-g"></ul>').appendTo('.department:eq(' + index + ') ul.sections .section:eq(' + index2 + ') .lvl-c .lvl-d > li:eq(' + index3 + ') .lvl-e > li:eq(' + index4 + ') .lvl-f >li:eq(' + index5 + ')');
                                   };
                                   $(this).find('lvl6').each(function (index6) {
                                       var title = $(this).find('>title').text();
                                       var urlTitle = $(this).find('>title').attr('link');
                                       var responsible = $(this).find('>responsible').text();
                                       var urlResponsible = $(this).find('>responsible').attr('link');
                                       $('<li></li>').appendTo('.department:eq(' + index + ') ul.sections .section:eq(' + index2 + ') .lvl-d > li:eq(' + index3 + ') .lvl-e > li:eq(' + index4 + ') .lvl-f > li:eq(' + index5 + ') .lvl-g');
                                       if (title) {
                                           $('<span class="service"></span>').html('<a href="' + urlTitle + '">' + title + '</a>').appendTo('.department:eq(' + index + ') .section:eq(' + index2 + ') .lvl-c .lvl-d > li:eq(' + index3 + ') .lvl-e > li:eq(' + index4 + ') .lvl-f > li:eq(' + index5 + ') .lvl-g > li:eq(' + index6 + ')');
                                       }
                                       if (responsible) {
                                           $('<span class="person"></span>').html('<a href="' + urlResponsible + '">' + responsible + '</a>').appendTo('.department:eq(' + index + ') .section:eq(' + index2 + ') .lvl-c .lvl-d > li:eq(' + index3 + ') .lvl-e > li:eq(' + index4 + ') .lvl-f > li:eq(' + index5 + ') .lvl-g > li:eq(' + index6 + ')');
                                       }
                                   });
                               });
                           });
                       });
                   });

               });
               
               /* Build collapse/expand */
               if ($('.org-chart').length) {
                   /* Structure button collapse */
                   var btnCollapse = "<button class='btn btn-secondary btn-expand'><i aria-hidden='true' class='icon-arrow-down'></i></button";
                   /* Ajout des boutons collapse/expand */
                   $(".lvl-c").each(function () {
                       /* si un sous niveau existe*/
                       if ($(this).find('ul').length) {
                           $(this).find('ul').before($(btnCollapse));
                           //$(this).find('.service').addClass('title-collapse');
                           $(this).children('.lvl-d').addClass('lvl-collapsed');
                       }
                   });
                   $(".lvl-d").each(function () {
                       /* si un sous niveau existe*/
                       if ($(this).find('ul').length) {
                           $(this).find('> ul').before($(btnCollapse));
                           //$(this).find('.service').addClass('title-collapse');
                           $(this).children('.lvl-e').addClass('lvl-collapsed');
                       }
                   });
                   /* boutons pour le niveau 1 dans le cas de la vue mobile */
                    $(".department").each(function () {
                       /* si un sous niveau existe*/
                       if ($(this).find('>ul').length) {
                           $(this).find('>ul').before($(btnCollapse));
                           //$(this).find('.service').addClass('title-collapse');
                           $(this).children('.sections').addClass('lvl-collapsed');
                       }
                   });
               }
               /* End build collapse/expand */
               $('.loading').hide();
           }
       });
   };
    /* Clic btn collapsed */
    $('body').on( "click", ".org-chart .btn-expand", function() {
            /* Collapse element */
            if ($(this).hasClass('btn-collapse')) {
                $(this).removeClass('btn-collapse');
                /* changement icone */
                $(this).find('i').removeClass('icon-arrow-up').addClass('icon-arrow-down')
            }
            /* Expand element */
            else {
                $(this).addClass('btn-collapse');
                /* changement icone */
                $(this).find('i').removeClass('icon-arrow-down').addClass('icon-arrow-up');
            }
        })
    /* Btn collapse/expand all */
    $('.org-chart #collapseAll').click(function () {
        $(".org-chart .btn-collapse").each(function () {
            $(this).removeClass('btn-collapse');
            $(this).find('i').removeClass('icon-arrow-up').addClass('icon-arrow-down');
        });
    });
    $('.org-chart #expandAll').click(function () {
        $(".org-chart .btn-expand").each(function () {
            $(this).addClass('btn-collapse');
            $(this).find('i').removeClass('icon-arrow-down').addClass('icon-arrow-up');
        });
    });

	 /* ==========================================================
       33 - ODA Management of persona
    ========================================================*/
	 $("a[id^='browseAsSetPersona']").click(function (){
		   addUrlParam('persona', $(this).attr('persona'));
	 });
	 $("a[id^='errorPageSetPersona']").click(function (){
		   addUrlParam('persona', $(this).attr('persona'));
	 });
    /* ==========================================================
       34 - ODA Management of sorting
    ========================================================*/
	 $("a[id$='ListSortDesc']").click(function (){
		 var sortField = $(this).attr('field');
		 addUrlParams(['sortField','sortOrder'],[sortField,'desc']);
	 });
	 $("a[id$='ListSortAsc']").click(function (){
		 var sortField = $(this).attr('field');
		 addUrlParams(['sortField','sortOrder'],[sortField,'asc']);
	 });
 
	// Replace a param in URL if the same exists
 	function getUrlWithReplaceParam(startString, startIndexOf, paramName, paramValue, paramChar) {
	   var urlToUse = '';
	   var fullParamNameLength = (paramChar + paramName + '=').length;
	   var indexOfStartParamValue = startIndexOf + fullParamNameLength;
	   var indexOfEndOfParamValue = startString.indexOf('&', indexOfStartParamValue);
	   if (indexOfEndOfParamValue != -1) {
		   urlToUse = startString.substring(0,indexOfStartParamValue) + paramValue + startString.substring(indexOfEndOfParamValue);
	   } else {
		   urlToUse = startString.substring(0,indexOfStartParamValue) + paramValue;
	   }
	   return urlToUse;
 	}
 	
	 // Add the paramName with the paramValue to the current URL
	 function addUrlParam(paramName, paramValue) {
	   var currentUrl = $(location).attr('href');
	   if (currentUrl.indexOf('#') == (currentUrl.length - 1)) {
		   currentUrl = currentUrl.substring(0, currentUrl.length - 1);
	   }
	   var indexOf = currentUrl.indexOf('?');
	   // Check if the current URL contains ? (there is at least one param)
	   if (indexOf != -1) {
		   indexOf = currentUrl.indexOf('?' + paramName + '=');
		   // Check if the current URL contains ?paramName= (the paramName exists)
		   if (indexOf != -1) {
			   var newUrl = getUrlWithReplaceParam(currentUrl, indexOf, paramName, paramValue, '?');
			   $(location).attr('href', newUrl);
		   } else {
			// Check if the current URL contains &paramName= (the paramName exists)
			   indexOf = currentUrl.indexOf('&' + paramName + '=');
			   if (indexOf != -1) {
				   var newUrl = getUrlWithReplaceParam(currentUrl, indexOf, paramName, paramValue, '&');
				   $(location).attr('href', newUrl);
			   } else {
				   $(location).attr('href', currentUrl + "&" + paramName + "=" + paramValue);
			   }
		   }
	   } else {
		   $(location).attr('href', currentUrl + "?" + paramName + "=" + paramValue);
	   }
	}

	 // Add the paramNames with the paramValues to the current URL
	 function addUrlParams(paramNames, paramValues) {
		 
		 var currentUrl = $(location).attr('href');
		 
		 if (paramNames.length == paramValues.length && paramNames.length > 0) {

			 // Delete the # at the end of the url
			 if (currentUrl.indexOf('#') == (currentUrl.length - 1)) {
				 currentUrl = currentUrl.substring(0, currentUrl.length - 1);
			 }
			 
			 var indexOf = currentUrl.indexOf('?');
			 // Check if the current URL contains ? (there is at least one param)
			 if (indexOf != -1) {
				 for (i = 0; i < paramNames.length; i++) {
					 indexOf = currentUrl.indexOf('?' + paramNames[i] + '=');
					 // Check if the current URL contains ?paramName= (the paramName exists)
					 if (indexOf != -1) {
						 currentUrl = getUrlWithReplaceParam(currentUrl, indexOf, paramNames[i], paramValues[i], '?');
					 } else {
						 // Check if the current URL contains &paramName= (the paramName exists)
						 indexOf = currentUrl.indexOf('&' + paramNames[i] + '=');
						 if (indexOf != -1) {
							 currentUrl = getUrlWithReplaceParam(currentUrl, indexOf, paramNames[i], paramValues[i], '&');
						 } else {
							currentUrl += "&" + paramNames[i] + "=" + paramValues[i];
						 }
					 }
				 }
			 } else {
				 currentUrl += "?" + paramNames[0] + "=" + paramValues[0];
				 for (i = 1; i < paramNames.length; i++) {
					 currentUrl += "&" + paramNames[i] + "=" + paramValues[i];
				 }
			 }
		 }
		 
		 $(location).attr('href', currentUrl);
	 }

});


