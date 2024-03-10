const express = require('express');
const { execFile } = require('child_process');
const app = express();
const port = 3000;
const pug = require('pug');
const fs = require('fs');


app.get('/', async (req, res) => {
    const filename = req.query.filename;
    const text = req.query.text;
    const password = req.query.password;
    if (filename && text && password) {
        fs.writeFileSync(`./files/${filename}.txt`, text);
        execFile(`/usr/bin/zip`, [`--password`,`${password}`, `./files/${filename}.zip`, `./files/${filename}.txt`], (error, stdout, stderr) => {
            if (error) {
                // If there are any errors, show that
                res.send(
                    pug.renderFile('./pages/index.pug', { output: error })
                );
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