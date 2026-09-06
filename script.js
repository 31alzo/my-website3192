/* =========================================================
   عالم شيخ الأساتذة
   GLOBAL JAVASCRIPT ENGINE
   Navigation + Storage + Theme + Language
   ========================================================= */

"use strict";


/* =========================================================
   1. NAVIGATION
   ========================================================= */

function goTo(page) {
    if (!page) return;
    window.location.href = page;
}

function goBack(fallback = "index.html") {

    if (window.history.length > 1) {
        window.history.back();
    } else {
        goTo(fallback);
    }
}


/* =========================================================
   2. LOCAL STORAGE
   ========================================================= */

function saveData(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    } catch (error) {

        console.error(
            "خطأ أثناء حفظ البيانات:",
            error
        );

        return false;
    }
}


function getData(key, fallback = null) {

    try {

        const value =
            localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {

        console.error(
            "خطأ أثناء قراءة البيانات:",
            error
        );

        return fallback;
    }
}


function removeData(key) {

    try {

        localStorage.removeItem(key);

        return true;

    } catch (error) {

        console.error(
            "خطأ أثناء حذف البيانات:",
            error
        );

        return false;
    }
}


/* =========================================================
   3. STUDENT LEVEL
   ========================================================= */

function getStudentLevel() {

    return localStorage.getItem(
        "student_level"
    ) || "";
}


function setStudentLevel(level) {

    if (!level) return false;

    localStorage.setItem(
        "student_level",
        level
    );

    return true;
}


/* =========================================================
   4. OLD LESSON SUPPORT
   محفوظ للتوافق مع الصفحات القديمة
   ========================================================= */

const TOTAL_LESSONS = 20;


function isLessonCompleted(number) {

    return localStorage.getItem(
        `lesson_${number}_completed`
    ) === "true";
}


function completeLesson(number) {

    if (!number) return false;

    localStorage.setItem(
        `lesson_${number}_completed`,
        "true"
    );

    return true;
}


function getCompletedLessons(
    total = TOTAL_LESSONS
) {

    let completed = 0;

    for (
        let i = 1;
        i <= total;
        i++
    ) {

        if (
            isLessonCompleted(i)
        ) {
            completed++;
        }
    }

    return completed;
}


function getLearningProgress(
    total = TOTAL_LESSONS
) {

    if (!total) return 0;

    const completed =
        getCompletedLessons(total);

    return Math.round(
        (completed / total) * 100
    );
}


/* =========================================================
   5. STUDENT POINTS
   ========================================================= */

function getStudentPoints() {

    return Number(
        localStorage.getItem(
            "student_points"
        ) || 0
    );
}


function setStudentPoints(points) {

    const safePoints =
        Math.max(
            0,
            Number(points) || 0
        );

    localStorage.setItem(
        "student_points",
        String(safePoints)
    );

    return safePoints;
}


function addStudentPoints(points) {

    const current =
        getStudentPoints();

    return setStudentPoints(
        current +
        (Number(points) || 0)
    );
}


/* =========================================================
   6. GLOBAL THEME
   ========================================================= */

const GLOBAL_THEME_KEY =
    "site_theme";


function getSiteTheme() {

    return (
        localStorage.getItem(
            GLOBAL_THEME_KEY
        ) || "light"
    );
}


function applySiteTheme(theme) {

    const safeTheme =
        theme === "dark"
            ? "dark"
            : "light";


    const root =
        document.documentElement;


    root.classList.toggle(
        "dark-mode",
        safeTheme === "dark"
    );


    root.setAttribute(
        "data-theme",
        safeTheme
    );


    localStorage.setItem(
        GLOBAL_THEME_KEY,
        safeTheme
    );


    updateThemeControls(
        safeTheme
    );
}


function toggleDarkMode() {

    const current =
        getSiteTheme();

    const next =
        current === "dark"
            ? "light"
            : "dark";

    applySiteTheme(next);

    return next;
}


function updateThemeControls(theme) {

    const checkbox =
        document.getElementById(
            "darkMode"
        );

    if (checkbox) {

        checkbox.checked =
            theme === "dark";

    }


    document
        .querySelectorAll(
            "[data-theme-toggle]"
        )
        .forEach(button => {

            button.setAttribute(
                "aria-pressed",
                theme === "dark"
                    ? "true"
                    : "false"
            );

        });
}


/* =========================================================
   7. GLOBAL LANGUAGE
   ========================================================= */

const GLOBAL_LANGUAGE_KEY =
    "site_language";


function getSiteLanguage() {

    return (
        localStorage.getItem(
            GLOBAL_LANGUAGE_KEY
        ) || "ar"
    );
}


function applySiteLanguage(language) {

    const safeLanguage =
        language === "fr"
            ? "fr"
            : "ar";


    const root =
        document.documentElement;


    root.lang =
        safeLanguage;


    root.dir =
        safeLanguage === "fr"
            ? "ltr"
            : "rtl";


    localStorage.setItem(
        GLOBAL_LANGUAGE_KEY,
        safeLanguage
    );


    document.body.classList.toggle(
        "language-fr",
        safeLanguage === "fr"
    );


    document.body.classList.toggle(
        "language-ar",
        safeLanguage === "ar"
    );


    translatePage(
        safeLanguage
    );


    const selector =
        document.getElementById(
            "language"
        );

    if (selector) {
        selector.value =
            safeLanguage;
    }
}


/* =========================================================
   8. TRANSLATION ENGINE
   ========================================================= */

/*
   الصفحات الجديدة ستستخدم:

   data-i18n="home"

   أو:

   data-i18n-placeholder="email"

   وسيتم ترجمتها تلقائيًا.
*/


const translations = {

    ar: {

        home:
            "الرئيسية",

        dashboard:
            "لوحة التحكم",

        library:
            "المكتبة",

        account:
            "حسابي",

        settings:
            "الإعدادات",

        mathematics:
            "الرياضيات",

        chapter:
            "Chapitre",

        videos:
            "الفيديوهات",

        free:
            "مجاني",

        subscribe:
            "اشترك الآن",

        logout:
            "تسجيل الخروج",

        language:
            "اللغة",

        darkMode:
            "الوضع الداكن",

        lightMode:
            "الوضع النهاري",

        watch:
            "مشاهدة",

        back:
            "رجوع",

        teacher:
            "شيخ الأساتذة — الأستاذ AI"

    },


    fr: {

        home:
            "Accueil",

        dashboard:
            "Tableau de bord",

        library:
            "Bibliothèque",

        account:
            "Mon compte",

        settings:
            "Paramètres",

        mathematics:
            "Mathématiques",

        chapter:
            "Chapitre",

        videos:
            "Vidéos",

        free:
            "Gratuit",

        subscribe:
            "S'abonner",

        logout:
            "Se déconnecter",

        language:
            "Langue",

        darkMode:
            "Mode sombre",

        lightMode:
            "Mode clair",

        watch:
            "Regarder",

        back:
            "Retour",

        teacher:
            "Cheikh des professeurs — Professeur AI"

    }

};


function translatePage(language) {

    const dictionary =
        translations[
            language
        ] || translations.ar;


    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n"
                );

            if (
                dictionary[key] !== undefined
            ) {

                element.textContent =
                    dictionary[key];

            }

        });


    document
        .querySelectorAll(
            "[data-i18n-placeholder]"
        )
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-placeholder"
                );

            if (
                dictionary[key] !== undefined
            ) {

                element.placeholder =
                    dictionary[key];

            }

        });


    document
        .querySelectorAll(
            "[data-i18n-title]"
        )
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n-title"
                );

            if (
                dictionary[key] !== undefined
            ) {

                element.title =
                    dictionary[key];

            }

        });
}


