# BATB Summary Tables

This repo contains CSVs generated by computing data from the [BATB Stats API](https://api.batbstats.trevorblades.com).

I made the following GraphQL query to get data about each skateboarder and the games they played:

```graphql
{
  skaters {
    id
    fullName
    games {
      opponent {
        id
        fullName
      }
      result {
        lettersAgainst
        winner {
          id
        }
      }
      attempts {
        offense
        successful
        skater {
          id
        }
      }
    }
  }
}
```

I then saved the results of that query to a JSON file, `data.json`. The Node.js script in the root of this repo takes that data and iterates over each skater, compiling a spreadsheet of data about the games they played and aggregate stats about each game.

You can make adjustments or additions to the compilation script and regenerate the CSVs by running `node index.js` from the repo root.
