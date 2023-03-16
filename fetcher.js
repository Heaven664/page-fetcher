const request = require('request');
const fs = require('fs');
const readline = require('readline');

const url = process.argv[2];
const file = process.argv[3];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const requestFunc = () => {
  request(url, function(error, response, body) {
    if (error) {
      console.log("Not valid URL");
      process.exit();
    }
    fs.writeFile(file, body, err => {
      if (err) {
        console.log(err);
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${file}`);
      rl.close();
    });
  });
};

fs.access(file, fs.R_OK, (err) => {
  if (err) {
    console.log("Invalid Path");
    process.exit();
  }
  if (fs.existsSync(file)) {
    rl.question('File path already exists. Type "Y" if you want to overwrite it?  ', answer => {
      if (answer.toUpperCase() !== 'Y') {
        process.exit();
      }
      requestFunc();
    });
  } else {
    requestFunc();
  }
});
