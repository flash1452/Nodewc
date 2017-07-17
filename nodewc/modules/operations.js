function operations (file_contents, content_length) {
	operations.prototype.contents = file_contents;  //contents of the file
	operations.prototype.contents_length = content_length; //length of the contents of the file
	operations.prototype.result_buffer = []; //buffer to store results

	//count num of bytes in the file.
	operations.prototype.bytecount = function() {
		this.result_buffer.push(this.contents_length);
	}

	//count num of characters int the file
	operations.prototype.charcount = function() {
		this.result_buffer.push(this.contents_length);
	}

	//count num of words
	operations.prototype.wordcount = function() {
		var word_freq = 0;
		if (typeof this.num_lines == 'undefined' &&
			typeof this.split_content == 'undefined') {
			operations.prototype.split_content = this.contents.split('\n');
			operations.prototype.num_lines = this.split_content.length;
		}
		for(var iter =0; iter < this.num_lines; iter++) {
			//split every line using spaces one by one and add all the results
			var line_after_split = this.split_content[iter].split(/[ ]+/);
			for(var indx = line_after_split.length - 1; indx >= 0; indx--) {
			    //ignore empty lines.
			    if(line_after_split[indx] === '') {
			       line_after_split.splice(indx, 1);
			    }
			}
			var word_freq = word_freq + line_after_split.length;
		}
		this.result_buffer.push(word_freq);
	}

	//count num of lines in the file split usign \n.
	operations.prototype.linescount = function() {
		if (typeof this.num_lines == 'undefined' &&
			typeof this.split_content == 'undefined') {
			operations.prototype.split_content = this.contents.split('\n');
			operations.prototype.num_lines = this.split_content.length;
		}
		this.result_buffer.push(this.num_lines - 1);
	}

	//calculate the length of longest line in  the file
	operations.prototype.longestline = function() {
		if (typeof this.num_lines == 'undefined' &&
			typeof this.split_content == 'undefined') {
			operations.prototype.split_content = this.contents.split('\n');
			operations.prototype.num_lines = this.split_content.length;
		}
		for(var iter = 0; iter < this.num_lines; iter++) {
			if (iter == 0) {
				// \t is calculated as one instead it should be calculated as 8 spaces.i.e.
				// 1 already calculated by default + 7 * num of times \t occurs.
				var max_sentence_length = this.split_content[iter].length;
				max_sentence_length+= 7 * (this.split_content[iter].match(/\t/g) || []).length;
			}
			else {

				// \t is calculated as one instead it should be calculated as 8 spaces.i.e.
				// 1 already calculated by default + 7 * num of times \t occurs.
				var sentence_length = this.split_content[iter].length;
				sentence_length+= 7 * (this.split_content[iter].match(/\t/g) || []).length;
				if(max_sentence_length < sentence_length) {
					max_sentence_length = sentence_length;
				}
			}
		}
		this.result_buffer.push(max_sentence_length);
	}
}
module.exports = operations;