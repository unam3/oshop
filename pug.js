"use strict";

const fs = require("fs"),
      path = require('path'),
      pug = require('pug'),
      compose_path = (...parts) => path.join(...parts),
      build_path = compose_path(__dirname, "build", "html"),
      pugdir = compose_path(__dirname, 'src', 'pug', 'pages'),
      compile_pug = () => fs.readdir(pugdir, function (error, files) {
        if (error) {
          console.log(error);
        } else {
          files.forEach(function (fname) {
            if (fname.length > 4
              && fname.indexOf('.pug', fname.length - 4) !== -1) {
              fs.open(
                compose_path(
                  build_path,
                  fname.split('.pug')[0] + '.htm'
                ),
                'w',
                function (error, fd) {
                  if (error) {
                    console.log(error);
                  } else {
                    fs.write(
                      fd,
                      pug.compileFile(compose_path(pugdir, fname), {
                        //"debug": true,
                        "pretty": true,
                      })(),
                      (error) => (error !== null) && console.log(error)
                    );
                  }
                }
              );
            }
          });
        }
      }),
      check_or_create = (a, b) => (
        fs.stat(a, function (error) {
          if (error) {
            fs.lstat(a, function (error) {
              if (error) {
                fs.mkdir(a, function (error) {
                  if (error) {
                    console.log(error);
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
