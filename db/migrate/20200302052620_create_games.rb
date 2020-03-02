class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :grid
      t.string :words, array: true
      t.integer :difficulty_level, default: 0

      t.timestamps
    end
  end
end
