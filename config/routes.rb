Rails.application.routes.draw do
  devise_for :users
  #resources :all_blogs
  resources :about
  resources :categories
  resources :blogs
  
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root  "all_blogs#index"  

end


 

