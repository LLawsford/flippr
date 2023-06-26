# How to run

`npx ts-node index.ts your_input_file.csv > your_output_file.csv`

`ts-node index.ts your_input_file.csv > your_output_file.csv`

`tsc index.ts && node index.js your_input_file.csv > your_output_file.csv`

# How to run tests

You can run tests with:
`npm run test`

(tests are using ts-node, so it's best to have that installed)

# Errata comment:

I always try to avoid 3rd party libraries, so whole thing is written in pure node.
There are also couple things that could be improved, but as it's just a challenge I skipped some steps, like:

- any form of input validation -> program assumes input is always in proper structure, with same delimiters, quotes, file exists etc.
- program could be more user friendly with better error handling, error messages, retries etc.
- row processing is synchronous but if needed could be parallelized with worker threads
- buffer size is currently hardcoded to default value, but could be parsed from user params for user to control
- program could probably be half the code it is, but reading and maintaining it would be much harder, so I left it in more verbose manner
