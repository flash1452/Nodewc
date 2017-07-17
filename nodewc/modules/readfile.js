var fs = require('fs');
//include the class from operations.js
var operation_class = require('./operations.js');
exports.processfile = function(flag_array, filename) {
	if (fs.existsSync(filename)) {
		try {
			//read content of file synchronously.
			var contents = fs.readFileSync(filename).toString();
		} catch (ex) {
		    throw new Error(ex.toString());
		}
		var content_length = contents.length;
		//initiLize object of the class operations.
		var operations = new operation_class(contents, content_length);
		for(var iterator = 0; iterator<content_length; iterator++) {
			if (flag_array[iterator] == '1') {
				operations.bytecount();
			}
			else {
				if (flag_array[iterator] == '2') {
					operations.charcount();
				}
				else {
					if (flag_array[iterator] == '3') {
						operations.wordcount();
					}
					else {
						if (flag_array[iterator] == '4') {
							operations.linescount();
						}
						else {
							if (flag_array[iterator] == '5') {
								operations.longestline();
							}
						}
					}
				}
			}
		}
	}
	else {
		throw ('nodewc: ' + filename + ': No such File or Directory.');
	}
	//display all results all together in one line.
	return operations.result_buffer.join(' ');
}