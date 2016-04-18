Function.prototype.blockEventFor = function(threshold) {
  // Save the calling funcion
  var func = this;
  // Initialize the variable to compare
  // window.__eventBlockedUntil = 0;

  func(arguments[1], arguments[2]);
  return null;
}

var a = function(val, val2) {
  console.log(val, val2);
}

var blockEventFor = function(func, threshold) {
  // window.__eventBlockedUntil = 0;

  return function eventBlocked() {
    var obj = this,
        args = arguments;

  }
}

$(document).ready(function() {

  // Not using scroll anymore for now, fuck the scrolling event

  // // Bind scroll event for mousewheel
  // $(window).on('mousewheel', function(e) {
  //   var scrollDelta = e.originalEvent.wheelDelta;

  //   if (scrollDelta > 0) {
  //     moveImgs('prev');
  //   } else {
  //     moveImgs('next');
  //   }
  // });

  // Define key codes
    var left = 37,
        up = 38,
        right = 39,
        down = 40;

  // Bind scroll event for up, down, left and right arrows
  $(window).on('keydown', function(e) {

    // Save the key pressed to access it many times
    var keyPressed = e.keyCode;

    if (keyPressed === left) {
      moveImgs('prev');
    } else if (keyPressed === up) {
      moveImgs('prev');
    } else if (keyPressed === right) {
      moveImgs('next');
    } else if (keyPressed === down){
      moveImgs('next');
    } else {
      return
    }
  })

  // images contains all the image containers 
  var images = $('.img-container'),
  // mainSection is the section we need to scroll
      mainSection = $('.main-section'),
  // The amount we'll need to scroll is the height of an image container
      // scrollOffset = $(images[0]).innerHeight(),
  // To know at which image we're looking, initialize a marker
      scrollAt = 0,
      animationSpeed = 500,
      // Time to substract from the animation duration
      fadeOffset = 200,
  // Indicate image index over total
      imageCount = 1,
      imageCounter = $('.image-counter');

  images.each(function(index, el) {
    var $el = $(el);
    // Add an id to each image to track which one you're at
    $el
      .attr('id', index);
  })

  imageCounter.html(imageCount + '/' + images.length);

  // $('.main-container').mCustomScrollbar({
  //   theme: 'dark'
  // });

  var seriesHeader = $('.series-header'),
      prevArrow = $('.prev-arrow-container'),
      nextArrow = $('.next-arrow-container');

      // Arrow containers hover
      // prevArrow.hover(function(e) {
      //   console.log('entered pA')
      // }, function(e) {
      //   console.log('left pA')
      // });
      // nextArrow.hover(function(e) {
      //   console.log('entered nA')
      // }, function(e) {
      //   console.log('left nA')
      // });

  prevArrow.on('click', function(e) {
    moveImgs('prev');
  })
  nextArrow.on('click', function(e) {
    moveImgs('next');
  })

  // Bind hover event for side bar
  $('.side-nav-fake-hover').hover(
    function(e) {
      seriesHeader.velocity({
        opacity: [1, 0]
      }, {
        duration: 150,
        queue: false
      });
    },
    function(e) {
      seriesHeader.velocity({
        opacity: [0, 1]
      }, {
        duration: 150,
        queue: false
      });
    });

  window.__eventBlockedUntil = 0;

  // Function to move between images
  function moveImgs(direction) {
    // ONLY move images if the event fires after the last animation is over to avoid clutter
    if ( window.__eventBlockedUntil < Number(new Date()) - animationSpeed) {

      if (direction == 'prev') {
        console.log(scrollAt);
        // If image is the first one, indicate that
        if (scrollAt === 0) {
          console.log('cant scroll further');
        } else {
          console.log('prev');
        // Else reduce the scrollAt counter
        // Reduce the counter before anything so it always refers to the image you are GOING TO
          scrollAt -= 1;
          // var currentScroll = mainSection.scrollTop();
          var imageLeaving = $(images[scrollAt+1]),
              imageComing = $(images[scrollAt]);
        // Scroll to the top of the previous image
          // imageComing.velocity('scroll', {
          //   container: mainSection,
          //   duration: animationSpeed,
          //   easing: 'easeOutCubic'
          // });
          // imageLeaving.velocity({opacity: [0, 1]}, {
          //   duration: animationSpeed - fadeOffset,
          //   easing: 'easeIn'
          // });
          // imageComing.velocity({opacity: [1, 0]}, {
          //   duration: animationSpeed - fadeOffset,
          //   easing: 'easeIn',
          //   queue: false
          // });
        // Change the image counter
          imageCounter.html(--imageCount + '/' + images.length);
        }
      } else if (direction == 'next') {
        console.log(scrollAt);
        // If image is last one, indicate that
        if (scrollAt === images.length-1) {
          console.log('cant scroll further');
        } else {
          console.log('next');
          scrollAt += 1;
          // var currentScroll = mainSection.scrollTop();
          var imageLeaving = $(images[scrollAt-1]),
              imageComing = $(images[scrollAt]);

          // imageComing.velocity('scroll', {
          //   container: mainSection,
          //   duration: animationSpeed,
          //   easing: 'easeOutCubic'
          // });
          // imageLeaving.velocity({opacity: [0, 1]}, {
          //   duration: animationSpeed - fadeOffset,
          //   easing: 'easeIn'
          // });
          // imageComing.velocity({opacity: [1, 0]}, {
          //   duration: animationSpeed - fadeOffset,
          //   easing: 'easeIn',
          //   queue: false
          // });
          imageCounter.html(++imageCount + '/' + images.length);
        }
      } else {
        // If you are not giving the function the correct arguments...
        console.log("You're drunk, go home");
      }

      window.__eventBlockedUntil = Number(new Date());

      // console.log($(images[scrollAt]).find('img'));

    } else {
      // If you try to fire animations too fast...
      console.log("'You're way too hurried");
    }
  }

  // Image clicking event, not used for now
  // $('body').on('click', function(e) {
  //   if (e.target.tagName == "IMG") {
  //     console.log('image clicked');
  //   }
  // })

});
