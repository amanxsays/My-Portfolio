// ========================================================================
// EDIT ME — the numbers that change over time (CGPA, ratings, question
// counts, project stats) live here in ONE place. Change a value below and
// it updates everywhere that value appears on the page — the About stats,
// the Achievements cards, the intro paragraph, all of it — automatically.
//
// How it works: any element in index.html with a data-field="path.to.value"
// attribute gets its text replaced with SITE_DATA.path.to.value on load.
// Elements with data-count-field="path.to.value" (the animated stat-number
// tiles) get their data-count attribute set from here instead. You never
// need to touch index.html to update a number — just edit the values below.
// ========================================================================

const SITE_DATA = {
  education: {
    cgpa: "8.95",
  },

  leetcode: {
    rating: 2063,
    questions: 1020,
    badges: "365 Day, 500 Day & Knight Badge",
    asOf: "June 2026",
  },

  codeforces: {
    rating: 1436,
    rank: "Specialist",
  },

  codechef: {
    stars: 3,
    asOf: "May 2026",
  },

  devtinder: {
    users: 500,
    uptimePercent: "99.9",
  },
};
