# frozen_string_literal: true

class Api::V1::PlaysController < ApiController
  skip_before_action :verify_authenticity_token
  layout false
  
  def index
    @plays = Play.all
  end

  def create
    game = Game.find(params[:game_id])
    the_play = game.plays.create(
      correct_words: params[:words][:valid],
      incorrect_words: params[:words][:invalid],
      user_id: 1
    )

    if the_play.persisted?
      uniq_words = (game.words + params[:words][:valid]).uniq
      game.update(words: uniq_words)
      render json: {}, status: :ok
    else
      render json: {}, status: 400
    end
  end
end
