#!/usr/bin/env node
	flag_array = [];
	var program = require('commander');
	//include config package to read default.json and read the flag value for every option.
	var config = require('config');
	var operations = require("./modules/readfile.js");
	//read command_options property from default.json.
	var option_flags = config.get('command_options');
	program.arguments('<file>')
	.option('-c, --bytes', 'Count number of ytes in the specified file')
	.option('-m, --chars', 'Count number of characters in the specified file')
	.option('-w, --words', 'Count number of words in the specified file')
	.option('-l, --lines', 'Count number of newlines in the specified file')
	.option('-L, --longestline', 'Count number of bytes in the specified file')
	.action(function(file){
		//if -c used
		if (program.bytes) {
			flag_array.push(option_flags["bytes"]);
		}
		//if -m used
		if (program.chars) {
			flag_array.push(option_flags["chars"]);
		}
		// if -w used.
		if (program.words) {
			flag_array.push(option_flags["words"]);
		}
		//if -l used
		if (program.lines) {
			flag_array.push(option_flags["lines"]);
		}
		//if -L used
		if (program.longestline) {
			flag_array.push(option_flags["longestline"]);
		}
		//if nothing used display all
		if(flag_array.length == 0) {
			flag_array = [1, 2, 3, 4, 5];
		}
		//call function to read the file.
		var result = operations.processfile(flag_array, file);
		console.log(result + ' ' + file);
	})
	.parse(process.argv);
