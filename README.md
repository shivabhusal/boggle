# README

## Functional requirements:
The system should be able to validate words which are present on the board, diagonally, vertically or horizontally, and
also validate them against some basic dictionary (doesn’t have to be exhaustive, you can use open API)
- When game starts, new 4x4 board is generated.
- User can type the words which they think they found.
- System does validation and adds valid words into a list.
- Systems keeps track of scores, the score is total number of characters in the word. –
- If word is invalid an error is displayed.
- When timer runs out user can no longer enter new words, but should see results.

## Non-functional requirements:
- Must include tests.
- Extra credit, optional: add an additional feature you think is interesting

## Additional Notes:
- Just single player is enough
- No need to build a user management. It will be too complex

## Notes
- We will use system dictionary to valdiate the words
  - if the word exists in the board
  - it follows proper rules
    - will begin with first letter and see surrounding 8 letters(if available) if they match with next letter in the word
  - word exists in dictionary

- BE will send board data
- We will use SQLite as database
- React for Frontend

Database schema
- Table: Board
  - letters: string
  - words: array
  - timestamp

## REST API Design
- GET /api/v1/board
- POST /api/v1/board/:id/word

