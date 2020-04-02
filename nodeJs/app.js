let fs = require('fs');
let path = require('path');
let globToRegExp = require('glob-to-regexp');
let dirPath = process.argv[2];
let searchGlob = process.argv[3];
let ignoreFilePath = process.argv[4];


readIgnoreFile().then(arrayIgnore => {
    walk(dirPath, searchGlob, arrayIgnore, function (err, results) {
        if (err) {
            throw err;
        }
        addTextToFile(results)
    });
});


const walk = function (dir, search, regExcludes, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        let searchReg = globToRegExp(search);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.join(dir, file);
            isDirectory(file).then(isDirectory => {
                if (isDirectory) {
                    walk(file, search, regExcludes, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) {
                            done(null, results);
                        }
                    });
                } else {
                    if (searchReg.test(file)) {
                        let excluded = checkIgnore(file, regExcludes);
                        if (excluded === false) {
                            results.push(file);
                            if (!--pending) {
                                done(null, results);
                            }
                        } else {
                            if (!--pending) {
                                done(null, results);
                            }
                        }
                    } else {
                        if (!--pending) {
                            done(null, results);
                        }
                    }
                }
            })
        });
    });
};

function readIgnoreFile() {
    return new Promise(function (resolve) {
        if (ignoreFilePath) {
            let arrayIgnore = [];
            fs.readFile(ignoreFilePath, "utf8",
                function (error, data) {
                    if (error) return resolve(arrayIgnore);
                    data.split(/\r?\n/).forEach(function (line) {
                        arrayIgnore.push(line);
                    })
                    resolve(arrayIgnore)
                });
        } else {
            resolve(arrayIgnore)
        }
    });
}


function isDirectory(file) {
    return new Promise(function (resolve, reject) {
        fs.stat(file, function (err, stat) {
            return resolve(stat && stat.isDirectory());
        })
    })
}

function addTextToFile(resultArray) {
    resultArray.forEach(file => {
        fs.readFile(file, "utf8",
            function (error, data) {
                if (error) return '';
                if (!data.match(/\/ script was here \/\n\n/)) {
                    fs.writeFile(file, `/ script was here /\n\n ${data}`, (err) => {
                        if (err) throw err;
                        console.log('Data has add to', file);
                    });
                }
            });
    })
}

function checkIgnore(file, regExcludes) {
    let len = regExcludes.length;
    for (let i = 0; i < len; i++) {
        let reg = globToRegExp(regExcludes[i]);
        if (reg.test(file)) {
            return true;
        }
    }
    return false;
}