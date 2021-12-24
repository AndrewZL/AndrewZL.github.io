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
        // v && v.forEach(a => {
        //     ia(a)
        // }), $(), navigator && navigator.serviceWorker && navigator.serviceWorker.register("/service-worker.js")
    })();
})();
