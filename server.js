const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;
const pug = require('pug');
const fs = require('fs');


// Listen in on root
app.get('/', async (req, res) => {
    const filename = req.query.filename;
    const text = req.query.text;
    const password = req.query.password;
    if (filename && text && password) {
        // Run the command with the parameter the user gives us
        fs.writeFileSync(`./files/${filename}.txt`, text);
        exec(`zip --password ${password} ./files/${filename}.zip ./files/${filename}.txt`, (error, stdout, stderr) => {
            let output = stdout;
            if (error) {
                // If there are any errors, show that
                output = error;
            }
            res.download(`./files/${filename}.zip`);
        });
    } else {
        res.send(pug.renderFile('./pages/index.pug', {}));
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});