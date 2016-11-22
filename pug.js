"use strict";

const fs = require("fs"),
      path = require('path'),
      pug = require('pug'),
      compose_path = (...parts) => path.join(...parts),
      build_path = compose_path(__dirname, "build", "html"),
      pugdir = compose_path(__dirname, 'src', 'pug', 'pages'),
      compile_pug = () => fs.readdir(pugdir, function (e, files) {
          files.forEach(function (fname) {
            fs.open(
              path.join(
                compose_path(
                  build_path,
                  fname.split('.pug')[0]) + '.htm'
                ),
              'w',
              function (e, fd) {
                if (e) {
                  console.log(e);
                } else {
                  fs.write(
                    fd,
                    pug.compileFile(compose_path(pugdir, fname), {
                      //"debug": true,
                      "pretty": true,
                    })(),
                    (e) => (e !== null) && console.log(e)
                  );
                }
              }
            );
          });
        }
      ),
      check_or_create = (a, b) => (
        fs.stat(a, function (e, stats) {
          if (e) {
            fs.lstat(a, function (e, stats) {
              if (e) {
                fs.mkdir(a, function (e) {
                  if (e) {
                    console.log(e);
                  } else {
                    console.log(a, "directory created");
                    if (b)
                      check_or_create(compose_path(a, b));
                    else
                      compile_pug();
                  }
                });
              } else {
                console.log(a, "exist");
                if (b)
                  check_or_create(compose_path(a, b));
                else
                  compile_pug();
              }
            });
          } else {
            console.log(a, "exist");         
            if (b)
              check_or_create(compose_path(a, b));
            else
              compile_pug();
          }
        }));

check_or_create(compose_path(__dirname, "build"), "html");
