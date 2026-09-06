/* =========================================================
   EduNova AI
   GLOBAL JAVASCRIPT
   Navigation + Storage + Theme + Language + Utilities
   ========================================================= */

"use strict";

/* =========================================================
1. GLOBAL SETTINGS
========================================================= */

const GLOBAL_THEME_KEY = "site_theme";
const GLOBAL_LANGUAGE_KEY = "site_language";

const DEFAULT_THEME = "light";
const DEFAULT_LANGUAGE = "ar";

/* =========================================================
2. NAVIGATION
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
3. LOCAL STORAGE
========================================================= */

function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error("خطأ أثناء حفظ البيانات:", error);
        return false;
    }
}

function getData(key, fallback = null) {
    try {
        const value = localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {
        console.error("خطأ أثناء قراءة البيانات:", error);
        return fallback;
    }
}

function removeData(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error("خطأ أثناء حذف البيانات:", error);
        return false;
    }
}

/* =========================================================
4. STUDENT LEVEL
========================================================= */

function getStudentLevel() {
    return localStorage.getItem("student_level") || "";
}

function setStudentLevel(level) {
    if (!level) return false;

    localStorage.setItem("student_level", level);

    return true;
}

/* =========================================================
5. LEGACY LESSON COMPATIBILITY

النظام الجديد:
المستوى → المادة → Chapitre → الفيديوهات

نحافظ على النظام القديم حتى لا تتعطل الصفحات الحالية.
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

function getCompletedLessons(total = TOTAL_LESSONS) {
    let completed = 0;

    for (let i = 1; i <= total; i++) {
        if (isLessonCompleted(i)) {
            completed++;
        }
    }

    return completed;
}

function getLearningProgress(total = TOTAL_LESSONS) {
    if (!total) return 0;

    const completed = getCompletedLessons(total);

    return Math.round(
        (completed / total) * 100
    );
}

/* =========================================================
6. STUDENT POINTS
========================================================= */

function getStudentPoints() {
    return Number(
        localStorage.getItem("student_points") || 0
    );
}

