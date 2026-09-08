/* =========================================================
   EduNova AI — Global Platform Script
   Part 1 / 3
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
   OFFICIAL EDUCATION STRUCTURE
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
   CENTRAL CURRICULUM DATA
   ---------------------------------------------------------
   Library is the only home of actual study content.
   These arrays are intentionally ready to receive real
   chapters later without changing the platform structure.
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
   NAVIGATION
   ========================================================= */

function goTo(page) {
    if (!page) return false;

    const target = String(page).trim();

    if (!target) return false;

    window.location.href = target;

    return true;
}

function goBack(fallback = "dashboard.html") {
    if (window.history.length > 1) {
        window.history.back();
        return true;
    }

    return goTo(fallback);
}

/* =========================================================
   LOCAL STORAGE HELPERS
   ========================================================= */

function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error("EduNova saveData error:", error);
        return false;
    }
}

function getData(key, fallback = null) {
    try {
        const raw = localStorage.getItem(key);

        if (raw === null) {
            return fallback;
        }

        return JSON.parse(raw);
    } catch (error) {
        console.error("EduNova getData error:", error);
        return fallback;
    }
}

function removeData(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error("EduNova removeData error:", error);
        return false;
    }
}

/* =========================================================
   STUDENT LEVEL
   ========================================================= */

/*
   Canonical levels:
   - concours
   - brevet
   - bac

   Compatibility:
   - bac_c
   - bac_d

   Old dashboard versions may still send bac_c / bac_d.
   We normalize those values into the official structure:
   bac + branch C/D.
*/

function normalizeStudentLevel(level) {
    const value = String(level || "").trim().toLowerCase();

    if (value === "bac_c") {
        return "bac";
    }

    if (value === "bac_d") {
        return "bac";
    }

    return value;
}

function getLegacyBacBranchFromLevel(level) {
    const value = String(level || "").trim().toLowerCase();

    if (value === "bac_c") {
        return "C";
    }

    if (value === "bac_d") {
        return "D";
    }

    return "";
}

