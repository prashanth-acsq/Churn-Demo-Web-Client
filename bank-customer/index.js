main = () => {
    let precision = 5

    let credit_score = document.querySelector("#credit_score")
    let country = document.querySelector("#country")
    let gender = document.querySelector("#gender")
    let age = document.querySelector("#age")
    let tenure = document.querySelector("#tenure")
    let balance = document.querySelector("#balance")
    let num_of_products = document.querySelector("#num_of_products")
    let has_credit_card = document.querySelector("#has_credit_card")
    let is_active_member = document.querySelector("#is_active_member")
    let estimated_salary = document.querySelector("#estimated_salary")

    let predict = document.querySelector("#predict")
    let reset = document.querySelector("#reset")
    let output = document.querySelector("#output")

    predict.addEventListener("click", () => {
        if (credit_score.value === "" || 
            country.value === "" || 
            gender.value === "" || 
            tenure.value === "" || 
            balance.value === "" || 
            num_of_products.value === "" || 
            has_credit_card.value === "" || 
            age.value === "" ||
            is_active_member.value === "" ||
            estimated_salary.value == "") {
                alert("Please Fill All Fields")
        }
        else
        {
            if (Number(country.value) <  0 || 
                Number(tenure.value < 0) || 
                Number(num_of_products.value < 0) ||
                Number(estimated_salary.value < 0) || 
                Number(age.value < 18) || 
                Number(age.value > 95)) {
                    alert("Invalid Values. PLease check all fields")
            }
            else
            {   

                let gender_value
                let has_credit_card_value
                let is_active_member_value

                if (gender.value == "Male" || gender.value == "M") {
                    gender_value = 1
                }
                else if (gender.value == "Female" || gender.value == "F") {
                    gender_value = 0
                }

                if (has_credit_card.value == "Yes" || has_credit_card.value == "Y") {
                    has_credit_card_value = 1
                }
                else if (has_credit_card.value == "No" || has_credit_card.value == "N") {
                    has_credit_card_value = 0
                }

                if (is_active_member.value == "Yes" || is_active_member.value == "Y") {
                    is_active_member_value = 1
                }
                else if (is_active_member.value == "No" || is_active_member.value == "N") {
                    is_active_member_value = 0
                }

                let data = {
                    web_client_data : JSON.stringify({
                        credit_score : credit_score.value,
                        country : country.value,
                        gender : gender_value,
                        age : age.value,
                        tenure : tenure.value,
                        balance : balance.value,
                        num_of_products : num_of_products.value,
                        has_credit_card : has_credit_card_value,
                        is_active_member : is_active_member_value,
                        estimated_salary : estimated_salary.value,
                    })
                }

                $.ajax({
                    type : "POST",
                    url : "http://127.0.0.1:10001/bank-customer/",
                    data : data,
                    success : (response) => {
                        console.log(" ---------- ")
                        console.log(`Success, ${response["statusText"]}, ${response["statusCode"]}`)
                        console.log(" ---------- ")

                        output.value = (Number(response["probability"]) * 100).toPrecision(precision).toString() + " %"
                    },
                    error : (response) => {
                        console.log(" ---------- ")
                        console.log(`Failure, ${response["statusText"]}, ${response["statusCode"]}`)
                    },
                })
            }
        }
    })

    reset.addEventListener("click", () => {
        credit_score.value = ""
        country.value = ""
        gender.value = ""
        age.value = ""
        tenure.value = ""
        balance.value = ""
        num_of_products.value = ""
        has_credit_card.value = ""
        is_active_member.value = ""
        estimated_salary.value = ""
        output.value = ""
    })
}

main()