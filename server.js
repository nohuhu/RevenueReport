"use strict";

const express = require('express');
const fs = require('fs');
const zlib = require('zlib');
const http = require('http');
const bodyParser = require('body-parser');

// Globals to make this quick and dirty
var seed_data_url = 'http://aware-ui-test1.s3.amazonaws.com/sample_data.json.txt.gz',
    seed_data_map = {},
    seed_data_array;

// Borrowed from https://stackoverflow.com/a/12776856
function getSeedData(url, cb) {
    // buffer to store the streamed decompression
    var buffer = [];

    http.get(url, (res) => {
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createGunzip();            
        res.pipe(gunzip);

        gunzip.on('data', (data) => {
            // decompression chunk ready, add it to the buffer
            buffer.push(data.toString())

        }).on("end", () => {
            // response and decompression complete, join the buffer and return
            cb(null, buffer.join("")); 

        }).on("error", (e) => {
            cb(e);
        })
    }).on('error', (e) => {
        cb(e);
    });
}

getSeedData(seed_data_url, (err, data) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    seed_data_array = JSON.parse(data, 'utf8');
    seed_data_array.forEach((item) => {
        seed_data_map[item.id] = item;
    });
    
    console.log('Loaded ' + seed_data_array.length + ' records of seed data');
});

const app = express();

if (process.env.SERVE_STATIC) {
    app.use(express.static(process.env.HOME + '/RevenueReport'));
}

app.use(bodyParser.json());

app.get('/revenue', (req, res) => {
    res.json(seed_data_array);
});

// Allow requesting one record by id
app.get('/revenue/:id', (req, res) => {
    res.json(seed_data_map[req.params.id]);
});

app.post('/revenue', (req, res) => {
    let phantomRecord = req.body;
    
    if (!phantomRecord) {
        console.error("Invalid create request:", req);
    }
    
    let lastRecord = seed_data_array[seed_data_array.length - 1];
    
    let newRecord = {
        id: ++lastRecord.id
    };
    
    for (let prop in phantomRecord) {
        if (prop === 'id') {
            // Return phantom record id to the client to help it map
            // the "real" record to the phantom one
            newRecord.clientId = phantomRecord.id;
            continue;
        }
        
        newRecord[prop] = phantomRecord[prop];
    }
    
    seed_data_array.push(newRecord);
    seed_data_map[newRecord.id] = newRecord;
    
    console.log('Created new record', newRecord);
    
    res.json(newRecord);
});

app.put('/revenue/:id', (req, res) => {
    let update = req.body;
    
    if (!update) {
        console.error("Invalid update request:", req);
    }
    
    let id = req.params.id;
    let record = seed_data_map[id];
    
    if (record) {
        for (let prop in update) {
            if (prop === 'id') {
                continue;
            }
            
            record[prop] = update[prop];
        };
    }
    
    console.log('Update response: ', record);
    
    res.json(record);
});

app.delete('/revenue/:id', (req, res) => {
    let id = req.params.id;
    
    let success = true;

    let record = seed_data_map[id];
    let index = seed_data_array.indexOf(record);
    
    if (index) {
        seed_data_array.splice(index, 1);
        delete seed_data_map[id];
    }
    else {
        console.error("Cannot find record with id " + id);
        success = false;
    }
    
    console.log('Deleted record with id ' + id);
    
    res.json({ success: success });
});
 
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
