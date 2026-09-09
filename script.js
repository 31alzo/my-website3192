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
   DEMO CURRICULUM GENERATOR
   ---------------------------------------------------------
   5 chapters are generated for every subject.
   Every chapter contains a variable number of videos.
   The number of videos is ALWAYS below 20.

   This is temporary demonstration content.
   Real curriculum will replace it later without changing
   the structure of Library / Chapter / Video pages.
   ========================================================= */

const DEMO_VIDEO_COUNTS = [
    7,
    9,
    6,
    10,
    8
];

const DEMO_VIDEO_DURATIONS = [
    "08:32",
    "12:15",
    "09:48",
    "14:20",
    "07:55",
    "11:36",
    "16:10",
    "10:24",
    "13:42",
    "06:58",
    "15:05",
    "09:17"
];

function createDemoVideos(
    subjectId,
    chapterNumber,
    count
) {
    const safeCount = Math.max(
        1,
        Math.min(
            PLATFORM_LIMITS.maxVideosPerChapter - 1,
            Number(count) || 1
        )
    );

    const videos = [];

    for (
        let index = 0;
        index < safeCount;
        index++
    ) {
        const number = index + 1;

        const duration =
            DEMO_VIDEO_DURATIONS[
                (
                    index +
                    chapterNumber +
                    String(subjectId).length
                ) %
                DEMO_VIDEO_DURATIONS.length
            ];

        videos.push({
            id:
                `${subjectId}-ch${chapterNumber}-v${number}`,

            number,

            title: {
                ar:
                    `الفيديو التجريبي ${number}`,
                fr:
                    `Vidéo de démonstration ${number}`
            },

            description: {
                ar:
                    `شرح تجريبي للفصل ${chapterNumber} — الفيديو ${number}.`,
                fr:
                    `Démonstration du chapitre ${chapterNumber} — vidéo ${number}.`
            },

            duration,

            videoUrl: "",

            free:
                number ===
                PLATFORM_LIMITS.firstFreeVideoNumber,

            locked:
                number >
                PLATFORM_LIMITS.firstFreeVideoNumber
        });
    }

    return videos;
}

function createDemoChapters(
    subjectId
) {
    return Array.from(
        { length: 5 },
        (_, index) => {
            const chapterNumber =
                index + 1;

            return {
                id:
                    `${subjectId}-chapter-${chapterNumber}`,

                number:
                    chapterNumber,

                title: {
                    ar:
                        `الفصل التجريبي ${chapterNumber}`,
                    fr:
                        `Chapitre de démonstration ${chapterNumber}`
                },

                description: {
                    ar:
                        `محتوى تجريبي للفصل ${chapterNumber} سيتم استبداله بالمحتوى الدراسي الحقيقي لاحقًا.`,
                    fr:
                        `Contenu de démonstration du chapitre ${chapterNumber}, qui sera remplacé par le contenu réel plus tard.`
                },

                videos:
                    createDemoVideos(
                        subjectId,
                        chapterNumber,
                        DEMO_VIDEO_COUNTS[index]
                    )
            };
        }
    );
}

function createEmptyCurriculumFromStructure() {
    const curriculum = {
        concours: {},
        brevet: {},
        bac: {
            C: {},
            D: {}
        }
    };

    const safeStructure =
        EDU_STRUCTURE || {};

    Object.keys(
        safeStructure
    ).forEach(level => {
        const definition =
            safeStructure[level];

        if (!definition) {
            return;
        }

        if (
            level === "bac"
        ) {
            const branches =
                definition.branches || {};

            Object.keys(
                branches
            ).forEach(branch => {
                const subjects =
                    branches[branch]
                        ?.subjects || [];

                subjects.forEach(
                    subject => {
                        curriculum.bac[
                            branch
                        ][subject.id] = [];
                    }
                );
            });

            return;
        }

        const subjects =
            definition.subjects || [];

        subjects.forEach(
            subject => {
                curriculum[level][
                    subject.id
                ] = [];
            }
        );
    });

    return curriculum;
}

