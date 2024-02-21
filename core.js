const PAGE = location.pathname.split(".")[0].split("/").pop();
const TOKEN = {
  MAPBOX:
    "pk.eyJ1IjoibmF0dXJlYmxvY2tzIiwiYSI6ImNsNGVzcHN3cTA2cnIzZXF1OW56anRreG0ifQ.mV9LWmbKXfkDGbvwugneAg",
};
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
      { title: "Contact Us", href: "#" },
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
      { title: "Contact Us", href: "#" },
      { title: "Menu & Hours", href: "/kitchen.html" },
    ],
    current_item: 1,
    amount: 3,
  },
  {
    category: "fishing",
    tagline: "Cast into Wild",
    buttons: [
      { title: "Contact Us", href: "#" },
      {
        title: "Book Now",
        href: "https://secure.webrez.com/hotel/3433?location_id=1799",
      },
    ],
    current_item: 1,
    amount: 6,
  },
  {
    category: "surfing",
    tagline: "Ride Coastal Waves",
    buttons: [
      { title: "Contact Us", href: "#" },
      {
        title: "Book Now",
        href: "https://secure.webrez.com/hotel/3433?location_id=1799",
      },
    ],
    current_item: 1,
    amount: 2,
  },
  {
    category: "experience",
    tagline: "Majestic Sea Giants",
    buttons: [
      { title: "Contact Us", href: "#" },
      {
        title: "Book Now",
        href: "https://secure.webrez.com/hotel/3433?location_id=1799",
      },
    ],
    current_item: 1,
    amount: 2,
  },
  {
    category: "gear",
    tagline: "Wild Hearts Roam",
    buttons: [
      { title: "Contact Us", href: "#" },
      {
        title: "Book Now",
        href: "https://secure.webrez.com/hotel/3433?location_id=1799",
      },
    ],
    current_item: 1,
    amount: 1,
  },
  {
    category: "bike",
    tagline: "Pedal Through Wild",
    buttons: [
      { title: "Contact Us", href: "#" },
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

function highlightCurrentDay() {
  const DAY_OF_WEEK = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const timeVancouver = dayjs().tz("America/Vancouver");

  const dayOfWeek = DAY_OF_WEEK[timeVancouver.day()];
  document.querySelector(".schedule .item.active")?.classList.remove("active");
  document.querySelector(".schedule ." + dayOfWeek).classList.add("active");
  //
  let isOpen = false;
  let day = HOURS.find((item) => item.day == dayOfWeek);
  let workHours = [];
  let hour = 0;
  let minute = 0;

  // from
  if (day.from.toLowerCase().trim().endsWith("am")) {
    // AM
    workHours = day.from.toLowerCase().split("am")[0].trim().split(":");

    hour = Number(workHours[0]);
    if (hour == 12) hour = hour - 12;

    isOpen = timeVancouver.hour() > hour;
    if (isOpen && workHours.length == 2) {
      minute = Number(workHours[1]);
      isOpen = timeVancouver.minute() > minute;
    }
  } else {
    // PM
    workHours = day.from.toLowerCase().split("pm")[0].trim().split(":");

    hour = Number(workHours[0]);
    if (hour < 12) hour = hour + 12;

    isOpen = timeVancouver.hour() > hour;
    if (isOpen && workHours.length == 2) {
      minute = Number(workHours[1]);
      isOpen = timeVancouver.minute() > minute;
    }
  }

  // to
  if (day.to.toLowerCase().trim().endsWith("am")) {
    // AM
    workHours = day.to.toLowerCase().split("am")[0].trim().split(":");

    hour = Number(workHours[0]);
    if (hour == 12) hour = hour - 12;

    isOpen = timeVancouver.hour() < hour;
    if (isOpen && workHours.length == 2) {
      minute = Number(workHours[1]);
      isOpen = timeVancouver.minute() < minute;
    }
  } else {
    // PM
    workHours = day.to.toLowerCase().split("pm")[0].trim().split(":");

    hour = Number(workHours[0]);
    if (hour < 12) hour = hour + 12;

    isOpen = timeVancouver.hour() < hour;
    if (isOpen && workHours.length == 2) {
      minute = Number(workHours[1]);
      isOpen = timeVancouver.minute() < minute;
    }
  }
  document.querySelector(".schedule .item.active .is-open .text").textContent =
    isOpen ? "OPEN" : "CLOSED";
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
  if (PAGE == "kitchen") {
    HOURS?.forEach((item) => {
      document.querySelector(".schedule ." + item.day + " .open").textContent =
        item.from;
      document.querySelector(".schedule ." + item.day + " .close").textContent =
        item.to;
      document.querySelector(".schedule ." + item.day + " .plain").textContent =
        item.from + " - " + item.to;
    });

    // highlight working day
    dayjs.extend(window.dayjs_plugin_utc);
    dayjs.extend(window.dayjs_plugin_timezone);
    highlightCurrentDay();
    setInterval(highlightCurrentDay, 1000 * 60 * 5);
  }
  if (PAGE == "trailsX") {
    if (!mapboxgl.supported()) {
      document.querySelector(".map").style.display = "none";
    } else {
      const map = new mapboxgl.Map({
        container: "map",
        // style: "mapbox://styles/mapbox/streets-v11",
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-124.42208, 48.55169],
        zoom: 17,
        accessToken: TOKEN.MAPBOX,
      });
      map.addControl(new mapboxgl.NavigationControl());
      map.scrollZoom.disable();
      const marker = new mapboxgl.Marker({ color: "blue", rotation: 0 })
        .setLngLat([-124.4215, 48.55155])
        .addTo(map);

      const mapDoug = new mapboxgl.Map({
        container: "map-doug",
        // style: "mapbox://styles/mapbox/streets-v11",
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-124.45063, 48.64626],
        zoom: 14,
        accessToken: TOKEN.MAPBOX,
      });
      mapDoug.addControl(new mapboxgl.NavigationControl());
      mapDoug.scrollZoom.disable();
      const markerDoug = new mapboxgl.Marker({ color: "blue", rotation: 0 })
        .setLngLat([-124.45063, 48.64626])
        .addTo(mapDoug);

      const mapGrove = new mapboxgl.Map({
        container: "map-grove",
        // style: "mapbox://styles/mapbox/streets-v11",
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-124.4375, 48.6173],
        zoom: 16,
        accessToken: TOKEN.MAPBOX,
      });
      mapGrove.addControl(new mapboxgl.NavigationControl());
      mapGrove.scrollZoom.disable();
      const markerGrove = new mapboxgl.Marker({ color: "blue", rotation: 0 })
        .setLngLat([-124.4375, 48.6168])
        .addTo(mapGrove);

      const geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              message: "Wild Coast Wilderness Resort",
              iconSize: [100, 100],
            },
            geometry: {
              type: "Point",
              coordinates: [-124.4215, 48.55155],
            },
          },
          // {
          //   type: "Feature",
          //   properties: {
          //     message: "Bar",
          //     iconSize: [50, 50],
          //   },
          //   geometry: {
          //     type: "Point",
          //     coordinates: [-61.21582, -15.971891],
          //   },
          // },
          // {
          //   type: "Feature",
          //   properties: {
          //     message: "Baz",
          //     iconSize: [40, 40],
          //   },
          //   geometry: {
          //     type: "Point",
          //     coordinates: [-63.292236, -18.281518],
          //   },
          // },
        ],
      };
      // Add markers to the map.
      // for (const marker of geojson.features) {
      //   // Create a DOM element for each marker.
      //   const el = document.createElement("div");
      //   const width = marker.properties.iconSize[0];
      //   const height = marker.properties.iconSize[1];
      //   el.className = "marker";
      //   el.style.backgroundImage = "url(/media/icon/gold/fishing.png)";
      //   el.style.width = `${width}px`;
      //   el.style.height = `${height}px`;
      //   el.style.backgroundSize = "100%";

      //   // el.addEventListener("click", () => {
      //   //   window.alert(marker.properties.message);
      //   // });

      //   // Add markers to the map.
      //   new mapboxgl.Marker(el)
      //     .setLngLat(marker.geometry.coordinates)
      //     .addTo(map);
      // }
    }
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