function setStudentPoints(points) {
    const safePoints = Math.max(
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
    const current = getStudentPoints();

    return setStudentPoints(
        current + (Number(points) || 0)
    );
}

/* =========================================================
7. GLOBAL THEME
========================================================= */

function getSiteTheme() {

    const saved = localStorage.getItem(
        GLOBAL_THEME_KEY
    );

    if (
        saved === "dark" ||
        saved === "light"
    ) {
        return saved;
    }

    /* توافق مع الإعدادات القديمة */
    try {
        const oldSettings =
            JSON.parse(
                localStorage.getItem(
                    "platform_settings"
                ) || "null"
            );

        if (
            oldSettings &&
            oldSettings.darkMode === true
        ) {
            return "dark";
        }

    } catch (error) {
        console.warn(
            "تعذر قراءة إعداد الوضع الليلي القديم"
        );
    }

    return DEFAULT_THEME;
}

function applySiteTheme(theme = getSiteTheme()) {

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

    root.style.colorScheme =
        safeTheme;

    localStorage.setItem(
        GLOBAL_THEME_KEY,
        safeTheme
    );

    /* مزامنة النظام القديم */
    syncLegacySettings({
        theme: safeTheme
    });

    updateThemeControls();

    return safeTheme;
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

function updateThemeControls() {

    const theme =
        getSiteTheme();

    const isDark =
        theme === "dark";

    const checkbox =
        document.querySelector(
            "#darkMode"
        );

    if (checkbox) {
        checkbox.checked = isDark;
    }

    document
        .querySelectorAll(
            "[data-theme-toggle]"
        )
        .forEach(button => {

            button.setAttribute(
                "aria-pressed",
                String(isDark)
            );

            button.dataset.theme =
                theme;
        });
}

/* =========================================================
8. GLOBAL LANGUAGE
========================================================= */

function getSiteLanguage() {

    const saved =
        localStorage.getItem(
            GLOBAL_LANGUAGE_KEY
        );

    if (
        saved === "ar" ||
        saved === "fr"
    ) {
        return saved;
    }

    /* توافق مع الإعدادات القديمة */
    try {

        const oldSettings =
            JSON.parse(
                localStorage.getItem(
                    "platform_settings"
                ) || "null"
            );

        if (
            oldSettings &&
            (
                oldSettings.language === "fr" ||
                oldSettings.language === "ar"
            )
        ) {
            return oldSettings.language;
        }

    } catch (error) {
        console.warn(
            "تعذر قراءة إعداد اللغة القديم"
        );
    }

    return DEFAULT_LANGUAGE;
}

/* =========================================================
9. TRANSLATIONS
========================================================= */

const GLOBAL_TRANSLATIONS = {

    ar: {

        /* General */
        home: "الرئيسية",
        dashboard: "لوحة الطالب",
        levels: "اختيار المستوى",
        library: "المكتبة",
        account: "حسابي",
        settings: "الإعدادات",
        forum: "المجتمع",
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",

        back: "رجوع",
        next: "التالي",
        previous: "السابق",
        continue: "متابعة",
        save: "حفظ",
        cancel: "إلغاء",
        close: "إغلاق",
        search: "بحث",

        /* Identity */
        site_name: "EduNova AI",
        ai_teacher: "Afkrash AI",
        teacher: "Afkrash AI",
        teacher_description:
            "مدرسك الذكي في EduNova AI",

        /* Education */
        mathematics: "الرياضيات",
        chapter: "Chapitre",
        chapters: "Chapitres",
        video: "فيديو",
        videos: "فيديوهات",

        concours: "كونكور",
        brevet: "بريڤي",
        bac: "باكالوريا",

        free: "مجاني",
        locked: "مقفل",
        subscriber: "للمشتركين",
        subscription: "الاشتراك",

        first_video_free:
            "الفيديو الأول مجاني",

        subscription_required:
            "هذا الفيديو متاح للمشتركين فقط",

        /* Settings */
        language: "اللغة",
        arabic: "العربية",
        french: "Français",

        dark_mode: "الوضع الداكن",
        light_mode: "الوضع الفاتح",

        /* Messages */
        loading: "جارٍ التحميل...",
        coming_soon: "قريبًا",
        no_content:
            "المحتوى سيُضاف هنا",

        saved:
            "تم حفظ الإعدادات بنجاح",

        dark_enabled:
            "تم تفعيل الوضع الداكن",

        dark_disabled:
            "تم تفعيل الوضع الفاتح",

        language_changed:
            "تم تغيير اللغة"
    },

    fr: {

        /* General */
        home: "Accueil",
        dashboard: "Tableau de bord",
        levels: "Choix du niveau",
        library: "Bibliothèque",
        account: "Mon compte",
        settings: "Paramètres",
        forum: "Communauté",
        login: "Connexion",
        logout: "Déconnexion",

        back: "Retour",
        next: "Suivant",
        previous: "Précédent",
        continue: "Continuer",
        save: "Enregistrer",
        cancel: "Annuler",
        close: "Fermer",
        search: "Rechercher",

        /* Identity */
        site_name: "EduNova AI",
        ai_teacher: "Afkrash AI",
        teacher: "Afkrash AI",
        teacher_description:
            "Votre professeur intelligent dans EduNova AI",

        /* Education */
        mathematics: "Mathématiques",
        chapter: "Chapitre",
        chapters: "Chapitres",
        video: "Vidéo",
        videos: "Vidéos",

        concours: "Concours",
        brevet: "Brevet",
        bac: "Baccalauréat",

        free: "Gratuit",
        locked: "Verrouillé",
        subscriber: "Abonnés",
        subscription: "Abonnement",

        first_video_free:
            "La première vidéo est gratuite",

        subscription_required:
            "Cette vidéo est réservée aux abonnés",

        /* Settings */
        language: "Langue",
        arabic: "العربية",
        french: "Français",

        dark_mode: "Mode sombre",
        light_mode: "Mode clair",

        /* Messages */
        loading: "Chargement...",
        coming_soon: "Bientôt disponible",
        no_content:
            "Le contenu sera ajouté ici",

        saved:
            "Paramètres enregistrés avec succès",

        dark_enabled:
            "Mode sombre activé",

        dark_disabled:
            "Mode clair activé",

        language_changed:
            "Langue modifiée"
    }
};

/* =========================================================
10. TRANSLATION HELPERS
========================================================= */

function translateText(key) {

    const language =
        getSiteLanguage();

    return (
        GLOBAL_TRANSLATIONS[language] &&
        GLOBAL_TRANSLATIONS[language][key]
    ) || (
        GLOBAL_TRANSLATIONS.ar[key]
    ) || key;
}

function applySiteLanguage(
    language = getSiteLanguage()
) {

    const safeLanguage =
        language === "fr"
            ? "fr"
            : "ar";

    const root =
        document.documentElement;

    localStorage.setItem(
        GLOBAL_LANGUAGE_KEY,
        safeLanguage
    );

    root.setAttribute(
        "lang",
        safeLanguage
    );

    root.setAttribute(
        "dir",
        safeLanguage === "ar"
            ? "rtl"
            : "ltr"
    );

    /* النصوص */
    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(element => {

            const key =
                element.dataset.i18n;

            const translated =
                translateText(key);

            if (translated) {
                element.textContent =
                    translated;
            }
        });

    /* Placeholder */
    document
        .querySelectorAll(
            "[data-i18n-placeholder]"
        )
        .forEach(element => {

            const key =
                element.dataset
                    .i18nPlaceholder;

            element.placeholder =
                translateText(key);
        });

    /* Title */
    document
        .querySelectorAll(
            "[data-i18n-title]"
        )
        .forEach(element => {

            const key =
                element.dataset
                    .i18nTitle;

            element.title =
                translateText(key);
        });

    /* عناصر اختيار اللغة */
    document
        .querySelectorAll(
            "[data-language]"
        )
        .forEach(element => {

            element.classList.toggle(
                "active",
                element.dataset.language ===
                    safeLanguage
            );
        });

    const languageSelect =
        document.querySelector(
            "#language"
        );

    if (languageSelect) {
        languageSelect.value =
            safeLanguage;
    }

    /* مزامنة الإعدادات القديمة */
    syncLegacySettings({
        language: safeLanguage
    });

    return safeLanguage;
}

function toggleLanguage() {

    const current =
        getSiteLanguage();

    const next =
        current === "ar"
            ? "fr"
            : "ar";

    applySiteLanguage(next);

    return next;
}

/* =========================================================
11. LEGACY SETTINGS SYNC
========================================================= */

function syncLegacySettings(options = {}) {

    try {

        const settings =
            JSON.parse(
                localStorage.getItem(
                    "platform_settings"
                ) || "{}"
            );

        if (
            options.theme === "dark" ||
            options.theme === "light"
        ) {
            settings.darkMode =
                options.theme === "dark";
        }

        if (
            options.language === "ar" ||
            options.language === "fr"
        ) {
            settings.language =
                options.language;
        }

        localStorage.setItem(
            "platform_settings",
            JSON.stringify(settings)
        );

    } catch (error) {

        console.warn(
            "تعذر مزامنة الإعدادات القديمة"
        );
    }
}

/* =========================================================
12. DOM HELPERS
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
        element.classList.remove("hidden");
    }
}

function hide(selector) {

    const element =
        document.querySelector(selector);

    if (element) {
        element.classList.add("hidden");
    }
}

function toggle(selector) {

    const element =
        document.querySelector(selector);

    if (element) {
        element.classList.toggle("hidden");
    }
}

/* =========================================================
13. BUTTON STATE
========================================================= */

function setButtonLoading(
    button,
    loadingText = translateText("loading")
) {

    if (!button) return;

    if (!button.dataset.originalText) {
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

    button.style.opacity = "0.7";
}

function resetButton(button) {

    if (!button) return;

    if (button.dataset.originalText) {
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
14. NOTIFICATIONS
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
        document.createElement("div");

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

        notice.style.opacity = "0";

        setTimeout(() => {
            notice.remove();
        }, 200);

    }, 2500);
}

/* =========================================================
15. CONFIRMATION
========================================================= */

function confirmAction(
    message,
    callback
) {

    if (
        !message ||
        typeof callback !== "function"
    ) {
        return;
    }

    if (window.confirm(message)) {
        callback();
    }
}

/* =========================================================
16. CURRENT YEAR
========================================================= */

function setCurrentYear() {

    const year =
        new Date().getFullYear();

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
17. ACTIVE NAVIGATION
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
                link.getAttribute("href");

            if (
                target === currentPage
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
18. SMOOTH SCROLL
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
19. SAFE HTML
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
20. PAGE UTILITIES
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
21. DEVICE
========================================================= */

function isMobile() {

    return window.matchMedia(
        "(max-width: 639px)"
    ).matches;
}

/* =========================================================
22. GLOBAL SETTINGS CONTROLS
========================================================= */

function initializeGlobalSettings() {

    /* الوضع الداكن */
    const darkMode =
        document.querySelector(
            "#darkMode"
        );

    if (darkMode) {

        darkMode.checked =
            getSiteTheme() === "dark";

        darkMode.addEventListener(
            "change",
            function () {

                applySiteTheme(
                    this.checked
                        ? "dark"
                        : "light"
                );

                syncLegacySettings({
                    theme:
                        this.checked
                            ? "dark"
                            : "light"
                });

            }
        );
    }

    /* اللغة */
    const language =
        document.querySelector(
            "#language"
        );

    if (language) {

        language.value =
            getSiteLanguage();

        language.addEventListener(
            "change",
            function () {

                applySiteLanguage(
                    this.value
                );

                syncLegacySettings({
                    language:
                        this.value
                });

            }
        );
    }

    /* أزرار الوضع الداكن */
    document
        .querySelectorAll(
            "[data-theme-toggle]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {
                    toggleDarkMode();
                }
            );
        });

    /* أزرار اللغة */
    document
        .querySelectorAll(
            "[data-language]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const language =
                        button.dataset.language;

                    if (
                        language === "ar" ||
                        language === "fr"
                    ) {
                        applySiteLanguage(
                            language
                        );
                    }
                }
            );
        });
}

