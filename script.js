/* =========================================================
   EduNova AI
   GLOBAL JAVASCRIPT
   Central Platform System
   Navigation + Storage + Theme + Language
   Education Structure + Progress + Video Access
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
2. PLATFORM STORAGE KEYS
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
3. PLATFORM CONSTANTS
========================================================= */

const PLATFORM_LIMITS = {

    maxVideosPerChapter: 20,

    firstFreeVideoNumber: 1,

    minimumVideoNumber: 1
};

/* =========================================================
4. OFFICIAL EDUCATIONAL STRUCTURE

المصدر المركزي للهيكل الدراسي.

المسار:

الشهادة
    ↓
الشعبة عند الحاجة
    ↓
المادة
    ↓
الفصل
    ↓
الفيديو

لا تضع الصفحات الأخرى تعريفًا مختلفًا للمواد.
========================================================= */

const EDU_STRUCTURE = {

    concours: {

        id: "concours",

        type: "certificate",

        title: {
            ar: "كونكور",
            fr: "Concours"
        },

        subtitle: {
            ar: "شهادة ختم الدروس الابتدائية - 6AF",
            fr: "Certificat de fin des études primaires - 6AF"
        },

        subjects: [

            {
                id: "mathematics",
                type: "mathematics",
                title: {
                    ar: "الرياضيات",
                    fr: "Mathématiques"
                }
            },

            {
                id: "arabic",
                type: "arabic",
                title: {
                    ar: "العربية",
                    fr: "Arabe"
                }
            },

            {
                id: "french",
                type: "french",
                title: {
                    ar: "الفرنسية",
                    fr: "Français"
                }
            },

            {
                id: "natural_sciences",
                type: "natural_sciences",
                title: {
                    ar: "العلوم الطبيعية",
                    fr: "Sciences naturelles"
                }
            }
        ]
    },

    brevet: {

        id: "brevet",

        type: "certificate",

        title: {
            ar: "بريڤي",
            fr: "Brevet"
        },

        subtitle: {
            ar: "شهادة ختم الدروس الإعدادية - 4ème",
            fr: "Certificat de fin des études du collège - 4ème"
        },

        subjects: [

            {
                id: "mathematics",
                type: "mathematics",
                title: {
                    ar: "الرياضيات",
                    fr: "Mathématiques"
                }
            },

            {
                id: "physics_chemistry",
                type: "physics_chemistry",
                title: {
                    ar: "الفيزياء والكيمياء",
                    fr: "Physique et chimie"
                }
            },

            {
                id: "natural_sciences",
                type: "natural_sciences",
                title: {
                    ar: "العلوم الطبيعية",
                    fr: "Sciences naturelles"
                }
            }
        ]
    },

    bac: {

        id: "bac",

        type: "baccalaureate",

        title: {
            ar: "باكالوريا",
            fr: "Baccalauréat"
        },

        branches: {

            C: {

                id: "C",

                title: {
                    ar: "شعبة الرياضيات",
                    fr: "Série C - Mathématiques"
                },

                shortTitle: {
                    ar: "باك C",
                    fr: "Bac C"
                },

                subjects: [

                    {
                        id: "mathematics_c",
                        type: "mathematics_c",
                        title: {
                            ar: "الرياضيات",
                            fr: "Mathématiques"
                        }
                    },

                    {
                        id: "sciences",
                        type: "sciences",
                        title: {
                            ar: "العلوم",
                            fr: "Sciences"
                        }
                    },

                    {
                        id: "physics",
                        type: "physics",
                        title: {
                            ar: "الفيزياء",
                            fr: "Physique"
                        }
                    },

                    {
                        id: "chemistry",
                        type: "chemistry",
                        title: {
                            ar: "الكيمياء",
                            fr: "Chimie"
                        }
                    }
                ]
            },

            D: {

                id: "D",

                title: {
                    ar: "شعبة العلوم الطبيعية",
                    fr: "Série D - Sciences naturelles"
                },

                shortTitle: {
                    ar: "باك D",
                    fr: "Bac D"
                },

                subjects: [

                    {
                        id: "natural_sciences",
                        type: "natural_sciences",
                        title: {
                            ar: "العلوم الطبيعية",
                            fr: "Sciences naturelles"
                        }
                    },

                    {
                        id: "mathematics_d",
                        type: "mathematics_d",
                        title: {
                            ar: "الرياضيات",
                            fr: "Mathématiques"
                        }
                    },

                    {
                        id: "physics",
                        type: "physics",
                        title: {
                            ar: "الفيزياء",
                            fr: "Physique"
                        }
                    },

                    {
                        id: "chemistry",
                        type: "chemistry",
                        title: {
                            ar: "الكيمياء",
                            fr: "Chimie"
                        }
                    }
                ]
            }
        }
    }
};

