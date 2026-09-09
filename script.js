/* =========================================================
   EduNova AI — Global Platform Script
   Clean Unified Version
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL SETTINGS
   ========================================================= */

const GLOBAL_THEME_KEY = "site_theme";
const GLOBAL_LANGUAGE_KEY = "site_language";

const DEFAULT_THEME = "light";
const DEFAULT_LANGUAGE = "ar";

/* =========================================================
   PLATFORM STORAGE KEYS
   ========================================================= */

const PLATFORM_KEYS = {
    studentLevel: "student_level",
    bacBranch: "bac_branch",

    selectedSubject: "selected_subject",
    selectedSubjectType: "selected_subject_type",
    selectedChapter: "selected_chapter",
    selectedVideo: "selected_video",

    learningProgress: "learning_progress",
    lastLearningPosition: "last_learning_position",

    studentPoints: "student_points",
    completedLessons: "completed_lessons",

    platformSettings: "platform_settings"
};

/* =========================================================
   PLATFORM LIMITS
   ========================================================= */

const PLATFORM_LIMITS = {
    maxVideosPerChapter: 20,
    firstFreeVideoNumber: 1,
    minimumVideoNumber: 1
};

/* =========================================================
   EDUCATION STRUCTURE
   =========================================================
   Canonical levels:
   - concours
   - brevet
   - bac + branch C/D
   ========================================================= */

const EDU_STRUCTURE = {

    concours: {
        id: "concours",
        type: "certificate",
        titleKey: "level_concours",
        subtitleKey: "level_concours_subtitle",

        subjects: [
            {
                id: "mathematics",
                titleKey: "subject_mathematics",
                icon: "∑"
            },
            {
                id: "arabic",
                titleKey: "subject_arabic",
                icon: "ع"
            },
            {
                id: "french",
                titleKey: "subject_french",
                icon: "Fr"
            },
            {
                id: "natural_sciences",
                titleKey: "subject_natural_sciences",
                icon: "⌬"
            }
        ]
    },

    brevet: {
        id: "brevet",
        type: "certificate",
        titleKey: "level_brevet",
        subtitleKey: "level_brevet_subtitle",

        subjects: [
            {
                id: "mathematics",
                titleKey: "subject_mathematics",
                icon: "∑"
            },
            {
                id: "physics_chemistry",
                titleKey: "subject_physics_chemistry",
                icon: "⚛"
            },
            {
                id: "natural_sciences",
                titleKey: "subject_natural_sciences",
                icon: "⌬"
            }
        ]
    },

    bac: {
        id: "bac",
        type: "baccalaureate",
        titleKey: "level_bac",
        subtitleKey: "level_bac_subtitle",

        branches: {

            C: {
                id: "C",
                titleKey: "bac_branch_c",

                subjects: [
                    {
                        id: "mathematics_c",
                        titleKey: "subject_mathematics",
                        icon: "∑"
                    },
                    {
                        id: "sciences",
                        titleKey: "subject_sciences",
                        icon: "⌬"
                    },
                    {
                        id: "physics",
                        titleKey: "subject_physics",
                        icon: "⚛"
                    },
                    {
                        id: "chemistry",
                        titleKey: "subject_chemistry",
                        icon: "◇"
                    }
                ]
            },

            D: {
                id: "D",
                titleKey: "bac_branch_d",

                subjects: [
                    {
                        id: "natural_sciences",
                        titleKey: "subject_natural_sciences",
                        icon: "⌬"
                    },
                    {
                        id: "mathematics_d",
                        titleKey: "subject_mathematics",
                        icon: "∑"
                    },
                    {
                        id: "physics",
                        titleKey: "subject_physics",
                        icon: "⚛"
                    },
                    {
                        id: "chemistry",
                        titleKey: "subject_chemistry",
                        icon: "◇"
                    }
                ]
            }
        }
    }
};

/* =========================================================
   TRANSLATIONS
   ========================================================= */

const GLOBAL_TRANSLATIONS = {

    ar: {

        nav_home: "الرئيسية",
        nav_notifications: "الإشعارات",
        nav_account: "حسابي",
        nav_settings: "الإعدادات",

        level_concours: "كونكور",
        level_concours_subtitle: "مسابقة دخول السنة الأولى الإعدادية",

        level_brevet: "بريفيه",
        level_brevet_subtitle: "شهادة ختم الدروس الإعدادية",

        level_bac: "البكالوريا",
        level_bac_subtitle: "المرحلة الثانوية",

        bac_branch_c: "شعبة C",
        bac_branch_d: "شعبة D",

        subject_mathematics: "الرياضيات",
        subject_arabic: "العربية",
        subject_french: "الفرنسية",
        subject_natural_sciences: "العلوم الطبيعية",
        subject_physics_chemistry: "الفيزياء والكيمياء",
        subject_sciences: "العلوم",
        subject_physics: "الفيزياء",
        subject_chemistry: "الكيمياء",

        free: "مجاني",
        locked: "مقفل",
        completed: "مكتمل",
        demo: "تجريبي",

        demo_chapter_1: "الفصل التجريبي 1",
        demo_chapter_2: "الفصل التجريبي 2",
        demo_chapter_3: "الفصل التجريبي 3",
        demo_chapter_4: "الفصل التجريبي 4",
        demo_chapter_5: "الفصل التجريبي 5",

        demo_video_1: "الفيديو التجريبي 1",
        demo_video_2: "الفيديو التجريبي 2",
        demo_video_3: "الفيديو التجريبي 3",
        demo_video_4: "الفيديو التجريبي 4",
        demo_video_5: "الفيديو التجريبي 5",
        demo_video_6: "الفيديو التجريبي 6",
        demo_video_7: "الفيديو التجريبي 7",
        demo_video_8: "الفيديو التجريبي 8",
        demo_video_9: "الفيديو التجريبي 9",
        demo_video_10: "الفيديو التجريبي 10",

        notification_title: "الإشعارات",
        no_notifications: "لا توجد إشعارات جديدة حاليًا.",

        video_locked_title: "هذا الفيديو مقفل",
        video_locked_message:
            "اشترك للوصول إلى هذا الفيديو والمحتوى الكامل.",

        video_unavailable_title: "الفيديو غير متوفر",
        video_unavailable_message:
            "لم تتم إضافة رابط الفيديو الحقيقي بعد.",

        data_saved: "تم الحفظ بنجاح",
        error_generic: "حدث خطأ. حاول مرة أخرى."
    },

    fr: {

        nav_home: "Accueil",
        nav_notifications: "Notifications",
        nav_account: "Mon compte",
        nav_settings: "Paramètres",

        level_concours: "Concours",
        level_concours_subtitle:
            "Concours d'entrée en première année du collège",

        level_brevet: "Brevet",
        level_brevet_subtitle:
            "Certificat de fin des études collégiales",

        level_bac: "Baccalauréat",
        level_bac_subtitle:
            "Enseignement secondaire",

        bac_branch_c: "Série C",
        bac_branch_d: "Série D",

        subject_mathematics: "Mathématiques",
        subject_arabic: "Arabe",
        subject_french: "Français",
        subject_natural_sciences: "Sciences naturelles",
        subject_physics_chemistry: "Physique-Chimie",
        subject_sciences: "Sciences",
        subject_physics: "Physique",
        subject_chemistry: "Chimie",

        free: "Gratuit",
        locked: "Verrouillé",
        completed: "Terminé",
        demo: "Démo",

        demo_chapter_1: "Chapitre démo 1",
        demo_chapter_2: "Chapitre démo 2",
        demo_chapter_3: "Chapitre démo 3",
        demo_chapter_4: "Chapitre démo 4",
        demo_chapter_5: "Chapitre démo 5",

        demo_video_1: "Vidéo démo 1",
        demo_video_2: "Vidéo démo 2",
        demo_video_3: "Vidéo démo 3",
        demo_video_4: "Vidéo démo 4",
        demo_video_5: "Vidéo démo 5",
        demo_video_6: "Vidéo démo 6",
        demo_video_7: "Vidéo démo 7",
        demo_video_8: "Vidéo démo 8",
        demo_video_9: "Vidéo démo 9",
        demo_video_10: "Vidéo démo 10",

        notification_title: "Notifications",
        no_notifications: "Aucune nouvelle notification.",

        video_locked_title: "Cette vidéo est verrouillée",
        video_locked_message:
            "Abonnez-vous pour accéder à cette vidéo et au contenu complet.",

        video_unavailable_title: "Vidéo indisponible",
        video_unavailable_message:
            "Le véritable lien vidéo n'a pas encore été ajouté.",

        data_saved: "Enregistré avec succès",
        error_generic: "Une erreur est survenue."
    }
};

