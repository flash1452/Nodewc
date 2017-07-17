var fs = require('fs');
var cmd = require('node-cmd');
var operation_class = require("../modules/operations.js");

try {
	var contents = fs.readFileSync("../nodewc/index.js").toString();
} catch (ex) {
    throw new Error(ex.toString());
}

var content_length = contents.length;

describe("bytescount", function (){
	it("should count number of bytes in a file", function(){

		var operations = new operation_class(contents, content_length);
		operations.bytecount();
		cmd.get('wc -c index.js',
	        function(err, data, stderr){
	            if (!err) {
	               expect(data).toBe(operations.result_buffer.join(' '));
	            } else {
	               console.log('error', err);
	            }
	        }
        );
	});
});

describe("charcount", function (){
	it("should count number of chars in a file", function(){

		var operations = new operation_class(contents, content_length);
		operations.charcount();
		cmd.get('wc -m index.js',
	        function(err, data, stderr){
	            if (!err) {
	               expect(data).toBe(operations.result_buffer.join(' '));
	            } else {
	               console.log('error', err);
	            }
	        }
        );
	});
});

describe("wordcount", function (){
	it("should count number of words in a file", function(){

		var operations = new operation_class(contents, content_length);
		operations.wordcount();
		cmd.get('wc -w index.js',
	        function(err, data, stderr){
	            if (!err) {
	               expect(data).toBe(operations.result_buffer.join(' '));
	            } else {
	               console.log('error', err);
	            }
	        }
        );
	});
});

describe("linescount", function (){
	it("should count number of lines in a file", function(){

		var operations = new operation_class(contents, content_length);
		operations.linescount();
		cmd.get('wc -l index.js',
	        function(err, data, stderr){
	            if (!err) {
	               expect(data).toBe(operations.result_buffer.join(' '));
	            } else {
	               console.log('error', err);
	            }
	        }
        );
	});
});

describe("longestlinecount", function (){
	it("should count length of longest line in a file", function(){

		var operations = new operation_class(contents, content_length);
		operations.longestline();
		cmd.get('wc -L index.js',
	        function(err, data, stderr){
	            if (!err) {
	               expect(data).toBe(operations.result_buffer.join(' '));
	            } else {
	               console.log('error', err);
	            }
	        }
        );
	});
});

describe("allcounts", function (){
	it("should display all types of counts of a file", function(){

		var operations = new operation_class(contents, content_length);
		operations.bytecount();
		operations.charcount();
		operations.wordcount();
		operations.linescount();
		operations.longestline();
		cmd.get('wc index.js',
	        function(err, data, stderr){
	            if (!err) {
	               expect(data).toBe(operations.result_buffer.join(' '));
	            } else {
	               console.log('error', err);
	            }
	        }
        );
	});
});