# frozen_string_literal: true

# == Schema Information
#
# Table name: plays
#
#  id              :integer          not null, primary key
#  correct_words   :string
#  incorrect_words :string
#  game_id         :integer          not null
#  user_id         :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Play < ApplicationRecord
  serialize :correct_words, Array
  serialize :incorrect_words, Array

  belongs_to :game
  belongs_to :user
end
