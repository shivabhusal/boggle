
export const allGames = () => ([])

export const getGame = (id) => (
    allGames.filter(game => game.id == id)[0]
)