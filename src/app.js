const crypto = require('crypto');
const moment = require('moment');

const startTime = new Date().getTime();

const data = 'hello world';


const version = '1';
const bits = 3;
const date = moment().format('YYMMDD');
const resource = data;
const extension = '';
const rand = Math.floor(Math.random() * Number.MAX_VALUE) + 1;
let counter = 0;

while (counter <  Number.MAX_VALUE - 1) {

    const header = `${version}:${bits}:${date}:${resource}:${extension}:${toBase64(rand.toString())}:${toBase64(counter.toString())}`;

    const result = crypto.createHash('sha1').update(header).digest('hex');

    if (result.startsWith(generatePartialPreImage(bits))) {

        const endTime = new Date().getTime();

        const diffTime = endTime - startTime;
        console.log(`Took ${diffTime / 1000} seconds`);
        console.log(counter);
        console.log(header);
        console.log(result);
        
        break;
    }

    counter += 1;
}

function generatePartialPreImage(bits) {
    let str = '';

    for (let i = 0; i < bits; i++) {
        str += '0';
    }

    return str;
}

function toBase64(str) {
    return new Buffer(str).toString('base64');
}


