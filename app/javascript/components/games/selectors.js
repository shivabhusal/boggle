
export const games = [
    {
        id: 1,
        grid: ['a', 'b', 'c'],
        noOfTimesPlayed: 34,
        noOfPlayers: 23,
        topScore: 12,
        difficultyLevel: 2
    },
    {
        id: 2,
        grid: ['a', 'b', 'D'],
        noOfTimesPlayed: 44,
        noOfPlayers: 27,
        topScore: 11,
        difficultyLevel: 1
    }
]

export const getGame = (id) => (
    games.filter(game => game.id == id)[0]
)