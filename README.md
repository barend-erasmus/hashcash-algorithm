# Hashcash Algorithm

Hashcash is a proof-of-work system used to limit email spam and denial-of-service attacks, and more recently has become known for its use in Bitcoin (and other cryptocurrencies as part of the mining algorithm. The original idea was first proposed by C. Dwork and M. Naor in 1992.

## The Format

`1:5:170628:hello world::OS45NjEwMzI0MzQ2NDgxMTJlKzMwNw==:MTQ3OTgz`

The header consists of:

* Hashcash version of 0 or 1.
* Number of 'partial pre-image' (zero) bits in the hash result.
* Date in the format of YYMMDD.
* Resource being transmitted.
* Extension. This is ignored in version 1.
* Random characters, encoded in base-64 format.
* Counter, encoded in base-64 format.

In this example, it took 0.913 seconds to compute a hash of `0000044c7cc6f2129f2635e44ca265b597dbffff`

## How does it work?

```javascript

const version = '1';
const bits = 5;
const date = moment().format('YYMMDD');
const resource = data;
const extension = '';
const rand = Math.floor(Math.random() * Number.MAX_VALUE) + 1;
let counter = 0;

while (counter <  Number.MAX_VALUE - 1) {

    const header = `${version}:${bits}:${date}:${resource}:${extension}:${toBase64(rand.toString())}:${toBase64(counter.toString())}`;

    const result = crypto.createHash('sha1').update(header).digest('hex');

    if (result.startsWith(generatePartialPreImage(bits))) {
        console.log(result);

        break;
    }

    counter += 1;
}

```