function buildDemoCurriculum() {
    const curriculum =
        createEmptyCurriculumFromStructure();

    Object.keys(
        EDU_STRUCTURE
    ).forEach(level => {
        const definition =
            EDU_STRUCTURE[level];

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
                        .branches[branch]
                        ?.subjects || [];

                subjects.forEach(
                    subject => {
                        curriculum.bac[
                            branch
                        ][subject.id] =
                            createDemoChapters(
                                subject.id
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
                curriculum[level][
                    subject.id
                ] =
                    createDemoChapters(
                        subject.id
                    );
            }
        );
    });

    return curriculum;
}

/* =========================================================
   CENTRAL CURRICULUM DATA
   ========================================================= */

const CURRICULUM_DATA =
    buildDemoCurriculum();

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

function goBack(
    fallback = "dashboard.html"
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

/* =========================================================
   LOCAL STORAGE HELPERS
   ========================================================= */

function saveData(
    key,
    value
) {
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

function getData(
    key,
    fallback = null
) {
    try {
        const raw =
            localStorage.getItem(
                key
            );

        if (
            raw === null
        ) {
            return fallback;
        }

        return JSON.parse(
            raw
        );
    } catch (error) {
        console.error(
            "EduNova getData error:",
            error
        );

        return fallback;
    }
}

function removeData(
    key
) {
    try {
        localStorage.removeItem(
            key
        );

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
*/

function normalizeStudentLevel(
    level
) {
    const value =
        String(
            level || ""
        )
            .trim()
            .toLowerCase();

    if (
        value === "bac_c"
    ) {
        return "bac";
    }

    if (
        value === "bac_d"
    ) {
        return "bac";
    }

    return value;
}

function getLegacyBacBranchFromLevel(
    level
) {
    const value =
        String(
            level || ""
        )
            .trim()
            .toLowerCase();

    if (
        value === "bac_c"
    ) {
        return "C";
    }

    if (
        value === "bac_d"
    ) {
        return "D";
    }

    return "";
}

function getStudentLevel() {
    const rawLevel =
        getData(
            PLATFORM_KEYS.studentLevel,
            ""
        );

    const normalizedLevel =
        normalizeStudentLevel(
            rawLevel
        );

    if (
        rawLevel !==
            normalizedLevel &&
        normalizedLevel ===
            "bac"
    ) {
        saveData(
            PLATFORM_KEYS.studentLevel,
            normalizedLevel
        );

        const inferredBranch =
            getLegacyBacBranchFromLevel(
                rawLevel
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

    return normalizedLevel;
}

function setStudentLevel(
    level
) {
    const rawLevel =
        String(
            level || ""
        ).trim();

    const normalizedLevel =
        normalizeStudentLevel(
            rawLevel
        );

    const inferredBranch =
        getLegacyBacBranchFromLevel(
            rawLevel
        );

    if (
        !isValidLevel(
            normalizedLevel
        )
    ) {
        return false;
    }

    saveData(
        PLATFORM_KEYS.studentLevel,
        normalizedLevel
    );

    clearSelectedLearningAfterLevelChange();

    if (
        normalizedLevel ===
            "bac" &&
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
                        normalizedLevel,

                    rawLevel,

                    bacBranch:
                        inferredBranch ||
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
    const branch =
        getData(
            PLATFORM_KEYS.bacBranch,
            ""
        );

    if (
        !isValidBacBranch(
            branch
        )
    ) {
        return "";
    }

    return String(
        branch
    ).toUpperCase();
}

function setBacBranch(
    branch
) {
    const safeBranch =
        String(
            branch || ""
        )
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

/* =========================================================
   EDUCATION VALIDATION
   ========================================================= */

function isValidLevel(
    level
) {
    const safeLevel =
        normalizeStudentLevel(
            level
        );

    return [
        "concours",
        "brevet",
        "bac"
    ].includes(
        safeLevel
    );
}

function isValidBacBranch(
    branch
) {
    const safeBranch =
        String(
            branch || ""
        )
            .trim()
            .toUpperCase();

    return [
        "C",
        "D"
    ].includes(
        safeBranch
    );
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

function getLevelDefinition(
    level = getStudentLevel()
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
        return null;
    }

    return (
        EDU_STRUCTURE[
            safeLevel
        ] || null
    );
}

function getBacBranchDefinition(
    branch = getBacBranch()
) {
    const safeBranch =
        String(
            branch || ""
        )
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
            String(
                branch || ""
            )
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
                ]
                ?.subjects || []
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
                subject.id ===
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

    if (
        subjectType
    ) {
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
                        String(
                            subjectId
                        ),

                    subjectType:
                        String(
                            subjectType ||
                            ""
                        )
                }
            }
        )
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

function setSelectedChapter(
    chapter
) {
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
        new CustomEvent(
            "chapterChanged",
            {
                detail: {
                    chapter
                }
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
   VIDEO SELECTION
   ========================================================= */

function getSelectedVideo() {
    return getData(
        PLATFORM_KEYS.selectedVideo,
        null
    );
}

function setSelectedVideo(
    video
) {
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
        level:
            getStudentLevel(),

        branch:
            getBacBranch(),

        subject:
            getSelectedSubject(),

        chapter:
            getSelectedChapter(),

        video
    });

    window.dispatchEvent(
        new CustomEvent(
            "videoChanged",
            {
                detail: {
                    video
                }
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
   LEARNING SELECTION STATE
   ========================================================= */

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
            String(
                branch || ""
            )
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
            CURRICULUM_DATA
                .bac?.[
                    safeBranch
                ]?.[
                    subject
                ] || []
        );
    }

    return (
        CURRICULUM_DATA?.[
            safeLevel
        ]?.[
            subject
        ] || []
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

    if (
        !Array.isArray(
            chapters
        )
    ) {
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
                String(
                    chapter?.id
                ) ===
                String(
                    chapterId
                )
        ) || null
    );
}

/* =========================================================
   VIDEO NORMALIZATION
   ========================================================= */

function normalizeChapterVideos(
    videos
) {
    if (
        !Array.isArray(
            videos
        )
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
                const number =
                    Number(
                        video?.number ??
                        index + 1
                    );

                const safeNumber =
                    Number.isFinite(
                        number
                    ) &&
                    number >=
                        PLATFORM_LIMITS
                            .minimumVideoNumber
                        ? number
                        : index + 1;

                return {
                    ...video,

                    number:
                        safeNumber,

                    free:
                        safeNumber ===
                        PLATFORM_LIMITS
                            .firstFreeVideoNumber,

                    locked:
                        safeNumber >
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

/* =========================================================
   VIDEO ACCESS
   ========================================================= */

function isVideoFree(
    video
) {
    if (!video) {
        return false;
    }

    return (
        Number(
            video.number
        ) ===
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

function getVideoAccessState(
    video
) {
    if (!video) {
        return "unavailable";
    }

    if (
        isVideoFree(
            video
        )
    ) {
        return "free";
    }

    return "locked";
}/* =========================================================
   CURRICULUM DATA — DEMO CONTENT
   ========================================================= */

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

const DEMO_VIDEO_COUNTS = [
    8,
    6,
    10,
    7,
    9
];

const DEMO_CHAPTER_TITLES = {
    chapter_1: {
        ar: "الفصل التجريبي 1",
        fr: "Chapitre démo 1"
    },
    chapter_2: {
        ar: "الفصل التجريبي 2",
        fr: "Chapitre démo 2"
    },
    chapter_3: {
        ar: "الفصل التجريبي 3",
        fr: "Chapitre démo 3"
    },
    chapter_4: {
        ar: "الفصل التجريبي 4",
        fr: "Chapitre démo 4"
    },
    chapter_5: {
        ar: "الفصل التجريبي 5",
        fr: "Chapitre démo 5"
    }
};

const DEMO_VIDEO_TITLES = {
    video_1: {
        ar: "الفيديو التجريبي 1",
        fr: "Vidéo démo 1"
    },
    video_2: {
        ar: "الفيديو التجريبي 2",
        fr: "Vidéo démo 2"
    },
    video_3: {
        ar: "الفيديو التجريبي 3",
        fr: "Vidéo démo 3"
    },
    video_4: {
        ar: "الفيديو التجريبي 4",
        fr: "Vidéo démo 4"
    },
    video_5: {
        ar: "الفيديو التجريبي 5",
        fr: "Vidéo démo 5"
    },
    video_6: {
        ar: "الفيديو التجريبي 6",
        fr: "Vidéo démo 6"
    },
    video_7: {
        ar: "الفيديو التجريبي 7",
        fr: "Vidéo démo 7"
    },
    video_8: {
        ar: "الفيديو التجريبي 8",
        fr: "Vidéo démo 8"
    },
    video_9: {
        ar: "الفيديو التجريبي 9",
        fr: "Vidéo démo 9"
    },
    video_10: {
        ar: "الفيديو التجريبي 10",
        fr: "Vidéo démo 10"
    }
};


/* =========================================================
   DEMO CURRICULUM HELPERS
   ========================================================= */

function createDemoVideos(count) {
    const safeCount = Math.min(
        Math.max(Number(count) || 1, 1),
        PLATFORM_LIMITS.maxVideosPerChapter - 1
    );

    return Array.from(
        { length: safeCount },
        (_, index) => {
            const number = index + 1;
            const videoId = `video_${number}`;

            return {
                id: videoId,
                number,
                titleKey: videoId,
                title: DEMO_VIDEO_TITLES[videoId],
                duration:
                    DEMO_VIDEO_DURATIONS[index] ||
                    DEMO_VIDEO_DURATIONS[
                        index % DEMO_VIDEO_DURATIONS.length
                    ],
                videoUrl: "",
                isDemo: true
            };
        }
    );
}


function createDemoChapters() {
    return Array.from(
        { length: 5 },
        (_, index) => {
            const number = index + 1;
            const chapterId = `chapter_${number}`;

            return {
                id: chapterId,
                number,
                titleKey: chapterId,
                title: DEMO_CHAPTER_TITLES[chapterId],
                videos: createDemoVideos(
                    DEMO_VIDEO_COUNTS[index]
                )
            };
        }
    );
}


function createDemoSubject(
    subjectId,
    subjectNameAr,
    subjectNameFr,
    subjectType
) {
    return {
        id: subjectId,
        name: {
            ar: subjectNameAr,
            fr: subjectNameFr
        },
        title: {
            ar: subjectNameAr,
            fr: subjectNameFr
        },
        subjectType: subjectType || "subject",
        chapters: createDemoChapters()
    };
}


/* =========================================================
   CENTRAL CURRICULUM
   ========================================================= */

CURRICULUM_DATA.concours = {
    mathematics: createDemoSubject(
        "mathematics",
        "الرياضيات",
        "Mathématiques",
        "mathematics"
    ),

    arabic: createDemoSubject(
        "arabic",
        "العربية",
        "Arabe",
        "arabic"
    ),

    french: createDemoSubject(
        "french",
        "الفرنسية",
        "Français",
        "french"
    ),

    natural_sciences: createDemoSubject(
        "natural_sciences",
        "العلوم الطبيعية",
        "Sciences naturelles",
        "natural_sciences"
    )
};


CURRICULUM_DATA.brevet = {
    mathematics: createDemoSubject(
        "mathematics",
        "الرياضيات",
        "Mathématiques",
        "mathematics"
    ),

    physics_chemistry: createDemoSubject(
        "physics_chemistry",
        "الفيزياء والكيمياء",
        "Physique-Chimie",
        "physics_chemistry"
    ),

    natural_sciences: createDemoSubject(
        "natural_sciences",
        "العلوم الطبيعية",
        "Sciences naturelles",
        "natural_sciences"
    )
};


CURRICULUM_DATA.bac_c = {
    mathematics: createDemoSubject(
        "mathematics",
        "الرياضيات",
        "Mathématiques",
        "mathematics"
    ),

    sciences: createDemoSubject(
        "sciences",
        "العلوم",
        "Sciences",
        "sciences"
    ),

    physics: createDemoSubject(
        "physics",
        "الفيزياء",
        "Physique",
        "physics"
    ),

    chemistry: createDemoSubject(
        "chemistry",
        "الكيمياء",
        "Chimie",
        "chemistry"
    )
};


CURRICULUM_DATA.bac_d = {
    natural_sciences: createDemoSubject(
        "natural_sciences",
        "العلوم الطبيعية",
        "Sciences naturelles",
        "natural_sciences"
    ),

    mathematics: createDemoSubject(
        "mathematics",
        "الرياضيات",
        "Mathématiques",
        "mathematics"
    ),

    physics: createDemoSubject(
        "physics",
        "الفيزياء",
        "Physique",
        "physics"
    ),

    chemistry: createDemoSubject(
        "chemistry",
        "الكيمياء",
        "Chimie",
        "chemistry"
    )
};


/* =========================================================
   CURRICULUM ACCESS HELPERS
   ========================================================= */

function getCurriculumForLevel(level) {
    const normalizedLevel = normalizeStudentLevel(level);

    if (!normalizedLevel) {
        return {};
    }

    return CURRICULUM_DATA[normalizedLevel] || {};
}


function getSubjectsForLevel(level) {
    const curriculum = getCurriculumForLevel(level);

    return Object.values(curriculum);
}


function getSubjectData(level, subjectId) {
    const curriculum = getCurriculumForLevel(level);

    if (!subjectId) {
        return null;
    }

    return curriculum[subjectId] || null;
}


function getChaptersForSubject(level, subjectId) {
    const subject = getSubjectData(
        level,
        subjectId
    );

    if (!subject || !Array.isArray(subject.chapters)) {
        return [];
    }

    return subject.chapters;
}


function getChapterData(
    level,
    subjectId,
    chapterId
) {
    const chapters = getChaptersForSubject(
        level,
        subjectId
    );

    return (
        chapters.find(
            chapter =>
                String(chapter.id) === String(chapterId)
        ) || null
    );
}


function getVideosForChapter(
    level,
    subjectId,
    chapterId
) {
    const chapter = getChapterData(
        level,
        subjectId,
        chapterId
    );

    if (!chapter || !Array.isArray(chapter.videos)) {
        return [];
    }

    return chapter.videos;
}


function getVideoData(
    level,
    subjectId,
    chapterId,
    videoId
) {
    const videos = getVideosForChapter(
        level,
        subjectId,
        chapterId
    );

    return (
        videos.find(
            video =>
                String(video.id) === String(videoId)
        ) || null
    );
}


/* =========================================================
   CURRICULUM COUNTS
   ========================================================= */

function getChapterCount(
    level,
    subjectId
) {
    return getChaptersForSubject(
        level,
        subjectId
    ).length;
}


function getVideoCount(
    level,
    subjectId,
    chapterId
) {
    return getVideosForChapter(
        level,
        subjectId,
        chapterId
    ).length;
}


/* =========================================================
   VIDEO ACCESS
   ========================================================= */

function isVideoFree(video) {
    if (!video) {
        return false;
    }

    return Number(video.number) === 1;
}


function isVideoLocked(video) {
    return !isVideoFree(video);
}


function canAccessVideo(video) {
    return Boolean(
        video &&
        isVideoFree(video)
    );
}


/* =========================================================
   SUBJECT / CHAPTER / VIDEO SELECTION
   ========================================================= */

function saveSelectedSubject(
    subjectId,
    subjectType
) {
    if (subjectId) {
        localStorage.setItem(
            PLATFORM_KEYS.selectedSubject,
            String(subjectId)
        );
    }

    if (subjectType) {
        localStorage.setItem(
            PLATFORM_KEYS.selectedSubjectType,
            String(subjectType)
        );
    }
}


function getSelectedSubject() {
    return localStorage.getItem(
        PLATFORM_KEYS.selectedSubject
    ) || "";
}


function getSelectedSubjectType() {
    return localStorage.getItem(
        PLATFORM_KEYS.selectedSubjectType
    ) || "";
}


function saveSelectedChapter(chapterId) {
    if (!chapterId) {
        return;
    }

    localStorage.setItem(
        PLATFORM_KEYS.selectedChapter,
        String(chapterId)
    );
}


function getSelectedChapter() {
    return localStorage.getItem(
        PLATFORM_KEYS.selectedChapter
    ) || "";
}


function saveSelectedVideo(videoId) {
    if (!videoId) {
        return;
    }

    localStorage.setItem(
        PLATFORM_KEYS.selectedVideo,
        String(videoId)
    );
}


function getSelectedVideo() {
    return localStorage.getItem(
        PLATFORM_KEYS.selectedVideo
    ) || "";
}


/* =========================================================
   SAFE CURRICULUM LOOKUP
   ========================================================= */

function getCurrentSubject() {
    const level = getStudentLevel();
    const subjectId = getSelectedSubject();

    if (!level || !subjectId) {
        return null;
    }

    return getSubjectData(
        level,
        subjectId
    );
}


function getCurrentChapter() {
    const level = getStudentLevel();
    const subjectId = getSelectedSubject();
    const chapterId = getSelectedChapter();

    if (
        !level ||
        !subjectId ||
        !chapterId
    ) {
        return null;
    }

    return getChapterData(
        level,
        subjectId,
        chapterId
    );
}


function getCurrentVideo() {
    const level = getStudentLevel();
    const subjectId = getSelectedSubject();
    const chapterId = getSelectedChapter();
    const videoId = getSelectedVideo();

    if (
        !level ||
        !subjectId ||
        !chapterId ||
        !videoId
    ) {
        return null;
    }

    return getVideoData(
        level,
        subjectId,
        chapterId,
        videoId
    );
}


/* =========================================================
   SUBJECT NAVIGATION
   ========================================================= */

function openSubject(subjectId, subjectType) {
    saveSelectedSubject(
        subjectId,
        subjectType
    );

    localStorage.removeItem(
        PLATFORM_KEYS.selectedChapter
    );

    localStorage.removeItem(
        PLATFORM_KEYS.selectedVideo
    );

    window.location.href = "chapter.html";
}


function openChapter(chapterId) {
    saveSelectedChapter(chapterId);

    localStorage.removeItem(
        PLATFORM_KEYS.selectedVideo
    );

    window.location.href = "video.html";
}


function openVideo(videoId) {
    const video = getVideoData(
        getStudentLevel(),
        getSelectedSubject(),
        getSelectedChapter(),
        videoId
    );

    if (!video) {
        return;
    }

    saveSelectedVideo(videoId);

    window.location.href = "video.html";
}


/* =========================================================
   CURRICULUM VALIDATION
   ========================================================= */

function validateCurriculumStructure() {
    const levels = Object.keys(
        CURRICULUM_DATA
    );

    const report = {
        valid: true,
        levels: 0,
        subjects: 0,
        chapters: 0,
        videos: 0
    };

    levels.forEach(level => {
        const subjects =
            getSubjectsForLevel(level);

        report.levels += 1;
        report.subjects += subjects.length;

        subjects.forEach(subject => {
            const chapters =
                Array.isArray(subject.chapters)
                    ? subject.chapters
                    : [];

            report.chapters += chapters.length;

            chapters.forEach(chapter => {
                const videos =
                    Array.isArray(chapter.videos)
                        ? chapter.videos
                        : [];

                report.videos += videos.length;

                if (
                    videos.length >=
                    PLATFORM_LIMITS.maxVideosPerChapter
                ) {
                    report.valid = false;
                }
            });
        });
    });

    return report;
}


/* =========================================================
   DEMO CONTENT LABEL HELPERS
   ========================================================= */

function getLocalizedValue(
    value,
    language
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
    language
) {
    if (!chapter) {
        return "";
    }

    if (chapter.title) {
        return getLocalizedValue(
            chapter.title,
            language || getSiteLanguage()
        );
    }

    if (chapter.titleKey) {
        return translateText(
            chapter.titleKey,
            language || getSiteLanguage()
        );
    }

    return "";
}


function getVideoTitle(
    video,
    language
) {
    if (!video) {
        return "";
    }

    if (video.title) {
        return getLocalizedValue(
            video.title,
            language || getSiteLanguage()
        );
    }

    if (video.titleKey) {
        return translateText(
            video.titleKey,
            language || getSiteLanguage()
        );
    }

    return "";
}function getVideoDuration(video) {
    if (!video) {
        return "";
    }

    return video.duration || "";
}


function getVideoUrl(video) {
    if (!video) {
        return "";
    }

    return video.videoUrl || "";
}


/* =========================================================
   LANGUAGE TRANSLATIONS — HEADER + DEMO CONTENT
   ========================================================= */

Object.assign(
    GLOBAL_TRANSLATIONS.ar,
    {
        nav_home: "الرئيسية",
        nav_notifications: "الإشعارات",
        nav_account: "حسابي",
        nav_settings: "الإعدادات",

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
        demo_video_10: "الفيديو التجريبي 10"
    }
);


Object.assign(
    GLOBAL_TRANSLATIONS.fr,
    {
        nav_home: "Accueil",
        nav_notifications: "Notifications",
        nav_account: "Mon compte",
        nav_settings: "Paramètres",

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
        demo_video_10: "Vidéo démo 10"
    }
);


/* =========================================================
   HEADER TRANSLATION HELPERS
   ========================================================= */

function getHeaderTranslations(language) {
    const lang =
        language === "fr"
            ? "fr"
            : "ar";

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


function updateHeaderLanguage(language) {
    const translations =
        getHeaderTranslations(language);

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

    Object.keys(selectors).forEach(key => {
        document
            .querySelectorAll(selectors[key])
            .forEach(element => {
                element.textContent =
                    translations[key];
            });
    });
}


/* =========================================================
   DEMO CURRICULUM INFORMATION
   ========================================================= */

function getCurriculumSummary(level) {
    const subjects =
        getSubjectsForLevel(level);

    let chapters = 0;
    let videos = 0;

    subjects.forEach(subject => {
        const subjectChapters =
            Array.isArray(subject.chapters)
                ? subject.chapters
                : [];

        chapters +=
            subjectChapters.length;

        subjectChapters.forEach(chapter => {
            if (
                Array.isArray(chapter.videos)
            ) {
                videos +=
                    chapter.videos.length;
            }
        });
    });

    return {
        subjects: subjects.length,
        chapters,
        videos
    };
}


/* =========================================================
   PROGRESS HELPERS
   ========================================================= */

function getLearningProgress() {
    const raw =
        localStorage.getItem(
            PLATFORM_KEYS.learningProgress
        );

    if (!raw) {
        return {};
    }

    try {
        const parsed =
            JSON.parse(raw);

        return parsed &&
            typeof parsed === "object"
            ? parsed
            : {};
    } catch (error) {
        return {};
    }
}


function saveLearningProgress(progress) {
    if (
        !progress ||
        typeof progress !== "object"
    ) {
        return;
    }

    localStorage.setItem(
        PLATFORM_KEYS.learningProgress,
        JSON.stringify(progress)
    );
}


function getVideoProgressKey(
    level,
    subjectId,
    chapterId,
    videoId
) {
    return [
        normalizeStudentLevel(level),
        subjectId,
        chapterId,
        videoId
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

    return Boolean(progress[key]);
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
        completed: true,
        completedAt:
            new Date().toISOString()
    };

    saveLearningProgress(progress);
}


/* =========================================================
   CHAPTER PROGRESS
   ========================================================= */

function getChapterProgress(
    level,
    subjectId,
    chapterId
) {
    const videos =
        getVideosForChapter(
            level,
            subjectId,
            chapterId
        );

    if (!videos.length) {
        return {
            completed: 0,
            total: 0,
            percentage: 0
        };
    }

    const completed =
        videos.filter(video =>
            isVideoCompleted(
                level,
                subjectId,
                chapterId,
                video.id
            )
        ).length;

    return {
        completed,
        total: videos.length,
        percentage:
            Math.round(
                (completed /
                    videos.length) *
                    100
            )
    };
}


/* =========================================================
   SUBJECT PROGRESS
   ========================================================= */

function getSubjectProgress(
    level,
    subjectId
) {
    const chapters =
        getChaptersForSubject(
            level,
            subjectId
        );

    let total = 0;
    let completed = 0;

    chapters.forEach(chapter => {
        const progress =
            getChapterProgress(
                level,
                subjectId,
                chapter.id
            );

        total += progress.total;
        completed += progress.completed;
    });

    return {
        completed,
        total,
        percentage:
            total > 0
                ? Math.round(
                    (completed / total) *
                    100
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
        return;
    }

    localStorage.setItem(
        PLATFORM_KEYS.lastLearningPosition,
        JSON.stringify(position)
    );
}


function getLastLearningPosition() {
    const raw =
        localStorage.getItem(
            PLATFORM_KEYS.lastLearningPosition
        );

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        return null;
    }
}


/* =========================================================
   PLATFORM INITIALIZATION CHECK
   ========================================================= */

function ensureDemoCurriculum() {
    const validation =
        validateCurriculumStructure();

    if (!validation.valid) {
        console.warn(
            "EduNova AI: curriculum validation failed.",
            validation
        );
    }

    return validation;
}


/* =========================================================
   GLOBAL HEADER HELPERS
   ========================================================= */

function refreshHeaderTranslations() {
    updateHeaderLanguage(
        getSiteLanguage()
    );
}


function initializeHeaderTranslations() {
    if (
        typeof document === "undefined"
    ) {
        return;
    }

    refreshHeaderTranslations();

    document.addEventListener(
        "siteLanguageChanged",
        refreshHeaderTranslations
    );
}


/* =========================================================
   DEMO CURRICULUM INITIALIZATION
   ========================================================= */

ensureDemoCurriculum();


/* =========================================================
   LANGUAGE EVENT BRIDGE
   ========================================================= */

if (
    typeof window !== "undefined"
) {
    window.addEventListener(
        "eduNovaLanguageChanged",
        function () {
            refreshHeaderTranslations();
        }
    );

    window.addEventListener(
        "languageChanged",
        function () {
            refreshHeaderTranslations();
        }
    );
}


/* =========================================================
   PUBLIC API
   ========================================================= */

window.EduNova = window.EduNova || {};

Object.assign(
    window.EduNova,
    {
        curriculum:
            CURRICULUM_DATA,

        getSubjectsForLevel,
        getSubjectData,
        getChaptersForSubject,
        getChapterData,
        getVideosForChapter,
        getVideoData,

        getChapterCount,
        getVideoCount,

        getChapterTitle,
        getVideoTitle,
        getVideoDuration,
        getVideoUrl,

        isVideoFree,
        isVideoLocked,
        canAccessVideo,

        getCurriculumSummary,
        validateCurriculumStructure,

        getChapterProgress,
        getSubjectProgress,

        saveSelectedSubject,
        getSelectedSubject,

        saveSelectedChapter,
        getSelectedChapter,

        saveSelectedVideo,
        getSelectedVideo,

        openSubject,
        openChapter,
        openVideo,

        getHeaderTranslations,
        refreshHeaderTranslations
    }
);


/* =========================================================
   DOM READY — HEADER TRANSLATION
   ========================================================= */

if (
    document.readyState === "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        initializeHeaderTranslations,
        {
            once: true
        }
    );
} else {
    initializeHeaderTranslations();
}


/* =========================================================
   SCRIPT READY EVENT
   ========================================================= */

window.dispatchEvent(
    new CustomEvent(
        "eduNovaScriptReady"
    )
);