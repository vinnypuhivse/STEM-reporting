// Data for the Classroom data report
// Student activity + reading skills derived from the Figma designs.

window.REPORT_DATA = {
  schools: ['ELA Class 8th Grade P.2', 'ELA Class 8th Grade P.3', 'ELA Class 8th Grade P.7', 'ELA Class 8th Grade P.8'],
  activities: ['All activity', 'Assigned activity', 'Independent activity'],
  dateRanges: ['July to date', 'Last 90 days', 'Last 45 days'],

  // STEM — articles and videos broken down per grade category
  stemContent: {
    articles: [
      { level: 'Above grade level', count: 3, pct: 12 },
      { level: 'At grade level',    count: 17, pct: 65 },
      { level: 'Below grade level', count: 6, pct: 23 },
    ],
    videos: [
      { level: 'Above grade level', count: 3, pct: 14 },
      { level: 'At grade level',    count: 17, pct: 71 },
      { level: 'Below grade level', count: 4, pct: 15 },
    ],
  },

  // ELA — reading breakdown (articles read + quizzes taken) per grade category
  elaContent: {
    articles: [
      { level: 'Above grade level', count: 5,  pct: 17 },
      { level: 'At grade level',    count: 19, pct: 66 },
      { level: 'Below grade level', count: 5,  pct: 17 },
    ],
    quizzes: [
      { level: 'Above grade level', count: 3,  pct: 13 },
      { level: 'At grade level',    count: 16, pct: 70 },
      { level: 'Below grade level', count: 4,  pct: 17 },
    ],
  },

    stemOverview: {
    // Content breakdown donut
    articlesPct: 75,
    videosPct: 25,
    articlesTotal: 17,
    videosTotal: 9,
    // Student activity bars
    studentActivity: [
      { name: 'Unique active students', count: 1192 },
      { name: 'Viewed content', count: 765 },
      { name: 'Viewed STEM', count: 191 },
      { name: 'Submitted activities', count: 35 },
    ],
    // STEM Disciplines horizontal bars
    disciplines: [
      { name: 'Science', count: 3 },
      { name: 'Ecology', count: 17 },
      { name: 'Mathematics', count: 6 },
    ],
    // Time spent rings
    articleAvgMin: 23,
    videoAvgMin: 16,
  },

  elaOverview: {
    studentActivity: [
      { name: 'Unique active students', count: 1192 },
      { name: 'Viewed content', count: 765 },
      { name: 'Viewed ELA', count: 574 },
      { name: 'Submitted activities', count: 210 },
    ],
    avgLevel: '8th',
    avgLevelSub: 'Average grade level for texts viewed by class',
    avgLexile: '1030L',
    avgLexileSub: 'Average Lexile level for texts viewed by class',
    totalTexts: 10,
    avgMinPerArticle: 45,
    textsByLevel: [
      { level: 'Above grade level', count: 3 },
      { level: 'At grade level',    count: 17 },
      { level: 'Below grade level', count: 6 },
    ],
    quizzes: 22,
    quizzesSub: 'Total quiz attempts',
    avgScore: 78,
    avgScoreSub: 'Average quiz score across class',
  },

  // ELA Reading skills — 8 skills × students
  // Percentages shown; "N/A" (null) for under-attempted cells.
  readingSkills: [
    'What the text says',
    'Main idea, key details, & summarization',
    'Connecting people, events & ideas',
    'Word meaning & choice',
    'Text structure',
    'Point of view & purpose',
    'Arguments & claims',
    'Themes, topics, & sources',
  ],

  students: [
    { name: 'Benson, Amy',          grade: 7, lexile: 940,
      skills: [80, 75, 60, 85, 72, 66, 58, 71],
      last: '04/15/2026 at 5:02 pm', articleViews: 4, articleMin: 12, videoViews: 4, videoMin: 12,
      quizCount: 6, avgScore: 82, writeCount: 2, avgWrite: 74 },
    { name: 'Brewer, Shirley',      grade: 8, lexile: 1020,
      skills: [65, 70, 55, 78, 60, 48, 40, 62],
      last: '04/13/2026 at 8:26 am', articleViews: 6, articleMin: 16, videoViews: 2, videoMin: 16,
      quizCount: 5, avgScore: 74, writeCount: 1, avgWrite: 68 },
    { name: 'Burns, Christopher',   grade: 7, lexile: 940,
      skills: [92, 88, 76, 90, 82, 80, 70, 84],
      last: '04/14/2026 at 1:30 pm', articleViews: 4, articleMin: 12, videoViews: 4, videoMin: 12,
      quizCount: 7, avgScore: 90, writeCount: 3, avgWrite: 88 },
    { name: 'Camacho, Sarah',       grade: 8, lexile: 1020,
      skills: [48, 52, 35, 60, 42, 30, null, 44],
      last: '04/15/2026 at 1:47 pm', articleViews: 6, articleMin: 16, videoViews: 2, videoMin: 16,
      quizCount: 4, avgScore: 62, writeCount: 2, avgWrite: 58 },
    { name: 'Gonzalez, Kimberly',   grade: 7, lexile: 940,
      skills: [100, 96, 92, 95, 90, 88, 82, 94],
      last: '04/13/2026 at 9:20 am', articleViews: 4, articleMin: 12, videoViews: 4, videoMin: 12,
      quizCount: 8, avgScore: 96, writeCount: 2, avgWrite: 92 },
    { name: 'Johnson, Jessica',     grade: 8, lexile: 1020,
      skills: [75, 78, 60, 80, 68, 62, 55, 70],
      last: '04/14/2026 at 11:12 am', articleViews: 6, articleMin: 16, videoViews: 2, videoMin: 16,
      quizCount: 6, avgScore: 78, writeCount: 1, avgWrite: 72 },
    { name: 'Lyons, Justin',        grade: 8, lexile: 1020,
      skills: [null, null, null, null, null, null, null, null],
      last: 'N/A', articleViews: 0, articleMin: 0, videoViews: 0, videoMin: 0,
      quizCount: 0, avgScore: null, writeCount: 0, avgWrite: null },
    { name: 'Maldonado, Devin',     grade: 8, lexile: 1020,
      skills: [70, 65, 50, 72, 64, 55, 45, 58],
      last: '04/14/2026 at 4:33 pm', articleViews: 6, articleMin: 16, videoViews: 2, videoMin: 16,
      quizCount: 5, avgScore: 70, writeCount: 2, avgWrite: 66 },
    { name: 'Montgomery, Teresa',   grade: 7, lexile: 940,
      skills: [85, 82, 72, 88, 78, 74, 68, 80],
      last: '04/12/2026 at 2:15 pm', articleViews: 5, articleMin: 14, videoViews: 3, videoMin: 11,
      quizCount: 6, avgScore: 84, writeCount: 2, avgWrite: 80 },
    { name: 'Olson, James',         grade: 7, lexile: 940,
      skills: [28, 34, 22, 40, 30, 20, 18, 32],
      last: '04/11/2026 at 10:05 am', articleViews: 3, articleMin: 9, videoViews: 2, videoMin: 8,
      quizCount: 3, avgScore: 48, writeCount: 0, avgWrite: null },
    { name: 'Petersen, Ava',        grade: 8, lexile: 1020,
      skills: [88, 84, 78, 90, 80, 76, 72, 86],
      last: '04/15/2026 at 9:41 am', articleViews: 7, articleMin: 18, videoViews: 3, videoMin: 14,
      quizCount: 7, avgScore: 88, writeCount: 3, avgWrite: 86 },
    { name: 'Reyes, Kevin',         grade: 7, lexile: 940,
      skills: [70, 68, 62, 75, 66, 58, 52, 64],
      last: '04/14/2026 at 3:10 pm', articleViews: 4, articleMin: 13, videoViews: 3, videoMin: 10,
      quizCount: 5, avgScore: 72, writeCount: 1, avgWrite: 70 },
  ],
};
