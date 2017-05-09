const slick = require('slick-carousel');

function createSlider($slidesContainer) {
  const $arrowsCont = $slidesContainer
    .closest('.image-box-outer')
    .find('.image-description-cont')
      .append('<div class="arrows-container"></div>')
    .find('.arrows-container')
      .append(`<div class="slide-numbers">
          <span class="current-number"></span>
          <span class="separator">/</span>
          <span class="total-number"></span>
        </div>`);

  const $currNum = $arrowsCont.find('.current-number');
  const $totalNum = $arrowsCont.find('.total-number');

  $slidesContainer.on('init', (e, slick) => {
    $currNum.text(slick.currentSlide+1);
    $totalNum.text(slick.slideCount);
  });

  const slider = $slidesContainer.slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendArrows: $arrowsCont,
    responsive: [ // fixes the loading issue when using flex-box
      {
        breakpoint: 1024,
        settings: {
          mobileFirst: false,
          infinite: true,
          slidesToShow: 1,
          fade: false
        }
      }
    ]
  });

  $slidesContainer.on('beforeChange', (e, slick, currentSlide, nextSlide) => {
    $currNum.text(nextSlide+1);
  });

  return slider;
}

module.exports = createSlider;