function getStudentLevel() {
    const rawLevel = getData(
        PLATFORM_KEYS.studentLevel,
        ""
    );

    const normalizedLevel = normalizeStudentLevel(rawLevel);

    /*
       Keep old saved values compatible with the new
       canonical architecture.
    */
    if (
        rawLevel !== normalizedLevel &&
        normalizedLevel === "bac"
    ) {
        saveData(
            PLATFORM_KEYS.studentLevel,
            normalizedLevel
        );

        const inferredBranch =
            getLegacyBacBranchFromLevel(rawLevel);

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

    return normalizedLevel;
}

function setStudentLevel(level) {
    const rawLevel = String(level || "").trim();

    const normalizedLevel =
        normalizeStudentLevel(rawLevel);

    const inferredBranch =
        getLegacyBacBranchFromLevel(rawLevel);

    if (!isValidLevel(normalizedLevel)) {
        return false;
    }

    saveData(
        PLATFORM_KEYS.studentLevel,
        normalizedLevel
    );

    /*
       Changing level means previous learning selection
       must no longer be trusted.
    */
    clearSelectedLearningAfterLevelChange();

    /*
       If the dashboard still sends bac_c / bac_d,
       preserve the selected branch automatically.
    */
    if (
        normalizedLevel === "bac" &&
        inferredBranch
    ) {
        saveData(
            PLATFORM_KEYS.bacBranch,
            inferredBranch
        );
    }

    window.dispatchEvent(
        new CustomEvent("studentLevelChanged", {
            detail: {
                level: normalizedLevel,
                rawLevel: rawLevel,
                bacBranch: inferredBranch || ""
            }
        })
    );

    return true;
}

/* =========================================================
   BAC BRANCH
   ========================================================= */

function getBacBranch() {
    const branch = getData(
        PLATFORM_KEYS.bacBranch,
        ""
    );

    if (!isValidBacBranch(branch)) {
        return "";
    }

    return String(branch).toUpperCase();
}

function setBacBranch(branch) {
    const safeBranch =
        String(branch || "").trim().toUpperCase();

    if (!isValidBacBranch(safeBranch)) {
        return false;
    }

    saveData(
        PLATFORM_KEYS.bacBranch,
        safeBranch
    );

    clearSelectedLearningAfterBranchChange();

    window.dispatchEvent(
        new CustomEvent("bacBranchChanged", {
            detail: {
                branch: safeBranch
            }
        })
    );

    return true;
}

/* =========================================================
   EDUCATION VALIDATION
   ========================================================= */

function isValidLevel(level) {
    const safeLevel =
        normalizeStudentLevel(level);

    return [
        "concours",
        "brevet",
        "bac"
    ].includes(safeLevel);
}

function isValidBacBranch(branch) {
    const safeBranch =
        String(branch || "").trim().toUpperCase();

    return ["C", "D"].includes(safeBranch);
}

function requiresBacBranch(level = getStudentLevel()) {
    return normalizeStudentLevel(level) === "bac";
}

function getLevelDefinition(level = getStudentLevel()) {
    const safeLevel =
        normalizeStudentLevel(level);

    if (!isValidLevel(safeLevel)) {
        return null;
    }

    return EDU_STRUCTURE[safeLevel] || null;
}

function getBacBranchDefinition(
    branch = getBacBranch()
) {
    const safeBranch =
        String(branch || "").trim().toUpperCase();

    if (!isValidBacBranch(safeBranch)) {
        return null;
    }

    return (
        EDU_STRUCTURE.bac.branches[safeBranch] ||
        null
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
        normalizeStudentLevel(level);

    if (!isValidLevel(safeLevel)) {
        return [];
    }

    if (safeLevel === "bac") {
        const safeBranch =
            String(branch || "").trim().toUpperCase();

        if (!isValidBacBranch(safeBranch)) {
            return [];
        }

        return (
            EDU_STRUCTURE.bac.branches[
                safeBranch
            ]?.subjects || []
        );
    }

    return (
        EDU_STRUCTURE[safeLevel]?.subjects || []
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
        getAvailableSubjects(level, branch);

    return (
        subjects.find(
            subject =>
                subject.id === String(subjectId)
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
   SUBJECT SELECTION
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
    const level = getStudentLevel();
    const branch = getBacBranch();

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
        new CustomEvent("subjectChanged", {
            detail: {
                subject: String(subjectId),
                subjectType: String(subjectType || "")
            }
        })
    );

    return true;
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

/* =========================================================
   CHAPTER SELECTION
   ========================================================= */

function getSelectedChapter() {
    return getData(
        PLATFORM_KEYS.selectedChapter,
        null
    );
}

function setSelectedChapter(chapter) {
    if (
        chapter === null ||
        chapter === undefined
    ) {
        return false;
    }

    saveData(
        PLATFORM_KEYS.selectedChapter,
        chapter
    );

    removeData(
        PLATFORM_KEYS.selectedVideo
    );

    window.dispatchEvent(
        new CustomEvent("chapterChanged", {
            detail: {
                chapter
            }
        })
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
   VIDEO SELECTION
   ========================================================= */

function getSelectedVideo() {
    return getData(
        PLATFORM_KEYS.selectedVideo,
        null
    );
}

function setSelectedVideo(video) {
    if (
        video === null ||
        video === undefined
    ) {
        return false;
    }

    saveData(
        PLATFORM_KEYS.selectedVideo,
        video
    );

    saveLastLearningPosition({
        level: getStudentLevel(),
        branch: getBacBranch(),
        subject: getSelectedSubject(),
        chapter: getSelectedChapter(),
        video
    });

    window.dispatchEvent(
        new CustomEvent("videoChanged", {
            detail: {
                video
            }
        })
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
   LEARNING SELECTION STATE
   ========================================================= */

function getLearningSelection() {
    return {
        level: getStudentLevel(),
        branch: getBacBranch(),
        subject: getSelectedSubject(),
        subjectType: getSelectedSubjectType(),
        chapter: getSelectedChapter(),
        video: getSelectedVideo()
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
   CURRICULUM HELPERS
   ========================================================= */

function getCurriculumContainer(
    level = getStudentLevel(),
    branch = getBacBranch(),
    subject = getSelectedSubject()
) {
    const safeLevel =
        normalizeStudentLevel(level);

    if (!isValidLevel(safeLevel)) {
        return [];
    }

    if (safeLevel === "bac") {
        const safeBranch =
            String(branch || "").trim().toUpperCase();

        if (!isValidBacBranch(safeBranch)) {
            return [];
        }

        return (
            CURRICULUM_DATA.bac?.[
                safeBranch
            ]?.[subject] || []
        );
    }

    return (
        CURRICULUM_DATA?.[
            safeLevel
        ]?.[subject] || []
    );
}

function getChapters(
    level = getStudentLevel(),
    branch = getBacBranch(),
    subject = getSelectedSubject()
) {
    const chapters =
        getCurriculumContainer(
            level,
            branch,
            subject
        );

    if (!Array.isArray(chapters)) {
        return [];
    }

    return chapters;
}

function getChapterById(
    chapterId,
    level = getStudentLevel(),
    branch = getBacBranch(),
    subject = getSelectedSubject()
) {
    if (
        chapterId === null ||
        chapterId === undefined
    ) {
        return null;
    }

    const chapters =
        getChapters(
            level,
            branch,
            subject
        );

    return (
        chapters.find(
            chapter =>
                String(chapter?.id) ===
                String(chapterId)
        ) || null
    );
}

/* =========================================================
   VIDEO NORMALIZATION
   ========================================================= */

function normalizeChapterVideos(
    videos
) {
    if (!Array.isArray(videos)) {
        return [];
    }

    return videos
        .slice(
            0,
            PLATFORM_LIMITS.maxVideosPerChapter
        )
        .map((video, index) => {
            const number =
                Number(
                    video?.number ??
                    index + 1
                );

            const safeNumber =
                Number.isFinite(number) &&
                number >=
                    PLATFORM_LIMITS.minimumVideoNumber
                    ? number
                    : index + 1;

            return {
                ...video,

                number: safeNumber,

                free:
                    safeNumber ===
                    PLATFORM_LIMITS.firstFreeVideoNumber,

                locked:
                    safeNumber >
                    PLATFORM_LIMITS.firstFreeVideoNumber
            };
        });
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

/* =========================================================
   VIDEO ACCESS
   ========================================================= */

function isVideoFree(video) {
    if (!video) {
        return false;
    }

    return (
        Number(video.number) ===
        PLATFORM_LIMITS.firstFreeVideoNumber
    );
}

function isVideoLocked(video) {
    if (!video) {
        return true;
    }

    return !isVideoFree(video);
}

function getVideoAccessState(video) {
    if (!video) {
        return "unavailable";
    }

    if (isVideoFree(video)) {
        return "free";
    }

    return "locked";
}/* =========================================================
   LEARNING PROGRESS
   ========================================================= */

function buildLearningProgressKey({
    level = getStudentLevel(),
    branch = getBacBranch(),
    subject = getSelectedSubject(),
    chapter = null,
    video = null
} = {}) {
    const safeLevel =
        normalizeStudentLevel(level);

    const safeBranch =
        safeLevel === "bac"
            ? String(branch || "")
                .trim()
                .toUpperCase()
            : "";

    const subjectId =
        typeof subject === "object"
            ? subject?.id || ""
            : String(subject || "");

    const chapterId =
        typeof chapter === "object"
            ? chapter?.id || ""
            : String(chapter || "");

    const videoId =
        typeof video === "object"
            ? video?.id ??
              video?.number ??
              ""
            : String(video ?? "");

    return [
        safeLevel,
        safeBranch,
        subjectId,
        chapterId,
        videoId
    ].join("::");
}

function getLearningProgressMap() {
    const progress =
        getData(
            PLATFORM_KEYS.learningProgress,
            {}
        );

    if (
        !progress ||
        typeof progress !== "object" ||
        Array.isArray(progress)
    ) {
        return {};
    }

    return progress;
}

function saveLearningProgressMap(progress) {
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

function isVideoCompleted({
    level = getStudentLevel(),
    branch = getBacBranch(),
    subject = getSelectedSubject(),
    chapter = null,
    video = null
} = {}) {
    const key =
        buildLearningProgressKey({
            level,
            branch,
            subject,
            chapter,
            video
        });

    if (!key) {
        return false;
    }

    const progress =
        getLearningProgressMap();

    return Boolean(
        progress[key]?.completed
    );
}

function setVideoProgress({
    level = getStudentLevel(),
    branch = getBacBranch(),
    subject = getSelectedSubject(),
    chapter = null,
    video = null,
    progress = 0,
    completed = false
} = {}) {
    const key =
        buildLearningProgressKey({
            level,
            branch,
            subject,
            chapter,
            video
        });

    if (!key) {
        return false;
    }

    const progressMap =
        getLearningProgressMap();

    const numericProgress =
        Math.max(
            0,
            Math.min(
                100,
                Number(progress) || 0
            )
        );

    progressMap[key] = {
        progress: numericProgress,
        completed: Boolean(completed),
        updatedAt: Date.now(),

        level:
            normalizeStudentLevel(level),

        branch:
            normalizeStudentLevel(level) === "bac"
                ? String(branch || "")
                    .trim()
                    .toUpperCase()
                : "",

        subject:
            typeof subject === "object"
                ? subject?.id || ""
                : String(subject || ""),

        chapter:
            typeof chapter === "object"
                ? chapter?.id || ""
                : String(chapter || ""),

        video:
            typeof video === "object"
                ? video?.id ??
                  video?.number ??
                  ""
                : String(video ?? "")
    };

    saveLearningProgressMap(
        progressMap
    );

    window.dispatchEvent(
        new CustomEvent("learningProgressChanged", {
            detail: {
                key,
                progress: progressMap[key]
            }
        })
    );

    return true;
}

function completeVideo({
    level = getStudentLevel(),
    branch = getBacBranch(),
    subject = getSelectedSubject(),
    chapter = null,
    video = null
} = {}) {
    return setVideoProgress({
        level,
        branch,
        subject,
        chapter,
        video,
        progress: 100,
        completed: true
    });
}

/* =========================================================
   LAST LEARNING POSITION
   ========================================================= */

function saveLastLearningPosition(position = {}) {
    if (
        !position ||
        typeof position !== "object"
    ) {
        return false;
    }

    const normalized = {
        level:
            normalizeStudentLevel(
                position.level ||
                getStudentLevel()
            ),

        branch:
            String(
                position.branch ||
                getBacBranch() ||
                ""
            )
                .trim()
                .toUpperCase(),

        subject:
            position.subject ||
            getSelectedSubject() ||
            "",

        chapter:
            position.chapter ||
            getSelectedChapter() ||
            null,

        video:
            position.video ||
            getSelectedVideo() ||
            null,

        updatedAt: Date.now()
    };

    return saveData(
        PLATFORM_KEYS.lastLearningPosition,
        normalized
    );
}

function getLastLearningPosition() {
    const position =
        getData(
            PLATFORM_KEYS.lastLearningPosition,
            null
        );

    if (
        !position ||
        typeof position !== "object"
    ) {
        return null;
    }

    return position;
}

/* =========================================================
   LEGACY LESSON COMPATIBILITY
   ---------------------------------------------------------
   Kept temporarily so older pages continue working while
   the platform is migrated fully to chapter/video progress.
   ========================================================= */

const TOTAL_LESSONS = 20;

function isLessonCompleted(
    lessonNumber
) {
    const number =
        Number(lessonNumber);

    if (
        !Number.isFinite(number) ||
        number < 1
    ) {
        return false;
    }

    const completed =
        getData(
            PLATFORM_KEYS.completedLessons,
            []
        );

    if (!Array.isArray(completed)) {
        return false;
    }

    return completed.includes(number);
}

function completeLesson(
    lessonNumber
) {
    const number =
        Number(lessonNumber);

    if (
        !Number.isFinite(number) ||
        number < 1
    ) {
        return false;
    }

    const completed =
        getData(
            PLATFORM_KEYS.completedLessons,
            []
        );

    const list =
        Array.isArray(completed)
            ? completed
            : [];

    if (!list.includes(number)) {
        list.push(number);
    }

    list.sort(
        (a, b) => a - b
    );

    saveData(
        PLATFORM_KEYS.completedLessons,
        list
    );

    window.dispatchEvent(
        new CustomEvent(
            "lessonCompleted",
            {
                detail: {
                    lessonNumber: number
                }
            }
        )
    );

    return true;
}

function getCompletedLessons() {
    const completed =
        getData(
            PLATFORM_KEYS.completedLessons,
            []
        );

    return Array.isArray(completed)
        ? completed
        : [];
}

function getLearningProgress() {
    const completed =
        getCompletedLessons();

    return {
        completed,
        total: TOTAL_LESSONS,

        percentage:
            TOTAL_LESSONS > 0
                ? Math.round(
                    (
                        completed.length /
                        TOTAL_LESSONS
                    ) * 100
                )
                : 0
    };
}

/* =========================================================
   STUDENT POINTS
   ========================================================= */

function getStudentPoints() {
    const points =
        Number(
            getData(
                PLATFORM_KEYS.studentPoints,
                0
            )
        );

    if (
        !Number.isFinite(points) ||
        points < 0
    ) {
        return 0;
    }

    return Math.floor(points);
}

function setStudentPoints(points) {
    const numericPoints =
        Number(points);

    if (
        !Number.isFinite(numericPoints) ||
        numericPoints < 0
    ) {
        return false;
    }

    saveData(
        PLATFORM_KEYS.studentPoints,
        Math.floor(numericPoints)
    );

    window.dispatchEvent(
        new CustomEvent(
            "studentPointsChanged",
            {
                detail: {
                    points:
                        Math.floor(
                            numericPoints
                        )
                }
            }
        )
    );

    return true;
}

function addStudentPoints(
    amount
) {
    const numericAmount =
        Number(amount);

    if (
        !Number.isFinite(numericAmount)
    ) {
        return false;
    }

    const current =
        getStudentPoints();

    return setStudentPoints(
        current + numericAmount
    );
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

function applySiteTheme(
    theme = getSiteTheme()
) {
    const safeTheme =
        theme === "dark"
            ? "dark"
            : "light";

    document.documentElement.dataset.theme =
        safeTheme;

    document.documentElement.classList.toggle(
        "dark",
        safeTheme === "dark"
    );

    localStorage.setItem(
        GLOBAL_THEME_KEY,
        safeTheme
    );

    updateThemeControls(
        safeTheme
    );

    syncLegacySettings();

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

    return safeTheme;
}

function toggleDarkMode() {
    const current =
        getSiteTheme();

    return applySiteTheme(
        current === "dark"
            ? "light"
            : "dark"
    );
}

function updateThemeControls(
    theme = getSiteTheme()
) {
    const isDark =
        theme === "dark";

    document
        .querySelectorAll(
            "[data-theme-toggle]"
        )
        .forEach(button => {
            button.setAttribute(
                "aria-pressed",
                String(isDark)
            );

            button.classList.toggle(
                "active",
                isDark
            );
        });

    document
        .querySelectorAll(
            ".theme-toggle"
        )
        .forEach(button => {
            button.setAttribute(
                "aria-pressed",
                String(isDark)
            );
        });

    document
        .querySelectorAll(
            "#themeToggle"
        )
        .forEach(input => {
            if (
                input instanceof HTMLInputElement
            ) {
                input.checked = isDark;
            }
        });
}

/* =========================================================
   LANGUAGE
   ========================================================= */

function getSiteLanguage() {
    const stored =
        localStorage.getItem(
            GLOBAL_LANGUAGE_KEY
        );

    return stored === "fr"
        ? "fr"
        : "ar";
}

const GLOBAL_TRANSLATIONS = {
    ar: {
        nav_home: "الرئيسية",
        nav_library: "المكتبة",
        nav_forum: "المنتدى",
        nav_challenge: "التحدي",

        level_concours: "مسابقة 6AF",
        level_concours_subtitle:
            "التحضير لمسابقات التعليم",

        level_brevet: "4ème / Brevet",
        level_brevet_subtitle:
            "التحضير لشهادة التعليم الإعدادي",

        level_bac: "البكالوريا",
        level_bac_subtitle:
            "التحضير لامتحان البكالوريا",

        bac_branch_c:
            "البكالوريا C",

        bac_branch_d:
            "البكالوريا D",

        subject_mathematics:
            "الرياضيات",

        subject_mathematics_c:
            "الرياضيات",

        subject_mathematics_d:
            "الرياضيات",

        subject_arabic:
            "العربية",

        subject_french:
            "الفرنسية",

        subject_natural_sciences:
            "العلوم الطبيعية",

        subject_physics_chemistry:
            "الفيزياء والكيمياء",

        subject_physics:
            "الفيزياء",

        subject_chemistry:
            "الكيمياء",

        subject_sciences:
            "العلوم",

        chapter:
            "الفصل",

        chapters:
            "الفصول",

        video:
            "الفيديو",

        videos:
            "الفيديوهات",

        free:
            "مجاني",

        locked:
            "مقفل",

        unavailable:
            "غير متاح",

        continue_learning:
            "متابعة التعلم",

        start_learning:
            "ابدأ التعلم",

        choose_level:
            "اختر المستوى",

        choose_subject:
            "اختر المادة",

        choose_chapter:
            "اختر الفصل",

        no_content:
            "لا يوجد محتوى متاح حاليًا",

        coming_soon:
            "هذه الميزة ستكون متاحة قريبًا",

        login_required:
            "يجب تسجيل الدخول أولًا",

        saved_successfully:
            "تم الحفظ بنجاح",

        error_occurred:
            "حدث خطأ، حاول مرة أخرى",

        points:
            "النقاط",

        lessons:
            "الدروس",

        badges:
            "الشارات",

        ranking:
            "الترتيب",

        subscriptions:
            "الاشتراكات",

        settings:
            "الإعدادات",

        account:
            "الحساب",

        notifications:
            "الإشعارات",

        language:
            "اللغة",

        theme:
            "المظهر",

        light:
            "فاتح",

        dark:
            "داكن",

        back:
            "رجوع",

        next:
            "التالي",

        previous:
            "السابق",

        completed:
            "مكتمل",

        mark_completed:
            "تحديد كمكتمل",

        watch_video:
            "مشاهدة الفيديو",

        video_locked_message:
            "هذا الفيديو مقفل حاليًا",

        first_video_free:
            "الفيديو الأول مجاني",

        max_videos_message:
            "الحد الأقصى 20 فيديو لكل فصل"
    },

    fr: {
        nav_home: "Accueil",
        nav_library: "Bibliothèque",
        nav_forum: "Forum",
        nav_challenge: "Défi",

        level_concours: "Concours 6AF",
        level_concours_subtitle:
            "Préparation aux concours scolaires",

        level_brevet: "4ème / Brevet",
        level_brevet_subtitle:
            "Préparation au Brevet",

        level_bac: "Baccalauréat",
        level_bac_subtitle:
            "Préparation au Baccalauréat",

        bac_branch_c:
            "Baccalauréat C",

        bac_branch_d:
            "Baccalauréat D",

        subject_mathematics:
            "Mathématiques",

        subject_mathematics_c:
            "Mathématiques",

        subject_mathematics_d:
            "Mathématiques",

        subject_arabic:
            "Arabe",

        subject_french:
            "Français",

        subject_natural_sciences:
            "Sciences naturelles",

        subject_physics_chemistry:
            "Physique et Chimie",

        subject_physics:
            "Physique",

        subject_chemistry:
            "Chimie",

        subject_sciences:
            "Sciences",

        chapter:
            "Chapitre",

        chapters:
            "Chapitres",

        video:
            "Vidéo",

        videos:
            "Vidéos",

        free:
            "Gratuit",

        locked:
            "Verrouillé",

        unavailable:
            "Indisponible",

        continue_learning:
            "Continuer l'apprentissage",

        start_learning:
            "Commencer",

        choose_level:
            "Choisir le niveau",

        choose_subject:
            "Choisir la matière",

        choose_chapter:
            "Choisir le chapitre",

        no_content:
            "Aucun contenu disponible pour le moment",

        coming_soon:
            "Cette fonctionnalité sera bientôt disponible",

        login_required:
            "Veuillez vous connecter d'abord",

        saved_successfully:
            "Enregistré avec succès",

        error_occurred:
            "Une erreur est survenue, réessayez",

        points:
            "Points",

        lessons:
            "Leçons",

        badges:
            "Badges",

        ranking:
            "Classement",

        subscriptions:
            "Abonnements",

        settings:
            "Paramètres",

        account:
            "Compte",

        notifications:
            "Notifications",

        language:
            "Langue",

        theme:
            "Thème",

        light:
            "Clair",

        dark:
            "Sombre",

        back:
            "Retour",

        next:
            "Suivant",

        previous:
            "Précédent",

        completed:
            "Terminé",

        mark_completed:
            "Marquer comme terminé",

        watch_video:
            "Regarder la vidéo",

        video_locked_message:
            "Cette vidéo est actuellement verrouillée",

        first_video_free:
            "La première vidéo est gratuite",

        max_videos_message:
            "Maximum de 20 vidéos par chapitre"
    }
};

function translateText(
    key,
    fallback = ""
) {
    const language =
        getSiteLanguage();

    const dictionary =
        GLOBAL_TRANSLATIONS[
            language
        ] || GLOBAL_TRANSLATIONS.ar;

    return (
        dictionary[key] ??
        fallback ??
        key
    );
}

function applySiteLanguage(
    language = getSiteLanguage()
) {
    const safeLanguage =
        language === "fr"
            ? "fr"
            : "ar";

    const direction =
        safeLanguage === "ar"
            ? "rtl"
            : "ltr";

    document.documentElement.lang =
        safeLanguage;

    document.documentElement.dir =
        direction;

    document.body?.setAttribute(
        "dir",
        direction
    );

    localStorage.setItem(
        GLOBAL_LANGUAGE_KEY,
        safeLanguage
    );

    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(element => {
            const key =
                element.getAttribute(
                    "data-i18n"
                );

            if (!key) return;

            const translated =
                translateText(
                    key,
                    element.textContent
                );

            element.textContent =
                translated;
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

            if (!key) return;

            element.setAttribute(
                "placeholder",
                translateText(
                    key,
                    element.getAttribute(
                        "placeholder"
                    ) || ""
                )
            );
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

            if (!key) return;

            element.setAttribute(
                "title",
                translateText(
                    key,
                    element.getAttribute(
                        "title"
                    ) || ""
                )
            );
        });

    updateLanguageControls(
        safeLanguage
    );

    syncLegacySettings();

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

function updateLanguageControls(
    language = getSiteLanguage()
) {
    document
        .querySelectorAll(
            "[data-language]"
        )
        .forEach(button => {
            const value =
                button.getAttribute(
                    "data-language"
                );

            const active =
                value === language;

            button.classList.toggle(
                "active",
                active
            );

            button.setAttribute(
                "aria-pressed",
                String(active)
            );
        });

    document
        .querySelectorAll(
            "[data-lang-toggle]"
        )
        .forEach(button => {
            button.setAttribute(
                "aria-pressed",
                "false"
            );
        });
}

function toggleLanguage() {
    const current =
        getSiteLanguage();

    return applySiteLanguage(
        current === "ar"
            ? "fr"
            : "ar"
    );
}

/* =========================================================
   EDUCATION LABEL HELPERS
   ========================================================= */

function getLevelLabel(
    level = getStudentLevel()
) {
    const safeLevel =
        normalizeStudentLevel(level);

    const definition =
        getLevelDefinition(
            safeLevel
        );

    if (!definition) {
        return "";
    }

    return translateText(
        definition.titleKey,
        definition.id
    );
}

function getLevelSubtitle(
    level = getStudentLevel()
) {
    const safeLevel =
        normalizeStudentLevel(level);

    const definition =
        getLevelDefinition(
            safeLevel
        );

    if (!definition) {
        return "";
    }

    return translateText(
        definition.subtitleKey,
        ""
    );
}

function getBacBranchLabel(
    branch = getBacBranch()
) {
    const definition =
        getBacBranchDefinition(
            branch
        );

    if (!definition) {
        return "";
    }

    return translateText(
        definition.titleKey,
        definition.id
    );
}

function getSubjectLabel(
    subjectId,
    level = getStudentLevel(),
    branch = getBacBranch()
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

    return translateText(
        definition.titleKey,
        definition.id
    );
}/* =========================================================
   LEGACY SETTINGS SYNC
   ========================================================= */

function syncLegacySettings() {
    const settings = {
        theme: getSiteTheme(),
        language: getSiteLanguage()
    };

    saveData(
        PLATFORM_KEYS.platformSettings,
        settings
    );

    return settings;
}

/* =========================================================
   DOM HELPERS
   ========================================================= */

function setText(
    selector,
    value
) {
    const element =
        typeof selector === "string"
            ? document.querySelector(selector)
            : selector;

    if (!element) {
        return false;
    }

    element.textContent =
        value ?? "";

    return true;
}

function show(
    selector
) {
    const element =
        typeof selector === "string"
            ? document.querySelector(selector)
            : selector;

    if (!element) {
        return false;
    }

    element.hidden = false;

    element.classList.remove(
        "hidden"
    );

    return true;
}

function hide(
    selector
) {
    const element =
        typeof selector === "string"
            ? document.querySelector(selector)
            : selector;

    if (!element) {
        return false;
    }

    element.hidden = true;

    element.classList.add(
        "hidden"
    );

    return true;
}

function toggle(
    selector,
    force
) {
    const element =
        typeof selector === "string"
            ? document.querySelector(selector)
            : selector;

    if (!element) {
        return false;
    }

    const shouldShow =
        typeof force === "boolean"
            ? force
            : element.hidden;

    if (shouldShow) {
        show(element);
    } else {
        hide(element);
    }

    return shouldShow;
}

/* =========================================================
   BUTTON STATE
   ========================================================= */

function setButtonLoading(
    button,
    loading = true,
    loadingText = "..."
) {
    const element =
        typeof button === "string"
            ? document.querySelector(button)
            : button;

    if (!element) {
        return false;
    }

    if (loading) {
        if (
            element.dataset.originalText ===
            undefined
        ) {
            element.dataset.originalText =
                element.textContent;
        }

        element.disabled = true;

        element.setAttribute(
            "aria-busy",
            "true"
        );

        element.textContent =
            loadingText;
    } else {
        resetButton(element);
    }

    return true;
}

function resetButton(
    button
) {
    const element =
        typeof button === "string"
            ? document.querySelector(button)
            : button;

    if (!element) {
        return false;
    }

    if (
        element.dataset.originalText !==
        undefined
    ) {
        element.textContent =
            element.dataset.originalText;

        delete element.dataset.originalText;
    }

    element.disabled = false;

    element.removeAttribute(
        "aria-busy"
    );

    return true;
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function notify(
    message,
    type = "info",
    duration = 3000
) {
    if (!message) {
        return false;
    }

    let container =
        document.querySelector(
            "#edunova-notifications"
        );

    if (!container) {
        container =
            document.createElement("div");

        container.id =
            "edunova-notifications";

        container.setAttribute(
            "aria-live",
            "polite"
        );

        container.style.position =
            "fixed";

        container.style.top =
            "82px";

        container.style.left =
            "50%";

        container.style.transform =
            "translateX(-50%)";

        container.style.zIndex =
            "99999";

        container.style.width =
            "min(92%, 420px)";

        container.style.pointerEvents =
            "none";

        document.body.appendChild(
            container
        );
    }

    const notification =
        document.createElement("div");

    notification.textContent =
        String(message);

    notification.dataset.type =
        String(type);

    notification.style.pointerEvents =
        "auto";

    notification.style.padding =
        "12px 16px";

    notification.style.marginBottom =
        "8px";

    notification.style.borderRadius =
        "14px";

    notification.style.background =
        "var(--card-bg, #ffffff)";

    notification.style.color =
        "var(--text-color, #111111)";

    notification.style.border =
        "1px solid var(--border-color, #e5e7eb)";

    notification.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.10)";

    notification.style.textAlign =
        "center";

    notification.style.fontSize =
        "14px";

    notification.style.transition =
        "opacity .25s ease, transform .25s ease";

    container.appendChild(
        notification
    );

    window.setTimeout(() => {
        notification.style.opacity =
            "0";

        notification.style.transform =
            "translateY(-6px)";

        window.setTimeout(() => {
            notification.remove();
        }, 250);
    }, Math.max(500, duration));

    return true;
}

/* =========================================================
   CONFIRMATION
   ========================================================= */

function confirmAction(
    message,
    callback
) {
    const confirmed =
        window.confirm(
            String(
                message ||
                translateText(
                    "confirm_action",
                    "هل أنت متأكد؟"
                )
            )
        );

    if (
        confirmed &&
        typeof callback === "function"
    ) {
        callback();
    }

    return confirmed;
}

/* =========================================================
   CURRENT YEAR
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
                String(year);
        });

    const currentYearElement =
        document.querySelector(
            "#currentYear"
        );

    if (currentYearElement) {
        currentYearElement.textContent =
            String(year);
    }

    return year;
}

/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function setActiveNav(
    page
) {
    const requestedPage =
        String(
            page ||
            window.location.pathname
                .split("/")
                .pop() ||
            "index.html"
        )
            .split("?")[0]
            .split("#")[0];

    document
        .querySelectorAll(
            ".nav-link, [data-nav]"
        )
        .forEach(link => {
            const href =
                link.getAttribute(
                    "href"
                );

            const dataNav =
                link.getAttribute(
                    "data-nav"
                );

            const target =
                String(
                    dataNav ||
                    href ||
                    ""
                )
                    .split("?")[0]
                    .split("#")[0]
                    .split("/")
                    .pop();

            const normalizedTarget =
                target || "index.html";

            const active =
                normalizedTarget ===
                requestedPage;

            link.classList.toggle(
                "active",
                active
            );

            if (active) {
                link.setAttribute(
                    "aria-current",
                    "page"
                );
            } else {
                link.removeAttribute(
                    "aria-current"
                );
            }
        });

    return true;
}

/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function scrollToElement(
    selector,
    offset = 0
) {
    const element =
        typeof selector === "string"
            ? document.querySelector(selector)
            : selector;

    if (!element) {
        return false;
    }

    const top =
        element.getBoundingClientRect()
            .top +
        window.scrollY -
        Number(offset || 0);

    window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth"
    });

    return true;
}

/* =========================================================
   SAFE HTML
   ========================================================= */

function escapeHTML(
    value
) {
    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    const div =
        document.createElement("div");

    div.textContent =
        String(value);

    return div.innerHTML;
}

/* =========================================================
   PAGE UTILITIES
   ========================================================= */

function addClass(
    selector,
    className
) {
    const element =
        typeof selector === "string"
            ? document.querySelector(selector)
            : selector;

    if (!element || !className) {
        return false;
    }

    element.classList.add(
        className
    );

    return true;
}

function removeClass(
    selector,
    className
) {
    const element =
        typeof selector === "string"
            ? document.querySelector(selector)
            : selector;

    if (!element || !className) {
        return false;
    }

    element.classList.remove(
        className
    );

    return true;
}

function exists(
    selector
) {
    if (
        typeof selector !== "string"
    ) {
        return Boolean(selector);
    }

    return Boolean(
        document.querySelector(selector)
    );
}

/* =========================================================
   DEVICE
   ========================================================= */

function isMobile() {
    return window.matchMedia(
        "(max-width: 768px)"
    ).matches;
}

/* =========================================================
   GLOBAL SETTINGS CONTROLS
   ========================================================= */

function initializeGlobalSettings() {
    const theme =
        getSiteTheme();

    const language =
        getSiteLanguage();

    applySiteTheme(
        theme
    );

    applySiteLanguage(
        language
    );

    document
        .querySelectorAll(
            "[data-theme-toggle]"
        )
        .forEach(button => {
            if (
                button.dataset.bound ===
                "true"
            ) {
                return;
            }

            button.dataset.bound =
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
                button.dataset.bound ===
                "true"
            ) {
                return;
            }

            button.dataset.bound =
                "true";

            button.addEventListener(
                "click",
                () => {
                    const language =
                        button.getAttribute(
                            "data-language"
                        );

                    applySiteLanguage(
                        language
                    );
                }
            );
        });

    document
        .querySelectorAll(
            "[data-lang-toggle]"
        )
        .forEach(button => {
            if (
                button.dataset.bound ===
                "true"
            ) {
                return;
            }

            button.dataset.bound =
                "true";

            button.addEventListener(
                "click",
                () => {
                    toggleLanguage();
                }
            );
        });

    const themeToggle =
        document.querySelector(
            "#themeToggle"
        );

    if (
        themeToggle &&
        !themeToggle.dataset.bound
    ) {
        themeToggle.dataset.bound =
            "true";

        themeToggle.addEventListener(
            "change",
            event => {
                applySiteTheme(
                    event.target.checked
                        ? "dark"
                        : "light"
                );
            }
        );
    }

    return true;
}

/* =========================================================
   EARLY THEME
   ---------------------------------------------------------
   Prevents unnecessary light/dark flashing during load.
   ========================================================= */

(function earlyTheme() {
    try {
        const stored =
            localStorage.getItem(
                GLOBAL_THEME_KEY
            );

        const theme =
            stored === "dark"
                ? "dark"
                : DEFAULT_THEME;

        document.documentElement.dataset.theme =
            theme;

        document.documentElement.classList.toggle(
            "dark",
            theme === "dark"
        );
    } catch (error) {
        console.warn(
            "EduNova early theme error:",
            error
        );
    }
})();

/* =========================================================
   EARLY LANGUAGE
   ========================================================= */

(function earlyLanguage() {
    try {
        const stored =
            localStorage.getItem(
                GLOBAL_LANGUAGE_KEY
            );

        const language =
            stored === "fr"
                ? "fr"
                : DEFAULT_LANGUAGE;

        document.documentElement.lang =
            language;

        document.documentElement.dir =
            language === "ar"
                ? "rtl"
                : "ltr";
    } catch (error) {
        console.warn(
            "EduNova early language error:",
            error
        );
    }
})();

/* =========================================================
   CROSS-TAB / CROSS-PAGE STORAGE SYNC
   ========================================================= */

window.addEventListener(
    "storage",
    event => {
        if (
            event.key ===
            GLOBAL_THEME_KEY
        ) {
            applySiteTheme(
                event.newValue === "dark"
                    ? "dark"
                    : "light"
            );

            return;
        }

        if (
            event.key ===
            GLOBAL_LANGUAGE_KEY
        ) {
            applySiteLanguage(
                event.newValue === "fr"
                    ? "fr"
                    : "ar"
            );

            return;
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
                                normalizeStudentLevel(
                                    event.newValue
                                )
                        }
                    }
                )
            );

            return;
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
                                String(
                                    event.newValue ||
                                    ""
                                ).toUpperCase()
                        }
                    }
                )
            );

            return;
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

            return;
        }

        if (
            event.key ===
            PLATFORM_KEYS.studentPoints
        ) {
            window.dispatchEvent(
                new CustomEvent(
                    "studentPointsChanged",
                    {
                        detail: {
                            points:
                                Number(
                                    event.newValue ||
                                    0
                                )
                        }
                    }
                )
            );
        }
    }
);

/* =========================================================
   GLOBAL DOM INITIALIZATION
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

        updateThemeControls(
            getSiteTheme()
        );

        updateLanguageControls(
            getSiteLanguage()
        );
    }
);

/* =========================================================
   PLATFORM READY EVENT
   ========================================================= */

window.dispatchEvent(
    new CustomEvent(
        "eduNovaScriptReady"
    )
);