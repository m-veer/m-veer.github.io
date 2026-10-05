

// Script
//------------------------------------------------------------------------------


$(document).ready(function() {
  // console.log('ready!');

  // Reset the window scroll position to top on every page load and re-load
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }

  // Fix touch device touch events
  $('body *').on('touchstart', function (){});

  // Set the copyright to the current year in local time
  var currentYear = new Date().getFullYear();
  $('.copyright .year').html(currentYear);
  // console.log('Current year is ' + currentYear);
  // console.log('Setting copyright accordingly');

  // Auto hide app cover on load
  function hideAppCoverDelay() {
    // Finishes sliding in before the loading screen lifts away
    window.setTimeout(hideAppCover, 1500);
  }
  function hideAppCover() {
    $('body').removeClass('cover--is--visible');
  }
  hideAppCoverDelay();

  // Auto remove body loading class to have a hook to prevent UI bugs
  function removeLoadingClassDelay() {
    window.setTimeout(removeLoadingClass, 3250);
  }
  function removeLoadingClass() {
    $('body').removeClass('is--loading');
  }
  removeLoadingClassDelay();

  // Scroll to Contact from app header
  $('.app-header .contact').click(function() {
    scrollToContact();
  });

  // Scroll to Intro from app nav
  $('.app-nav .item.intro').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToIntro, 300);
      }
      scrollDelay();
    }
    else {
      scrollToIntro();
    }
  });

  // Scroll to Values from app nav
  $('.app-nav .item.values').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToValues, 300);
      }
      scrollDelay();
    }
    else {
      scrollToValues();
    }
  });

  // Scroll to Background from app nav
  $('.app-nav .item.background').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToBackground, 300);
      }
      scrollDelay();
    }
    else {
      scrollToBackground();
    }
  });

  // Scroll to References from app nav
  $('.app-nav .item.references').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToReferences, 300);
      }
      scrollDelay();
    }
    else {
      scrollToReferences();
    }
  });

  // Scroll to Work from app nav
  $('.app-nav .item.work').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToWork, 300);
      }
      scrollDelay();
    }
    else {
      scrollToWork();
    }
  });

  // Scroll to About from app nav
  $('.app-nav .item.about').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToAbout, 300);
      }
      scrollDelay();
    }
    else {
      scrollToAbout();
    }
  });

  // Scroll to Contact from app nav
  $('.app-nav .item.contact').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      function scrollDelay() {
        window.setTimeout(scrollToContact, 300);
      }
      scrollDelay();
    }
    else {
      scrollToContact();
    }
  });

  // Mobile nav trigger
  $('.app-header .navigation').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      closeMobileNav();
    }
    else {
      openMobileNav();
    }
  });

  // Close mobile nav from app nav item
  $('.app-nav .item').click(function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      closeMobileNav();
    }
  });

  // Auto hide app nav on window resize to prevent visibility bugs
  $(window).on( 'resize', function() {
    if ( $('body').hasClass('mobile-nav--is--visible') ){
      closeMobileNav();
    }
  });

  // Make theme slider visible on hover on no touch devices
  $('html.no-touchevents .option.theme').mouseenter(function() {
    $('body').addClass('theme-slider--is--visible');
  });
  $('html.no-touchevents .option.theme').mouseleave(function() {
    $('body').removeClass('theme-slider--is--visible');
  });

  // Make theme slider visible on tap on touch devices
  $('html.touchevents .option.theme').click(function() {
    $('body').addClass('theme-slider--is--visible');
    // alert('option tapped');
  });
  // Make theme slider invisible if anything besides the slider is tapped
  $('html.touchevents').click(function(event) {
    if (!$(event.target).closest('.option.theme').length) {
      $('body').removeClass('theme-slider--is--visible');
    }
  });

  // Theme slider: black, or a country's colors, language, and code flavor
  $('.app-aside .slider').on('input', function() {
    portfolioSetTheme($(this).val());
  });

  // Grid overlay
  $('.option.grid').click(function() {
    appGridOverlay();
  });

  // Intro section options
  $('.section.intro .options').scroll(function() {
    var introOptionsScrollLeft = $('.section.intro .options').scrollLeft();
    if ( introOptionsScrollLeft > 0 ){
      $('.section.intro .gradient-mask.left').addClass('is--visible');
    }
    else {
      $('.section.intro .gradient-mask.left').removeClass('is--visible');
    }
  });
  // Each option's audience class (e.g. "recruiters") matches the text to show
  $('.section.intro .option').click(function() {
    var audience = this.className.replace(/\b(option|is--active)\b/g, '').trim();
    $('.section.intro .option').removeClass('is--active');
    $('.section.intro .text').removeClass('is--visible');
    $(this).addClass('is--active');
    $('.section.intro .text.' + audience).addClass('is--visible');
  });

  // Reveal cards and headings as they scroll into view
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var revealItems = $('.section.work .item, .section.background .item, .section.references .item, .section.values .title h1, .section.contact .image figure').addClass('reveal');
    $('.section.work .stack').each(function() {
      $(this).children('.tag').each(function(index) {
        this.style.setProperty('--tag-index', index);
      });
    });
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass('is--revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealItems.each(function() {
      revealObserver.observe(this);
    });
    $('html').addClass('reveal--ready');
  }

  // Project and job descriptions stay folded until their title is hovered,
  // tapped, or focused; they stay open while the pointer is on the item
  $('.section .item').has('.item-details').each(function(index) {
    var item = $(this);
    var title = item.find('.role').first();
    var details = item.find('.item-details');
    var detailsId = 'item-details-' + index;
    details.attr('id', detailsId);
    item.addClass('has--details');
    title.attr({ 'tabindex': 0, 'role': 'button', 'aria-expanded': 'false', 'aria-controls': detailsId });

    function setOpen(open) {
      item.toggleClass('is--open', open);
      if (open) {
        $('body').addClass('has--opened-details');
      }
      title.attr('aria-expanded', open ? 'true' : 'false');
    }

    title.on('mouseenter', function() { setOpen(true); });
    item.on('mouseleave', function() { setOpen(false); });
    // Taps toggle; mouse clicks don't, since hovering already opened it.
    // Links inside a title (live demos, repos) keep working.
    title.on('pointerup', function(event) {
      if (event.originalEvent.pointerType === 'mouse' || $(event.target).closest('a').length) {
        return;
      }
      setOpen(!item.hasClass('is--open'));
    });
    title.on('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setOpen(!item.hasClass('is--open'));
      }
    });
  });

  // Scroll to Contact from text links in sections
  $('.section a.contact').click(function() {
    scrollToContact();
  });

}); // End document ready



