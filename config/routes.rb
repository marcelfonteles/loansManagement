Rails.application.routes.draw do
  get 'dashboard/index'
  root 'dashboard#index'

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  namespace :api do 
    #get 'customers/index', to: 'api/customers_controllers#index'
    resources :customers, only: [:index, :show, :create]
    resources :loans, only: [:index, :destroy, :create, :show]
    get 'loans/customer/:customer_id', to: 'loans#customer_loans'
    get 'loans/total/amount', to: 'loans#total_amount'
    post 'loans/update/status', to: 'loans#confirm_or_cancel_payment'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
