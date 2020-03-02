
    json.id @game.id
    json.grid @game.grid
    json.noOfTimesPlayed @game.play_count
    json.noOfPlayers @game.player_count
    json.topScore @game.top_score
    json.difficultyLevel @game.difficulty_level