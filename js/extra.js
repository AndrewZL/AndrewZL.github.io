(() => {
    (function () {
        "use strict";
        const k = document.querySelector("[data-theme-toggle]"),
            m = document.querySelector("[data-menu-toggle]");
        let v = document.querySelectorAll("[data-block-link]");
        const l = "is-scrolled", H = "is-transitioning", F = "is-active", x = "menu-is-active";
        const J = a => {
                let f = getComputedStyle(document.documentElement).getPropertyValue(a);
                return f.length && (f = f.replace(/\'/g, "").trim()), f
            },
            C = a => ((typeof a === "string" || a instanceof String) && (a = a.replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g, "")), a),
            O = () => {
                if (C(J("--viewport-size")) === "small") {
                    document.documentElement.classList.toggle(x);
                    let a = m.getAttribute("aria-expanded") === "true";
                    m.setAttribute("aria-expanded", String(!a))
                } else P()
            },
            $ = () => {
                let a;
                localStorage.getItem("color-mode") ? a = localStorage.getItem("color-mode") : a = J("--color-mode"), document.documentElement.setAttribute("data-color-mode", a), k.setAttribute("data-theme-toggle", a), k.setAttribute("aria-pressed", k.getAttribute("data-theme-toggle") === "dark" ? "true" : "false")
            },
            aa = a => {
                let f = a.target, i = f.nextElementSibling, c = f.getAttribute("aria-expanded") === "true" || !1;
                f.setAttribute("aria-expanded", !c), i.parentNode.classList.toggle(F)
            },
            ba = a => {
                document.documentElement.setAttribute("data-color-mode", k.getAttribute("data-theme-toggle") === "dark" ? "light" : "dark"), k.setAttribute("data-theme-toggle", k.getAttribute("data-theme-toggle") === "dark" ? "light" : "dark"), k.setAttribute("aria-pressed", k.getAttribute("data-theme-toggle") === "dark" ? "true" : "false"), localStorage.setItem("color-mode", a === "dark" ? "light" : "dark")
            },
            S = a => {
                if (a.target.matches('a[href*="#"]')) {
                    a.preventDefault();
                    let f = a.target.href.split("#")[1];
                    document.querySelector("#" + CSS.escape(f)).scrollIntoView({behavior: "smooth"})
                }
                if (a.target.matches("[data-page-link]")) {
                    if (a.metaKey) return;
                    a.preventDefault();
                    let f = a.target.href;
                    if (f === window.location.href) return;
                    ga(f)
                }
                a.target === m && O(), a.target === k && ba(k.getAttribute("data-theme-toggle")), a.target.matches("[data-content-toggle]") && aa(a), a.target.matches("[data-back-link]") && history.back()
            },
            ia = a => {
                a.style.cursor = "pointer";
                let f, i, c = a.querySelector("[data-block-link] a");
                a.onmousedown = () => f = +new Date(), a.onmouseup = () => {
                    i = +new Date(), i - f < 200 && (event.ctrlKey || event.shiftKey || event.metaKey || event.button && event.button == 1 ? window.open(c) : c.click())
                }
            };
        document.documentElement.classList.remove("no-js"),
            document.documentElement.classList.add("no-focus-outline"),
            history.replaceState(document.title, document.title, location.href),
            document.addEventListener("click", S, !1), window.addEventListener("resize", function () {
        }, !1)
        v && v.forEach(a => {
            ia(a)
        }), $(), navigator && navigator.serviceWorker && navigator.serviceWorker.register("/service-worker.js")
    })();
})();

class dotGrid {
  constructor(container = "sketch") {
    this.canvasElement = document.getElementById(container);

    // Get the device pixel ratio, falling back to 1.
    this.dpr = window.devicePixelRatio || 1;

    this.drawable = this.canvasElement.getBoundingClientRect();

    this.canvasWidth = this.drawable.width * this.dpr;
    this.canvasHeight = this.drawable.height * this.dpr;

    this.canvasElement.width = this.canvasWidth;
    this.canvasElement.height = this.canvasHeight;

    this.mouseX = 0;
    this.mouseY = 0;

    // Setup Canvas
    this.canvas = this.canvasElement.getContext("2d");
    this.canvas.scale(this.dpr, this.dpr);
  }

  onMouseUpdate(e) {
    this.mouseX = e.pageX - this.drawable.left;
    this.mouseY = e.pageY - this.drawable.top;

    window.requestAnimationFrame(this.draw.bind(this));
  }

  init() {
    window.requestAnimationFrame(this.draw.bind(this));
    // Listen for Mouse updates
    document.body.addEventListener(
      "mousemove",
      this.onMouseUpdate.bind(this),
      false
    );
  }

  // Draws the background and calls the function for drawing the dots
  draw() {
    this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawDots();
  }

  /*
  ((j - this.mouseY) / dist * 4)
  */

  // i and j function as x and y when drawing the dot grid.
  drawDots() {
    let size = 1;
    let gridSize = 20;
    for (var i = 2; i < this.canvasWidth / this.dpr / gridSize - 1; i++) {
      for (var j = 2; j < this.canvasHeight / this.dpr / gridSize - 1; j++) {
        let x = i * gridSize;
        let y = j * gridSize;
        let dist = this.pythag(x, y, this.mouseX, this.mouseY);
        this.canvas.beginPath();
        this.canvas.arc(
          x + (x - this.mouseX) / dist * gridSize,
          y + (y - this.mouseY) / dist * gridSize,
          size,
          size,
          Math.PI,
          true
        );
        this.canvas.fillStyle = "rgba(200, 200, 200, 1)";
        this.canvas.fill();
      }
    }
  }

  // Grabs mouse position, checks if the mouse is off the screen (NaN) and calculates the distance from the mouse pointer and each dot using the pythagorean theorem.
  pythag(ellipseX, ellipseY, mouseX, mouseY) {
    let x = mouseX;
    let y = mouseY;

    if (x == NaN) {
      return 1;
    } else {
      let leg1 = Math.abs(x - ellipseX);
      let leg2 = Math.abs(y - ellipseY);
      let pyth = Math.pow(leg1, 2) + Math.pow(leg2, 2);
      return Math.sqrt(pyth);
    }
  }
}

const grid = new dotGrid("sketch");
grid.init();
