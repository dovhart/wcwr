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
  const buttons = option[slider_index].buttons;

  const backgroundImage = `url("media/options/${category}/00${item}.jpg?1")`;

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
    // $button_left.textContent = buttons[0].title;
    // $button_left.setAttribute("href", buttons[0].href);
    // $button_right.textContent = buttons[1].title;
    // $button_right.setAttribute("href", buttons[1].href);

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
      slider_shadow_pos =
        $iconList[slider_index]?.offsetLeft || slider_shadow_pos;
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
  const response = await fetch("/wcwr/version.json?" + Date.now());
  const version = await response.json();
  if (fileVersion < version.pages[PAGE]) {
    location.reload(true);
  }
  setTimeout(updatePage, 10 * 60 * 1000);
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

function addListings(
  array,
  selector,
  callbacks = {
    onClick,
  }
) {
  const $listings = document.querySelector(`.listings${selector} .inner`);
  for (const feature of array.features) {
    const $listingsItem = $listings.appendChild(document.createElement("div"));
    $listingsItem.id = `listing-${feature.data.properties.id}`;
    $listingsItem.className = "item";
    if (callbacks.onClick) {
      $listingsItem.addEventListener("click", callbacks.onClick);
    }
    if (callbacks.mouseenter) {
      $listingsItem.addEventListener("mouseenter", callbacks.mouseenter);
    }
    if (callbacks.mouseleave) {
      $listingsItem.addEventListener("mouseleave", callbacks.mouseleave);
    }

    const $link = $listingsItem.appendChild(document.createElement("a"));
    $link.className = "title";
    $link.id = `link-${feature.data.properties.id}`;
    $link.innerHTML = `${feature.data.properties.description}`;
  }
}

function setSubmenuWidth(e) {
  const width =
    document.querySelector(".header-content .logo-container").clientWidth +
    document.querySelector(".header-content .search-and-menu").clientWidth +
    // document.querySelector(".header-content .book-now").clientWidth +
    4;
  // document.body.style.setProperty("--sub-menu-width", width);
  document.querySelectorAll(".header-content .sub-menu ul").forEach((item) => {
    item.style.width = width + "px";
  });
}