/* =========================================================
   9. SETTINGS CONTROLS
   ========================================================= */

function initializeGlobalSettings() {

    const theme =
        getSiteTheme();

    const language =
        getSiteLanguage();


    applySiteTheme(theme);

    applySiteLanguage(language);


    const darkMode =
        document.getElementById(
            "darkMode"
        );


    if (darkMode) {

        darkMode.checked =
            theme === "dark";


        darkMode.addEventListener(
            "change",
            function () {

                applySiteTheme(
                    this.checked
                        ? "dark"
                        : "light"
                );

            }
        );

    }


    const languageSelect =
        document.getElementById(
            "language"
        );


    if (languageSelect) {

        languageSelect.value =
            language;


        languageSelect.addEventListener(
            "change",
            function () {

                applySiteLanguage(
                    this.value
                );

            }
        );

    }
}


/* =========================================================
   10. DOM HELPERS
   ========================================================= */

function setText(selector, text) {

    const element =
        document.querySelector(selector);

    if (element) {

        element.textContent =
            text ?? "";

    }
}


function show(selector) {

    const element =
        document.querySelector(selector);

    if (element) {

        element.classList.remove(
            "hidden"
        );

    }
}


function hide(selector) {

    const element =
        document.querySelector(selector);

    if (element) {

        element.classList.add(
            "hidden"
        );

    }
}


function toggle(selector) {

    const element =
        document.querySelector(selector);

    if (element) {

        element.classList.toggle(
            "hidden"
        );

    }
}


/* =========================================================
   11. BUTTON STATE
   ========================================================= */

function setButtonLoading(
    button,
    loadingText = "جارٍ التحميل..."
) {

    if (!button) return;


    if (
        !button.dataset.originalText
    ) {

        button.dataset.originalText =
            button.innerHTML;

    }


    button.innerHTML =
        loadingText;

    button.disabled = true;

    button.setAttribute(
        "aria-busy",
        "true"
    );

    button.style.opacity =
        "0.7";
}