// Keyboard Shortcuts
// reference https://www.w3.org/2002/09/tests/keys.html
$(document).keydown(function(key) {

    switch(parseInt(key.which,10)) {

      // 'g' key pressed
      case 71:
        // console.log('g key pressed');
        appGridOverlay();
        break;

      // ';' key pressed
      case 186:
        // console.log('; key pressed');
        appGridOverlay();
        break;

      // 'w' key pressed
      case 87:
        // console.log('w key pressed');
        appTheme();
        break;

      // 'b' key pressed
      case 66:
        // console.log('b key pressed');
        appTheme();
        break;

      // 's' key pressed
      case 83:
        // console.log('s key pressed');
        appThemeSpectrum();
        break;
    }
});

// Scroll to Intro
function scrollToIntro() {
  // $('html, body').animate({ scrollTop: $('.section.intro').offset().top }, 750, 'easeOutCubic');
  $('html, body').animate({ scrollTop: 0 }, 750, 'easeOutCubic');
}

// Scroll to Values
function scrollToValues() {
  // $('html, body').animate({ scrollTop: $('.section.values').offset().top - 90 }, 750, 'easeOutCubic');
  $('html, body').animate({ scrollTop: $('.section.values').offset().top }, 750, 'easeOutCubic');
}

// Scroll to Background
function scrollToBackground() {
  $('html, body').animate({ scrollTop: $('.section.background').offset().top }, 750, 'easeOutCubic');
}

// Scroll to References
function scrollToReferences() {
  $('html, body').animate({ scrollTop: $('.section.references').offset().top }, 750, 'easeOutCubic');
}

// Scroll to Work
function scrollToWork() {
  $('html, body').animate({ scrollTop: $('.section.work').offset().top }, 750, 'easeOutCubic');
}

// Scroll to About
function scrollToAbout() {
  $('html, body').animate({ scrollTop: $('.section.about').offset().top }, 750, 'easeOutCubic');
}

// Scroll to Contact
function scrollToContact() {

  var pageHeight = $(document).height();
  var viewportHeight = $(window).height();

  var sectionContact = $('.app-main .section.contact')
  var sectionContactHeight = sectionContact.height();
  var sectionContactTop = sectionContact.offset().top;

  if ( sectionContactHeight > viewportHeight ) {
    $('html, body').animate({ scrollTop: sectionContactTop }, 750, 'easeOutCubic');
  }
  else {
    $('html, body').animate({ scrollTop: pageHeight - viewportHeight }, 750, 'easeOutCubic');
  }

}

// Open mobile nav
function openMobileNav() {
  $('body').addClass('mobile-nav--is--transitioning');
  function addVisibleClassDelay() {
    window.setTimeout(addVisibleClass, 1);
  }
  function addVisibleClass() {
    $('body').addClass('mobile-nav--is--visible');
  }
  addVisibleClassDelay();
}

// Close mobile nav
function closeMobileNav() {
  $('body').removeClass('mobile-nav--is--visible');
  function removeTransitioningClassDelay() {
    window.setTimeout(removeTransitioningClass, 500);
  }
  function removeTransitioningClass() {
    $('body').removeClass('mobile-nav--is--transitioning');
  }
  removeTransitioningClassDelay();
}

