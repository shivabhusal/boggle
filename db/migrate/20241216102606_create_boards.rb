class CreateBoards < ActiveRecord::Migration[8.0]
  def change
    create_table :boards do |t|
      t.string :title
      t.json :words
      t.json :letters

      t.timestamps
    end
  end
end
