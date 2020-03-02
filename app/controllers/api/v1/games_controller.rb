# frozen_string_literal: true

class Api::V1::GamesController < ApiController
  def index
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
  end

  def create
    Game.create grid: Game.gen, difficulty_level: rand(1..3)
  end
end
