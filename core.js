const PAGE = location.pathname.split(".")[0].split("/").pop();
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

let slider_isSlided = false;
let slider_index = 0;
let slider_shadow_pos = 0;
const option = [
  {
    category: "accommodation",
    tagline: "Silence by the sea",
    buttons: [
      { title: "Accommodations", href: "/wcwr/accommodations.html" },
      {
        title: "Book Now",
        href: "https://secure.webrez.com/hotel/3433?location_id=1799",
      },
    ],
    current_item: 1,
    amount: 6,
  },
  {
    category: "fishing",
    tagline: "Cast into Wild",
    buttons: [
      { title: "Explore", href: "/wcwr/activities.html" },
      {
        title: "Book Now",
        href: "https://secure.webrez.com/hotel/3433?location_id=1799",
      },
    ],
    current_item: 1,
    amount: 6,
  },
  {
    category: "kitchen",
    tagline: "Taste the Wild",
    buttons: [
      { title: "Menu", href: "/wcwr/kitchen.html" },
      { title: "Hours", href: "/wcwr/kitchen.html" },
    ],
    current_item: 1,
    amount: 3,
  },
  {
    category: "surfing",
    tagline: "Ride Coastal Waves",
    buttons: [
      { title: "Rent", href: "/wcwr/accommodations.html" },
      {
        title: "Book Now",
        href: "https://secure.webrez.com/hotel/3433?location_id=1799",
      },
    ],
    current_item: 1,
    amount: 2,
  },
  {
    category: "whale",
    tagline: "Majestic Sea Giants",
    buttons: [
      { title: "Explore", href: "#explore" },
      {
        title: "Book Now",
        href: "https://secure.webrez.com/hotel/3433?location_id=1799",
      },
    ],
    current_item: 1,
    amount: 2,
  },
  {
    category: "animals",
    tagline: "Wild Hearts Roam",
    buttons: [
      { title: "Explore", href: "#explore" },
      {
        title: "Book Now",
        href: "https://secure.webrez.com/hotel/3433?location_id=1799",
      },
    ],
    current_item: 1,
    amount: 1,
  },
  // {
  //   category: "rainforest",
  //   tagline: "Trail of Whispers",
  //   buttons: [
  //     { title: "Explore", href: "#explore" },
  //     { title: "Book Now", href: "https://secure.webrez.com/hotel/3433?location_id=1799" },
  //   ],
  //   current_item: 1,
  //   amount: 1,
  // },
  {
    category: "ocean",
    tagline: "Sands of Serenity",
    buttons: [
      { title: "Explore", href: "#explore" },
      {
        title: "Book Now",
        href: "https://secure.webrez.com/hotel/3433?location_id=1799",
      },
    ],
    current_item: 1,
    amount: 3,
  },
  {
    category: "bike",
    tagline: "Pedal Through Wild",
    buttons: [
      { title: "Explore", href: "#explore" },
      {
        title: "Book Now",
        href: "https://secure.webrez.com/hotel/3433?location_id=1799",
      },
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
    // $iconList[slider_index].scrollIntoView({
    //   behavior: "smooth",
    //   block: "end",
    //   inline: "nearest",
    // });
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
    $mobileMenu.style.height = "auto";
  }
}

async function updatePage() {
  const fileVersion = document
    .querySelector(".version")
    .getAttribute("content");
  const response = await fetch("/wcwr/version.json");
  const version = await response.json();
  if (fileVersion < version.pages[PAGE]) {
    location.reload(true);
  }
}

(function () {
  // update
  updatePage();

  // on resize
  if (PAGE == "index" || !PAGE) {
    window.addEventListener("resize", onWindowResize);
    onWindowResize();

    // on click
    $slider_left.addEventListener("click", onIconSlide);
    $slider_right.addEventListener("click", onIconSlide);
    $image_container.addEventListener("click", nextImage);
    // $iconList.forEach(($icon, key) => {
    //   $icon.dataset.index = key;
    //   $icon.addEventListener("click", (e) => {
    //     option[slider_index].current_item = 1;
    //     slider_index = e.currentTarget.dataset.index;
    //     slider_shadow_pos = $iconList[slider_index].offsetLeft;
    //     $slider_shadow.style.left = slider_shadow_pos + "px";
    //     setImageBackground();
    //   });
    // });

    // image slider
    setInterval(() => {
      nextImage();
    }, 3000);
  }
  if (PAGE == "livecam") {
    const $cam1 = document.querySelector(".image1 > img");
    const $cam2 = document.querySelector(".image2 > img");
    const img1src =
      "https://dl.dropboxusercontent.com/s/he9smakdtx53y09/snap_c1.jpg?dl=0&";
    const img2src =
      "https://dl.dropboxusercontent.com/s/zv98zk6j9knj13r/snap_c1.jpg?dl=0&";
    async function reloadImg($img, url) {
      await fetch(url, { cache: "reload", mode: "no-cors" });
      $img.src = url;
      // document.body
      //   .querySelectorAll(`img[src='${url}']`)
      //   .forEach((img) => (img.src = url));
    }
    setInterval(() => {
      reloadImg($cam1, img1src + new Date().getTime());
      reloadImg($cam2, img2src + new Date().getTime());
      // $cam.src = imgsrc + new Date().getTime();
      //        console.log("updated", new Date().getTime());
    }, 1000 * 90);
  }
  if (PAGE == "faq" || PAGE == "pricing") {
    const $questionList = document.querySelectorAll(".question");
    $questionList.forEach(($item) => {
      $item.addEventListener("click", function () {
        const $this = this;
        const isActive = $this.classList.contains("active");
        $questionList.forEach(($item) => {
          $item.classList.remove("active");
        });
        setTimeout(function () {
          if (isActive) {
            $this.classList.remove("active");
          } else {
            $this.classList.add("active");
          }
        }, 10);
      });
    });
  }

  $mobileIcon.addEventListener("click", toggleMobileMenu);
  $mobileCloseButton.addEventListener("click", toggleMobileMenu);

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
