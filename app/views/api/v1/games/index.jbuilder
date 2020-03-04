json.data @games do |game|
    json.id game.id
    json.grid game.grid.flatten
    json.noOfTimesPlayed game.play_count
    json.noOfPlayers game.player_count
    json.topScore game.top_score
    json.difficultyLevel game.difficulty_level
end