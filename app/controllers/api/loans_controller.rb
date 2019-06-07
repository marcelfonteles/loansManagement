module Api
  class Api::LoansController < ApplicationController
    def index
      @loans = Loan.all
    end

    def create
      @loan = Loan.new(loans_params)
      date = '['
      count = 1
      @loan.portions.to_i.times do
        @dateToString = (DateTime.now + count.months).strftime('%d/%m/%Y')
        date = date + '{"date": "' + @dateToString + '", "portion": ' + count.to_s + ', "paid": "false" }'
        if count != @loan.portions.to_i
          date = date + ","
        end
        count += 1
      end
      date = date + ']'
      @loan.date = date
      puts @loan

      if @loan.save 
        puts 'batata'
        render json: { status: 200, data: @loan, message: 'Loan save successfully'}
      else
        if @loan.errors.any?
          puts @loan.errors.full_messages
        end
        render json: { status: 400, message: 'I could not save this loan. Try again another time!'}
      end
    end

    def confirm_or_cancel_payment
      @paramsToJSON = JSON.parse(params[:_json])
      @update = JSON.generate(@paramsToJSON[0..@paramsToJSON.length - 2])
      @loan = Loan.find(@paramsToJSON[@paramsToJSON.length - 1]['loan_id'])
      @loan.update(date: @update)

      render json: {status: 200, data: @loan}
    end

    def customer_loans
      @loans = Loan.all.where(customer_id: params[:customer_id])
      render json: { status: 200, data: @loans}
    end

    def destroy
      @loan = Loan.find(params[:id])
      if @loan.destroy
        render json: {status: 200, message: "Loan deleted from database." }
      else
        render json: { status: 400, message: "Is not possible to delete this loan"}
      end
    end

    def total_amount
      @totalAmount = Loan.all.sum {|loan| loan.amount }
      @numberLoans = Loan.all.count
      @portionsPaid = 0.0
      @totalPortions = 0.0
      Loan.all.each do |loan|
        JSON.parse(loan.date).each do |date|
          if date["paid"] == "true"
            @portionsPaid += 1
          end
          @totalPortions += 1
        end
      end
      @percentageOfPortionsPaid = (@portionsPaid / @totalPortions).round(1) * 100
      render json: { status: 200, totalAmount: @totalAmount, numberLoans: @numberLoans, percentage: @percentageOfPortionsPaid}
    end

    private

    def loans_params
      params.require(:loan).permit(:amount, :store, :portions, :paid, :customer_id, :portion, :paid, :_json)
    end
  end
end