// detect and remove class names that start with 'theme--'
function appThemeRemoveAll() {
  $('body').removeClass(function (index, themeClassName) {
    return (themeClassName.match (/(^|\s)theme--\S+/g) || []).join(' ');
  });
}

// 'b' and 'w' reset to the default black theme
function appTheme() {
  portfolioSetTheme(0);
}

// 's' steps through the country themes
function appThemeSpectrum() {
  portfolioSetTheme((portfolioThemeIndex() + 1) % (window.PORTFOLIO_LOCALES.length + 1));
}

// Grid overlay
function appGridOverlay() {
  $('.app-grid-overlay').toggleClass('is--visible');
}

// App main scroll
$(window).on('load resize scroll', function() {

  var viewportHeight = $(window).height();
  var viewportHeightHalf = viewportHeight / 2;
  var viewportHeightThird = viewportHeight / 3;
  var viewportHeightQuarter = viewportHeight / 4;

  var appNavItem = $('.app-nav .item');
  var appNavItemIntro = $('.app-nav .item.intro');
  var appNavItemWork = $('.app-nav .item.work');
  var appNavItemValues = $('.app-nav .item.values');
  var appNavItemBackground = $('.app-nav .item.background');
  var appNavItemReferences = $('.app-nav .item.references');
  var appNavItemAbout = $('.app-nav .item.about');
  var appNavItemContact = $('.app-nav .item.contact');

  var appMain = $('.app-main');
  var appMainHeight = appMain.height();
  var appMainScrollTop = $(window).scrollTop();
  var appMainScrollMiddle = appMainScrollTop + viewportHeightHalf;
  var appMainScrollBottom = appMainScrollTop + viewportHeight;
  var appMainScrollDownRemaining = appMainHeight - appMainScrollBottom;

  var section = $('.app-main .section');

  var sectionIntro = $('.app-main .section.intro');
  var sectionIntroHeight = sectionIntro.height();
  var sectionIntroHeightHalf = sectionIntroHeight / 2;
  var sectionIntroTop = sectionIntro.offset().top;
  var sectionIntroMiddle = sectionIntroTop + sectionIntroHeightHalf;
  var sectionIntroBottom = sectionIntroTop + sectionIntroHeight;

  var sectionWork = $('.app-main .section.work')
  var sectionWorkHeight = sectionWork.height();
  var sectionWorkTop = sectionWork.offset().top;
  var sectionWorkBottom = sectionWorkTop + sectionWorkHeight;

  var sectionValues = $('.app-main .section.values')
  var sectionValuesHeight = sectionValues.height();
  var sectionValuesTop = sectionValues.offset().top;
  var sectionValuesBottom = sectionValuesTop + sectionValuesHeight;

  var sectionBackground = $('.app-main .section.background')
  var sectionBackgroundHeight = sectionBackground.height();
  var sectionBackgroundTop = sectionBackground.offset().top;
  var sectionBackgroundBottom = sectionBackgroundTop + sectionBackgroundHeight;

  var sectionReferences = $('.app-main .section.references')
  var sectionReferencesHeight = sectionReferences.height();
  var sectionReferencesTop = sectionReferences.offset().top;
  var sectionReferencesBottom = sectionReferencesTop + sectionReferencesHeight;

  var sectionAbout = $('.app-main .section.about')
  var sectionAboutHeight = sectionAbout.height();
  var sectionAboutTop = sectionAbout.offset().top;
  var sectionAboutBottom = sectionAboutTop + sectionAboutHeight;

  var sectionContact = $('.app-main .section.contact')
  var sectionContactHeight = sectionContact.height();
  var sectionContactHeightHalf = sectionContactHeight / 2;
  var sectionContactTop = sectionContact.offset().top;
  var sectionContactMiddle = sectionContactTop + sectionContactHeightHalf;
  var sectionContactBottom = sectionContactTop + sectionContactHeight;

  appNavItem.removeClass('is--active');

  if ( sectionIntroMiddle > appMainScrollTop ){
    appNavItemIntro.addClass('is--active');
  }
  else if ( sectionWorkTop <= appMainScrollBottom && sectionWorkBottom >= appMainScrollMiddle ){
    appNavItemWork.addClass('is--active');
  }
  if ( sectionValuesTop <= appMainScrollMiddle && sectionValuesBottom >= appMainScrollMiddle ){
    appNavItemValues.addClass('is--active');
  }
  if ( sectionBackgroundTop <= appMainScrollMiddle && sectionBackgroundBottom >= appMainScrollMiddle ){
    appNavItemBackground.addClass('is--active');
  }
  if ( sectionReferencesTop <= appMainScrollMiddle && sectionReferencesBottom >= appMainScrollMiddle ){
    appNavItemReferences.addClass('is--active');
  }
  if ( sectionAboutTop <= appMainScrollMiddle && sectionContactMiddle >= appMainScrollBottom ){
    appNavItemAbout.addClass('is--active');
  }
  if ( sectionContactMiddle < appMainScrollBottom ){
    appNavItemContact.addClass('is--active');
  }

}); // End app main scroll
