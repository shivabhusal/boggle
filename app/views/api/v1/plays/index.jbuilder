json.data @plays do |play|
    json.id play.id
    json.gameId play.game_id
    json.grid play.game.grid.flatten
    json.noOfCorrectWords play.correct_words.count
    json.noOfInCorrectWords play.incorrect_words.count
    json.score play.score
    json.playedAt play.created_at
end