/* =========================================================
23. EARLY THEME
========================================================= */

(function earlyTheme() {

    try {

        const theme =
            localStorage.getItem(
                GLOBAL_THEME_KEY
            );

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

        root.style.colorScheme =
            safeTheme;

    } catch (error) {

        console.warn(
            "تعذر تطبيق الوضع المبكر"
        );
    }

})();

/* =========================================================
24. EARLY LANGUAGE
========================================================= */

(function earlyLanguage() {

    try {

        const language =
            localStorage.getItem(
                GLOBAL_LANGUAGE_KEY
            );

        const safeLanguage =
            language === "fr"
                ? "fr"
                : "ar";

        const root =
            document.documentElement;

        root.setAttribute(
            "lang",
            safeLanguage
        );

        root.setAttribute(
            "dir",
            safeLanguage === "fr"
                ? "ltr"
                : "rtl"
        );

    } catch (error) {

        console.warn(
            "تعذر تطبيق اللغة المبكرة"
        );
    }

})();

/* =========================================================
25. CROSS-TAB / CROSS-PAGE SYNC
========================================================= */

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key ===
            GLOBAL_THEME_KEY
        ) {

            applySiteTheme(
                event.newValue ||
                DEFAULT_THEME
            );
        }

        if (
            event.key ===
            GLOBAL_LANGUAGE_KEY
        ) {

            applySiteLanguage(
                event.newValue ||
                DEFAULT_LANGUAGE
            );
        }
    }
);

/* =========================================================
26. GLOBAL INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * الإعدادات أولًا
         */
        applySiteTheme(
            getSiteTheme()
        );

        applySiteLanguage(
            getSiteLanguage()
        );

        /*
         * بقية الوظائف
         */
        initializeGlobalSettings();

        setCurrentYear();

        setActiveNav();

        updateThemeControls();
    }
);

/* =========================================================
END OF GLOBAL JAVASCRIPT
EduNova AI
========================================================= */