/* =========================================================
   LOCAL STORAGE HELPERS
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
            "EduNova saveData error:",
            error
        );

        return false;
    }
}


function getData(key, fallback = null) {

    try {

        const raw =
            localStorage.getItem(key);

        if (raw === null) {
            return fallback;
        }

        return JSON.parse(raw);

    } catch (error) {

        console.error(
            "EduNova getData error:",
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
            "EduNova removeData error:",
            error
        );

        return false;
    }
}

/* =========================================================
   LANGUAGE
   ========================================================= */

function normalizeLanguage(language) {

    return String(language || "")
        .toLowerCase()
        .startsWith("fr")
        ? "fr"
        : "ar";
}


function getSiteLanguage() {

    const stored =
        localStorage.getItem(
            GLOBAL_LANGUAGE_KEY
        );

    return normalizeLanguage(
        stored || DEFAULT_LANGUAGE
    );
}


function setSiteLanguage(language) {

    const safeLanguage =
        normalizeLanguage(language);

    localStorage.setItem(
        GLOBAL_LANGUAGE_KEY,
        safeLanguage
    );

    if (typeof document !== "undefined") {

        document.documentElement.lang =
            safeLanguage;

        document.documentElement.dir =
            safeLanguage === "fr"
                ? "ltr"
                : "rtl";
    }

    applyTranslations(
        safeLanguage
    );

    window.dispatchEvent(
        new CustomEvent(
            "languageChanged",
            {
                detail: {
                    language:
                        safeLanguage
                }
            }
        )
    );

    window.dispatchEvent(
        new CustomEvent(
            "eduNovaLanguageChanged",
            {
                detail: {
                    language:
                        safeLanguage
                }
            }
        )
    );

    return safeLanguage;
}


function translateText(
    key,
    language = getSiteLanguage()
) {

    const lang =
        normalizeLanguage(language);

    return (
        GLOBAL_TRANSLATIONS[lang]?.[key] ??
        GLOBAL_TRANSLATIONS.ar?.[key] ??
        String(key || "")
    );
}


function applyTranslations(
    language = getSiteLanguage()
) {

    if (
        typeof document === "undefined"
    ) {
        return;
    }

    const lang =
        normalizeLanguage(language);

    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-i18n"
                );

            if (!key) {
                return;
            }

            element.textContent =
                translateText(
                    key,
                    lang
                );
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

            element.placeholder =
                translateText(
                    key,
                    lang
                );
        });
}

/* =========================================================
   THEME
   ========================================================= */

function getSiteTheme() {

    const stored =
        localStorage.getItem(
            GLOBAL_THEME_KEY
        );

    return stored === "dark"
        ? "dark"
        : "light";
}


function setSiteTheme(theme) {

    const safeTheme =
        theme === "dark"
            ? "dark"
            : "light";

    localStorage.setItem(
        GLOBAL_THEME_KEY,
        safeTheme
    );

    applyTheme(
        safeTheme
    );

    window.dispatchEvent(
        new CustomEvent(
            "themeChanged",
            {
                detail: {
                    theme:
                        safeTheme
                }
            }
        )
    );

    return safeTheme;
}


