(function () {
  'use strict';

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  var fullHeight = function () {
    if (!isMobile.any()) {
      $('.js-fullheight').css('height', $(window).height());
      $(window).resize(function () {
        $('.js-fullheight').css('height', $(window).height());
      });
    }
  };

  var counter = function () {
    $('.js-counter').countTo({
      formatter: function (value, options) {
        return value.toFixed(options.decimals);
      },
    });
  };

  var counterWayPoint = function () {
    if ($('#colorlib-counter').length > 0) {
      $('#colorlib-counter').waypoint(
        function (direction) {
          if (direction === 'down' && !$(this.element).hasClass('animated')) {
            setTimeout(counter, 400);
            $(this.element).addClass('animated');
          }
        },
        { offset: '90%' }
      );
    }
  };

  // Animations
  var contentWayPoint = function () {
    var i = 0;
    $('.animate-box').waypoint(
      function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          i++;

          $(this.element).addClass('item-animate');
          setTimeout(function () {
            $('body .animate-box.item-animate').each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data('animate-effect');
                  if (effect === 'fadeIn') {
                    el.addClass('fadeIn animated');
                  } else if (effect === 'fadeInLeft') {
                    el.addClass('fadeInLeft animated');
                  } else if (effect === 'fadeInRight') {
                    el.addClass('fadeInRight animated');
                  } else {
                    el.addClass('fadeInUp animated');
                  }

                  el.removeClass('item-animate');
                },
                k * 200,
                'easeInOutExpo'
              );
            });
          }, 100);
        }
      },
      { offset: '85%' }
    );
  };

  var burgerMenu = function () {
    $('.js-colorlib-nav-toggle').on('click', function (event) {
      event.preventDefault();
      var $this = $(this);

      if ($('body').hasClass('offcanvas')) {
        $this.removeClass('active');
        $('body').removeClass('offcanvas');
      } else {
        $this.addClass('active');
        $('body').addClass('offcanvas');
      }
    });
  };

  // Click outside of offcanvass
  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $('#colorlib-aside, .js-colorlib-nav-toggle');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('offcanvas')) {
          $('body').removeClass('offcanvas');
          $('.js-colorlib-nav-toggle').removeClass('active');
        }
      }
    });

    $(window).scroll(function () {
      if ($('body').hasClass('offcanvas')) {
        $('body').removeClass('offcanvas');
        $('.js-colorlib-nav-toggle').removeClass('active');
      }
    });
  };

  var clickMenu = function () {
    $('#navbar a:not([class="external"])').click(function (event) {
      var section = $(this).data('nav-section'),
        navbar = $('#navbar');

      if ($('[data-section="' + section + '"]').length) {
        $('html, body').animate(
          {
            scrollTop: $('[data-section="' + section + '"]').offset().top - 55,
          },
          500
        );
      }

      if (navbar.is(':visible')) {
        navbar.removeClass('in');
        navbar.attr('aria-expanded', 'false');
        $('.js-colorlib-nav-toggle').removeClass('active');
      }

      event.preventDefault();
      return false;
    });
  };

  // Reflect scrolling in navigation
  var navActive = function (section) {
    var $el = $('#navbar > ul');
    $el.find('li').removeClass('active');
    $el.each(function () {
      $(this)
        .find('a[data-nav-section="' + section + '"]')
        .closest('li')
        .addClass('active');
    });
  };

  var navigationSection = function () {
    var $section = $('section[data-section]');

    $section.waypoint(
      function (direction) {
        if (direction === 'down') {
          navActive($(this.element).data('section'));
        }
      },
      {
        offset: '150px',
      }
    );

    $section.waypoint(
      function (direction) {
        if (direction === 'up') {
          navActive($(this.element).data('section'));
        }
      },
      {
        offset: function () {
          return -$(this.element).height() + 155;
        },
      }
    );
  };

  var sliderMain = function () {
    $('#colorlib-hero .flexslider').flexslider({
      animation: 'fade',
      slideshowSpeed: 5000,
      directionNav: true,
      start: function () {
        setTimeout(function () {
          $('.slider-text').removeClass('animated fadeInUp');
          $('.flex-active-slide')
            .find('.slider-text')
            .addClass('animated fadeInUp');
        }, 500);
      },
      before: function () {
        setTimeout(function () {
          $('.slider-text').removeClass('animated fadeInUp');
          $('.flex-active-slide')
            .find('.slider-text')
            .addClass('animated fadeInUp');
        }, 500);
      },
    });
  };

  var stickyFunction = function () {
    var h = $('.image-content').outerHeight();

    if ($(window).width() <= 992) {
      $('#sticky_item').trigger('sticky_kit:detach');
    } else {
      $('.sticky-parent').removeClass('stick-detach');
      $('#sticky_item').trigger('sticky_kit:detach');
      $('#sticky_item').trigger('sticky_kit:unstick');
    }

    $(window).resize(function () {
      var h = $('.image-content').outerHeight();
      $('.sticky-parent').css('height', h);

      if ($(window).width() <= 992) {
        $('#sticky_item').trigger('sticky_kit:detach');
      } else {
        $('.sticky-parent').removeClass('stick-detach');
        $('#sticky_item').trigger('sticky_kit:detach');
        $('#sticky_item').trigger('sticky_kit:unstick');

        $('#sticky_item').stick_in_parent();
      }
    });

    $('.sticky-parent').css('height', h);

    $('#sticky_item').stick_in_parent();
  };

  var owlCrouselFeatureSlide = function () {
    $('.owl-carousel').owlCarousel({
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      autoplay: true,
      loop: true,
      margin: 0,
      nav: true,
      dots: false,
      autoHeight: true,
      items: 1,
      navText: [
        "<i class='icon-arrow-left3 owl-direction'></i>",
        "<i class='icon-arrow-right3 owl-direction'></i>",
      ],
    });
  };

  // Document on load.
  $(function () {
    fullHeight();
    counter();
    counterWayPoint();
    contentWayPoint();
    burgerMenu();

    clickMenu();
    // navActive();
    navigationSection();
    // windowScroll();

    mobileMenuOutsideClick();
    sliderMain();
    stickyFunction();
    owlCrouselFeatureSlide();
  });
})();