(function () {
  // update
  updatePage();
  window.addEventListener("resize", setSubmenuWidth);
  setSubmenuWidth();

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

  if (["faq", "pricing", "fishing", "report"].indexOf(PAGE) > -1) {
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

  if (PAGE == "trails") {
    if (!mapboxgl.supported()) {
      document.querySelector("#map").style.display = "none";
    } else {
      // show/hide sidepanel
      const $sidebar = document.querySelector(".sidebar");
      document
        .querySelector(".sidebar .close")
        .addEventListener("click", function (e) {
          $sidebar.classList.toggle("collapsed");
        });

      // show/hide listings section
      document.querySelectorAll(".heading").forEach((item) => {
        item.addEventListener("click", function (e) {
          const $heading = this;
          const isOpen =
            $heading.nextSibling.nextSibling.classList.contains("open");

          document.querySelector(".heading.active")?.classList.remove("active");
          document.querySelector(".listings.open")?.classList.remove("open");
          if (isOpen) {
            $heading.classList.remove("active");
            $heading.nextSibling.nextSibling.classList.remove("open");
          } else {
            $heading.classList.add("active");
            $heading.nextSibling.nextSibling.classList.add("open");
          }
        });
      });

      const map = new mapboxgl.Map({
        container: "map",
        // style: "mapbox://styles/mapbox/streets-v11",
        // style: 'mapbox://styles/mapbox/light-v11',
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-124.768889, 48.616667],
        zoom: 9,
        attributionControl: false,
        performanceMetricsCollection: false,
        accessToken: TOKEN.MAPBOX,
      });
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      map.addControl(
        new MapboxGeocoder({
          accessToken: TOKEN.MAPBOX,
          mapboxgl,
        }),
        "top-right"
      );
      map.scrollZoom.disable();

      map.on("load", () => {
        // click on an empty place
        document
          .querySelector(".sidebar .initial-view")
          .addEventListener("click", function () {
            map.flyTo({
              // center: [-124.5209829, 48.5178988],
              center: [-124.768889, 48.616667],
              zoom: 9,
            });
            const $active = document.querySelector(".listings .item.active");
            $active?.classList.remove("active");
            popupPoint.remove();
          });

        const popupPoint = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false,
        });
        function showPopupPoint(e) {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.html;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          popupPoint.setLngLat(coordinates).setHTML(description).addTo(map);
        }
        function pointClick(e) {
          e.stopPropagation();

          const feature =
            attractions.features.find(
              (item) => this.id == `listing-${item.data.properties.id}`
            ) ||
            trails.features.find(
              (item) => this.id == `listing-${item.data.properties.id}`
            ) ||
            beaches.features.find(
              (item) => this.id == `listing-${item.data.properties.id}`
            ) ||
            toilets.features.find(
              (item) => this.id == `listing-${item.data.properties.id}`
            ) ||
            parking.features.find(
              (item) => this.id == `listing-${item.data.properties.id}`
            ) ||
            useful.features.find(
              (item) => this.id == `listing-${item.data.properties.id}`
            );

          map.flyTo({
            center: feature.data.geometry.coordinates,
            zoom: 16,
          });

          const $active = document.querySelector(".listings .item.active");
          $active?.classList.remove("active");
          this.classList.add("active");
          popupPoint.remove();
          showPopupPoint({
            features: [
              {
                geometry: {
                  coordinates: feature.data.geometry.coordinates,
                },
                properties: {
                  html: feature.data.properties.html,
                },
              },
            ],
            lngLat: {
              lng: feature.data.geometry.coordinates[0],
            },
          });

          document
            .querySelector(".map-container")
            .scrollIntoView({ behavior: "smooth" });
        }

        const attractions = {
          type: "FeatureCollection",
          features: [
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.438756, 48.618813],
                },
                properties: {
                  id: "upper-avatar-grove",
                  html: "<pre><strong>Upper Avatar Grove: Canada's gnarliest tree</strong></pre>",
                  description: "Upper Avatar Grove: Canada's gnarliest tree",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.450514, 48.646089],
                },
                properties: {
                  id: "big-lonely-doug",
                  html: "<pre><strong>Big Lonely Doug: the second largest Douglas Fir tree in Canada, 70.2 m / 230 ft tall, 1000 years old</strong></pre>",
                  description:
                    "Big Lonely Doug: the second largest Douglas Fir tree in Canada, 70.2 m / 230 ft tall, 1000 years old",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.220659, 48.579495],
                },
                properties: {
                  id: "red-creek-fir",
                  html: "<pre><strong>Red Creek Fir: world's largest Douglas Fir tree, 73.8 m / 242 ft tall, 1000 years old</strong></pre>",
                  description:
                    "Red Creek Fir: world's largest Douglas Fir tree, 73.8 m / 242 ft tall, 1000 years old",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.18675, 48.58816],
                },
                properties: {
                  id: "san-juan-spruce",
                  html: "<pre><strong>San Juan Spruce is The Largest Spruce Tree in Canada, 3.71 m / 12.2 ft wide</strong></pre>",
                  description:
                    "San Juan Spruce is The Largest Spruce Tree in Canada, 3.71 m / 12.2 ft wide",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.22602, 48.66046],
                },
                properties: {
                  id: "harris-creek-spruce",
                  html: "<pre><strong>Harris Creek Sitka Spruce, 4 m / 13 ft wide and 80 m / 260 ft tall.</strong></pre>",
                  description:
                    "Harris Creek Sitka Spruce, 4 m / 13 ft wide and 80 m / 260 ft tall.",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.444405, 48.643988],
                },
                properties: {
                  id: "eden-grove",
                  html: "<pre><strong>Eden Grove: Edins Waterfall</strong></pre>",
                  description: "Eden Grove: Edins Waterfall",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.348929, 48.58887],
                },
                properties: {
                  id: "bonsai-tree",
                  html: "<pre><strong>Fairy Lake Bonsai Tree</strong></pre>",
                  description: "Fairy Lake Bonsai Tree",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.29303, 48.49463],
                },
                properties: {
                  id: "sombrio-east-waterfall",
                  html: "<pre><strong>East Sombrio Beach waterfall</strong></pre>",
                  description: "East Sombrio Beach waterfall",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.29209, 48.4916],
                },
                properties: {
                  id: "juan-de-fuca-waterfall",
                  html: "<pre><strong>Juan de Fuca Marine Trail waterfall</strong></pre>",
                  description: "Juan de Fuca Marine Trail waterfall",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.09721, 48.43522],
                },
                properties: {
                  id: "china-beach-waterfall",
                  html: "<pre><strong>China Beach waterfall</strong></pre>",
                  description: "China Beach Trail waterfall",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.11233, 48.43663],
                },
                properties: {
                  id: "mystic-beach-waterfall",
                  html: "<pre><strong>Mystic Beach waterfall</strong></pre>",
                  description: "Mystic Beach Trail waterfall",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.22881, 48.47395],
                },
                properties: {
                  id: "lines-creek-waterfall",
                  html: "<pre><strong>Lines Creek waterfall</strong></pre>",
                  description: "Lines Creek Trail waterfall",
                },
              },
            },
          ],
        };

        const trails = {
          type: "FeatureCollection",
          features: [
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.4374, 48.61666],
                },
                properties: {
                  id: "avatar-grove-trail",
                  html: "<pre><strong>Avatar Grove</strong></pre>",
                  description: "Avatar Grove: Lower and Upper trails",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.41585, 48.57733],
                },
                properties: {
                  id: "west-coast-trail",
                  html: "<pre><strong>West Coast Trailhead</strong></pre>",
                  description: "West Coast Trailhead",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.44474, 48.53281],
                },
                properties: {
                  id: "botanical-beach-trail",
                  html: "<pre><strong>Botanical Beach Trailhead</strong></pre>",
                  description: "Botanical Beach Trailhead",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.44373, 48.53291],
                },
                properties: {
                  id: "juan-de-fuca-marine-trail",
                  html: "<pre><strong>Juan de Fuca Marine Trailhead</strong></pre>",
                  description: "Juan de Fuca Marine Trailhead",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.37107, 48.51314],
                },
                properties: {
                  id: "parkinson-creek-trail",
                  html: "<pre><strong>Parkinson Creek Trailhead</strong></pre>",
                  description: "Parkinson Creek Trailhead",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.44368, 48.64366],
                },
                properties: {
                  id: "eden-grove-trail",
                  html: "<pre><strong>Eden Grove Trailhead</strong></pre>",
                  description: "Eden Grove Trailhead",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.2964, 48.50114],
                },
                properties: {
                  id: "sombrio-trail",
                  html: "<pre><strong>Sombrio Trailhead</strong></pre>",
                  description: "Sombrio Trailhead",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.2261, 48.57993],
                },
                properties: {
                  id: "red-creek-fir-trail",
                  html: "<pre><strong>Red Creek Fir Trailhead</strong></pre>",
                  description: "Red Creek Fir Trailhead",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.70193, 48.65909],
                },
                properties: {
                  id: "carmanah-trail",
                  html: "<pre><strong>Carmanah Trailhead</strong></pre>",
                  description: "Carmanah Trailhead",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.59764, 48.65036],
                },
                properties: {
                  id: "tolkien-giant-trail",
                  html: "<pre><strong>Tolkien Giant Trailhead</strong></pre>",
                  description: "Tolkien Giant Trailhead",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.59438, 48.65123],
                },
                properties: {
                  id: "walbran-falls-trail",
                  html: "<pre><strong>Walbran Falls Trailhead</strong></pre>",
                  description: "Walbran Falls Trailhead",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.33873, 48.50731],
                },
                properties: {
                  id: "little-kuitshe-trail",
                  html: "<pre><strong>Little Kuitshe Creek Trailhead</strong></pre>",
                  description: "Little Kuitshe Creek Trailhead",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.08041, 48.4343],
                },
                properties: {
                  id: "second-beach-trail",
                  html: "<pre><strong>Second Beach Trailhead</strong></pre>",
                  description: "Second Beach Trailhead",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.08983, 48.43761],
                },
                properties: {
                  id: "china-beach-trail",
                  html: "<pre><strong>China Beach Trailhead</strong></pre>",
                  description: "China Beach Trailhead",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.09158, 48.43786],
                },
                properties: {
                  id: "mystic-beach-trail",
                  html: "<pre><strong>Mystic Beach Trailhead</strong></pre>",
                  description: "Mystic Beach Trailhead",
                },
              },
            },
          ],
        };

        const beaches = {
          type: "FeatureCollection",
          features: [
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.40489, 48.56973],
                },
                properties: {
                  id: "pacheedaht-beach",
                  html: "<pre><strong>Pacheedaht beach</strong></pre>",
                  description: "Pacheedaht beach",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.40717, 48.55711],
                },
                properties: {
                  id: "park-beach",
                  html: "<pre><strong>The Park beach</strong></pre>",
                  description: "The Park beach",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.44287, 48.52553],
                },
                properties: {
                  id: "botanical-beach",
                  html: "<pre><strong>Botanical beach</strong></pre>",
                  description: "Botanical beach",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.76656, 48.62743],
                },
                properties: {
                  id: "dare-beach",
                  html: "<pre><strong>Dare beach</strong></pre>",
                  description: "Dare beach",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.16613, 48.45122],
                },
                properties: {
                  id: "bear-beach",
                  html: "<pre><strong>Bear beach</strong></pre>",
                  description: "Bear beach",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.11433, 48.43849],
                },
                properties: {
                  id: "mystic-beach",
                  html: "<pre><strong>Mystic beach</strong></pre>",
                  description: "Mystic beach",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.09345, 48.43371],
                },
                properties: {
                  id: "china-beach",
                  html: "<pre><strong>China beach</strong></pre>",
                  description: "China beach",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.08706, 48.4298],
                },
                properties: {
                  id: "second-beach",
                  html: "<pre><strong>Second beach</strong></pre>",
                  description: "Second beach",
                },
              },
            },
          ],
        };

        const toilets = {
          type: "FeatureCollection",
          features: [
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.44364, 48.52644],
                },
                properties: {
                  id: "botanical-east-toilet",
                  html: "<pre><strong>Botanical beach toilet</strong></pre>",
                  description: "Botanical beach toilet (east side)",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.45109, 48.53055],
                },
                properties: {
                  id: "botanical-west-toilet",
                  html: "<pre><strong>Botanical beach toilet</strong></pre>",
                  description: "Botanical beach toilet (west side)",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.43285, 48.54822],
                },
                properties: {
                  id: "woods-nose-toilet",
                  html: "<pre><strong>Woods Nose toilet</strong></pre>",
                  description: "Woods Nose toilet",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.37189, 48.51302],
                },
                properties: {
                  id: "parkinson-creek-toilet",
                  html: "<pre><strong>Parkinson Creek toilet</strong></pre>",
                  description: "Parkinson Creek toilet",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.33852, 48.50763],
                },
                properties: {
                  id: "little-kuitshe-toilet",
                  html: "<pre><strong>Little Kuitshe Creek toilet</strong></pre>",
                  description: "Little Kuitshe Creek toilet",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.29957, 48.49967],
                },
                properties: {
                  id: "sombrio-toilet",
                  html: "<pre><strong>Sombrio beach toilet</strong></pre>",
                  description: "Sombrio beach toilet",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.29824, 48.49694],
                },
                properties: {
                  id: "juan-de-fuca-toilet",
                  html: "<pre><strong>Juan de Fuca toilet</strong></pre>",
                  description: "Juan de Fuca toilet",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.29543, 48.4939],
                },
                properties: {
                  id: "sombrio-east-toilet",
                  html: "<pre><strong>East Sombrio Beach toilet</strong></pre>",
                  description: "East Sombrio Beach toilet",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.18452, 48.45461],
                },
                properties: {
                  id: "bear-beach-toilet",
                  html: "<pre><strong>Bear beach toilet</strong></pre>",
                  description: "Bear beach toilet",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.17924, 48.4532],
                },
                properties: {
                  id: "bear-beach-2-toilet",
                  html: "<pre><strong>Bear beach toilet 2</strong></pre>",
                  description: "Bear beach toilet 2",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.1151, 48.43902],
                },
                properties: {
                  id: "mystic-beach-toilet",
                  html: "<pre><strong>Mystic beach toilet</strong></pre>",
                  description: "Mystic beach toilet",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.11379, 48.43821],
                },
                properties: {
                  id: "mystic-beach-2-toilet",
                  html: "<pre><strong>Mystic beach toilet 2</strong></pre>",
                  description: "Mystic beach toilet 2",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.09296, 48.43374],
                },
                properties: {
                  id: "china-beach-toilet",
                  html: "<pre><strong>China beach toilet</strong></pre>",
                  description: "China beach toilet",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.07779, 48.43464],
                },
                properties: {
                  id: "china-beach-camp-toilet",
                  html: "<pre><strong>China Beach camp toilet</strong></pre>",
                  description: "China Beach camp toilet",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.07865, 48.43354],
                },
                properties: {
                  id: "china-beach-camp-2-toilet",
                  html: "<pre><strong>China Beach camp toilet 2</strong></pre>",
                  description: "China Beach camp toilet 2",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.0791, 48.43576],
                },
                properties: {
                  id: "china-beach-camp-3-toilet",
                  html: "<pre><strong>China Beach camp toilet 3</strong></pre>",
                  description: "China Beach camp toilet 3",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.08931, 48.4372],
                },
                properties: {
                  id: "china-beach-trail-toilet",
                  html: "<pre><strong>China Beach Trailhead toilet</strong></pre>",
                  description: "China Beach Trailhead toilet",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.09227, 48.43794],
                },
                properties: {
                  id: "mystic-beach-trail-toilet",
                  html: "<pre><strong>Mystic Beach Trailhead toilet</strong></pre>",
                  description: "Mystic Beach Trailhead toilet",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.09212, 48.43742],
                },
                properties: {
                  id: "mystic-beach-trail-2-toilet",
                  html: "<pre><strong>Mystic Beach Trailhead toilet 2</strong></pre>",
                  description: "Mystic Beach Trailhead toilet 2",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.05442, 48.42128],
                },
                properties: {
                  id: "jordan-river-toilet",
                  html: "<pre><strong>Jordan River toilet</strong></pre>",
                  description: "Jordan River toilet",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.22503, 48.60745],
                },
                properties: {
                  id: "lizard-lake-toilet",
                  html: "<pre><strong>Lizard Lake toilet</strong></pre>",
                  description: "Lizard Lake toilet",
                },
              },
            },
          ],
        };

        const parking = {
          type: "FeatureCollection",
          features: [
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.44517, 48.53334],
                },
                properties: {
                  id: "botanical-parking",
                  html: "<pre><strong>Botanical Beach / Juan de Fuca Parking</strong></pre>",
                  description: "Botanical Beach / Juan de Fuca Parking",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.29552, 48.50121],
                },
                properties: {
                  id: "sombrio-parking",
                  html: "<pre><strong>Sombrio Beach Parking</strong></pre>",
                  description: "Sombrio Beach Parking",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.0759, 48.4379],
                },
                properties: {
                  id: "second-beach-parking",
                  html: "<pre><strong>Second Beach parking</strong></pre>",
                  description: "Second Beach parking",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.07495, 48.43374],
                },
                properties: {
                  id: "second-beach-visitor-parking",
                  html: "<pre><strong>Second Beach Visitor parking</strong></pre>",
                  description: "Second Beach Visitor parking",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.05485, 48.42103],
                },
                properties: {
                  id: "jordan-river-parking",
                  html: "<pre><strong>Jordan River parking</strong></pre>",
                  description: "Jordan River parking",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.22527, 48.60776],
                },
                properties: {
                  id: "lizard-lake-parking",
                  html: "<pre><strong>Lizard Lake parking</strong></pre>",
                  description: "Lizard Lake parking",
                },
              },
            },
          ],
        };

        const useful = {
          type: "FeatureCollection",
          features: [
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.40025, 48.55721],
                },
                properties: {
                  id: "post-office",
                  html: "<pre><strong>Post Office</strong></pre>",
                  description: "Post Office",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.39965, 48.55747],
                },
                properties: {
                  id: "fire-department",
                  html: "<pre><strong>Volunteer Fire Department</strong></pre>",
                  description: "Volunteer Fire Department",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.4008482, 48.5574178],
                },
                properties: {
                  id: "ambulance-station",
                  html: "<pre><strong>Ambulance Station</strong></pre>",
                  description: "Ambulance Station",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.405, 48.5551],
                },
                properties: {
                  id: "general-store",
                  html: "<pre><strong>General Store</strong></pre>",
                  description: "General Store",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.39879, 48.55792],
                },
                properties: {
                  id: "gas-station",
                  html: "<pre><strong>Pacheedaht Gas Bar Station</strong></pre>",
                  description: "Pacheedaht Gas Bar Station",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.400588, 48.55712],
                },
                properties: {
                  id: "ev-station",
                  html: "<pre><strong>Electric Vehicle Charging Station (open 24/7)</strong></pre>",
                  description: "Electric Vehicle Charging Station (open 24/7)",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.16963, 48.45781],
                },
                properties: {
                  id: "rosemond-pit",
                  html: "<pre><strong>Rosemond Pit</strong></pre>",
                  description: "Rosemond Pit",
                },
              },
            },
          ],
        };

        function addPoints(array, color) {
          array.features.forEach((item) => {
            const id = item.data.properties.id;
            map.addSource(id, item);
            map.addLayer({
              id: `${id}-point`,
              type: "circle",
              source: id,
              paint: {
                "circle-radius": 8,
                "circle-color": color,
                "circle-stroke-width": 2,
                "circle-stroke-color": "white",
              },
            });
            map.on("click", `${id}-point`, showPopupPoint);
            map.on("mouseenter", `${id}-point`, showPopupPoint);
            map.on("mouseleave", `${id}-point`, function (e) {
              popupPoint.remove();
            });
          });
        }
        // ATTRACTION POINTS
        addPoints(attractions, "blue");
        addListings(attractions, ".attractions", {
          onClick: pointClick,
        });

        // TRAILS
        addPoints(trails, "green");
        addListings(trails, ".trails", {
          onClick: pointClick,
        });

        // BEACHES
        addPoints(beaches, "steelblue");
        addListings(beaches, ".beaches", {
          onClick: pointClick,
        });

        // TOILETS
        addPoints(toilets, "black");
        addListings(toilets, ".toilets", {
          onClick: pointClick,
        });

        // PARKING
        addPoints(parking, "slategrey");
        addListings(parking, ".parking", {
          onClick: pointClick,
        });

        // USEFUL
        addPoints(useful, "peru");
        addListings(useful, ".useful", {
          onClick: pointClick,
        });
      });
    }
  }

  if (PAGE == "contact-us") {
    if (!mapboxgl.supported()) {
      document.querySelector("#map").style.display = "none";
    } else {
      // show/hide sidepanel
      const $sidebar = document.querySelector(".sidebar");
      document
        .querySelector(".sidebar .close")
        .addEventListener("click", function (e) {
          $sidebar.classList.toggle("collapsed");
        });

      // show/hide listings section
      document.querySelectorAll(".heading").forEach((item) => {
        item.addEventListener("click", function (e) {
          const $heading = this;
          const isOpen =
            $heading.nextSibling.nextSibling.classList.contains("open");

          document.querySelector(".heading.active")?.classList.remove("active");
          document.querySelector(".listings.open")?.classList.remove("open");
          if (isOpen) {
            $heading.classList.remove("active");
            $heading.nextSibling.nextSibling.classList.remove("open");
          } else {
            $heading.classList.add("active");
            $heading.nextSibling.nextSibling.classList.add("open");
          }
        });
      });

      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-124.42115, 48.55211],
        zoom: 17,
        attributionControl: false,
        performanceMetricsCollection: false,
        accessToken: TOKEN.MAPBOX,
      });
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      map.addControl(
        new MapboxGeocoder({
          accessToken: TOKEN.MAPBOX,
          mapboxgl,
        }),
        "top-right"
      );
      map.scrollZoom.disable();

      map.on("load", () => {
        // click on an empty space
        document
          .querySelector(".sidebar .initial-view")
          .addEventListener("click", function () {
            map.flyTo({
              center: [-124.42115, 48.55211],
              zoom: 17,
            });
            const $active = document.querySelector(".listings .item.active");
            $active?.classList.remove("active");
            popupPoint.remove();
          });

        const popupPoint = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false,
        });
        function showPopupPoint(e) {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.html;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          popupPoint.setLngLat(coordinates).setHTML(description).addTo(map);
        }
        function pointClick(e) {
          e.stopPropagation();

          const feature =
            accommodations.features.find(
              (item) => this.id == `listing-${item.data.properties.id}`
            ) ||
            navigation.features.find(
              (item) => this.id == `listing-${item.data.properties.id}`
            ) ||
            sauna.features.find(
              (item) => this.id == `listing-${item.data.properties.id}`
            );

          map.flyTo({
            center: feature.data.geometry.coordinates,
            zoom: 17,
          });

          const $active = document.querySelector(".listings .item.active");
          $active?.classList.remove("active");
          this.classList.add("active");
          popupPoint.remove();
          showPopupPoint({
            features: [
              {
                geometry: {
                  coordinates: feature.data.geometry.coordinates,
                },
                properties: {
                  html: feature.data.properties.html,
                },
              },
            ],
            lngLat: {
              lng: feature.data.geometry.coordinates[0],
            },
          });

          document
            .querySelector(".map-container")
            .scrollIntoView({ behavior: "smooth" });
        }

        const accommodations = {
          type: "FeatureCollection",
          features: [
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.4211, 48.55237],
                },
                properties: {
                  id: "cabins",
                  html: "<pre><strong>Private Cabins</strong></pre>",
                  description: "Private Cabins",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.42065, 48.551575],
                },
                properties: {
                  id: "cotton-wood",
                  html: "<pre><strong>Cotton Wood Cottage</strong></pre>",
                  description: "Cotton Wood Cottage",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.4211, 48.55137],
                },
                properties: {
                  id: "sitka-spruce",
                  html: "<pre><strong>Sitka Spruce Cottage</strong></pre>",
                  description: "Sitka Spruce Cottage",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.4215, 48.55191],
                },
                properties: {
                  id: "suites",
                  html: "<pre><strong>Suites</strong></pre>",
                  description: "Suites",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.42055, 48.55199],
                },
                properties: {
                  id: "huts-h-m",
                  html: "<pre><strong>Hiker Huts H-M</strong></pre>",
                  description: "Hiker Huts H-M",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.42071, 48.55235],
                },
                properties: {
                  id: "huts-p-u",
                  html: "<pre><strong>Hiker Huts P-U</strong></pre>",
                  description: "Hiker Huts P-U",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.42105, 48.55215],
                },
                properties: {
                  id: "huts-v-y",
                  html: "<pre><strong>Hiker Huts V-Y</strong></pre>",
                  description: "Hiker Huts V-Y",
                },
              },
            },
          ],
        };

        const navigation = {
          type: "FeatureCollection",
          features: [
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.4215, 48.5518],
                },
                properties: {
                  id: "check-in",
                  html: "<pre><strong>Guest Services Check-in</strong></pre>",
                  description: "Guest Services Check-in",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.4217, 48.55204],
                },
                properties: {
                  id: "lodge",
                  html: "<pre><strong>Lodge</strong></pre>",
                  description: "Lodge",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.42014, 48.55173],
                },
                properties: {
                  id: "kitchen",
                  html: "<pre><strong>Coastal Kitchen Cafe</strong></pre>",
                  description: "Coastal Kitchen Cafe",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.4211, 48.5518],
                },
                properties: {
                  id: "washroom",
                  html: "<pre><strong>Washroom</strong></pre>",
                  description: "Washroom",
                },
              },
            },
          ],
        };

        const sauna = {
          type: "FeatureCollection",
          features: [
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.4217, 48.5518],
                },
                properties: {
                  id: "sauna-suites-a",
                  html: "<pre><strong>Hottub & Sauna (Suites)</strong></pre>",
                  description: "Hottub & Sauna (Suites)",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.42155, 48.55204],
                },
                properties: {
                  id: "sauna-suites-b",
                  html: "<pre><strong>Hottub & Sauna (Suites) 2</strong></pre>",
                  description: "Hottub & Sauna (Suites) 2",
                },
              },
            },
            {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-124.4213, 48.5524],
                },
                properties: {
                  id: "sauna-cabins",
                  html: "<pre><strong>Hottub & Sauna (Cabins)</strong></pre>",
                  description: "Hottub & Sauna (Cabins)",
                },
              },
            },
          ],
        };

        function addPoints(array, color) {
          array.features.forEach((item) => {
            const id = item.data.properties.id;
            map.addSource(id, item);
            map.addLayer({
              id: `${id}-point`,
              type: "circle",
              source: id,
              paint: {
                "circle-radius": 8,
                "circle-color": color,
                "circle-stroke-width": 2,
                "circle-stroke-color": "white",
              },
            });
            map.on("click", `${id}-point`, showPopupPoint);
            map.on("mouseenter", `${id}-point`, showPopupPoint);
            map.on("mouseleave", `${id}-point`, function (e) {
              popupPoint.remove();
            });
          });
        }
        // ACCOMMODATION
        addPoints(accommodations, "blue");
        addListings(accommodations, ".accommodations", {
          onClick: pointClick,
          mouseenter: function (e) {
            popupPoint.remove();
            const feature = accommodations.features.find(
              (item) => this.id == `listing-${item.data.properties.id}`
            );

            showPopupPoint({
              features: [
                {
                  geometry: {
                    coordinates: feature.data.geometry.coordinates,
                  },
                  properties: {
                    html: feature.data.properties.html,
                  },
                },
              ],
              lngLat: {
                lng: feature.data.geometry.coordinates[0],
              },
            });
          },
          // mouseleave: function () {
          //   popupPoint.remove();
          // },
        });

        // NAVIGATION
        addPoints(navigation, "green");
        addListings(navigation, ".navigation", {
          onClick: pointClick,
          mouseenter: function (e) {
            popupPoint.remove();
            const feature = navigation.features.find(
              (item) => this.id == `listing-${item.data.properties.id}`
            );

            showPopupPoint({
              features: [
                {
                  geometry: {
                    coordinates: feature.data.geometry.coordinates,
                  },
                  properties: {
                    html: feature.data.properties.html,
                  },
                },
              ],
              lngLat: {
                lng: feature.data.geometry.coordinates[0],
              },
            });
          },
          // mouseleave: function () {
          //   popupPoint.remove();
          // },
        });

        // SAUNA
        addPoints(sauna, "burlywood");
        addListings(sauna, ".sauna", {
          onClick: pointClick,
          mouseenter: function (e) {
            popupPoint.remove();
            const feature = sauna.features.find(
              (item) => this.id == `listing-${item.data.properties.id}`
            );

            showPopupPoint({
              features: [
                {
                  geometry: {
                    coordinates: feature.data.geometry.coordinates,
                  },
                  properties: {
                    html: feature.data.properties.html,
                  },
                },
              ],
              lngLat: {
                lng: feature.data.geometry.coordinates[0],
              },
            });
          },
          // mouseleave: function () {
          //   popupPoint.remove();
          // },
        });
      });
    }
  }

  if (PAGE == "report" || PAGE == "fishing") {
    if (!mapboxgl.supported()) {
      document.querySelector("#map").style.display = "none";
    } else {
      // show/hide sidepanel
      const $sidebar = document.querySelector(".sidebar");
      document
        .querySelector(".sidebar .close")
        .addEventListener("click", function (e) {
          $sidebar.classList.toggle("collapsed");
        });

      // show/hide listings section
      document.querySelectorAll(".heading").forEach((item) => {
        item.addEventListener("click", function (e) {
          const $heading = this;
          const isOpen =
            $heading.nextSibling.nextSibling.classList.contains("open");

          document.querySelector(".heading.active")?.classList.remove("active");
          document.querySelector(".listings.open")?.classList.remove("open");
          if (isOpen) {
            $heading.classList.remove("active");
            $heading.nextSibling.nextSibling.classList.remove("open");
          } else {
            $heading.classList.add("active");
            $heading.nextSibling.nextSibling.classList.add("open");
          }
        });
      });

      const map = new mapboxgl.Map({
        container: "map",
        // style: "mapbox://styles/mapbox/streets-v11",
        // style: 'mapbox://styles/mapbox/light-v11',
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-124.768889, 48.616667],
        zoom: 9,
        attributionControl: false,
        performanceMetricsCollection: false,
        accessToken: TOKEN.MAPBOX,
      });
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      map.addControl(
        new MapboxGeocoder({
          accessToken: TOKEN.MAPBOX,
          mapboxgl,
        }),
        "top-right"
      );
      map.scrollZoom.disable();

      const restrictedAreas = {
        type: "FeatureCollection",
        features: [
          {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-124.764, 48.6225],
                    [-124.78, 48.6167],
                    [-124.692, 48.575],
                    [-124.68, 48.585],
                    [-124.68317, 48.587388],
                    [-124.688266, 48.589794],
                    [-124.692815, 48.590688],
                    [-124.696312, 48.590333],
                    [-124.698072, 48.589836],
                    [-124.702583, 48.591194],
                    [-124.705244, 48.592415],
                    [-124.706638, 48.592329],
                    [-124.716337, 48.593848],
                    [-124.716938, 48.594841],
                    [-124.71829, 48.595466],
                    [-124.719449, 48.595551],
                    [-124.720972, 48.596303],
                    [-124.722088, 48.597623],
                    [-124.722925, 48.597793],
                    [-124.723719, 48.597623],
                    [-124.7258, 48.598503],
                    [-124.727302, 48.601738],
                    [-124.727839, 48.603952],
                    [-124.736143, 48.611344],
                    [-124.742945, 48.613599],
                    [-124.745434, 48.613429],
                    [-124.751356, 48.611102],
                    [-124.752928, 48.612106],
                    [-124.752864, 48.612624],
                    [-124.753754, 48.613028],
                    [-124.754634, 48.612908],
                    [-124.757343, 48.614039],
                    [-124.757429, 48.616139],
                    [-124.759854, 48.617117],
                    [-124.761956, 48.61716],
                    [-124.763737, 48.619855],
                    [-124.764, 48.6225],
                  ],
                ],
              },
              properties: {
                id: "carmanah",
                html: "<pre>Rockfish Conservation Area</pre>",
                description: "Rockfish Conservation Area",
              },
            },
          },
          {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-125.1, 48.5667],
                    [-124.903, 48.5667],
                    [-124.723, 48.4937],
                    [-124.817712, 48.505],
                    [-124.892808, 48.5],
                    [-124.937, 48.4925],
                    [-125.1, 48.5667],
                  ],
                ],
              },
              properties: {
                id: "swiftsure",
                html: "<pre>Swiftsure Bank</pre>",
                description: "Swiftsure Bank",
              },
            },
          },
        ],
      };
      const fishingAreas = {
        type: "FeatureCollection",
        features: [
          {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-124.515946, 48.545654],
                    [-124.520967, 48.546372],
                    [-124.521783, 48.544468],
                    [-124.517212, 48.543701],
                    [-124.515946, 48.545654],
                  ],
                ],
              },
              properties: {
                id: "rockpile",
                html: "<pre><strong>ROCK PILE:</strong> SPRINGS</pre>",
                description: "ROCK PILE: Springs",
              },
            },
          },
          {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-124.561281, 48.555824],
                    [-124.562725, 48.555613],
                    [-124.563258, 48.553973],
                    [-124.557373, 48.553278],
                    [-124.554697, 48.553107],
                    [-124.553952, 48.554446],
                    [-124.556902, 48.55511],
                    [-124.561281, 48.555824],
                  ],
                ],
              },
              properties: {
                id: "camper",
                html: "<pre><strong>CAMPER:</strong> SPRINGS</pre>",
                description: "CAMPER: Springs",
              },
            },
          },
          {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-124.457291, 48.536792],
                    [-124.455269, 48.538519],
                    [-124.456554, 48.538977],
                    [-124.458629, 48.537235],
                    [-124.457291, 48.536792],
                  ],
                ],
              },
              properties: {
                id: "eastpoint",
                html: "<pre><strong>EAST POINT:</strong> SPRINGS</pre>",
                description: "EAST POINT: Springs",
              },
            },
          },
        ],
      };

      function areaClick(e) {
        e.stopPropagation();
        const $section = this.parentNode.parentNode;
        const isFishing = $section.classList.contains("fishing");
        const feature = isFishing
          ? fishingAreas.features.find(
              (item) => this.id == `listing-${item.data.properties.id}`
            )
          : restrictedAreas.features.find(
              (item) => this.id == `listing-${item.data.properties.id}`
            );

        const firstPoint = feature.data.geometry.coordinates[0][0];
        const sw = [firstPoint[0], firstPoint[1]];
        const ne = [firstPoint[0], firstPoint[1]];

        feature.data.geometry.coordinates[0].forEach((item) => {
          if (item[0] > ne[0]) ne[0] = item[0];
          if (item[1] < ne[1]) ne[1] = item[1];

          if (item[0] < sw[0]) sw[0] = item[0];
          if (item[1] > sw[1]) sw[1] = item[1];
        });

        map.fitBounds(
          [
            sw, // southwestern corner of the bounds
            ne, // northeastern corner of the bounds
          ],
          {
            padding: { top: 20, bottom: 20, left: 20, right: 20 },
          }
        );

        const $active = document.querySelector(".listings .item.active");
        $active?.classList.remove("active");
        this.classList.add("active");
        popupPoint.remove();

        document
          .querySelector(".map-container")
          .scrollIntoView({ behavior: "smooth" });
      }

      map.on("load", () => {
        // click on an empty place
        document
          .querySelector(".sidebar .initial-view")
          .addEventListener("click", function () {
            map.flyTo({
              // center: [-124.5209829, 48.5178988],
              center: [-124.768889, 48.616667],
              zoom: 9,
            });
            const $active = document.querySelector(".listings .item.active");
            $active?.classList.remove("active");
            popupPoint.remove();
          });

        // RESTRICTED
        restrictedAreas.features.forEach((item) => {
          map.addSource(item.data.properties.id, item);
        });
        addListings(restrictedAreas, ".restricted", { onClick: areaClick });

        // FISHING
        fishingAreas.features.forEach((item) => {
          const id = item.data.properties.id;
          map.addSource(id, item);
          map.addLayer({
            id: id,
            type: "fill",
            source: id,
            paint: {
              "fill-color": "transparent",
            },
          });
        });
        addListings(fishingAreas, ".fishing", { onClick: areaClick });

        // red dashed pattern
        map.loadImage("../media/general/pattern-red-square.png", (err, image) => {
          if (err) throw err;

          map.addImage("pattern-red-stripes", image);

          restrictedAreas.features.forEach((item) => {
            const id = item.data.properties.id;
            map.addLayer({
              id: id,
              type: "fill",
              source: id,
              paint: {
                "fill-pattern": "pattern-red-stripes",
              },
            });
          });
        });

        // carmanah-point
        map.addSource("carmanah-point", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-124.75127, 48.61183],
            },
            properties: {
              html: "<pre><strong>Carmanah Point Lighthouse</strong></pre>",
              description: "Carmanah Point Lighthouse",
            },
          },
        });
        map.addLayer({
          id: "carmanah-point",
          type: "circle",
          source: "carmanah-point",
          paint: {
            "circle-radius": 8,
            "circle-color": "gray",
            "circle-stroke-width": 2,
            "circle-stroke-color": "white",
            // "circle-color": "rgba(55,148,179,1)",
          },
        });

        // outline: carmanah, swiftsure
        map.addLayer({
          id: "carmanah-outline",
          type: "line",
          source: "carmanah",
          // layout: {},
          paint: {
            "line-color": "#0080ff",
            "line-width": 2,
          },
        });
        map.addLayer({
          id: "swiftsure-outline",
          type: "line",
          source: "swiftsure",
          paint: {
            "line-color": "#0080ff",
            "line-width": 3,
          },
        });

        map.loadImage("../media/general/arrow-blue-left.png", (err, image) => {
          if (err) throw err;

          map.addImage("arrow-blue-left", image);

          fishingAreas.features.forEach((item) => {
            const id = item.data.properties.id;
            map.addLayer({
              id: `${id}-outline`,
              type: "line",
              source: id,
              paint: {
                "line-pattern": "arrow-blue-left",
                "line-width": 14,
              },
            });
          });
        });

        const labels = [
          {
            id: "camper-label",
            coordinates: [-124.55912, 48.554546],
            text: "Camper",
          },
          {
            id: "rockpile-label",
            coordinates: [-124.518946, 48.544954],
            text: "Rock Pile",
          },
          {
            id: "eastpoint-label",
            coordinates: [-124.456629, 48.538235],
            text: "East Point",
          },
          {
            id: "swiftsure-label",
            coordinates: [-124.969, 48.575],
            text: "Swiftsure Bank",
          },
        ];
        labels.forEach((item) => {
          const id = item.id;
          const coordinates = item.coordinates;
          const text = item.text;

          map.addSource(id, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: coordinates,
              },
            },
          });
          map.addLayer({
            id: id,
            type: "symbol",
            source: id,
            paint: {
              "text-color": "#ffffff",
            },
            layout: {
              "text-field": text,
              "text-allow-overlap": true,
            },
          });
        });
      });

      const popupPoint = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
      });
      function showPopupPoint(e) {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.html;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popupPoint.setLngLat(coordinates).setHTML(description).addTo(map);
      }
      map.on("click", "carmanah-point", showPopupPoint);
      map.on("mouseenter", "carmanah-point", (e) => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "carmanah-point", mouseLeave);

      // area hover
      const popupArea = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });
      function mouseMove(e) {
        map.getCanvas().style.cursor = "pointer";
        const description = e.features[0].properties.html;
        popupArea.setLngLat(e.lngLat).setHTML(description).addTo(map);
      }
      function mouseLeave() {
        map.getCanvas().style.cursor = "";
        popupArea.remove();
      }
      map.on("mousemove", "carmanah", mouseMove);
      map.on("mouseleave", "carmanah", mouseLeave);

      map.on("mousemove", "swiftsure", mouseMove);
      map.on("mouseleave", "swiftsure", mouseLeave);

      map.on("mousemove", "camper", mouseMove);
      map.on("mouseleave", "camper", mouseLeave);

      map.on("mousemove", "eastpoint", mouseMove);
      map.on("mouseleave", "eastpoint", mouseLeave);

      // const marker = new mapboxgl.Marker({ color: "blue", rotation: 0 })
      //   .setLngLat([-124.768889, 48.616667])
      //   .addTo(map);
    }
  }

  if (PAGE == "fishing") {
    function setActiveTab() {
      document.querySelector(".tabs li.active").classList.remove("active");
      this.classList.add("active");
    }
    document.querySelectorAll(".tabs li").forEach(($li) => {
      $li.addEventListener("click", setActiveTab);
    });

    const pricePerFish = 2.5;
    const dressedWeight = 0.63;
    const gstMultiplier = 0.05;
    let currentPrice = 0;
    let gst = 0;
    let fees = 0;
    let packs = 0;
    let pack_size = 1;
    function setValue() {
      packs = 0;
      gst = 0;
      currentPrice = 0;
      pack_size = Number(
        document.querySelector(".table input[name=pack-switch]:checked").value
      );
      document.querySelectorAll(".table input.weight").forEach(($input) => {
        const value = $input.value;
        const currentWeight = value
          ? Number(value * dressedWeight).toFixed(3)
          : 0;
        document.querySelector(".table .dressed." + $input.name).innerText =
          value ? currentWeight + " lbs" : "";
        const pack = Math.ceil(Number(currentWeight / pack_size));
        document.querySelector(".table .pack." + $input.name).innerText = value
          ? pack
          : "";

        packs += pack;
        currentPrice += currentWeight * pricePerFish;
      });

      if (packs == 0) {
        fees = 0;
      }
      gst = (currentPrice + fees) * gstMultiplier;

      document.querySelector(".table td.packs").innerText = Number(packs);
      document.querySelector(".table td.price").innerText =
        "$" + Number(currentPrice).toFixed(2) + " CAD";
      document.querySelector(".table td.fees").innerText =
        "$" + Number(fees).toFixed(2) + " CAD";
      document.querySelector(".table td.gst").innerText =
        "$" + Number(gst).toFixed(2) + " CAD";
      document.querySelector(".table td.total").innerText =
        "$" + Number(fees + gst + currentPrice).toFixed(2) + " CAD";

      if (packs) {
        document.querySelectorAll(".table input.add-fee").forEach(($input) => {
          $input.disabled = false;
        });
      } else {
        document.querySelectorAll(".table input.add-fee").forEach(($input) => {
          $input.disabled = true;
          $input.checked = false;
        });
      }
    }
    function addFee(e) {
      const FEE = {
        fresh: 15,
        frozen: 20,
        freezer: 10,
        pickup: 50,
      };
      fees = 0;
      document.querySelectorAll(".table input.add-fee").forEach(($input) => {
        fees += $input.checked ? FEE[$input.name] : 0;
      });
      setValue();
    }
    document.querySelectorAll(".table input.weight").forEach(($input) => {
      $input.addEventListener("keyup", setValue);
      $input.addEventListener("change", setValue);
    });
    document.querySelectorAll(".table input.add-fee").forEach(($input) => {
      $input.addEventListener("click", addFee);
    });
    function changePackSize(e) {
      pack_size = Number(
        document.querySelector(".table input[name=pack-switch]:checked").value
      );
      setValue();
    }
    document.querySelectorAll(".table input.pack-switch").forEach(($input) => {
      $input.addEventListener("click", changePackSize);
    });
  }

  if (PAGE == "events") {
    // https://fullcalendar.io/docs/initialize-globals
    const $calendar = document.getElementById("calendar");
    if ($calendar && window.FullCalendar) {
      const calendar = new FullCalendar.Calendar($calendar, {
        initialView: "dayGridMonth",
        events: [
          {
            title: "Song and Surf",
            url: "https://songandsurf.com/",
            start: "2024-02-16",
            end: "2024-02-19",
            allDay: true,
          },
          {
            title: "Derby Weekend",
            url: "https://pacificgatewaymarina.ca/",
            start: "2024-08-17",
            end: "2024-08-19",
            allDay: true,
          },
        ],
        eventClick: function (info) {
          info.jsEvent.preventDefault();

          if (info.event.url) {
            window.open(info.event.url);
          }
        },
      });
      calendar.render();
    }
    // EmbedBookingRequest_OnLoad();
    const $date_from = document.getElementById("date_from");
    const $formatted_date_from = document.getElementById("formatted_date_from");
    const $date_to = document.getElementById("date_to");
    const $formatted_date_to = document.getElementById("formatted_date_to");
    document
      .getElementById("submit-webrez-form")
      .addEventListener("click", function (e) {
        if (!$date_from.value) {
          const d = new Date($formatted_date_from.value);
          const year = d.getFullYear();
          const month =
            d.getMonth() < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
          const date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
          $date_from.value = year + month + date;
        }
        if (!$date_to.value) {
          const d = new Date($formatted_date_to.value);
          const year = d.getFullYear();
          const month =
            d.getMonth() < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
          const date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
          $date_to.value = year + month + date;
        }
      });
  }

  $mobileIcon.addEventListener("click", toggleMobileMenu);
  $mobileCloseButton.addEventListener("click", toggleMobileMenu);
  document
    .querySelector(".book-now-form")
    .addEventListener("click", function () {
      this.classList.toggle("active");
    });
  document
    .querySelector(".book-now-form .sub-menu")
    .addEventListener("click", function (e) {
      if (!e.target.classList.contains("book-now")) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  // book now window
  let isBookOpen = false;
  const $bookWindow = document.querySelector(".mobile-book-form-container");
  const mobileFormWindow = () => {
    $bookButtonMobile.classList.toggle("hide");
    if (isBookOpen) {
      $bookWindow.classList.remove("show");
    } else {
      $bookWindow.classList.add("show");
    }
    isBookOpen = !isBookOpen;
  };
  const $bookButtonMobile = document.querySelector(
    ".mobile-book-container .menu-item"
  );
  $bookButtonMobile.addEventListener("click", mobileFormWindow);
  document
    .querySelector(".mobile-book-form-close")
    ?.addEventListener("click", mobileFormWindow);

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
