# object-to-csv

<span class="badge-travisci"><a href="http://travis-ci.org/miscavage/object-to-csv" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/miscavage/object-to-csv/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/object-to-csv" title="View this project on NPM"><img src="https://img.shields.io/npm/v/object-to-csv.svg" alt="NPM version"/></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/object-to-csv" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/object-to-csv.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/miscavage/object-to-csv" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/miscavage/object-to-csv.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/miscavage/object-to-csv#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/miscavage/object-to-csv.svg" alt="Dev Dependency Status" /></a></span>

A lightweight, robust & dependency-less Node.js module to convert JSON objects to CSV format.


## • Installation

Latest version: 1.0.5

`npm install object-to-csv`


## • Quick Start Example

```javascript
//1. Import the module
const ObjectToCSV = require('object-to-csv');

//2. Set data
let data = [
    { 
      'make': 'Ford',
      'model': 'Mustang',
      'new': true
    },
];

//3. Set up CSV
let otc = new ObjectToCSV({ data });

//4. Get CSV
let csv = otc.getCSV();

//Outputs:
// "Make","Model","Is The Car New"
// "Ford","Mustang","TRUE"

```

## • Tests

`npm test`


## • Usage
Using the `ObjectToCSV` module is easy. 
The setter methods return `this` which enables chaining functions. Warnings are presented when values are given which may cause issues with the module. Find everything else you need to know below.


### • Constructor
The constructor of the `ObjectToCSV` module allows you to set all of the `options` up front in `key`/`value` format.

Usage Example:
```javascript
let otc = new ObjectToCSV({
    'keys': [],
    'data': [],
    'fileName': 'test-file-name',
    'shouldExpandObjects': true,
    'endOfLineValue': '\n',
    'delimiter': ',',
    'quote': '"',
    'booleanValues': {'true':'Yes', 'false':'No'},
});
```

### • Options

___
#### • `keys`
Keys for first row of csv. Set the keys in an array of objects according to the format below. Using the `key`/`as` format allows for you to set the `key` in the `data` object and display the `as` within the final csv as a proper title for example.

If empty, the keys in the first object of the array will be used as column names.


- Type: `Array`
- Default: `[]`
- Format: `[ {key: '', as: ''}, ... ]`

Usage Example:
```javascript
let keys = [
    {
        key: 'make',
        as: 'Make',
    }
];

//Set keys in 3 different ways
let otc = new ObjectToCSV({ keys });
// otc.setKeys(keys);
// otc.keys = keys;

//Get
keys = otc.keys;
```
___
#### • `data`
The data that fills the csv

- Type: `Array`
- Default: `[]`
- Format: `[ {...}, ... ]`

Usage Example:
```javascript
let data = [
    { 
      'make': 'Ford',
      'model': 'Mustang',
      'new': true
    },
];

//Set data in 3 different ways
let otc = new ObjectToCSV({ data });
// otc.setData(data);
// otc.data = data;

//Get
data = otc.data;
```

___
#### • `fileName`
The file name for downloading the csv.

- Type: `String`
- Default: `file`

Usage Example:
```javascript
let fileName = 'file-name';

//Set file name in 3 different ways
let otc = new ObjectToCSV({ fileName });
// otc.setFileName(fileName);
// otc.fileName = fileName;

//Get
fileName = otc.fileName;
```

___
#### • `shouldExpandObjects`
Should flatten nested objects. This is a boolean to check if `JSON.stringify()` should be used on arrays and objects within the `data`.

- Type: `Boolean`
- Default: `false`

Usage Example:
```javascript
let shouldExpandObjects = false;

//Set shouldExpandObjects in 3 different ways
let otc = new ObjectToCSV({ shouldExpandObjects });
// otc.setShouldExpandObjects(shouldExpandObjects);
// otc.shouldExpandObjects = shouldExpandObjects;

//Get
shouldExpandObjects = otc.shouldExpandObjects;
```

___
#### • `endOfLineValue`
Specify an end of line value for separating rows other than the default line ending.

- Type: `String`
- Default: `\n`

Usage Example:
```javascript
let endOfLineValue = '\n';

//Set endOfLineValue in 3 different ways
let otc = new ObjectToCSV({ endOfLineValue });
// otc.setEndOfLineValue(endOfLineValue);
// otc.endOfLineValue = endOfLineValue;

//Get
endOfLineValue = otc.endOfLineValue;
```

___
#### • `delimiter`
CSV delimiter of columns

- Type: `String`
- Default: `,`

Usage Example:
```javascript
let delimiter = ',';

//Set delimiter in 3 different ways
let otc = new ObjectToCSV({ delimiter });
// otc.setDelimiter(delimiter);
// otc.delimiter = delimiter;

//Get
delimiter = otc.delimiter;
```

___
#### • `quote`
The quote around cell values and column names.

- Type: `String`
- Default: `"`

Usage Example:
```javascript
let quote = '"';

//Set quote in 3 different ways
let otc = new ObjectToCSV({ quote });
// otc.setQuote(quote);
// otc.quote = quote;

//Get
quote = otc.quote;
```

___
#### • `booleanValues`
The values to show if a boolean value is present in the data for the csv.

- Type: `Object`
- Default: `{ 'true': 'TRUE', 'false': 'FALSE' }`
- Format: `{ 'true': 'Yes', 'false': 'No'  }`

Usage Example:
```javascript
let booleanValues = { 'true': 'Yes', 'false': 'No'  };

//Set quote in 3 different ways
let otc = new ObjectToCSV({ booleanValues });
// otc.setBooleanValues(booleanValues);
// otc.booleanValues = booleanValues;

//Get
booleanValues = otc.booleanValues;
```

### • Commands

___
#### • `getCSV()`
Get CSV as a string from given attributes

- Returns: `String`

Usage Example:
```javascript
let otc = new ObjectToCSV();
let csv = otc.getCSV();
```

___
#### • `getResponseHeaders()`
Get response headers for sending a CSV download to the client

- Returns: `Object`
- Format: `{'Content-Disposition': '...', 'Content-Type': '...'}`

Usage Example:
```javascript
let otc = new ObjectToCSV();
let responseHeaders = otc.getResponseHeaders();
let csv = otc.getCSV();

//Example
//1. Set up your server
//In this case, we're just going to use the http module
const http = require('http');

//2. Create server
http.createServer((req, res) => {
    const url = req.url;

    //3. Set up a route on your sever to download a test csv
    if (url == '/download') {
        res.setHeader('Content-Type', responseHeaders['Content-Type']);
        res.setHeader('Content-Disposition', responseHeaders['Content-Disposition']);
        res.write(csv, 'text/csv');
        res.end();
    }
}).listen(8080);
```

## • Say Hi

Tweet at me: [@markmiscavage](https://twitter.com/markmiscavage).

## • License

MIT License

Copyright (c) 2020 Mark Miscavage

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.