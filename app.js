const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const port = 3000;

let dataset = {};
const receipt_keys = ["retauler", "purchaseDate", "purchaseTime", "items", "total"];

app.listen(port, () => {
    console.log(`Server is running on post ${port}`);
});

app.get('/', (req, res) => {
    res.status(200).send("Hello World!");
});

app.post('/receipts/process', (req, res) => {
    const payload = req.body;
    console.log(payload);

    try {
        let retailer = payload.retailer;
        let date = payload.purchaseDate;
        let time = payload.purchaseTime;
        let items = payload.items;
        let total = payload.total;
        


        let rewards = calculate_rewards(retailer, date, time, items, total);
        //console.log("final rewards: " + rewards);
        if (rewards == -1)
        {
            res.status(400).json({ error: "The  receipt is invalid. "});
            //console.log("after send 400 rewards = -1 ");
        }
        else
        {

            let id = id_generator();
            dataset[id] = rewards;
            console.log(`dataset: ${JSON.stringify(dataset)}`);
            res.status(200).json({id : id});
            
        }
        


        
    } catch (error) {
        console.log("error from processing: " + error);
        res.status(400).json({ error: "The  receipt is invalid. "});
    }

    //console.log(`receipt payload: ${payload}`);
    
});


app.get('/receipts/:id/points', (req, res) => {
    var id = req.params.id;
    if (dataset.hasOwnProperty(id))
    {
        res.status(200).json({points : dataset[id]});
    }
    else
    {
        res.status(404).json({error : "No receipt found for that id"});
    }
});


function id_generator()
{
    let id = '';
    while (true)
    {
        id += (generator_helper(8) + '-');
        id += (generator_helper(4) + '-');
        id += (generator_helper(4) + '-');
        id += (generator_helper(4) + '-');
        id += (generator_helper(12));

        if (!dataset.hasOwnProperty(id))
        {
            return id;
        }
    }
}

function generator_helper(length)
{
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';

    for (let i = 0; i < length; i++)
    {
        const index = Math.floor(Math.random() * chars.length);
        id += chars.charAt(index);
    }
    return id;
}

function calculate_rewards(retailer, date, time, items, total)
{
    try {

        
        //retauler name rewards
        let rewards = 0;
        retailer = retailer.replace(/[^a-zA-Z]/g, '');
        rewards += retailer.length;
        //console.log(`retailer rewards: ${rewards}`);

        //round dollar amount with no cents rewards
        let total_float = parseFloat(total)
        if (parseInt(total) == total_float)
        {
            rewards += 50;
            console.log(`round dollar rewards: ${rewards}`);
        }

        //total is a multiple of 0.25
        if (total_float % 0.25 == 0)
        {
            rewards += 25;
            console.log(`multiple of 0.25 rewards: ${rewards}`);
        }

        //every two items rewards
        let pairs = Math.floor(items.length / 2);
        rewards += (5 * pairs);
        console.log(`pairs items: ${pairs}, rewards: ${rewards}`);


        //trimmed length of item description
        for(let i = 0; i < items.length; i++)
        {
            des = items[i].shortDescription.trim();
            if( des.length % 3 == 0)
            {
                rewards += Math.ceil(items[i].price * 0.2);
                console.log(`description length count: ${des} ${des.length}, add rewards: ${rewards}`);

            }


        }
        
        //console.log(`description length rewards: ${rewards}`);


        //purchase day is odd
        const dateSet = date.split('-');
        const day = parseInt(dateSet[2]);
        if (day % 2 == 1)
        {
            rewards += 6;
        }

        console.log(`day: ${day}, rewards: ${rewards}`);


        // purchase after 2:00pm and before 4:00pm
        const timeSet = time.split(':');
        const hour = parseInt(timeSet[0]);
        const minute = parseInt(timeSet[1]);

        if (hour == 14 && minute > 0)
        {
            rewards += 10;
        }
        else if (hour == 15)
        {
            rewards += 10;
        }

        console.log(`hour: ${hour}, minute: ${minute}, time rewards: ${rewards}`);

        return rewards;
    } catch(error)
    {
        console.log("error from help function: ", error);
        return -1;
    }



}