/* =========================================================
5. EMPTY CURRICULUM DATA

المحتوى الحقيقي سيضاف لاحقًا أو يأتي من قاعدة البيانات.

نحافظ على بنية واحدة حتى لا تحتاج الصفحات لإعادة البناء.
========================================================= */

const CURRICULUM_DATA = {

    concours: {

        mathematics: [],
        arabic: [],
        french: [],
        natural_sciences: []
    },

    brevet: {

        mathematics: [],
        physics_chemistry: [],
        natural_sciences: []
    },

    bac: {

        C: {

            mathematics_c: [],
            sciences: [],
            physics: [],
            chemistry: []
        },

        D: {

            natural_sciences: [],
            mathematics_d: [],
            physics: [],
            chemistry: []
        }
    }
};

/* =========================================================
6. NAVIGATION
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
7. LOCAL STORAGE
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
8. STUDENT LEVEL
========================================================= */

function getStudentLevel() {

    return (
        localStorage.getItem(
            PLATFORM_KEYS.studentLevel
        ) || ""
    );
}

function setStudentLevel(level) {

    if (!level) return false;

    const validLevels = [
        "concours",
        "brevet",
        "bac"
    ];

    if (!validLevels.includes(level)) {
        return false;
    }

    localStorage.setItem(
        PLATFORM_KEYS.studentLevel,
        level
    );

    /*
     * عند تغيير المستوى لا نريد الاحتفاظ
     * بمادة أو فصل من مستوى آخر.
     */
    clearSelectedLearningAfterLevelChange();

    window.dispatchEvent(
        new CustomEvent(
            "studentLevelChanged",
            {
                detail: {
                    level
                }
            }
        )
    );

    return true;
}

/* =========================================================
9. BAC BRANCH
========================================================= */

function getBacBranch() {

    const branch =
        localStorage.getItem(
            PLATFORM_KEYS.bacBranch
        );

    return (
        branch === "C" ||
        branch === "D"
    )
        ? branch
        : "";
}

function setBacBranch(branch) {

    if (
        branch !== "C" &&
        branch !== "D"
    ) {
        return false;
    }

    localStorage.setItem(
        PLATFORM_KEYS.bacBranch,
        branch
    );

    /*
     * تغيير الشعبة يعني أن المادة والفصل
     * السابقين قد يصبحان غير صالحين.
     */
    clearSelectedLearningAfterBranchChange();

    window.dispatchEvent(
        new CustomEvent(
            "bacBranchChanged",
            {
                detail: {
                    branch
                }
            }
        )
    );

    return true;
}

/* =========================================================
10. EDUCATION STRUCTURE HELPERS
========================================================= */

function isValidLevel(level) {

    return [
        "concours",
        "brevet",
        "bac"
    ].includes(level);
}

function isValidBacBranch(branch) {

    return (
        branch === "C" ||
        branch === "D"
    );
}

function requiresBacBranch(level = getStudentLevel()) {

    return level === "bac";
}

