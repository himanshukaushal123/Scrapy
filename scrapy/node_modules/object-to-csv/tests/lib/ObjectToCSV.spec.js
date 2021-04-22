//Modules
const mocha = require('mocha');
const chai = require('chai');
var should = chai.should();

//Helpers
const ObjectToCSV = require('../../lib/ObjectToCSV');
const Constants = require('../../lib/helpers/constants');

describe('ObjectToCSV', function () {
    beforeEach(function (done) {
        this.otc = new ObjectToCSV();

        done();
    });

    describe('keys', function () {
        it('should return self on setKeys', function (done) {
            this.otc.setKeys(Constants.DEFAULTS.KEYS).should.equal(this.otc);

            done();
        });

        it('should return array on get keys', function (done) {
            this.otc.keys.should.be.an('array');

            done();
        });
    });

    describe('data', function () {
        it('should return self on setData', function (done) {
            this.otc.setData(Constants.DEFAULTS.DATA).should.equal(this.otc);

            done();
        });


        it('should return array on get data', function (done) {
            this.otc.data.should.be.an('array');

            done();
        });
    });

    describe('fileName', function () {
        it('should return self on setFileName', function (done) {
            this.otc.setFileName(Constants.DEFAULTS.FILE_NAME).should.equal(this.otc);

            done();
        });

        it('should return string on get fileName', function (done) {
            this.otc.fileName.should.be.a.string

            done();
        });
    });

    describe('shouldExpandObjects', function () {
        it('should return self on setShouldExpandObjects', function (done) {
            this.otc.setShouldExpandObjects(Constants.DEFAULTS.SHOULD_EXPAND_OBJECTS).should.equal(this.otc);

            done();
        });

        it('should return boolean (default:false) on get shouldExpandObjects', function (done) {
            this.otc.shouldExpandObjects.should.equal(false);

            done();
        });
    });

    describe('endOfLineValue', function () {
        it('should return self on setEndOfLineValue', function (done) {
            this.otc.setEndOfLineValue(Constants.DEFAULTS.END_OF_LINE_VALUE).should.equal(this.otc);

            done();
        });

        it('should return string on get endOfLineValue', function (done) {
            this.otc.endOfLineValue.should.be.a.string;

            done();
        });
    });

    describe('delimiter', function () {
        it('should return self on setDelimiter', function (done) {
            this.otc.setDelimiter(Constants.DEFAULTS.DELIMITER).should.equal(this.otc);

            done();
        });

        it('should return string on get delimiter', function (done) {
            this.otc.delimiter.should.be.a.string;

            done();
        });
    });

    describe('quote', function () {
        it('should return self on setQuote', function (done) {
            this.otc.setQuote(Constants.DEFAULTS.QUOTE).should.equal(this.otc);

            done();
        });

        it('should return string on get quote', function (done) {
            this.otc.quote.should.be.a.string;

            done();
        });
    });

    describe('booleanValues', function () {
        it('should return self on setBooleanValues', function (done) {
            this.otc.setBooleanValues(Constants.DEFAULTS.BOOLEAN_VALUES).should.equal(this.otc);

            done();
        });

        it('should return object on get booleanValues', function (done) {
            this.otc.booleanValues.should.be.an('object');

            done();
        });
    });

    describe('getResponseHeaders', function () {
        it('should return object on get getResponseHeaders', function (done) {
            this.otc.getResponseHeaders().should.be.an('object');

            done();
        });
    });

    describe('getCSV', function () {
        it('should return string on getCSV', function (done) {
            this.otc.getCSV().should.be.a.string;

            done();
        });
    });


    describe('DataOutBounds', function () {
        it('should not return any undefined', function (done) {
            // Total cases to test
            const MAX_LENGTH_DATA = 100;
            let data = [];

            // Fill data
            for (let i = 0; i <= MAX_LENGTH_DATA; i++) {
                data = [...data, {
                    'data 1': 'static' + i,
                    'data 2': 'static' + i,
                }]
            }

            const keys = [
                {key: 'data 1', as: 'data 1'},
                {key: 'data 2', as: 'data 2'},
            ];
            
            this.otc.setData(data);
            this.otc.setDelimiter(',');
            this.otc.setKeys(keys);
            
            /undefined/.test(this.otc.getCSV()).should.be.false;

            done();
        });

        it('should return undefined', function (done) {
            // Total cases to test
            const MAX_LENGTH_DATA = 10;
            let data = [];

            // Fill data
            for (let i = 0; i <= MAX_LENGTH_DATA; i++) {
                data = [...data, {
                    'data 1': 'static' + i,
                    'data 2': 'static' + i,
                }]
            }
    
            // In this case, data 2 is missing, then should return undefined
            data = [...data, {'data 1': 'static 200'}];

            const keys = [
                {key: 'data 1', as: 'data 1'},
                {key: 'data 2', as: 'data 2'},
            ];
            
            this.otc.setData(data);
            this.otc.setDelimiter(',');
            this.otc.setKeys(keys);
            
            /undefined/.test(this.otc.getCSV()).should.be.true;

            done();
        });
    });
});