# BOGGLE GAME

![](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Boggle.jpg/440px-Boggle.jpg)


Boggle is a word game invented by Allan Turoff and originally distributed by Parker Brothers. The game is played using a plastic grid of lettered dice, in which players attempt to find words in sequences of adjacent letters.

## Rules
The game begins by shaking a covered tray of 16 cubic dice, each with a different letter printed on each of its sides. The dice settle into a 4×4 tray so that only the top letter of each cube is visible. After they have settled into the grid, a three-minute sand timer is started and all players simultaneously begin the main phase of play.
Each player searches for words that can be constructed from the letters of sequentially adjacent cubes, where "adjacent" cubes are those horizontally, vertically, and diagonally neighboring. Words must be at least three letters long, may include singular and plural (or other derived forms) separately, but may not use the same letter cube more than once per word. Each player records all the words they find by writing on a private sheet of paper. After three minutes have elapsed, all players must immediately stop writing and the game enters the scoring phase.
In the scoring phase, each player reads off their list of discovered words. If two or more players wrote the same word, it is removed from all players' lists. Any player may challenge the validity of a word, in which case a previously nominated dictionary is used to verify or refute it. For all words remaining after duplicates have been eliminated, points are awarded based on the length of the word. The winner is the player whose point total is highest, with any ties typically broken by count of long words.
- One cube is printed with "Qu". This is because Q is nearly always followed by U in English words (see exceptions), and if there were a Q in Boggle, it would be challenging to use if a U did not, by chance, appear next to it. 
- For the purposes of scoring Qu counts as two letters: squid would score two points (for a five-letter word) despite being formed from a chain of only four cubes. 

Early versions of the game had a "Q" without the accompanying "u".
The North American Scrabble Players Association publishes the Official Scrabble Players Dictionary, which is also suitable for Boggle. This dictionary includes all variant forms of words up to eight letters in length. A puzzle book entitled 100 Boggle Puzzles (Improve Your Game) offering 100 game positions was published in the UK in 2003 but is no longer in print.

|Word length|	Points|
|---|---|
|3, 4|	1|
|5|	2|
|6|	3|
|7|	5|
|8+|	11|

## Functional requirements:
The system should be able to validate words which are present on the board, diagonally, vertically or
horizontally, and also validate them against some basic dictionary (doesn’t have to be exhaustive, you can use
open API)
- When game starts, new 4x4 board is generated.
- User can type the words which they think they found.
- System does validation and adds valid words into a list.
- Systems keeps track of scores, the score is total number of characters in the word. –
- If word is invalid an error is displayed.
- When timer runs out user can no longer enter new words, but should see results.

## Non-functional requirements:
- Must use React for front end client application and Ruby on Rails for backend server application
- Must include tests.
- Extra credit, optional: add an additional feature you think is interesting

## Additional Notes:
- Just single player is enough
- No need to build a user management. It will be too complex

## Architecture Design
### UI Components
Components to be included:-
- Routes
    - Home Route
    - Games Route
        - New / Show
    - Dashboard Home
    - 
- Grid
    - Cell
- Timer
- Words Input
- Word List
- Result Chart

### Models
- User
- Game
- Play

### Controllers
- Home
    - Index
- Api/v1/Games
    - index
    - create:- will directly create a new game and store
    - show
- Api/v1/Plays
    - plays
    - create
    - show

