class CreatePlays < ActiveRecord::Migration[6.0]
  def change
    create_table :plays do |t|
      t.references :game, null: false, foreign_key: true
      t.string :correct_words, array: true
      t.string :incorrect_words, array: true

      t.timestamps
    end
  end
end
