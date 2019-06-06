class RemoveColumnFromLoans < ActiveRecord::Migration[5.2]
  def change
    remove_column :loans, :paid, :string
  end
end
