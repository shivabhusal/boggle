class Api::V1::BoardsController < ApplicationController
  def create
    board = Board.create_new!

    render json: board, status: 202
  end

  def validate_word
    # binding.pry
    word = params.require(:board)[:word]
    board = Board.find(params[:id])
    if board.word_valid?(word)
      render status: :ok
    else
      render status: :not_found
    end
  end
end
