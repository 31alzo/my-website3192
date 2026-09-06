/* =========================================================
   عالم شيخ الأساتذة
   Global JavaScript
   الإصدار الأساسي
   ========================================================= */

"use strict";


/* =========================================================
   1. NAVIGATION
   ========================================================= */

/**
 * الانتقال إلى صفحة أخرى
 */
function goTo(page) {
    if (!page) return;

    window.location.href = page;
}


/**
 * العودة للصفحة السابقة
 * وإذا لم توجد صفحة سابقة نعود للرئيسية
 */
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

/**
 * حفظ قيمة
 */
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


/**
 * قراءة قيمة
 */
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


/**
 * حذف قيمة
 */
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

/**
 * الحصول على مستوى الطالب
 */
function getStudentLevel() {

    return localStorage.getItem(
        "student_level"
    ) || "";
}


/**
 * حفظ مستوى الطالب
 */
function setStudentLevel(level) {

    if (!level) return false;

    localStorage.setItem(
        "student_level",
        level
    );

    return true;
}


/* =========================================================
   4. LESSON PROGRESS
   ========================================================= */

const TOTAL_LESSONS = 20;


/**
 * هل الدرس مكتمل؟
 */
function isLessonCompleted(number) {

    return localStorage.getItem(
        `lesson_${number}_completed`
    ) === "true";
}


/**
 * إكمال درس
 */
function completeLesson(number) {

    if (!number) return false;

    localStorage.setItem(
        `lesson_${number}_completed`,
        "true"
    );

    return true;
}


/**
 * عدد الدروس المكتملة
 */
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


/**
 * نسبة تقدم الطالب
 */
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

/**
 * الحصول على النقاط
 */
function getStudentPoints() {

    return Number(
        localStorage.getItem(
            "student_points"
        ) || 0
    );
}


/**
 * تحديد النقاط
 */
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


/**
 * إضافة نقاط
 */
function addStudentPoints(points) {

    const current =
        getStudentPoints();

    return setStudentPoints(
        current +
        (Number(points) || 0)
    );
}


/* =========================================================
   6. DOM HELPERS
   ========================================================= */

/**
 * تغيير نص عنصر
 */
function setText(selector, text) {

    const element =
        document.querySelector(selector);

    if (element) {
        element.textContent =
            text ?? "";
    }
}


/**
 * إظهار عنصر
 */
function show(selector) {

    const element =
        document.querySelector(selector);

    if (element) {
        element.classList.remove(
            "hidden"
        );
    }
}


/**
 * إخفاء عنصر
 */
function hide(selector) {

    const element =
        document.querySelector(selector);

    if (element) {
        element.classList.add(
            "hidden"
        );
    }
}


/**
 * تبديل حالة العنصر
 */
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
   7. BUTTON STATE
   ========================================================= */

/**
 * تعطيل زر وإظهار حالة التحميل
 */
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


/**
 * إعادة الزر لحالته الطبيعية
 */
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
   8. NOTIFICATIONS
   ========================================================= */

/**
 * إشعار صغير أعلى الشاشة
 */
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
   9. CONFIRMATION
   ========================================================= */

/**
 * تأكيد إجراء
 */
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
   10. CURRENT YEAR
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
   11. ACTIVE NAVIGATION
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
   12. SMOOTH SCROLL
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
   13. SAFE HTML
   ========================================================= */

/**
 * حماية النصوص التي سيتم وضعها داخل HTML
 */
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
   14. PAGE UTILITIES
   ========================================================= */

/**
 * إضافة class لعنصر
 */
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


/**
 * إزالة class
 */
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


/**
 * معرفة هل العنصر موجود
 */
function exists(selector) {

    return Boolean(
        document.querySelector(
            selector
        )
    );
}


/* =========================================================
   15. DEVICE
   ========================================================= */

function isMobile() {

    return window.matchMedia(
        "(max-width: 639px)"
    ).matches;
}


/* =========================================================
   16. GLOBAL INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setCurrentYear();

        setActiveNav();

    }
);
