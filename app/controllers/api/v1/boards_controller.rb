class Api::V1::BoardsController < ApplicationController
  def create
    board = Board.create_new!
    render json: board, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def validate_word
    word = board_params[:word]
    board = Board.find_by(id: params[:id])

    if board.nil?
      render json: { error: "Board not found" }, status: :not_found
    elsif board.word_valid?(word)
      render json: { message: "Word is valid" }, status: :ok
    else
      render json: { error: "Invalid word" }, status: :unprocessable_entity
    end
  end

  private

  def board_params
    params.require(:board).permit(:word)
  end
end
