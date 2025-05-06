import React from "react";
import Head from "next/head";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Label,
} from "recharts";

export default function Home() {
  // Player data
  const players = [
    { rank: 1, name: "Tyler Stirtz", score: 268 },
    { rank: 2, name: "Mark Schmidt", score: 260 },
    { rank: 3, name: "BizBot", score: 244 },
    { rank: 4, name: "mike_kren", score: 224 },
    { rank: 5, name: "Cory VandenBout", score: 216 },
    { rank: 6, name: "Tyler Pfohl", score: 215 },
    { rank: 7, name: "kycoe", score: 206 },
    { rank: 8, name: "davevalko", score: 200 },
    { rank: 9, name: "Rex Rainey", score: 185 },
    { rank: 10, name: "Parker Ovadek", score: 183 },
    { rank: 11, name: "louismarzorati", score: 178 },
    { rank: 12, name: "Sean Lakies", score: 161 },
    { rank: 13, name: "Jordan", score: 152 },
    { rank: 14, name: "Ian Hilgendorf", score: 143 },
    { rank: 15, name: "Chris Hamm", score: 141 },
    { rank: 16, name: "Nick Kooman", score: 131 },
    { rank: 17, name: "Josh Rubino", score: 119 },
    { rank: 18, name: "Th3FenrisWolf", score: 98 },
    { rank: 19, name: "Keag", score: 78 },
    { rank: 20, name: "Brad Grace", score: 62 },
    { rank: 21, name: "Tim Stauffer", score: 57 },
    { rank: 22, name: "Will Dixon", score: 49 },
    { rank: 23, name: "Courtney Klawieter", score: 18 },
  ];

  // Key statistics calculation
  const scores = players.map((player) => player.score);
  const sortedScores = [...scores].sort((a, b) => a - b);
  const highestScore = Math.max(...scores);
  const lowestScore = Math.min(...scores);
  const average = scores.reduce((a, b) => a + b, 0) / scores.length;
  const median = sortedScores[Math.floor(scores.length / 2)];
  const percentile25 = sortedScores[Math.floor(scores.length * 0.25)];
  const percentile75 = sortedScores[Math.floor(scores.length * 0.75)];

  // Score distribution data
  const scoreRanges = [
    { range: "0-49", count: scores.filter((s) => s >= 0 && s < 50).length },
    { range: "50-99", count: scores.filter((s) => s >= 50 && s < 100).length },
    {
      range: "100-149",
      count: scores.filter((s) => s >= 100 && s < 150).length,
    },
    {
      range: "150-199",
      count: scores.filter((s) => s >= 150 && s < 200).length,
    },
    {
      range: "200-249",
      count: scores.filter((s) => s >= 200 && s < 250).length,
    },
    {
      range: "250-300",
      count: scores.filter((s) => s >= 250 && s < 300).length,
    },
  ];

  // Calculate point differences between adjacent ranks
  const pointDifferences = [];
  for (let i = 0; i < players.length - 1; i++) {
    pointDifferences.push({
      position: `${i + 1} to ${i + 2}`,
      difference: players[i].score - players[i + 1].score,
    });
  }

  // Calculate maximum potential position jumps with a perfect score
  const positionJumps = players.map((player) => {
    let currentRank = player.rank;
    let newScore = player.score + 30;

    // Find what position they would jump to
    let newRank = currentRank;
    for (let j = 0; j < players.length; j++) {
      if (players[j].name !== player.name && newScore > players[j].score) {
        newRank = Math.min(newRank, players[j].rank);
      }
    }

    return {
      name: player.name,
      currentRank,
      score: player.score,
      maximumJump: currentRank - newRank,
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Music League Stats</title>
        <meta name="description" content="Music League Statistics Analysis" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>

      <main>
        <h1 className="text-3xl font-bold mb-8 text-center">
          Music League Analysis: The Case for a Shorter League
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Key Statistics</h2>
            <ul className="space-y-2">
              <li>
                <strong>Players:</strong> 23
              </li>
              <li>
                <strong>Highest Score:</strong> {highestScore} points
              </li>
              <li>
                <strong>Lowest Score:</strong> {lowestScore} points
              </li>
              <li>
                <strong>Range:</strong> {highestScore - lowestScore} points
              </li>
              <li>
                <strong>Average Score:</strong> {average.toFixed(2)} points
              </li>
              <li>
                <strong>Median Score:</strong> {median} points
              </li>
              <li>
                <strong>25th Percentile:</strong> {percentile25} points
              </li>
              <li>
                <strong>75th Percentile:</strong> {percentile75} points
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">
              Position Movement Analysis
            </h2>
            <ul className="space-y-2">
              <li>
                <strong>Max Points Per Round:</strong> ~30 points
              </li>
              <li>
                <strong>Avg Point Difference Between Ranks:</strong>{" "}
                {(
                  pointDifferences.reduce(
                    (sum, item) => sum + item.difference,
                    0
                  ) / pointDifferences.length
                ).toFixed(2)}{" "}
                points
              </li>
              <li>
                <strong>Maximum Position Jump with Perfect Score:</strong>{" "}
                {Math.max(...positionJumps.map((p) => p.maximumJump))} positions
              </li>
              <li>
                <strong>Most Common Position Jump with Perfect Score:</strong>{" "}
                1-2 positions
              </li>
              <li>
                <strong>Bottom Half Players' Max Jump:</strong> 0-3 positions
              </li>
              <li>
                <strong>Bottom 5 Players Need:</strong> Multiple perfect rounds
                to reach middle
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Score Distribution</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={scoreRanges}
                margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range">
                  <Label value="Score Ranges" position="bottom" offset={0} />
                </XAxis>
                <YAxis>
                  <Label
                    value="Number of Players"
                    angle={-90}
                    position="left"
                    offset={-5}
                  />
                </YAxis>
                <Tooltip formatter={(value) => [`${value} players`, "Count"]} />
                <Bar dataKey="count" fill="#4f6db5" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">
            Score Gap Between Positions
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={pointDifferences}
                margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="position"
                  interval={1}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis>
                  <Label
                    value="Point Difference"
                    angle={-90}
                    position="left"
                    offset={-5}
                  />
                </YAxis>
                <Tooltip formatter={(value) => [`${value} points`, "Gap"]} />
                <Bar dataKey="difference" fill="#e0724f" barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">
            Player Scores with Maximum Jump Potential
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="score" name="Score">
                  <Label value="Current Score" position="bottom" offset={0} />
                </XAxis>
                <YAxis type="number" dataKey="maximumJump" name="Max Jump">
                  <Label
                    value="Maximum Positions Gain with Perfect Round"
                    angle={-90}
                    position="left"
                    offset={-5}
                  />
                </YAxis>
                <ZAxis type="category" dataKey="name" name="Player" />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  formatter={(value, name, props) => {
                    if (name === "Score")
                      return [`${value} points`, "Current Score"];
                    if (name === "Max Jump")
                      return [`${value} positions`, "Max Jump Possible"];
                    return [value, name];
                  }}
                />
                <Scatter name="Players" data={positionJumps} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Current Score Distribution</h2>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={players}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number">
                  <Label value="Score" position="bottom" offset={0} />
                </XAxis>
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip formatter={(value) => [`${value} points`, "Score"]} />
                <Bar dataKey="score" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow mt-10">
          <h2 className="text-xl font-bold mb-4">
            Conclusion: Why a Shorter League Makes Sense
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The 250-point gap between top and bottom players is too large to
              overcome
            </li>
            <li>
              With an average 30-point maximum per round, players need 8+
              perfect rounds to close this gap
            </li>
            <li>
              Even with a perfect score, most players can only jump 1-2
              positions at most
            </li>
            <li>
              Bottom half players have virtually no chance to reach top
              positions
            </li>
            <li>
              The scoring trend shows clear tiers of players that have become
              fixed
            </li>
            <li>
              A shorter league would reset standings more frequently and give
              all players a fair chance
            </li>
          </ul>
        </div>
      </main>

      <footer className="mt-10 pt-8 border-t text-center text-gray-500">
        <p>Music League Stats Analysis - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