function getLevelDefinition(
    level = getStudentLevel()
) {

    if (!isValidLevel(level)) {
        return null;
    }

    return EDU_STRUCTURE[level] || null;
}

function getBacBranchDefinition(
    branch = getBacBranch()
) {

    if (!isValidBacBranch(branch)) {
        return null;
    }

    return (
        EDU_STRUCTURE.bac.branches[branch] ||
        null
    );
}

function getAvailableSubjects(
    level = getStudentLevel(),
    branch = getBacBranch()
) {

    if (!isValidLevel(level)) {
        return [];
    }

    if (level === "bac") {

        const branchDefinition =
            getBacBranchDefinition(branch);

        return branchDefinition
            ? branchDefinition.subjects
            : [];
    }

    const definition =
        getLevelDefinition(level);

    return definition
        ? definition.subjects || []
        : [];
}

function getSubjectDefinition(
    subjectId,
    level = getStudentLevel(),
    branch = getBacBranch()
) {

    if (!subjectId) return null;

    const subjects =
        getAvailableSubjects(
            level,
            branch
        );

    return (
        subjects.find(
            subject =>
                subject.id === subjectId
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
11. SUBJECT SELECTION
========================================================= */

function getSelectedSubject() {

    return (
        localStorage.getItem(
            PLATFORM_KEYS.selectedSubject
        ) || ""
    );
}

function setSelectedSubject(subjectId) {

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

    localStorage.setItem(
        PLATFORM_KEYS.selectedSubject,
        subjectId
    );

    const definition =
        getSubjectDefinition(
            subjectId,
            level,
            branch
        );

    if (definition && definition.type) {

        localStorage.setItem(
            PLATFORM_KEYS.selectedSubjectType,
            definition.type
        );
    }

    /*
     * تغيير المادة يعني أن الفصل والفيديو
     * المختارين سابقًا قد لا يعودان صالحين.
     */
    removeData(
        PLATFORM_KEYS.selectedChapter
    );

    removeData(
        PLATFORM_KEYS.selectedVideo
    );

    window.dispatchEvent(
        new CustomEvent(
            "selectedSubjectChanged",
            {
                detail: {
                    subjectId,
                    level,
                    branch
                }
            }
        )
    );

    return true;
}

function getSelectedSubjectType() {

    return (
        localStorage.getItem(
            PLATFORM_KEYS.selectedSubjectType
        ) || ""
    );
}

function clearSelectedSubject() {

    removeData(
        PLATFORM_KEYS.selectedSubject
    );

    removeData(
        PLATFORM_KEYS.selectedSubjectType
    );

    clearSelectedChapter();

    return true;
}

/* =========================================================
12. CHAPTER SELECTION
========================================================= */

function getSelectedChapter() {

    return getData(
        PLATFORM_KEYS.selectedChapter,
        null
    );
}

function setSelectedChapter(chapter) {

    if (!chapter) return false;

    const safeChapter =
        typeof chapter === "object"
            ? chapter
            : {
                id: String(chapter)
            };

    saveData(
        PLATFORM_KEYS.selectedChapter,
        safeChapter
    );

    removeData(
        PLATFORM_KEYS.selectedVideo
    );

    window.dispatchEvent(
        new CustomEvent(
            "selectedChapterChanged",
            {
                detail: safeChapter
            }
        )
    );

    return true;
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

/* =========================================================
13. VIDEO SELECTION
========================================================= */

function getSelectedVideo() {

    return getData(
        PLATFORM_KEYS.selectedVideo,
        null
    );
}

function setSelectedVideo(video) {

    if (!video) return false;

    const safeVideo =
        typeof video === "object"
            ? video
            : {
                number: Number(video)
            };

    saveData(
        PLATFORM_KEYS.selectedVideo,
        safeVideo
    );

    saveLastLearningPosition(
        safeVideo
    );

    window.dispatchEvent(
        new CustomEvent(
            "selectedVideoChanged",
            {
                detail: safeVideo
            }
        )
    );

    return true;
}

function clearSelectedVideo() {

    removeData(
        PLATFORM_KEYS.selectedVideo
    );

    return true;
}

/* =========================================================
14. LEARNING SELECTION STATE
========================================================= */

function getLearningSelection() {

    return {

        level:
            getStudentLevel(),

        bacBranch:
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
        PLATFORM_KEYS.bacBranch
    );

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
}

/* =========================================================
15. CURRICULUM DATA HELPERS

هذه الوظائف ستعمل مع البيانات المحلية الآن
ومع بيانات قاعدة البيانات لاحقًا.
========================================================= */

function getCurriculumContainer(
    level = getStudentLevel(),
    branch = getBacBranch(),
    subjectId = getSelectedSubject()
) {

    if (!isValidLevel(level)) {
        return [];
    }

    if (level === "bac") {

        if (!isValidBacBranch(branch)) {
            return [];
        }

        return (
            CURRICULUM_DATA.bac &&
            CURRICULUM_DATA.bac[branch] &&
            CURRICULUM_DATA.bac[branch][subjectId]
        ) || [];
    }

    return (
        CURRICULUM_DATA[level] &&
        CURRICULUM_DATA[level][subjectId]
    ) || [];
}

function getChapters(
    level = getStudentLevel(),
    branch = getBacBranch(),
    subjectId = getSelectedSubject()
) {

    return getCurriculumContainer(
        level,
        branch,
        subjectId
    );
}

function getChapterById(
    chapterId,
    level = getStudentLevel(),
    branch = getBacBranch(),
    subjectId = getSelectedSubject()
) {

    if (!chapterId) return null;

    const chapters =
        getChapters(
            level,
            branch,
            subjectId
        );

    return (
        chapters.find(
            chapter =>
                String(chapter.id) ===
                String(chapterId)
        ) || null
    );
}

function normalizeChapterVideos(
    chapter
) {

    if (!chapter) return [];

    const videos =
        Array.isArray(chapter.videos)
            ? chapter.videos
            : [];

    return videos
        .slice(
            0,
            PLATFORM_LIMITS.maxVideosPerChapter
        )
        .map(
            (video, index) => {

                const number =
                    Number(
                        video.number ||
                        index + 1
                    );

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
    chapterId,
    level = getStudentLevel(),
    branch = getBacBranch(),
    subjectId = getSelectedSubject()
) {

    const chapter =
        getChapterById(
            chapterId,
            level,
            branch,
            subjectId
        );

    if (!chapter) return [];

    return normalizeChapterVideos(
        chapter
    );
}

/* =========================================================
16. VIDEO ACCESS
========================================================= */

function isVideoFree(videoNumber) {

    return Number(videoNumber) ===
        PLATFORM_LIMITS.firstFreeVideoNumber;
}

function isVideoLocked(
    videoNumber,
    hasAccess = false
) {

    const number =
        Number(videoNumber);

    if (!number) return true;

    if (isVideoFree(number)) {
        return false;
    }

    return !hasAccess;
}

function getVideoAccessState(
    videoNumber,
    hasAccess = false,
    completed = false
) {

    const number =
        Number(videoNumber);

    if (completed) {
        return "completed";
    }

    if (isVideoFree(number)) {
        return "free";
    }

    if (hasAccess) {
        return "available";
    }

    return "locked";
}

/* =========================================================
17. VIDEO PROGRESS

المفتاح الموحد للتقدم:

level
branch
subject
chapter
video
========================================================= */

function buildLearningProgressKey(
    level,
    branch,
    subjectId,
    chapterId,
    videoNumber
) {

    return [
        level || "",
        branch || "",
        subjectId || "",
        chapterId || "",
        Number(videoNumber) || 0
    ].join(":");
}

function getLearningProgressMap() {

    return getData(
        PLATFORM_KEYS.learningProgress,
        {}
    ) || {};
}

function saveLearningProgressMap(map) {

    return saveData(
        PLATFORM_KEYS.learningProgress,
        map || {}
    );
}

function isVideoCompleted(
    level,
    branch,
    subjectId,
    chapterId,
    videoNumber
) {

    const key =
        buildLearningProgressKey(
            level,
            branch,
            subjectId,
            chapterId,
            videoNumber
        );

    const map =
        getLearningProgressMap();

    return Boolean(
        map[key] &&
        map[key].completed === true
    );
}

function setVideoProgress(
    videoData = {}
) {

    const level =
        videoData.level ||
        getStudentLevel();

    const branch =
        videoData.branch ||
        getBacBranch();

    const subjectId =
        videoData.subjectId ||
        videoData.subject ||
        getSelectedSubject();

    const chapterId =
        videoData.chapterId ||
        videoData.chapter ||
        "";

    const videoNumber =
        Number(
            videoData.videoNumber ||
            videoData.number ||
            0
        );

    if (
        !level ||
        !subjectId ||
        !chapterId ||
        !videoNumber
    ) {
        return false;
    }

    const map =
        getLearningProgressMap();

    const key =
        buildLearningProgressKey(
            level,
            branch,
            subjectId,
            chapterId,
            videoNumber
        );

    map[key] = {

        level,

        branch,

        subjectId,

        chapterId,

        videoNumber,

        completed:
            videoData.completed === true,

        progress:
            Math.min(
                100,
                Math.max(
                    0,
                    Number(
                        videoData.progress || 0
                    )
                )
            ),

        updatedAt:
            new Date().toISOString()
    };

    saveLearningProgressMap(map);

    return map[key];
}

function completeVideo(videoData = {}) {

    return setVideoProgress({

        ...videoData,

        completed: true,

        progress: 100
    });
}

/* =========================================================
18. LAST LEARNING POSITION
========================================================= */

function saveLastLearningPosition(
    videoData = {}
) {

    const position = {

        level:
            videoData.level ||
            getStudentLevel(),

        branch:
            videoData.branch ||
            getBacBranch(),

        subjectId:
            videoData.subjectId ||
            videoData.subject ||
            getSelectedSubject(),

        chapterId:
            videoData.chapterId ||
            videoData.chapter ||
            "",

        videoNumber:
            Number(
                videoData.videoNumber ||
                videoData.number ||
                0
            ),

        updatedAt:
            new Date().toISOString()
    };

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
19. LEGACY LESSON COMPATIBILITY

النظام القديم:
lesson_1_completed

نحافظ عليه حتى لا تتعطل الصفحات الحالية.
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
20. STUDENT POINTS
========================================================= */

function getStudentPoints() {

    return Number(
        localStorage.getItem(
            PLATFORM_KEYS.studentPoints
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
        PLATFORM_KEYS.studentPoints,
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
21. GLOBAL THEME
========================================================= */

function getSiteTheme() {

    const saved =
        localStorage.getItem(
            GLOBAL_THEME_KEY
        );

    if (
        saved === "dark" ||
        saved === "light"
    ) {
        return saved;
    }

    try {

        const oldSettings =
            JSON.parse(
                localStorage.getItem(
                    PLATFORM_KEYS.platformSettings
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

function applySiteTheme(
    theme = getSiteTheme()
) {

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

    syncLegacySettings({
        theme: safeTheme
    });

    updateThemeControls();

    window.dispatchEvent(
        new CustomEvent(
            "themeChanged",
            {
                detail: {
                    theme: safeTheme
                }
            }
        )
    );

    window.dispatchEvent(
        new CustomEvent(
            "siteThemeChanged",
            {
                detail: {
                    theme: safeTheme
                }
            }
        )
    );

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
        checkbox.checked =
            isDark;
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
22. GLOBAL LANGUAGE
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

    try {

        const oldSettings =
            JSON.parse(
                localStorage.getItem(
                    PLATFORM_KEYS.platformSettings
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
23. TRANSLATIONS
========================================================= */

const GLOBAL_TRANSLATIONS = {

    ar: {

        home: "الرئيسية",
        dashboard: "لوحة الطالب",
        levels: "اختيار المستوى",
        library: "مكتبتي",
        account: "حسابي",
        settings: "الإعدادات",
        forum: "المجتمع",
        challenge: "التحدي",
        ranking: "الترتيب",
        badges: "الشارات",
        subscriptions: "الاشتراكات",
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

        site_name: "EduNova AI",
        ai_teacher: "Afkrash AI",
        teacher: "Afkrash AI",

        teacher_description:
            "مدرسك الذكي في EduNova AI",

        mathematics:
            "الرياضيات",

        arabic:
            "العربية",

        french_subject:
            "الفرنسية",

        physics:
            "الفيزياء",

        chemistry:
            "الكيمياء",

        physics_chemistry:
            "الفيزياء والكيمياء",

        natural_sciences:
            "العلوم الطبيعية",

        sciences:
            "العلوم",

        chapter:
            "فصل",

        chapters:
            "الفصول",

        video:
            "فيديو",

        videos:
            "فيديوهات",

        concours:
            "كونكور",

        brevet:
            "بريڤي",

        bac:
            "باكالوريا",

        bac_c:
            "باك C",

        bac_d:
            "باك D",

        bac_c_full:
            "باكالوريا شعبة الرياضيات",

        bac_d_full:
            "باكالوريا شعبة العلوم الطبيعية",

        free:
            "مجاني",

        locked:
            "مقفل",

        available:
            "متاح",

        completed:
            "مكتمل",

        in_progress:
            "قيد التقدم",

        subscriber:
            "للمشتركين",

        subscription:
            "الاشتراك",

        first_video_free:
            "الفيديو الأول مجاني",

        subscription_required:
            "هذا الفيديو متاح للمشتركين فقط",

        language:
            "اللغة",

        arabic_language:
            "العربية",

        french_language:
            "Français",

        dark_mode:
            "الوضع الداكن",

        light_mode:
            "الوضع الفاتح",

        loading:
            "جارٍ التحميل...",

        coming_soon:
            "قريبًا",

        no_content:
            "لا يوجد محتوى حاليًا",

        no_chapters:
            "لا توجد فصول مضافة حاليًا",

        no_videos:
            "لا توجد فيديوهات مضافة حاليًا",

        saved:
            "تم الحفظ بنجاح",

        dark_enabled:
            "تم تفعيل الوضع الداكن",

        dark_disabled:
            "تم تفعيل الوضع الفاتح",

        language_changed:
            "تم تغيير اللغة",

        select_level:
            "اختر المستوى",

        select_branch:
            "اختر الشعبة",

        select_subject:
            "اختر المادة",

        learning:
            "التعلم",

        progress:
            "التقدم",

        last_activity:
            "آخر نشاط",

        resume_learning:
            "متابعة التعلم"
    },

    fr: {

        home:
            "Accueil",

        dashboard:
            "Tableau de bord",

        levels:
            "Choix du niveau",

        library:
            "Ma bibliothèque",

        account:
            "Mon compte",

        settings:
            "Paramètres",

        forum:
            "Communauté",

        challenge:
            "Défi",

        ranking:
            "Classement",

        badges:
            "Badges",

        subscriptions:
            "Abonnements",

        login:
            "Connexion",

        logout:
            "Déconnexion",

        back:
            "Retour",

        next:
            "Suivant",

        previous:
            "Précédent",

        continue:
            "Continuer",

        save:
            "Enregistrer",

        cancel:
            "Annuler",

        close:
            "Fermer",

        search:
            "Rechercher",

        site_name:
            "EduNova AI",

        ai_teacher:
            "Afkrash AI",

        teacher:
            "Afkrash AI",

        teacher_description:
            "Votre professeur intelligent dans EduNova AI",

        mathematics:
            "Mathématiques",

        arabic:
            "Arabe",

        french_subject:
            "Français",

        physics:
            "Physique",

        chemistry:
            "Chimie",

        physics_chemistry:
            "Physique et chimie",

        natural_sciences:
            "Sciences naturelles",

        sciences:
            "Sciences",

        chapter:
            "Chapitre",

        chapters:
            "Chapitres",

        video:
            "Vidéo",

        videos:
            "Vidéos",

        concours:
            "Concours",

        brevet:
            "Brevet",

        bac:
            "Baccalauréat",

        bac_c:
            "Bac C",

        bac_d:
            "Bac D",

        bac_c_full:
            "Baccalauréat - Série C",

        bac_d_full:
            "Baccalauréat - Série D",

        free:
            "Gratuit",

        locked:
            "Verrouillé",

        available:
            "Disponible",

        completed:
            "Terminé",

        in_progress:
            "En cours",

        subscriber:
            "Abonnés",

        subscription:
            "Abonnement",

        first_video_free:
            "La première vidéo est gratuite",

        subscription_required:
            "Cette vidéo est réservée aux abonnés",

        language:
            "Langue",

        arabic_language:
            "العربية",

        french_language:
            "Français",

        dark_mode:
            "Mode sombre",

        light_mode:
            "Mode clair",

        loading:
            "Chargement...",

        coming_soon:
            "Bientôt disponible",

        no_content:
            "Aucun contenu pour le moment",

        no_chapters:
            "Aucun chapitre n'a encore été ajouté",

        no_videos:
            "Aucune vidéo n'a encore été ajoutée",

        saved:
            "Enregistré avec succès",

        dark_enabled:
            "Mode sombre activé",

        dark_disabled:
            "Mode clair activé",

        language_changed:
            "Langue modifiée",

        select_level:
            "Choisissez le niveau",

        select_branch:
            "Choisissez la série",

        select_subject:
            "Choisissez la matière",

        learning:
            "Apprentissage",

        progress:
            "Progression",

        last_activity:
            "Dernière activité",

        resume_learning:
            "Continuer l'apprentissage"
    }
};

/* =========================================================
24. TRANSLATION HELPERS
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

    syncLegacySettings({
        language:
            safeLanguage
    });

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
            "siteLanguageChanged",
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
25. EDUCATION LABEL HELPERS
========================================================= */

function getLevelLabel(
    level = getStudentLevel(),
    language = getSiteLanguage()
) {

    const definition =
        getLevelDefinition(level);

    if (!definition) {
        return "";
    }

    return (
        definition.title &&
        definition.title[language]
    ) || "";
}

function getLevelSubtitle(
    level = getStudentLevel(),
    language = getSiteLanguage()
) {

    const definition =
        getLevelDefinition(level);

    if (!definition) {
        return "";
    }

    return (
        definition.subtitle &&
        definition.subtitle[language]
    ) || "";
}

function getBacBranchLabel(
    branch = getBacBranch(),
    language = getSiteLanguage()
) {

    const definition =
        getBacBranchDefinition(branch);

    if (!definition) {
        return "";
    }

    return (
        definition.title &&
        definition.title[language]
    ) || "";
}

function getSubjectLabel(
    subjectId = getSelectedSubject(),
    level = getStudentLevel(),
    branch = getBacBranch(),
    language = getSiteLanguage()
) {

    const definition =
        getSubjectDefinition(
            subjectId,
            level,
            branch
        );

    if (!definition) {
        return "";
    }

    return (
        definition.title &&
        definition.title[language]
    ) || "";
}

/* =========================================================
26. LEGACY SETTINGS SYNC
========================================================= */

function syncLegacySettings(
    options = {}
) {

    try {

        const settings =
            JSON.parse(
                localStorage.getItem(
                    PLATFORM_KEYS.platformSettings
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
            PLATFORM_KEYS.platformSettings,
            JSON.stringify(settings)
        );

    } catch (error) {

        console.warn(
            "تعذر مزامنة الإعدادات القديمة"
        );
    }
}

/* =========================================================
27. DOM HELPERS
========================================================= */

function setText(
    selector,
    text
) {

    const element =
        document.querySelector(
            selector
        );

    if (element) {

        element.textContent =
            text ?? "";
    }
}

function show(selector) {

    const element =
        document.querySelector(
            selector
        );

    if (element) {

        element.classList.remove(
            "hidden"
        );
    }
}

function hide(selector) {

    const element =
        document.querySelector(
            selector
        );

    if (element) {

        element.classList.add(
            "hidden"
        );
    }
}

function toggle(selector) {

    const element =
        document.querySelector(
            selector
        );

    if (element) {

        element.classList.toggle(
            "hidden"
        );
    }
}

/* =========================================================
28. BUTTON STATE
========================================================= */

function setButtonLoading(
    button,
    loadingText =
        translateText("loading")
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
29. NOTIFICATIONS
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

            position:
                "fixed",

            top:
                "18px",

            left:
                "50%",

            transform:
                "translateX(-50%)",

            zIndex:
                "9999",

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

    if (
        document.body
    ) {

        document.body.appendChild(
            notice
        );
    }

    setTimeout(() => {

        notice.style.opacity =
            "0";

        setTimeout(() => {

            notice.remove();

        }, 200);

    }, 2500);
}

/* =========================================================
30. CONFIRMATION
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
31. CURRENT YEAR
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
32. ACTIVE NAVIGATION
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
33. SMOOTH SCROLL
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
34. SAFE HTML
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
35. PAGE UTILITIES
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
36. DEVICE
========================================================= */

function isMobile() {

    return window.matchMedia(
        "(max-width: 639px)"
    ).matches;
}

/* =========================================================
37. GLOBAL SETTINGS CONTROLS
========================================================= */

function initializeGlobalSettings() {

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
            }
        );
    }

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
            }
        );
    }

    document
        .querySelectorAll(
            "[data-theme-toggle]"
        )
        .forEach(button => {

            if (
                button.dataset
                    .globalThemeBound ===
                "true"
            ) {
                return;
            }

            button.dataset
                .globalThemeBound =
                "true";

            button.addEventListener(
                "click",
                () => {

                    toggleDarkMode();
                }
            );
        });

    document
        .querySelectorAll(
            "[data-language]"
        )
        .forEach(button => {

            if (
                button.dataset
                    .globalLanguageBound ===
                "true"
            ) {
                return;
            }

            button.dataset
                .globalLanguageBound =
                "true";

            button.addEventListener(
                "click",
                () => {

                    const language =
                        button.dataset
                            .language;

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
38. EARLY THEME
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
39. EARLY LANGUAGE
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
40. CROSS-TAB / CROSS-PAGE SYNC
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

        if (
            event.key ===
            PLATFORM_KEYS.studentLevel
        ) {

            window.dispatchEvent(
                new CustomEvent(
                    "studentLevelChanged",
                    {
                        detail: {
                            level:
                                event.newValue ||
                                ""
                        }
                    }
                )
            );
        }

        if (
            event.key ===
            PLATFORM_KEYS.bacBranch
        ) {

            window.dispatchEvent(
                new CustomEvent(
                    "bacBranchChanged",
                    {
                        detail: {
                            branch:
                                event.newValue ||
                                ""
                        }
                    }
                )
            );
        }
    }
);

/* =========================================================
41. GLOBAL INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        applySiteTheme(
            getSiteTheme()
        );

        applySiteLanguage(
            getSiteLanguage()
        );

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