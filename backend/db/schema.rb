# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 5) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "contact_messages", force: :cascade do |t|
    t.string "name", limit: 100, null: false
    t.string "email", limit: 255, null: false
    t.string "subject", limit: 200, null: false
    t.text "message", null: false
    t.string "message_type", default: "general", null: false
    t.boolean "read", default: false, null: false
    t.boolean "replied", default: false, null: false
    t.boolean "priority", default: false, null: false
    t.datetime "read_at"
    t.datetime "replied_at"
    t.string "ip_address"
    t.string "user_agent"
    t.text "admin_notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_contact_messages_on_created_at"
    t.index ["email"], name: "index_contact_messages_on_email"
    t.index ["message_type", "created_at"], name: "index_contact_messages_on_message_type_and_created_at"
    t.index ["message_type"], name: "index_contact_messages_on_message_type"
    t.index ["priority"], name: "index_contact_messages_on_priority"
    t.index ["read", "priority"], name: "index_contact_messages_on_read_and_priority"
    t.index ["read"], name: "index_contact_messages_on_read"
    t.index ["replied", "created_at"], name: "index_contact_messages_on_replied_and_created_at"
    t.index ["replied"], name: "index_contact_messages_on_replied"
  end

  create_table "experiences", force: :cascade do |t|
    t.string "company_name", limit: 100, null: false
    t.string "position", limit: 100, null: false
    t.text "description", null: false
    t.date "start_date", null: false
    t.date "end_date"
    t.boolean "current", default: false, null: false
    t.string "employment_type", null: false
    t.string "location", limit: 100, null: false
    t.string "company_url"
    t.string "company_logo_url"
    t.text "technologies"
    t.text "achievements"
    t.boolean "featured", default: false, null: false
    t.integer "sort_order", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_name"], name: "index_experiences_on_company_name"
    t.index ["current", "start_date"], name: "index_experiences_on_current_and_start_date"
    t.index ["current"], name: "index_experiences_on_current"
    t.index ["employment_type"], name: "index_experiences_on_employment_type"
    t.index ["end_date"], name: "index_experiences_on_end_date"
    t.index ["featured", "start_date"], name: "index_experiences_on_featured_and_start_date"
    t.index ["featured"], name: "index_experiences_on_featured"
    t.index ["position"], name: "index_experiences_on_position"
    t.index ["sort_order"], name: "index_experiences_on_sort_order"
    t.index ["start_date"], name: "index_experiences_on_start_date"
  end

  create_table "projects", force: :cascade do |t|
    t.string "title", limit: 100, null: false
    t.text "description", null: false
    t.text "short_description", null: false
    t.string "github_url", null: false
    t.string "live_url"
    t.text "technologies"
    t.string "status", default: "completed", null: false
    t.string "priority", default: "medium", null: false
    t.boolean "published", default: true, null: false
    t.boolean "featured", default: false, null: false
    t.integer "view_count", default: 0
    t.date "completed_at"
    t.text "challenges"
    t.text "learnings"
    t.text "future_improvements"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_projects_on_created_at"
    t.index ["featured"], name: "index_projects_on_featured"
    t.index ["priority"], name: "index_projects_on_priority"
    t.index ["published", "featured"], name: "index_projects_on_published_and_featured"
    t.index ["published"], name: "index_projects_on_published"
    t.index ["status", "priority"], name: "index_projects_on_status_and_priority"
    t.index ["status"], name: "index_projects_on_status"
    t.index ["title"], name: "index_projects_on_title"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.string "category", null: false
    t.integer "proficiency_level", null: false
    t.decimal "years_of_experience", precision: 4, scale: 1, null: false
    t.text "description"
    t.boolean "featured", default: false, null: false
    t.string "icon_url"
    t.string "color_code"
    t.integer "sort_order", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category", "proficiency_level"], name: "index_skills_on_category_and_proficiency_level"
    t.index ["category"], name: "index_skills_on_category"
    t.index ["featured", "proficiency_level"], name: "index_skills_on_featured_and_proficiency_level"
    t.index ["featured"], name: "index_skills_on_featured"
    t.index ["name"], name: "index_skills_on_name", unique: true
    t.index ["proficiency_level"], name: "index_skills_on_proficiency_level"
    t.index ["sort_order"], name: "index_skills_on_sort_order"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
