// image slider
const $image_container = document.querySelector(".option-image-container");
const $image = document.querySelector(".option-image");
const $image_first = document.querySelector(".image-first");
const $image_second = document.querySelector(".image-second");
const $image_tagline = document.querySelector(".image-tagline");
const $button_left = document.querySelector(".button-left");
const $button_right = document.querySelector(".button-right");
const $slider_shadow = document.querySelector(".slider-shadow");
const $iconList = document.querySelectorAll(".carousel-option");
const $mobileIcon = document.querySelector(".mobile-menu-icon");
const $mobileCloseButton = document.querySelector(".mm-close-button");
const $mobileMenu = document.querySelector(".mobile-menu");
const $bookNow = document.querySelectorAll(".book-now");
const $bookWindow = document.querySelector(".book-window");

let slider_isSlided = false;
let slider_index = 0;
let slider_shadow_pos = 0;
const option = [
  {
    category: "accommodation",
    tagline: "Silence by the sea",
    buttons: [
      { title: "Explore", href: "#explore" },
      { title: "Book Now", href: "#book-now" },
    ],
    current_item: 1,
    amount: 6,
  },
  {
    category: "fishing",
    tagline: "Cast into Wild",
    buttons: [
      { title: "Explore", href: "#explore" },
      { title: "Book Now", href: "#book-now" },
    ],
    current_item: 1,
    amount: 6,
  },
  {
    category: "kitchen",
    tagline: "Taste the Wild",
    buttons: [
      { title: "Menu", href: "#menu" },
      { title: "Hours", href: "#hours" },
    ],
    current_item: 1,
    amount: 3,
  },
  {
    category: "surfing",
    tagline: "Ride Coastal Waves",
    buttons: [
      { title: "Rent", href: "#rent" },
      { title: "Book Now", href: "#book-now" },
    ],
    current_item: 1,
    amount: 2,
  },
  {
    category: "whale",
    tagline: "Majestic Sea Giants",
    buttons: [
      { title: "Explore", href: "#explore" },
      { title: "Book Now", href: "#book-now" },
    ],
    current_item: 1,
    amount: 2,
  },
  {
    category: "animals",
    tagline: "Wild Hearts Roam",
    buttons: [
      { title: "Explore", href: "#explore" },
      { title: "Book Now", href: "#book-now" },
    ],
    current_item: 1,
    amount: 1,
  },
  {
    category: "rainforest",
    tagline: "Trail of Whispers",
    buttons: [
      { title: "Explore", href: "#explore" },
      { title: "Book Now", href: "#book-now" },
    ],
    current_item: 1,
    amount: 1,
  },
  // {
  //   category: "lonely_doug",
  // tagline: "Big Lonely Doug",
  //   current_item: 1,
  //   amount: 2,
  // },
  {
    category: "ocean",
    tagline: "Sands of Serenity",
    buttons: [
      { title: "Explore", href: "#explore" },
      { title: "Book Now", href: "#book-now" },
    ],
    current_item: 1,
    amount: 3,
  },
  {
    category: "bike",
    tagline: "Pedal Through Wild",
    buttons: [
      { title: "Explore", href: "#explore" },
      { title: "Book Now", href: "#book-now" },
    ],
    current_item: 1,
    amount: 3,
  },
];

// slide icon buttons
const $slider_left = document.querySelector(".slider-left");
const $slider_right = document.querySelector(".slider-right");
const $carousel_icons = document.querySelector(".carousel__options-list");

function onWindowResize() {
  scroll_x_step = window.innerWidth <= 900 ? document.body.clientWidth : 128;
  $slider_shadow.style.left = $iconList[slider_index].offsetLeft + "px";
  $carousel_icons.scrollBy({
    left: scroll_x_step * slider_index,
    behavior: "smooth",
  });
  // console.log("step", scroll_x_step);
}

