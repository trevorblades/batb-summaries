const { data } = require("./data.json");
const { data: tricksData } = require("./tricks.json");
const fs = require("fs");

const headings = [
  "Opponent",
  "Victory",
  "Letters for",
  "Letters against",
  "Successful attempts",
  "Unsuccessful attempts",
];

function reduceAttempts(attempts) {
  return attempts.reduce(
    (acc, attempt) => {
      acc[Number(attempt.successful)]++;
      return acc;
    },
    [0, 0]
  );
}

for (const skater of data.skaters) {
  const rows = skater.games
    .filter((game) => game.result)
    .map((game) => {
      const { lettersAgainst, winner } = game.result;
      const didWin = winner.id === skater.id;

      const attempts = game.attempts.filter(
        (attempt) => attempt.skater.id === skater.id
      );

      const [unsuccessfulAttempts, successfulAttempts] = reduceAttempts(attempts);

      return [
        game.opponent.fullName,
        didWin,
        didWin ? 5 : lettersAgainst,
        didWin ? lettersAgainst : 5,
        successfulAttempts,
        unsuccessfulAttempts,
      ];
    });

  fs.writeFileSync(
    `csv/${skater.fullName}.csv`,
    [headings, ...rows].join("\n"),
    "utf-8"
  );
}


const trickRows = tricksData.tricks.map(trick => {
  const [unsuccessfulAttempts, successfulAttempts] = reduceAttempts(trick.attempts);
  return [
    trick.name,
    successfulAttempts,
    unsuccessfulAttempts
  ];
});

fs.writeFileSync(
  `tricks.csv`,
  [
    ['Trick name', 'Successful attempts', 'Unsuccessful attempts'],
    ...trickRows
  ].join('\n'),
  'utf-8'
)