//download resume button'

document
  .getElementById('download-resume-btn')
  .addEventListener('click', function () {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = 'images/Resume.svg';

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL('image/png');
      var link = document.createElement('a');
      link.href = dataURL;
      link.download = 'Resume.png';
      link.click();
    };
  });

// For portfolio projects

// Get the buttons and content sections
const designBtn = document.getElementById('design-btn');
const devBtn = document.getElementById('dev-btn');
const designContent = document.getElementById('design-content');
const devContent = document.getElementById('dev-content');

// Function to show design projects and hide development
function showDesignProjects() {
  designContent.style.display = 'block';
  devContent.style.display = 'none';
  designBtn.classList.add('active');
  devBtn.classList.remove('active');
}

// Function to show development projects and hide design
function showDevelopmentProjects() {
  designContent.style.display = 'none';
  devContent.style.display = 'block';
  devBtn.classList.add('active');
  designBtn.classList.remove('active');
}

// Event listeners for buttons
designBtn.addEventListener('click', showDesignProjects);
devBtn.addEventListener('click', showDevelopmentProjects);

// Show design projects by default when the page loads
showDesignProjects();

// For Image Overlay

// Get all the buttons and modal elements
const buttons = document.querySelectorAll('.letter-btn');
const modal = document.getElementById('image-modal');
const closeModal = document.getElementById('close-modal');
const modalImg = document.getElementById('modal-img');

// When any button is clicked, show the modal with the corresponding image
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    // Get the image source from the data attribute
    const imageSrc = button.getAttribute('data-image');
    // Set the image source in the modal
    modalImg.src = imageSrc;
    // Show the modal
    modal.style.display = 'flex';
  });
});

// When the user clicks on the close button (X), close the modal
closeModal.addEventListener('click', function () {
  modal.style.display = 'none'; // Hide the modal
});

// When the user clicks anywhere outside of the modal image, close the modal
window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'; // Hide the modal if clicked outside the image
  }
});

// FOR BLOGS SECTION

// Open overlay with specific blog content
function openOverlay(blogId) {
  const overlay = document.getElementById('overlay');
  const overlayContent = document.getElementById('overlay-content');

  // Hide all blog contents initially
  const allContents = document.querySelectorAll('.overlay-description');
  allContents.forEach((content) => (content.style.display = 'none'));

  // Show the selected blog content
  const selectedBlogContent = document.getElementById(blogId + '-content');
  selectedBlogContent.style.display = 'block';

  // Set blog title, image, date, category, and time
  const blogTitle = document.querySelector(`#${blogId} .desc h3`).textContent;
  const blogImage = document.querySelector(`#${blogId} .blog-img img`).src;
  const blogDate = document
    .querySelector(`#${blogId} .desc .icon-calendar3`)
    .parentElement.textContent.trim();
  const blogCategory = document
    .querySelector(`#${blogId} .desc small`)
    .textContent.trim();
  const blogTime = document
    .querySelector(`#${blogId} .desc .icon-clock3`)
    .parentElement.textContent.trim();

  overlayContent.querySelector('.overlay-title').textContent = blogTitle;
  overlayContent.querySelector('.overlay-img img').src = blogImage;
  overlayContent.querySelector('.overlay-date').textContent = blogDate;
  overlayContent.querySelector('.overlay-category').textContent = blogCategory;
  overlayContent.querySelector('.overlay-time').textContent = blogTime;

  overlay.style.display = 'flex'; // Show overlay

  // Close the overlay if clicked outside the content area
  overlay.addEventListener('click', function (e) {
    if (!overlayContent.contains(e.target)) {
      closeOverlay(); // Close overlay if clicked outside content
    }
  });
}

// Close the overlay
function closeOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none'; // Hide overlay
}
