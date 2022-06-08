main = () => {
    let precision = 5

    let is_tv_subscriber = document.querySelector("#is_tv_subscriber")
    let is_movie_package_subscriber = document.querySelector("#is_movie_package_subscriber")
    let subscription_age = document.querySelector("#subscription_age")
    let bill_avg = document.querySelector("#bill_avg")
    let remaining_contract = document.querySelector("#remaining_contract")
    let service_failure_count = document.querySelector("#service_failure_count")
    let download_avg = document.querySelector("#download_avg")
    let upload_avg = document.querySelector("#upload_avg")
    let download_over_limit = document.querySelector("#download_over_limit")

    let predict = document.querySelector("#predict")
    let reset = document.querySelector("#reset")
    let output = document.querySelector("#output")

    predict.addEventListener("click", () => {
        if (is_tv_subscriber.value === "" || 
            is_movie_package_subscriber.value === "" || 
            subscription_age.value === "" || 
            remaining_contract.value === "" || 
            service_failure_count.value === "" || 
            download_avg.value === "" || 
            upload_avg.value === "" || 
            bill_avg.value === "" ||
            download_over_limit.value === "") {
                alert("Please Fill All Fields")
        }
        else
        {
            if (Number(subscription_age.value) <  0 || 
                Number(remaining_contract.value < 0) || 
                Number(download_avg.value < 0) ||
                Number(download_avg.value.value < 0) || 
                Number(upload_avg.value.value < 0) || 
                Number(download_over_limit.value < 0) ||
                Number(bill_avg.value < 0)) {
                    alert("Invalid Values. PLease check all fields")
            }
            else
            {   

                let is_tv_subscriber_value
                let is_movie_package_subscriber_value

                if (is_tv_subscriber.value == "Yes" || is_tv_subscriber.value == "Y") {
                    is_tv_subscriber_value = 1
                }
                else if (is_tv_subscriber.value == "No" || is_tv_subscriber.value == "N") {
                    is_tv_subscriber_value = 0
                }

                if (is_movie_package_subscriber.value == "Yes" || is_movie_package_subscriber.value == "Y") {
                    is_movie_package_subscriber_value = 1
                }
                else if (is_movie_package_subscriber.value == "No" || is_movie_package_subscriber.value == "N") {
                    is_movie_package_subscriber_value = 0
                }

                let data = {
                    web_client_data : JSON.stringify({
                        is_tv_subscriber : is_tv_subscriber_value,
                        is_movie_package_subscriber : is_movie_package_subscriber_value,
                        subscription_age : subscription_age.value,
                        bill_avg : bill_avg.value,
                        remaining_contract : remaining_contract.value,
                        service_failure_count : service_failure_count.value,
                        download_avg : download_avg.value,
                        upload_avg : upload_avg.value,
                        download_over_limit : download_over_limit.value,
                    })
                }

                $.ajax({
                    type : "POST",
                    url : "http://127.0.0.1:10001/isp-customer/",
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
        is_tv_subscriber.value = ""
        is_movie_package_subscriber.value = ""
        subscription_age.value = ""
        bill_avg.value = ""
        remaining_contract.value = ""
        service_failure_count.value = ""
        download_avg.value = ""
        upload_avg.value = ""
        download_over_limit.value = ""
        output.value = ""
    })
}

main()