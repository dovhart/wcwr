// image slider
const $image_container = document.querySelector(".option-image-container");
const $image_first = document.querySelector(".image-first");
const $image_second = document.querySelector(".image-second");
const option = {
  category: "accommodation",
  current_item: 1,
  amount: 5,
  isSlided: false,
};

// slide icon buttons
const $slide_left = document.querySelector(".slide-left");
const $slide_right = document.querySelector(".slide-right");
const $carousel_icons = document.querySelector(".carousel__options-list");

function onWindowResize() {
  // scroll_x_step = window.innerWidth <= 900 ? document.body.clientWidth : 128;
  scroll_x_step = window.innerWidth <= 900 ? window.innerWidth : 128;
  // console.log("step", scroll_x_step);
}
let scroll_x_position = 0;
let scroll_x_step = 128;
function onSlide(e) {
  const $button = e.currentTarget;
  const isLeft = $button.classList.contains("slide-left");
  $carousel_icons.scrollBy({
    left: scroll_x_step * (isLeft ? -1 : 1),
    behavior: "smooth",
  });
  setTimeout(() => {
    // console.log("pos", $carousel_icons.scrollLeft);
    if ($carousel_icons.scrollLeft == 0) {
      $slide_left.style.display = "none";
    } else {
      $slide_left.style.display = "block";
    }
  }, 200);
}

(function () {
  // on resize
  window.addEventListener("resize", onWindowResize);
  onWindowResize();

  // on click
  $slide_left.addEventListener("click", onSlide);
  $slide_right.addEventListener("click", onSlide);

  // image slider
  setInterval(() => {
    option.current_item =
      option.current_item < option.amount ? option.current_item + 1 : 1;
    const item = option.current_item;

    if (option.isSlided) {
      $image_second.style.backgroundImage = `url("media/options/${option.category}/00${item}.jpg")`;
      $image_second.style.width = "100%";
      $image_first.style.width = "0%";
    } else {
      $image_first.style.backgroundImage = `url("media/options/${option.category}/00${item}.jpg")`;
      $image_first.style.width = "100%";
      $image_second.style.width = "0%";
    }

    setTimeout(() => {
      if (option.isSlided) {
        $image_container.prepend($image_first);
      } else {
        $image_container.prepend($image_second);
      }
      option.isSlided = !option.isSlided;
    }, 1000);
  }, 7000);
})();