let scroll_x_position = 0;
let scroll_x_step = 128;
function onIconSlide(e) {
  const $button = e.currentTarget;
  const isLeft = $button.classList.contains("slider-left");
  // console.log("step", scroll_x_step, window.innerWidth);
  $carousel_icons.scrollBy({
    left: scroll_x_step * (isLeft ? -1 : 1),
    behavior: "smooth",
  });
  //    console.log("pos", $carousel_icons.scrollLeft);
  // setTimeout(() => {
  //   // show/hide slide-to-left button
  //   if ($carousel_icons.scrollLeft == 0) {
  //     $slider_left.style.display = "none";
  //   } else {
  //     $slider_left.style.display = "block";
  //   }

  //   // show/hide slide-to-right button
  //   if (
  //     $carousel_icons.scrollLeft ==
  //     option.length * 128 - document.body.clientWidth
  //   ) {
  //     $slider_right.style.display = "none";
  //   } else {
  //     $slider_right.style.display = "block";
  //   }
  // }, 200);
}
function setImageBackground() {
  const category = option[slider_index].category;
  const item = option[slider_index].current_item;
  const tagline = option[slider_index].tagline;
  const buttons = option[slider_index].buttons;

  const backgroundImage = `url("media/options/${category}/00${item}.jpg")`;

  if (!slider_isSlided) {
    $image_second.style.backgroundImage = backgroundImage;
  } else {
    $image_first.style.backgroundImage = backgroundImage;
  }
  setTimeout(() => {
    if (!slider_isSlided) {
      $image_second.style.zIndex = 1;
      $image_first.style.zIndex = 0;
    } else {
      $image_first.style.zIndex = 1;
      $image_second.style.zIndex = 0;
    }
    $image_tagline.textContent = tagline;
    $button_left.textContent = buttons[0].title;
    $button_left.setAttribute("href", buttons[0].href);
    $button_right.textContent = buttons[1].title;
    $button_right.setAttribute("href", buttons[1].href);

    slider_isSlided = !slider_isSlided;
  }, 300);
  // $image.style.backgroundImage = backgroundImage;
}
function nextImage() {
  if (option[slider_index].current_item == option[slider_index].amount) {
    // next category
    option[slider_index].current_item = 1;
    slider_index++;
    if (slider_index == option.length) {
      slider_index = 0;
      slider_shadow_pos = 0;
    } else {
      slider_shadow_pos = $iconList[slider_index].offsetLeft;
    }
    $slider_shadow.style.left = slider_shadow_pos + "px";
    $iconList[slider_index].scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  } else {
    // next item
    option[slider_index].current_item++;
  }
  setImageBackground();
}

function toggleMobileMenu() {
  if ($mobileMenu.clientHeight) {
    // $mobileMenu.style.display = null;
    $mobileMenu.style.height = null;
  } else {
    // $mobileMenu.style.display = "block";
    $mobileMenu.style.height = "18.5rem";
  }
}

function bookNow(e) {
  e.preventDefault();
  e.stopPropagation();
  $bookWindow.scrollIntoView({ behavior: "smooth" });
}

(function () {
  // on resize
  window.addEventListener("resize", onWindowResize);
  onWindowResize();

  // on click
  $slider_left.addEventListener("click", onIconSlide);
  $slider_right.addEventListener("click", onIconSlide);
  $image_container.addEventListener("click", nextImage);
  $mobileIcon.addEventListener("click", toggleMobileMenu);
  $mobileCloseButton.addEventListener("click", toggleMobileMenu);
  $iconList.forEach(($icon, key) => {
    $icon.dataset.index = key;
    $icon.addEventListener("click", (e) => {
      option[slider_index].current_item = 1;
      slider_index = e.currentTarget.dataset.index;
      slider_shadow_pos = $iconList[slider_index].offsetLeft;
      $slider_shadow.style.left = slider_shadow_pos + "px";
      setImageBackground();
    });
  });


  // image slider
  // setInterval(() => {
  //   nextImage();
  // }, 3000);
  // setTimeout(() => {
  //   return false;

  // if (slider_isSlided) {
  //   $image_second.style.backgroundImage = backgroundImage;
  //   $image_second.style.width = "100%";
  //   $image_first.style.width = "0%";
  // } else {
  //   $image_first.style.backgroundImage = backgroundImage;
  //   $image_first.style.width = "100%";
  //   $image_second.style.width = "0%";
  // }

  // setTimeout(() => {
  //   $image_container.prepend(slider_isSlided ? $image_first : $image_second);
  //   slider_isSlided = !slider_isSlided;
  // }, 1000);
})();
