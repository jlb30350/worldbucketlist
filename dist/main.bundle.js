/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/data.js":
      /*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ data: () => /* binding */ data,
          /* harmony export */
        });
        var data = [
          {
            id: 1,
            imagePath: "./images/img_tahiti.jpg",
            description: "Sonia à Tahiti",
            done: false,
            link: "https://lesdeuxpiedsdehors.com/bungalow-pilotis-polynesie-francaise/",
            coordinates: {
              lat: -17.7454899,
              lng: -149.5714518,
            },
          },
          {
            id: 2,
            imagePath: "./images/img_tanzanie.jpg",
            description: "Sonia en Tanzanie",
            done: false,
            link: "http://mf-safaris.fr/",
            coordinates: {
              lat: -5.7329534,
              lng: 39.2913747,
            },
          },
          {
            id: 3,
            imagePath: "./images/img_islande.jpg",
            description: "Sonia en Islande",
            done: true,
            link: "https://www.momondo.fr/hotel/reykjavik",
            coordinates: {
              lat: 64.1421256,
              lng: -21.9271566,
            },
          },
          {
            id: 4,
            imagePath: "./images/img_maldives.jpg",
            description: "Maison sur pilotis aux Maldives",
            done: false,
            link: "https://www.dreamingofmaldives.com/blog-des-maldives/les-plus-belles-villas-sur-pilotis-que-nous-ayons-vu-aux-maldives-notre-selection-en-photos/",
            coordinates: {
              lat: -0.681786,
              lng: 73.191414,
            },
          },
          {
            id: 5,
            imagePath: "./images/img_florence.jpg",
            description: "Sonia à Florence",
            done: false,
            link: "https://florencesite.fr/",
            coordinates: {
              lat: 43.7734688,
              lng: 11.2560108,
            },
          },
          {
            id: 6,
            imagePath: "./images/img_paris.jpg",
            description: "Monter sur la Tour Eiffel",
            done: true,
            link: "http://www.toureiffel.paris/",
            coordinates: {
              lat: 48.8576472,
              lng: 2.2949591,
            },
          },
        ];

        /***/
      },

    /***/ "./src/dream.js":
      /*!**********************!*\
  !*** ./src/dream.js ***!
  \**********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ buildAllDreams: () =>
            /* binding */ buildAllDreams,
          /* harmony export */
        });
        /* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./data */ "./src/data.js");
        /* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./map */ "./src/map.js");

        var dreamsContainer = document.querySelector("#dreams-container");
        function buildAllDreams() {
          while (dreamsContainer.hasChildNodes()) {
            dreamsContainer.removeChild(dreamsContainer.lastChild);
          }
          _data__WEBPACK_IMPORTED_MODULE_0__.data.forEach(buildOneDream);
          addDreamsListeners();
        }
        function buildOneDream(dream) {
          var dreamElement = document.createElement("div");
          dreamElement.innerHTML = '<div class="card text-center" id="'
            .concat(
              dream.id,
              '">\n      <h4 class="card-header font-weight-bold">'
            )
            .concat(
              dream.description,
              '</h4>\n      <img class="card-img-top" src="'
            )
            .concat(
              dream.imagePath,
              '" alt="">\n      <div class="card-body">\n          <a href="#" class="button-action btn btn-'
            )
            .concat(
              dream.done ? "secondary" : "danger",
              ' btn-block font-weight-bold">'
            )
            .concat(
              dream.done
                ? "Je l'ai fait mais, je veux le refaire !!"
                : "Et puis zut, je prends un avion !!",
              '</a>\n      </div>\n      <div class="card-footer text-right">\n          \n          <a href="#" class="button-visit btn btn-outline-secondary btn-sm">Visiter</a>\n          <a href="'
            )
            .concat(
              dream.link,
              '" target="_blank" class="button-info btn btn-outline-dark btn-sm">Plus d\'infos</a>\n      </div>\n    </div>'
            );
          dreamsContainer.appendChild(dreamElement);
          (0, _map__WEBPACK_IMPORTED_MODULE_1__.addMarkerOnMap)(dream);
        }
        function visitDream(dreamId) {
          var position = _data__WEBPACK_IMPORTED_MODULE_0__.data.filter(
            function (item) {
              return item.id == dreamId;
            }
          )[0].coordinates;
          (0, _map__WEBPACK_IMPORTED_MODULE_1__.visitDreamOnMap)(position);
        }
        function addDreamsListeners() {
          document.querySelectorAll(".button-visit").forEach(function (item) {
            item.addEventListener("click", function (event) {
              visitDream(item.parentElement.parentElement.getAttribute("id"));
            });
          });
          document.querySelectorAll(".button-action").forEach(function (item) {
            item.addEventListener("click", function (event) {
              toggleDreamDone(
                item.parentElement.parentElement.getAttribute("id")
              );
              buildAllDreams();
            });
          });
        }
        function toggleDreamDone(dreamId) {
          var dream = _data__WEBPACK_IMPORTED_MODULE_0__.data.filter(function (
            item
          ) {
            return item.id == dreamId;
          })[0];
          dream.done = !dream.done;
        }

        /***/
      },

    /***/ "./src/map.js":
      /*!********************!*\
  !*** ./src/map.js ***!
  \********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ addMarkerOnMap: () =>
            /* binding */ addMarkerOnMap,
          /* harmony export */ initMap: () => /* binding */ initMap,
          /* harmony export */ visitDreamOnMap: () =>
            /* binding */ visitDreamOnMap,
          /* harmony export */
        });
        var map;
        var panorama;
        var resetMapButton = document.querySelector("#reset-map");
        var backToMapButton = document.querySelector("#back-to-map");
        var panoramaElement = document.querySelector("#panorama");
        function initMap() {
          map = new google.maps.Map(document.getElementById("map"), {
            center: {
              lat: 48.858227,
              lng: 2.294559,
            },
            zoom: 3,
            streetViewControl: false,
          });
          panorama = new google.maps.StreetViewPanorama(
            document.getElementById("panorama"),
            {
              position: {
                lat: 48.858227,
                lng: 2.294559,
              },
              pov: {
                heading: 34,
                pitch: 10,
              },
            }
          );
          addMapListeners();
          panoramaElement.style.display = "none";
          backToMapButton.style.display = "none";
        }
        function addMapListeners() {
          resetMapButton.addEventListener("click", resetMap);
          backToMapButton.addEventListener("click", backToMap);
        }
        function addMarkerOnMap(dream) {
          var marker = new google.maps.Marker({
            position: dream.coordinates,
            map: map,
            icon: dream.done ? "images/marker_done.png" : "images/marker.png",
          });
          marker.addListener("click", function () {
            zoomOn(marker.getPosition());
          });
        }
        function zoomOn(position) {
          map.setCenter(position);
          map.setMapTypeId("satellite");
          map.setZoom(20);
        }
        function resetMap() {
          map.setCenter({
            lat: 48.858227,
            lng: 2.294559,
          });
          map.setMapTypeId("roadmap");
          map.setZoom(3);
        }
        function backToMap() {
          panoramaElement.style.display = "none";
          backToMapButton.style.display = "none";
          resetMapButton.style.display = "block";
        }
        function visitDreamOnMap(position) {
          panorama.setPosition(position);
          panoramaElement.style.display = "block";
          backToMapButton.style.display = "block";
          resetMapButton.style.display = "none";
        }

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(/*! ./map */ "./src/map.js");
    /* harmony import */ var _dream__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(/*! ./dream */ "./src/dream.js");

    function init() {
      (0, _map__WEBPACK_IMPORTED_MODULE_0__.initMap)();
      (0, _dream__WEBPACK_IMPORTED_MODULE_1__.buildAllDreams)();
    }
    window.initMap = init;
  })();

  /******/
})();
//# sourceMappingURL=main.bundle.js.map