function resetButton(button) {

    if (!button) return;


    if (
        button.dataset.originalText
    ) {

        button.innerHTML =
            button.dataset.originalText;

    }


    button.disabled = false;

    button.removeAttribute(
        "aria-busy"
    );

    button.style.opacity = "";
}


/* =========================================================
   12. NOTIFICATIONS
   ========================================================= */

function notify(message) {

    if (!message) return;


    const oldNotice =
        document.querySelector(
            ".global-notice"
        );


    if (oldNotice) {
        oldNotice.remove();
    }


    const notice =
        document.createElement(
            "div"
        );


    notice.className =
        "global-notice";


    notice.setAttribute(
        "role",
        "status"
    );


    notice.textContent =
        message;


    Object.assign(
        notice.style,
        {

            position: "fixed",

            top: "18px",

            left: "50%",

            transform:
                "translateX(-50%)",

            zIndex: "9999",

            width:
                "min(90%, 420px)",

            padding:
                "13px 16px",

            background:
                "#172033",

            color:
                "#ffffff",

            borderRadius:
                "12px",

            textAlign:
                "center",

            fontSize:
                "14px",

            fontWeight:
                "700",

            boxShadow:
                "0 10px 30px rgba(0,0,0,.15)",

            opacity:
                "1",

            transition:
                "opacity .2s ease"

        }
    );


    document.body.appendChild(
        notice
    );


    setTimeout(() => {

        notice.style.opacity =
            "0";


        setTimeout(() => {

            notice.remove();

        }, 200);

    }, 2500);
}


/* =========================================================
   13. CONFIRMATION
   ========================================================= */

function confirmAction(
    message,
    callback
) {

    if (
        !message ||
        typeof callback !==
        "function"
    ) {
        return;
    }


    if (
        window.confirm(message)
    ) {

        callback();

    }
}


/* =========================================================
   14. CURRENT YEAR
   ========================================================= */

function setCurrentYear() {

    const year =
        new Date()
            .getFullYear();


    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach(element => {

            element.textContent =
                year;

        });
}


/* =========================================================
   15. ACTIVE NAVIGATION
   ========================================================= */

function setActiveNav() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() ||
        "index.html";


    document
        .querySelectorAll(
            "[data-nav]"
        )
        .forEach(link => {

            const target =
                link.getAttribute(
                    "href"
                );


            if (
                target ===
                currentPage
            ) {

                link.classList.add(
                    "active"
                );

            } else {

                link.classList.remove(
                    "active"
                );

            }

        });
}


/* =========================================================
   16. SMOOTH SCROLL
   ========================================================= */

function scrollToElement(
    selector
) {

    const element =
        document.querySelector(
            selector
        );


    if (!element) return;


    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   17. SAFE HTML
   ========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   18. PAGE UTILITIES
   ========================================================= */

function addClass(
    selector,
    className
) {

    const element =
        document.querySelector(
            selector
        );


    if (
        element &&
        className
    ) {

        element.classList.add(
            className
        );

    }
}


function removeClass(
    selector,
    className
) {

    const element =
        document.querySelector(
            selector
        );


    if (
        element &&
        className
    ) {

        element.classList.remove(
            className
        );

    }
}


function exists(selector) {

    return Boolean(
        document.querySelector(
            selector
        )
    );
}


/* =========================================================
   19. DEVICE
   ========================================================= */

function isMobile() {

    return window.matchMedia(
        "(max-width: 639px)"
    ).matches;
}


/* =========================================================
   20. GLOBAL INITIALIZATION
   ========================================================= */

function initializeGlobalEngine() {

    /*
       نطبق المظهر واللغة أولًا
       حتى تكون الصفحة متناسقة.
    */

    initializeGlobalSettings();

    setCurrentYear();

    setActiveNav();
}


/*
   التطبيق المبكر للوضع الليلي
   قبل اكتمال تحميل الصفحة.
*/

(function earlyTheme() {

    try {

        const theme =
            localStorage.getItem(
                GLOBAL_THEME_KEY
            ) || "light";


        if (
            theme === "dark"
        ) {

            document.documentElement
                .classList.add(
                    "dark-mode"
                );

        }

    } catch (error) {

        console.warn(
            "تعذر تطبيق الوضع الليلي مبكرًا."
        );

    }

})();


document.addEventListener(
    "DOMContentLoaded",
    initializeGlobalEngine
);


/* =========================================================
   21. LISTEN FOR SETTINGS CHANGES
   ========================================================= */

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key ===
            GLOBAL_THEME_KEY
        ) {

            applySiteTheme(
                event.newValue ||
                "light"
            );

        }


        if (
            event.key ===
            GLOBAL_LANGUAGE_KEY
        ) {

            applySiteLanguage(
                event.newValue ||
                "ar"
            );

        }

    }
);