function applyTheme(
    theme = getSiteTheme()
) {

    if (
        typeof document === "undefined"
    ) {
        return;
    }

    const safeTheme =
        theme === "dark"
            ? "dark"
            : "light";

    document.documentElement.dataset.theme =
        safeTheme;

    document.documentElement.classList.toggle(
        "dark-mode",
        safeTheme === "dark"
    );

    if (document.body) {

        document.body.classList.toggle(
            "dark-mode",
            safeTheme === "dark"
        );
    }
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function goTo(page) {

    if (!page) {
        return false;
    }

    const target =
        String(page).trim();

    if (!target) {
        return false;
    }

    window.location.href =
        target;

    return true;
}


function goHome() {
    return goTo("index.html");
}


function goBack(
    fallback = "index.html"
) {

    if (
        window.history.length > 1
    ) {

        window.history.back();

        return true;
    }

    return goTo(
        fallback
    );
}


function goChapter() {

    return goTo(
        "chapter.html"
    );
}


function goLibrary() {

    return goTo(
        "library.html"
    );
}


function goForum() {

    return goTo(
        "forum.html"
    );
}


function goSubscriptions() {

    return goTo(
        "subscriptions.html"
    );
}


function goAccount() {

    return goTo(
        "account.html"
    );
}


function goSettings() {

    return goTo(
        "settings.html"
    );
}

/* =========================================================
   STUDENT LEVEL
   ========================================================= */

function normalizeStudentLevel(level) {

    const value =
        String(level || "")
            .trim()
            .toLowerCase();

    if (
        value === "bac_c" ||
        value === "bac-c"
    ) {
        return "bac";
    }

    if (
        value === "bac_d" ||
        value === "bac-d"
    ) {
        return "bac";
    }

    return value;
}


function getLegacyBacBranchFromLevel(
    level
) {

    const value =
        String(level || "")
            .trim()
            .toLowerCase();

    if (
        value === "bac_c" ||
        value === "bac-c"
    ) {
        return "C";
    }

    if (
        value === "bac_d" ||
        value === "bac-d"
    ) {
        return "D";
    }

    return "";
}


function getStudentLevel() {

    const raw =
        getData(
            PLATFORM_KEYS.studentLevel,
            ""
        );

    const normalized =
        normalizeStudentLevel(
            raw
        );

    const inferredBranch =
        getLegacyBacBranchFromLevel(
            raw
        );

    if (
        normalized !== raw &&
        normalized === "bac"
    ) {

        saveData(
            PLATFORM_KEYS.studentLevel,
            normalized
        );

        if (
            inferredBranch &&
            !getBacBranch()
        ) {

            saveData(
                PLATFORM_KEYS.bacBranch,
                inferredBranch
            );
        }
    }

    return normalized;
}


function setStudentLevel(level) {

    const raw =
        String(level || "")
            .trim();

    const normalized =
        normalizeStudentLevel(
            raw
        );

    if (
        !isValidLevel(
            normalized
        )
    ) {
        return false;
    }

    const inferredBranch =
        getLegacyBacBranchFromLevel(
            raw
        );

    saveData(
        PLATFORM_KEYS.studentLevel,
        normalized
    );

    if (
        normalized !== "bac"
    ) {

        removeData(
            PLATFORM_KEYS.bacBranch
        );
    }

    clearSelectedLearningAfterLevelChange();

    if (
        normalized === "bac" &&
        inferredBranch
    ) {

        saveData(
            PLATFORM_KEYS.bacBranch,
            inferredBranch
        );
    }

    window.dispatchEvent(
        new CustomEvent(
            "studentLevelChanged",
            {
                detail: {
                    level:
                        normalized,

                    rawLevel:
                        raw,

                    bacBranch:
                        inferredBranch ||
                        getBacBranch() ||
                        ""
                }
            }
        )
    );

    return true;
}

/* =========================================================
   BAC BRANCH
   ========================================================= */

function getBacBranch() {

    const value =
        getData(
            PLATFORM_KEYS.bacBranch,
            ""
        );

    const branch =
        String(value || "")
            .trim()
            .toUpperCase();

    return isValidBacBranch(
        branch
    )
        ? branch
        : "";
}


function setBacBranch(branch) {

    const safeBranch =
        String(branch || "")
            .trim()
            .toUpperCase();

    if (
        !isValidBacBranch(
            safeBranch
        )
    ) {
        return false;
    }

    saveData(
        PLATFORM_KEYS.bacBranch,
        safeBranch
    );

    clearSelectedLearningAfterBranchChange();

    window.dispatchEvent(
        new CustomEvent(
            "bacBranchChanged",
            {
                detail: {
                    branch:
                        safeBranch
                }
            }
        )
    );

    return true;
}


function requiresBacBranch(
    level = getStudentLevel()
) {

    return (
        normalizeStudentLevel(
            level
        ) === "bac"
    );
}

/* =========================================================
   EDUCATION VALIDATION
   ========================================================= */

function isValidLevel(level) {

    return [
        "concours",
        "brevet",
        "bac"
    ].includes(
        normalizeStudentLevel(
            level
        )
    );
}


function isValidBacBranch(branch) {

    return [
        "C",
        "D"
    ].includes(
        String(branch || "")
            .trim()
            .toUpperCase()
    );
}


function getLevelDefinition(
    level = getStudentLevel()
) {

    const safeLevel =
        normalizeStudentLevel(
            level
        );

    return isValidLevel(
        safeLevel
    )
        ? EDU_STRUCTURE[
            safeLevel
        ]
        : null;
}


function getBacBranchDefinition(
    branch = getBacBranch()
) {

    const safeBranch =
        String(branch || "")
            .trim()
            .toUpperCase();

    if (
        !isValidBacBranch(
            safeBranch
        )
    ) {
        return null;
    }

    return (
        EDU_STRUCTURE
            .bac
            .branches[
                safeBranch
            ] || null
    );
}

/* =========================================================
   SUBJECT HELPERS
   ========================================================= */

function getAvailableSubjects(
    level = getStudentLevel(),
    branch = getBacBranch()
) {

    const safeLevel =
        normalizeStudentLevel(
            level
        );

    if (
        !isValidLevel(
            safeLevel
        )
    ) {
        return [];
    }

    if (
        safeLevel === "bac"
    ) {

        const safeBranch =
            String(branch || "")
                .trim()
                .toUpperCase();

        if (
            !isValidBacBranch(
                safeBranch
            )
        ) {
            return [];
        }

        return (
            EDU_STRUCTURE
                .bac
                .branches[
                    safeBranch
                ]?.subjects || []
        );
    }

    return (
        EDU_STRUCTURE[
            safeLevel
        ]?.subjects || []
    );
}


function getSubjectDefinition(
    subjectId,
    level = getStudentLevel(),
    branch = getBacBranch()
) {

    if (!subjectId) {
        return null;
    }

    const subjects =
        getAvailableSubjects(
            level,
            branch
        );

    return (
        subjects.find(
            subject =>
                String(subject.id) ===
                String(subjectId)
        ) || null
    );
}


function isValidSubject(
    subjectId,
    level = getStudentLevel(),
    branch = getBacBranch()
) {

    return Boolean(
        getSubjectDefinition(
            subjectId,
            level,
            branch
        )
    );
}

/* =========================================================
   DEMO CURRICULUM
   ========================================================= */

const DEMO_VIDEO_COUNTS = [
    8,
    6,
    10,
    7,
    9
];

const DEMO_VIDEO_DURATIONS = [
    "08:32",
    "11:45",
    "14:20",
    "09:18",
    "12:06",
    "16:40",
    "10:25",
    "13:15",
    "07:54",
    "15:22"
];


function createDemoVideos(
    subjectId,
    chapterNumber,
    count
) {

    const safeCount =
        Math.min(
            Math.max(
                Number(count) || 1,
                1
            ),
            PLATFORM_LIMITS
                .maxVideosPerChapter - 1
        );

    const videos = [];

    for (
        let index = 0;
        index < safeCount;
        index++
    ) {

        const number =
            index + 1;

        const duration =
            DEMO_VIDEO_DURATIONS[
                (
                    index +
                    chapterNumber +
                    String(
                        subjectId || ""
                    ).length
                ) %
                DEMO_VIDEO_DURATIONS.length
            ];

        videos.push({

            id:
                `${subjectId}-chapter-${chapterNumber}-video-${number}`,

            number,

            title: {
                ar:
                    `الفيديو التجريبي ${number}`,
                fr:
                    `Vidéo démo ${number}`
            },

            titleKey:
                `demo_video_${number}`,

            description: {
                ar:
                    `شرح تجريبي للفصل ${chapterNumber} — الفيديو ${number}.`,
                fr:
                    `Démonstration du chapitre ${chapterNumber} — vidéo ${number}.`
            },

            duration,

            videoUrl: "",

            isDemo: true,

            free:
                number ===
                PLATFORM_LIMITS
                    .firstFreeVideoNumber,

            locked:
                number >
                PLATFORM_LIMITS
                    .firstFreeVideoNumber
        });
    }

    return videos;
}


function createDemoChapters(
    subjectId
) {

    return Array.from(
        {
            length: 5
        },
        (_, index) => {

            const number =
                index + 1;

            return {

                id:
                    `${subjectId}-chapter-${number}`,

                number,

                title: {
                    ar:
                        `الفصل التجريبي ${number}`,
                    fr:
                        `Chapitre démo ${number}`
                },

                titleKey:
                    `demo_chapter_${number}`,

                description: {
                    ar:
                        `محتوى تجريبي للفصل ${number} سيتم استبداله بالمحتوى الدراسي الحقيقي لاحقًا.`,
                    fr:
                        `Contenu de démonstration du chapitre ${number}, remplacé plus tard par le contenu réel.`
                },

                videos:
                    createDemoVideos(
                        subjectId,
                        number,
                        DEMO_VIDEO_COUNTS[
                            index
                        ]
                    )
            };
        }
    );
}


function createDemoSubject(
    subject
) {

    return {

        id:
            subject.id,

        name: {
            ar:
                translateText(
                    subject.titleKey,
                    "ar"
                ),

            fr:
                translateText(
                    subject.titleKey,
                    "fr"
                )
        },

        title: {
            ar:
                translateText(
                    subject.titleKey,
                    "ar"
                ),

            fr:
                translateText(
                    subject.titleKey,
                    "fr"
                )
        },

        subjectType:
            subject.id,

        icon:
            subject.icon,

        chapters:
            createDemoChapters(
                subject.id
            )
    };
}

/* =========================================================
   CENTRAL CURRICULUM DATA
   ========================================================= */

const CURRICULUM_DATA = {

    concours: {},
    brevet: {},

    bac: {
        C: {},
        D: {}
    }
};


function buildCurriculum() {

    Object.keys(
        EDU_STRUCTURE
    ).forEach(level => {

        const definition =
            EDU_STRUCTURE[
                level
            ];

        if (!definition) {
            return;
        }

        if (
            level === "bac"
        ) {

            Object.keys(
                definition.branches || {}
            ).forEach(branch => {

                const subjects =
                    definition
                        .branches[
                            branch
                        ]?.subjects || [];

                subjects.forEach(
                    subject => {

                        CURRICULUM_DATA
                            .bac[
                                branch
                            ][
                                subject.id
                            ] =
                            createDemoSubject(
                                subject
                            );
                    }
                );
            });

            return;
        }

        const subjects =
            definition.subjects || [];

        subjects.forEach(
            subject => {

                CURRICULUM_DATA[
                    level
                ][
                    subject.id
                ] =
                    createDemoSubject(
                        subject
                    );
            }
        );
    });

    /*
       Compatibility aliases for older pages.
       They do NOT replace the canonical bac structure.
    */

    CURRICULUM_DATA.bac_c =
        CURRICULUM_DATA.bac.C;

    CURRICULUM_DATA.bac_d =
        CURRICULUM_DATA.bac.D;

    return CURRICULUM_DATA;
}


buildCurriculum();

/* =========================================================
   CURRICULUM ACCESS
   ========================================================= */

function getCurriculumForLevel(
    level = getStudentLevel(),
    branch = getBacBranch()
) {

    const safeLevel =
        normalizeStudentLevel(
            level
        );

    if (
        safeLevel === "bac"
    ) {

        const safeBranch =
            String(branch || "")
                .trim()
                .toUpperCase();

        if (
            !isValidBacBranch(
                safeBranch
            )
        ) {
            return {};
        }

        return (
            CURRICULUM_DATA
                .bac[
                    safeBranch
                ] || {}
        );
    }

    return (
        CURRICULUM_DATA[
            safeLevel
        ] || {}
    );
}


function getSubjectsForLevel(
    level = getStudentLevel(),
    branch = getBacBranch()
) {

    return Object.values(
        getCurriculumForLevel(
            level,
            branch
        )
    );
}


function getSubjectData(
    level,
    subjectId,
    branch = getBacBranch()
) {

    if (!subjectId) {
        return null;
    }

    return (
        getCurriculumForLevel(
            level,
            branch
        )[
            subjectId
        ] || null
    );
}


function getChaptersForSubject(
    level,
    subjectId,
    branch = getBacBranch()
) {

    const subject =
        getSubjectData(
            level,
            subjectId,
            branch
        );

    return (
        subject &&
        Array.isArray(
            subject.chapters
        )
            ? subject.chapters
            : []
    );
}


function getChapterData(
    level,
    subjectId,
    chapterId,
    branch = getBacBranch()
) {

    const chapters =
        getChaptersForSubject(
            level,
            subjectId,
            branch
        );

    return (
        chapters.find(
            chapter =>
                String(
                    chapter.id
                ) ===
                String(
                    chapterId
                )
        ) || null
    );
}


function getVideosForChapter(
    level,
    subjectId,
    chapterId,
    branch = getBacBranch()
) {

    const chapter =
        getChapterData(
            level,
            subjectId,
            chapterId,
            branch
        );

    return (
        chapter &&
        Array.isArray(
            chapter.videos
        )
            ? chapter.videos
            : []
    );
}


function getVideoData(
    level,
    subjectId,
    chapterId,
    videoId,
    branch = getBacBranch()
) {

    const videos =
        getVideosForChapter(
            level,
            subjectId,
            chapterId,
            branch
        );

    return (
        videos.find(
            video =>
                String(
                    video.id
                ) ===
                String(
                    videoId
                ) ||
                String(
                    video.number
                ) ===
                String(
                    videoId
                )
        ) || null
    );
}

/* =========================================================
   CURRICULUM COUNTS
   ========================================================= */

function getChapterCount(
    level,
    subjectId,
    branch = getBacBranch()
) {

    return getChaptersForSubject(
        level,
        subjectId,
        branch
    ).length;
}


function getVideoCount(
    level,
    subjectId,
    chapterId,
    branch = getBacBranch()
) {

    return getVideosForChapter(
        level,
        subjectId,
        chapterId,
        branch
    ).length;
}


function getCurriculumSummary(
    level = getStudentLevel(),
    branch = getBacBranch()
) {

    const subjects =
        getSubjectsForLevel(
            level,
            branch
        );

    let chapters = 0;
    let videos = 0;

    subjects.forEach(
        subject => {

            const subjectChapters =
                Array.isArray(
                    subject.chapters
                )
                    ? subject.chapters
                    : [];

            chapters +=
                subjectChapters.length;

            subjectChapters.forEach(
                chapter => {

                    if (
                        Array.isArray(
                            chapter.videos
                        )
                    ) {

                        videos +=
                            chapter.videos.length;
                    }
                }
            );
        }
    );

    return {
        subjects:
            subjects.length,

        chapters,

        videos
    };
}

/* =========================================================
   SELECTION STATE
   ========================================================= */

function getSelectedSubject() {

    return getData(
        PLATFORM_KEYS.selectedSubject,
        ""
    );
}


function setSelectedSubject(
    subjectId,
    subjectType = ""
) {

    const level =
        getStudentLevel();

    const branch =
        getBacBranch();

    if (
        !isValidSubject(
            subjectId,
            level,
            branch
        )
    ) {
        return false;
    }

    saveData(
        PLATFORM_KEYS.selectedSubject,
        String(subjectId)
    );

    if (subjectType) {

        saveData(
            PLATFORM_KEYS.selectedSubjectType,
            String(subjectType)
        );

    } else {

        removeData(
            PLATFORM_KEYS.selectedSubjectType
        );
    }

    removeData(
        PLATFORM_KEYS.selectedChapter
    );

    removeData(
        PLATFORM_KEYS.selectedVideo
    );

    window.dispatchEvent(
        new CustomEvent(
            "subjectChanged",
            {
                detail: {
                    subject:
                        String(subjectId),

                    subjectType:
                        String(
                            subjectType || ""
                        )
                }
            }
        )
    );

    return true;
}


function saveSelectedSubject(
    subjectId,
    subjectType = ""
) {

    return setSelectedSubject(
        subjectId,
        subjectType
    );
}


function getSelectedSubjectType() {

    return getData(
        PLATFORM_KEYS.selectedSubjectType,
        ""
    );
}


function clearSelectedSubject() {

    removeData(
        PLATFORM_KEYS.selectedSubject
    );

    removeData(
        PLATFORM_KEYS.selectedSubjectType
    );

    removeData(
        PLATFORM_KEYS.selectedChapter
    );

    removeData(
        PLATFORM_KEYS.selectedVideo
    );

    return true;
}


function getSelectedChapter() {

    return getData(
        PLATFORM_KEYS.selectedChapter,
        ""
    );
}


function setSelectedChapter(
    chapterId
) {

    if (
        chapterId === null ||
        chapterId === undefined ||
        chapterId === ""
    ) {
        return false;
    }

    saveData(
        PLATFORM_KEYS.selectedChapter,
        String(chapterId)
    );

    removeData(
        PLATFORM_KEYS.selectedVideo
    );

    window.dispatchEvent(
        new CustomEvent(
            "chapterChanged",
            {
                detail: {
                    chapter:
                        String(chapterId)
                }
            }
        )
    );

    return true;
}


function saveSelectedChapter(
    chapterId
) {

    return setSelectedChapter(
        chapterId
    );
}


function clearSelectedChapter() {

    removeData(
        PLATFORM_KEYS.selectedChapter
    );

    removeData(
        PLATFORM_KEYS.selectedVideo
    );

    return true;
}


function getSelectedVideo() {

    return getData(
        PLATFORM_KEYS.selectedVideo,
        ""
    );
}


function setSelectedVideo(
    videoId
) {

    if (
        videoId === null ||
        videoId === undefined ||
        videoId === ""
    ) {
        return false;
    }

    saveData(
        PLATFORM_KEYS.selectedVideo,
        String(videoId)
    );

    saveLastLearningPosition({

        level:
            getStudentLevel(),

        branch:
            getBacBranch(),

        subject:
            getSelectedSubject(),

        chapter:
            getSelectedChapter(),

        video:
            String(videoId)
    });

    window.dispatchEvent(
        new CustomEvent(
            "videoChanged",
            {
                detail: {
                    video:
                        String(videoId)
                }
            }
        )
    );

    return true;
}


function saveSelectedVideo(
    videoId
) {

    return setSelectedVideo(
        videoId
    );
}


function clearSelectedVideo() {

    removeData(
        PLATFORM_KEYS.selectedVideo
    );

    return true;
}


function getLearningSelection() {

    return {

        level:
            getStudentLevel(),

        branch:
            getBacBranch(),

        subject:
            getSelectedSubject(),

        subjectType:
            getSelectedSubjectType(),

        chapter:
            getSelectedChapter(),

        video:
            getSelectedVideo()
    };
}


function clearSelectedLearningAfterLevelChange() {

    removeData(
        PLATFORM_KEYS.selectedSubject
    );

    removeData(
        PLATFORM_KEYS.selectedSubjectType
    );

    removeData(
        PLATFORM_KEYS.selectedChapter
    );

    removeData(
        PLATFORM_KEYS.selectedVideo
    );

    return true;
}


function clearSelectedLearningAfterBranchChange() {

    removeData(
        PLATFORM_KEYS.selectedSubject
    );

    removeData(
        PLATFORM_KEYS.selectedSubjectType
    );

    removeData(
        PLATFORM_KEYS.selectedChapter
    );

    removeData(
        PLATFORM_KEYS.selectedVideo
    );

    return true;
}

/* =========================================================
   CURRENT LEARNING OBJECTS
   ========================================================= */

function getCurrentSubject() {

    return getSubjectData(
        getStudentLevel(),
        getSelectedSubject(),
        getBacBranch()
    );
}


function getCurrentChapter() {

    return getChapterData(
        getStudentLevel(),
        getSelectedSubject(),
        getSelectedChapter(),
        getBacBranch()
    );
}


function getCurrentVideo() {

    return getVideoData(
        getStudentLevel(),
        getSelectedSubject(),
        getSelectedChapter(),
        getSelectedVideo(),
        getBacBranch()
    );
}

/* =========================================================
   VIDEO NORMALIZATION / ACCESS
   ========================================================= */

function normalizeChapterVideos(
    videos
) {

    if (
        !Array.isArray(videos)
    ) {
        return [];
    }

    return videos
        .slice(
            0,
            PLATFORM_LIMITS
                .maxVideosPerChapter
        )
        .map(
            (
                video,
                index
            ) => {

                const parsedNumber =
                    Number(
                        video?.number
                    );

                const number =
                    Number.isFinite(
                        parsedNumber
                    ) &&
                    parsedNumber >=
                        PLATFORM_LIMITS
                            .minimumVideoNumber
                        ? parsedNumber
                        : index + 1;

                return {

                    ...video,

                    number,

                    free:
                        number ===
                        PLATFORM_LIMITS
                            .firstFreeVideoNumber,

                    locked:
                        number >
                        PLATFORM_LIMITS
                            .firstFreeVideoNumber
                };
            }
        );
}


function getChapterVideos(
    chapter
) {

    if (!chapter) {
        return [];
    }

    return normalizeChapterVideos(
        chapter.videos
    );
}


function isVideoFree(
    video
) {

    if (!video) {
        return false;
    }

    return (
        Number(video.number) ===
        PLATFORM_LIMITS
            .firstFreeVideoNumber
    );
}


function isVideoLocked(
    video
) {

    if (!video) {
        return true;
    }

    return !isVideoFree(
        video
    );
}


function canAccessVideo(
    video
) {

    /*
       MVP:
       Video 1 is free.
       Paid subscription connection will
       be added without changing curriculum.
    */

    return Boolean(
        video &&
        isVideoFree(video)
    );
}


function getVideoAccessState(
    video
) {

    if (!video) {
        return "unavailable";
    }

    return isVideoFree(video)
        ? "free"
        : "locked";
}

/* =========================================================
   NAVIGATION FOR LEARNING
   ========================================================= */

function openSubject(
    subjectId,
    subjectType = ""
) {

    if (
        !setSelectedSubject(
            subjectId,
            subjectType
        )
    ) {
        return false;
    }

    return goTo(
        "chapter.html"
    );
}


function openChapter(
    chapterId
) {

    if (
        !setSelectedChapter(
            chapterId
        )
    ) {
        return false;
    }

    return goTo(
        "video.html"
    );
}


function openVideo(
    videoId
) {

    const video =
        getVideoData(
            getStudentLevel(),
            getSelectedSubject(),
            getSelectedChapter(),
            videoId,
            getBacBranch()
        );

    if (!video) {
        return false;
    }

    if (
        isVideoLocked(video)
    ) {

        if (
            typeof window
                .showSubscriptionNotifications ===
            "function"
        ) {

            window.showSubscriptionNotifications();

        } else {

            showToast(
                translateText(
                    "video_locked_message"
                )
            );
        }

        return false;
    }

    setSelectedVideo(
        video.id
    );

    return goTo(
        "video.html"
    );
}

/* =========================================================
   LOCALIZED CONTENT HELPERS
   ========================================================= */

function getLocalizedValue(
    value,
    language = getSiteLanguage()
) {

    if (!value) {
        return "";
    }

    if (
        typeof value === "object" &&
        !Array.isArray(value)
    ) {

        return (
            value[language] ||
            value.ar ||
            value.fr ||
            Object.values(value)[0] ||
            ""
        );
    }

    return String(value);
}


function getChapterTitle(
    chapter,
    language = getSiteLanguage()
) {

    if (!chapter) {
        return "";
    }

    if (chapter.title) {

        return getLocalizedValue(
            chapter.title,
            language
        );
    }

    if (chapter.titleKey) {

        return translateText(
            chapter.titleKey,
            language
        );
    }

    return "";
}


function getVideoTitle(
    video,
    language = getSiteLanguage()
) {

    if (!video) {
        return "";
    }

    if (video.title) {

        return getLocalizedValue(
            video.title,
            language
        );
    }

    if (video.titleKey) {

        return translateText(
            video.titleKey,
            language
        );
    }

    return "";
}


function getVideoDuration(
    video
) {

    return video?.duration || "";
}


function getVideoUrl(
    video
) {

    return video?.videoUrl || "";
}

/* =========================================================
   PROGRESS
   ========================================================= */

function getLearningProgress() {

    const data =
        getData(
            PLATFORM_KEYS.learningProgress,
            {}
        );

    return (
        data &&
        typeof data === "object" &&
        !Array.isArray(data)
            ? data
            : {}
    );
}


function saveLearningProgress(
    progress
) {

    if (
        !progress ||
        typeof progress !== "object" ||
        Array.isArray(progress)
    ) {
        return false;
    }

    return saveData(
        PLATFORM_KEYS.learningProgress,
        progress
    );
}


function getVideoProgressKey(
    level,
    subjectId,
    chapterId,
    videoId
) {

    return [

        normalizeStudentLevel(
            level
        ),

        getBacBranch(),

        String(
            subjectId || ""
        ),

        String(
            chapterId || ""
        ),

        String(
            videoId || ""
        )

    ].join(":");
}


function isVideoCompleted(
    level,
    subjectId,
    chapterId,
    videoId
) {

    const progress =
        getLearningProgress();

    const key =
        getVideoProgressKey(
            level,
            subjectId,
            chapterId,
            videoId
        );

    const value =
        progress[key];

    if (
        typeof value === "object"
    ) {

        return Boolean(
            value.completed
        );
    }

    return Boolean(
        value
    );
}


function markVideoCompleted(
    level,
    subjectId,
    chapterId,
    videoId
) {

    const progress =
        getLearningProgress();

    const key =
        getVideoProgressKey(
            level,
            subjectId,
            chapterId,
            videoId
        );

    progress[key] = {

        completed:
            true,

        completedAt:
            new Date()
                .toISOString()
    };

    saveLearningProgress(
        progress
    );

    addStudentPoints(
        10
    );

    updateCompletedLessonsCount();

    window.dispatchEvent(
        new CustomEvent(
            "videoCompleted",
            {
                detail: {
                    level,
                    subjectId,
                    chapterId,
                    videoId
                }
            }
        )
    );

    return true;
}

/* =========================================================
   CHAPTER / SUBJECT PROGRESS
   ========================================================= */

function getChapterProgress(
    level,
    subjectId,
    chapterId,
    branch = getBacBranch()
) {

    const videos =
        getVideosForChapter(
            level,
            subjectId,
            chapterId,
            branch
        );

    if (!videos.length) {

        return {
            completed: 0,
            total: 0,
            percentage: 0
        };
    }

    const completed =
        videos.filter(
            video =>
                isVideoCompleted(
                    level,
                    subjectId,
                    chapterId,
                    video.id
                )
        ).length;

    return {

        completed,

        total:
            videos.length,

        percentage:
            Math.round(
                (
                    completed /
                    videos.length
                ) * 100
            )
    };
}


function getSubjectProgress(
    level,
    subjectId,
    branch = getBacBranch()
) {

    const chapters =
        getChaptersForSubject(
            level,
            subjectId,
            branch
        );

    let total = 0;
    let completed = 0;

    chapters.forEach(
        chapter => {

            const progress =
                getChapterProgress(
                    level,
                    subjectId,
                    chapter.id,
                    branch
                );

            total +=
                progress.total;

            completed +=
                progress.completed;
        }
    );

    return {

        completed,

        total,

        percentage:
            total > 0
                ? Math.round(
                    (
                        completed /
                        total
                    ) * 100
                )
                : 0
    };
}


function getLevelProgress(
    level = getStudentLevel(),
    branch = getBacBranch()
) {

    const subjects =
        getSubjectsForLevel(
            level,
            branch
        );

    let total = 0;
    let completed = 0;

    subjects.forEach(
        subject => {

            const progress =
                getSubjectProgress(
                    level,
                    subject.id,
                    branch
                );

            total +=
                progress.total;

            completed +=
                progress.completed;
        }
    );

    return {

        completed,

        total,

        percentage:
            total > 0
                ? Math.round(
                    (
                        completed /
                        total
                    ) * 100
                )
                : 0
    };
}

/* =========================================================
   LAST LEARNING POSITION
   ========================================================= */

function saveLastLearningPosition(
    position
) {

    if (!position) {
        return false;
    }

    return saveData(
        PLATFORM_KEYS.lastLearningPosition,
        position
    );
}


function getLastLearningPosition() {

    return getData(
        PLATFORM_KEYS.lastLearningPosition,
        null
    );
}

/* =========================================================
   STUDENT POINTS
   ========================================================= */

function getStudentPoints() {

    const value =
        Number(
            getData(
                PLATFORM_KEYS.studentPoints,
                0
            )
        );

    return Number.isFinite(value)
        ? value
        : 0;
}


function saveStudentPoints(
    points
) {

    const safePoints =
        Math.max(
            0,
            Number(points) || 0
        );

    return saveData(
        PLATFORM_KEYS.studentPoints,
        safePoints
    );
}


function addStudentPoints(
    points
) {

    const amount =
        Number(points) || 0;

    const current =
        getStudentPoints();

    const next =
        Math.max(
            0,
            current + amount
        );

    saveStudentPoints(
        next
    );

    window.dispatchEvent(
        new CustomEvent(
            "studentPointsChanged",
            {
                detail: {
                    points:
                        next
                }
            }
        )
    );

    return next;
}


function updateCompletedLessonsCount() {

    const progress =
        getLearningProgress();

    const count =
        Object.values(
            progress
        ).filter(
            value =>
                value &&
                typeof value === "object"
                    ? value.completed === true
                    : Boolean(value)
        ).length;

    saveData(
        PLATFORM_KEYS.completedLessons,
        count
    );

    return count;
}


function getCompletedLessonsCount() {

    return Number(
        getData(
            PLATFORM_KEYS.completedLessons,
            0
        )
    ) || 0;
}

/* =========================================================
   CURRICULUM VALIDATION
   ========================================================= */

function validateCurriculumStructure() {

    const report = {

        valid: true,

        levels: 0,

        subjects: 0,

        chapters: 0,

        videos: 0,

        errors: []
    };

    const levelEntries = [
        {
            level: "concours",
            branch: ""
        },
        {
            level: "brevet",
            branch: ""
        },
        {
            level: "bac",
            branch: "C"
        },
        {
            level: "bac",
            branch: "D"
        }
    ];

    levelEntries.forEach(
        entry => {

            report.levels += 1;

            const subjects =
                getSubjectsForLevel(
                    entry.level,
                    entry.branch
                );

            report.subjects +=
                subjects.length;

            subjects.forEach(
                subject => {

                    const chapters =
                        Array.isArray(
                            subject.chapters
                        )
                            ? subject.chapters
                            : [];

                    report.chapters +=
                        chapters.length;

                    chapters.forEach(
                        chapter => {

                            const videos =
                                Array.isArray(
                                    chapter.videos
                                )
                                    ? chapter.videos
                                    : [];

                            report.videos +=
                                videos.length;

                            if (
                                videos.length >=
                                PLATFORM_LIMITS
                                    .maxVideosPerChapter
                            ) {

                                report.valid =
                                    false;

                                report.errors.push(
                                    `Too many videos in ${chapter.id}`
                                );
                            }
                        }
                    );
                }
            );
        }
    );

    return report;
}

/* =========================================================
   HEADER HELPERS
   ========================================================= */

function getHeaderTranslations(
    language = getSiteLanguage()
) {

    const lang =
        normalizeLanguage(
            language
        );

    return {

        home:
            translateText(
                "nav_home",
                lang
            ),

        notifications:
            translateText(
                "nav_notifications",
                lang
            ),

        account:
            translateText(
                "nav_account",
                lang
            ),

        settings:
            translateText(
                "nav_settings",
                lang
            )
    };
}


function updateHeaderLanguage(
    language = getSiteLanguage()
) {

    if (
        typeof document === "undefined"
    ) {
        return;
    }

    const translations =
        getHeaderTranslations(
            language
        );

    const selectors = {

        home:
            '[data-i18n="nav_home"]',

        notifications:
            '[data-i18n="nav_notifications"]',

        account:
            '[data-i18n="nav_account"]',

        settings:
            '[data-i18n="nav_settings"]'
    };

    Object.keys(
        selectors
    ).forEach(
        key => {

            document
                .querySelectorAll(
                    selectors[key]
                )
                .forEach(
                    element => {

                        element.textContent =
                            translations[
                                key
                            ];
                    }
                );
        }
    );
}


function refreshHeaderTranslations() {

    applyTranslations(
        getSiteLanguage()
    );

    updateHeaderLanguage(
        getSiteLanguage()
    );
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function getPlatformNotifications() {

    const notifications =
        getData(
            "platform_notifications",
            []
        );

    return Array.isArray(
        notifications
    )
        ? notifications
        : [];
}


function savePlatformNotifications(
    notifications
) {

    return saveData(
        "platform_notifications",
        Array.isArray(
            notifications
        )
            ? notifications
            : []
    );
}


function addNotification(
    notification
) {

    if (!notification) {
        return false;
    }

    const list =
        getPlatformNotifications();

    list.unshift({

        id:
            notification.id ||
            `notification-${Date.now()}`,

        title:
            notification.title || "",

        message:
            notification.message || "",

        type:
            notification.type || "general",

        createdAt:
            notification.createdAt ||
            new Date()
                .toISOString(),

        read:
            Boolean(
                notification.read
            )
    });

    savePlatformNotifications(
        list.slice(0, 50)
    );

    window.dispatchEvent(
        new CustomEvent(
            "notificationsChanged"
        )
    );

    return true;
}


function markAllNotificationsRead() {

    const list =
        getPlatformNotifications();

    list.forEach(
        notification => {
            notification.read = true;
        }
    );

    savePlatformNotifications(
        list
    );

    return true;
}


function showNotifications() {

    const notifications =
        getPlatformNotifications();

    const unread =
        notifications.filter(
            notification =>
                !notification.read
        );

    let message =
        translateText(
            "no_notifications"
        );

    if (unread.length) {

        message =
            unread
                .map(
                    notification =>
                        notification.title
                            ? `${notification.title}: ${notification.message}`
                            : notification.message
                )
                .join("\n\n");

        markAllNotificationsRead();
    }

    if (
        typeof window.alert ===
        "function"
    ) {

        window.alert(
            message
        );
    }

    return notifications;
}


function showSubscriptionNotifications() {

    const language =
        getSiteLanguage();

    const message =
        language === "fr"
            ? "Abonnez-vous pour accéder au contenu verrouillé."
            : "اشترك للوصول إلى المحتوى المقفل.";

    if (
        typeof window.alert ===
        "function"
    ) {

        window.alert(
            message
        );
    }

    return message;
}

/* =========================================================
   TOAST
   ========================================================= */

function showToast(
    message,
    duration = 2500
) {

    if (
        typeof document === "undefined"
    ) {
        return;
    }

    let toast =
        document.getElementById(
            "eduNovaToast"
        );

    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "eduNovaToast";

        toast.style.position =
            "fixed";

        toast.style.bottom =
            "24px";

        toast.style.left =
            "50%";

        toast.style.transform =
            "translateX(-50%)";

        toast.style.zIndex =
            "99999";

        toast.style.padding =
            "12px 18px";

        toast.style.borderRadius =
            "14px";

        toast.style.background =
            "rgba(20,20,20,.92)";

        toast.style.color =
            "#fff";

        toast.style.fontSize =
            "14px";

        toast.style.maxWidth =
            "90%";

        toast.style.textAlign =
            "center";

        document.body.appendChild(
            toast
        );
    }

    toast.textContent =
        String(
            message || ""
        );

    toast.style.display =
        "block";

    clearTimeout(
        toast.__timer
    );

    toast.__timer =
        setTimeout(
            () => {

                toast.style.display =
                    "none";

            },
            duration
        );
}

/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function updateActiveNavigation() {

    if (
        typeof document === "undefined"
    ) {
        return;
    }

    const current =
        window.location.pathname
            .split("/")
            .pop() ||
        "index.html";

    document
        .querySelectorAll(
            ".header-action[href]"
        )
        .forEach(
            link => {

                const href =
                    link.getAttribute(
                        "href"
                    );

                link.classList.toggle(
                    "active",
                    href === current
                );
            }
        );
}

/* =========================================================
   SAFE SETTINGS HELPERS
   ========================================================= */

function getPlatformSettings() {

    return getData(
        PLATFORM_KEYS.platformSettings,
        {}
    );
}


function savePlatformSettings(
    settings
) {

    return saveData(
        PLATFORM_KEYS.platformSettings,
        settings || {}
    );
}


function updatePlatformSetting(
    key,
    value
) {

    const settings =
        getPlatformSettings();

    settings[key] =
        value;

    savePlatformSettings(
        settings
    );

    window.dispatchEvent(
        new CustomEvent(
            "platformSettingsChanged",
            {
                detail: {
                    key,
                    value
                }
            }
        )
    );

    return true;
}

/* =========================================================
   GLOBAL INITIALIZATION
   ========================================================= */

function initializeEduNovaGlobal() {

    if (
        typeof document === "undefined"
    ) {
        return;
    }

    const language =
        getSiteLanguage();

    const theme =
        getSiteTheme();

    document.documentElement.lang =
        language;

    document.documentElement.dir =
        language === "fr"
            ? "ltr"
            : "rtl";

    applyTheme(
        theme
    );

    applyTranslations(
        language
    );

    updateHeaderLanguage(
        language
    );

    updateActiveNavigation();
}


/* =========================================================
   CROSS-TAB SYNCHRONIZATION
   ========================================================= */

function initializeStorageSync() {

    if (
        typeof window === "undefined"
    ) {
        return;
    }

    window.addEventListener(
        "storage",
        event => {

            if (
                event.key ===
                GLOBAL_LANGUAGE_KEY
            ) {

                initializeEduNovaGlobal();

                window.dispatchEvent(
                    new CustomEvent(
                        "languageChanged",
                        {
                            detail: {
                                language:
                                    getSiteLanguage()
                            }
                        }
                    )
                );
            }

            if (
                event.key ===
                GLOBAL_THEME_KEY
            ) {

                applyTheme(
                    getSiteTheme()
                );

                window.dispatchEvent(
                    new CustomEvent(
                        "themeChanged",
                        {
                            detail: {
                                theme:
                                    getSiteTheme()
                            }
                        }
                    )
                );
            }

            if (
                event.key ===
                PLATFORM_KEYS.learningProgress
            ) {

                window.dispatchEvent(
                    new CustomEvent(
                        "learningProgressChanged"
                    )
                );
            }

            if (
                event.key ===
                "edunova_subscription"
            ) {

                window.dispatchEvent(
                    new CustomEvent(
                        "subscriptionChanged"
                    )
                );
            }

            if (
                event.key ===
                "platform_notifications"
            ) {

                window.dispatchEvent(
                    new CustomEvent(
                        "notificationsChanged"
                    )
                );
            }
        }
    );
}

/* =========================================================
   GLOBAL EVENT BRIDGE
   ========================================================= */

function initializeGlobalEventBridge() {

    if (
        typeof window === "undefined"
    ) {
        return;
    }

    window.addEventListener(
        "languageChanged",
        event => {

            const language =
                event.detail?.language ||
                getSiteLanguage();

            applyTranslations(
                language
            );

            updateHeaderLanguage(
                language
            );
        }
    );

    window.addEventListener(
        "themeChanged",
        event => {

            applyTheme(
                event.detail?.theme ||
                getSiteTheme()
            );
        }
    );

    window.addEventListener(
        "siteLanguageChanged",
        () => {

            initializeEduNovaGlobal();
        }
    );

    window.addEventListener(
        "studentLevelChanged",
        () => {

            window.dispatchEvent(
                new CustomEvent(
                    "learningSelectionChanged"
                )
            );
        }
    );

    window.addEventListener(
        "bacBranchChanged",
        () => {

            window.dispatchEvent(
                new CustomEvent(
                    "learningSelectionChanged"
                )
            );
        }
    );

    window.addEventListener(
        "subjectChanged",
        () => {

            window.dispatchEvent(
                new CustomEvent(
                    "learningSelectionChanged"
                )
            );
        }
    );

    window.addEventListener(
        "chapterChanged",
        () => {

            window.dispatchEvent(
                new CustomEvent(
                    "learningSelectionChanged"
                )
            );
        }
    );

    window.addEventListener(
        "videoChanged",
        () => {

            window.dispatchEvent(
                new CustomEvent(
                    "learningSelectionChanged"
                )
            );
        }
    );
}

/* =========================================================
   INITIALIZATION CHECK
   ========================================================= */

function ensureDemoCurriculum() {

    const validation =
        validateCurriculumStructure();

    if (
        !validation.valid
    ) {

        console.warn(
            "EduNova AI curriculum validation failed:",
            validation
        );
    }

    return validation;
}

/* =========================================================
   PUBLIC API
   ========================================================= */

window.EduNova =
    window.EduNova || {};

Object.assign(
    window.EduNova,
    {

        /* Global */
        saveData,
        getData,
        removeData,

        getSiteLanguage,
        setSiteLanguage,
        translateText,

        getSiteTheme,
        setSiteTheme,
        applyTheme,

        /* Navigation */
        goTo,
        goHome,
        goBack,
        goChapter,
        goLibrary,
        goForum,
        goSubscriptions,
        goAccount,
        goSettings,

        /* Education */
        EDU_STRUCTURE,

        getStudentLevel,
        setStudentLevel,

        getBacBranch,
        setBacBranch,

        isValidLevel,
        isValidBacBranch,
        requiresBacBranch,

        getLevelDefinition,
        getBacBranchDefinition,

        getAvailableSubjects,
        getSubjectDefinition,
        isValidSubject,

        /* Curriculum */
        CURRICULUM_DATA,

        getCurriculumForLevel,
        getSubjectsForLevel,
        getSubjectData,
        getChaptersForSubject,
        getChapterData,
        getVideosForChapter,
        getVideoData,

        getChapterCount,
        getVideoCount,
        getCurriculumSummary,

        validateCurriculumStructure,

        /* Selection */
        getLearningSelection,

        getSelectedSubject,
        setSelectedSubject,
        saveSelectedSubject,
        getSelectedSubjectType,
        clearSelectedSubject,

        getSelectedChapter,
        setSelectedChapter,
        saveSelectedChapter,
        clearSelectedChapter,

        getSelectedVideo,
        setSelectedVideo,
        saveSelectedVideo,
        clearSelectedVideo,

        getCurrentSubject,
        getCurrentChapter,
        getCurrentVideo,

        /* Learning */
        getChapterVideos,

        isVideoFree,
        isVideoLocked,
        canAccessVideo,
        getVideoAccessState,

        openSubject,
        openChapter,
        openVideo,

        /* Content */
        getLocalizedValue,
        getChapterTitle,
        getVideoTitle,
        getVideoDuration,
        getVideoUrl,

        /* Progress */
        getLearningProgress,
        saveLearningProgress,
        getVideoProgressKey,
        isVideoCompleted,
        markVideoCompleted,

        getChapterProgress,
        getSubjectProgress,
        getLevelProgress,

        saveLastLearningPosition,
        getLastLearningPosition,

        /* Points */
        getStudentPoints,
        saveStudentPoints,
        addStudentPoints,

        getCompletedLessonsCount,
        updateCompletedLessonsCount,

        /* Notifications */
        getPlatformNotifications,
        savePlatformNotifications,
        addNotification,
        markAllNotificationsRead,
        showNotifications,
        showSubscriptionNotifications,

        /* UI */
        showToast,
        updateHeaderLanguage,
        refreshHeaderTranslations,
        initializeEduNovaGlobal
    }
);

/* =========================================================
   WINDOW COMPATIBILITY API
   ---------------------------------------------------------
   Some existing pages call these functions directly.
   ========================================================= */

window.getSiteLanguage =
    getSiteLanguage;

window.setSiteLanguage =
    setSiteLanguage;

window.getSiteTheme =
    getSiteTheme;

window.setSiteTheme =
    setSiteTheme;

window.applyTheme =
    applyTheme;

window.translateText =
    translateText;

window.goHome =
    goHome;

window.goChapter =
    goChapter;

window.showNotifications =
    showNotifications;

window.showSubscriptionNotifications =
    showSubscriptionNotifications;

window.isVideoCompleted =
    isVideoCompleted;

window.markVideoCompleted =
    markVideoCompleted;

window.getStudentLevel =
    getStudentLevel;

window.setStudentLevel =
    setStudentLevel;

window.getBacBranch =
    getBacBranch;

window.setBacBranch =
    setBacBranch;

window.getSelectedSubject =
    getSelectedSubject;

window.getSelectedChapter =
    getSelectedChapter;

window.getSelectedVideo =
    getSelectedVideo;

window.getCurrentSubject =
    getCurrentSubject;

window.getCurrentChapter =
    getCurrentChapter;

window.getCurrentVideo =
    getCurrentVideo;

window.openSubject =
    openSubject;

window.openChapter =
    openChapter;

window.openVideo =
    openVideo;

/* =========================================================
   DOM READY
   ========================================================= */

function eduNovaDOMReady() {

    initializeEduNovaGlobal();

    initializeStorageSync();

    initializeGlobalEventBridge();

    ensureDemoCurriculum();

    window.dispatchEvent(
        new CustomEvent(
            "eduNovaScriptReady"
        )
    );
}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        eduNovaDOMReady,
        {
            once: true
        }
    );

} else {

    eduNovaDOMReady();
}

/* =========================================================
   FINAL SCRIPT STATUS
   ========================================================= */

window.EduNovaScriptReady =
    true;