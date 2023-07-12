# Challenge: Receipt Processer (Backend)

## Preview

This backend is coded in JavaScript. Please follow the Instruction below to run this application properly.

## Assumption

According to [README.me](https://github.com/fetch-rewards/receipt-processor-challenge/blob/main/README.md) of this Challenge, GO and Docker are intalled on OS. 

## Instruction

* Download the entire repository files to your OS in a folder

* Open terminal in your OS or Open the terminal from VS code and direct to the root folder of this respository on your OS

* Create a docker image on you OS (after open dockerhub) and using following command
    * ```bash
         docker build -t app:latest .

* Create a docker container to run this application through the docker image your just created and using following command line
    * ```bash
        docker run -dp 3000:3000 app:latest

* Open your browser (or PostMan) and put in this address
    * ```bash
        localhost:3000
    * If the browser displays a line: "Hello World!", then the backend application is working. 
    * If an error comes up, please try different port numb, such as using port 8080: 
    ```bash 
        docker run -dp 8080:3000 app:latest

* Once you set up perfectly, then you can start to test the Receipt Processor Backend Server. 

* If you have [PostMan](https://www.postman.com) API tester or similar tester, please use them. If you do not have one, please download [PostMan](https://www.postman.com).


## Testing

### Postman: 
* Endpoint: Process Receipts

    * Path: `localhost:3000/receipts/process`
        * If your port is 8080, your path is `localhost:8080/receipts/process`

    * Method: `POST`
    * Payload: Receipt JSON 
        * Write Payload under `Body` tab, select `raw` option, and select `JSON` format on the right.

    * Response: JSON containing an id for the receipt.


* Endpoint: Get Points

    * Path: `localhost:3000/receipts/{id}/points`
        * If your port is 8080, your path is `localhost:8080/receipts/{id}/points`
        * `{id}` : the id code is from the return of the Endpoint: Process Receipts (above)
    * Method: `GET`
    * Response: A JSON object containing the number of points awarded.



 
