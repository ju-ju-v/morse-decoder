const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    // write your solution here
    let words = expr.split('**********');
    let decode_word = function(word_digital) {
        let word_human = '';
        let start = 0;
        let end = word_digital.length;

        let get_letter = function () {
            let letter_digital = word_digital.substr(start, 10);

            function to_morse() {
                let letter_morse = '';
                let s = 0;

                function get_symb () {
                    let symb = letter_digital.substr(s, 2);
                    return {
                        convert: function() {
                            if (symb === '10') {
                                return '.';
                            } 
                            else if (symb === '11') {
                                return '-';
                            } 
                            return '';
                        }
                    }
                }
                
                while (s < 10) {
                    let symb = get_symb();
                    letter_morse += symb.convert();
                    s = s + 2;
                }

                return letter_morse;
            }
            return {
                to_human: function() {
                    let letter = to_morse();
                    return MORSE_TABLE[letter];
                }
            }
        }

        while (start < end) {
            let letter = get_letter();
            word_human += letter.to_human();
            start += 10;
        }
        return word_human;
    }  

    let words_human = words.map(function(current) {
        return decode_word(current);
    }); 
      
    return words_human.join(' ');
}


module.exports = {
    decode
}
