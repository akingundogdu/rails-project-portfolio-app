class CreateProjects < ActiveRecord::Migration[7.1]
  def change
    create_table :projects do |t|
      t.string :title, null: false, limit: 100
      t.text :description, null: false
      t.text :short_description, null: false
      t.string :github_url, null: false
      t.string :live_url
      t.text :technologies
      t.string :status, default: 'completed', null: false
      t.string :priority, default: 'medium', null: false
      t.boolean :published, default: true, null: false
      t.boolean :featured, default: false, null: false
      t.integer :view_count, default: 0
      t.date :completed_at
      t.text :challenges
      t.text :learnings
      t.text :future_improvements

      t.timestamps
    end

    add_index :projects, :title
    add_index :projects, :status
    add_index :projects, :priority
    add_index :projects, :published
    add_index :projects, :featured
    add_index :projects, :created_at
    add_index :projects, [:published, :featured]
    add_index :projects, [:status, :priority]
  end
end 