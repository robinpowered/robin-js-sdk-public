#!/usr/bin/env node
/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */


/**
 * This is a self-contained script that is run after an npm install.
 * It generates a both verbose and minified versions of this sdk for web browsers
 */
(function () {
  var Browserify = require('browserify'),
      Uglify = require('uglify-js'),
      fs = require('fs'),
      browserify,
      browserifyOptions,
      startTime,
      endTime,
      uglifyOptions,
      dotInterval,
      writeStream,
      inputFile = __dirname + '/../robin.js',
      distDir = __dirname + '/../dist',
      outputFile = distDir + '/robin.browser.js',
      outputFileMinified = distDir + '/robin.browser.min.js',
      outputFileMinifiedSourceMapName = 'robin.browser.min.map',
      outputFileMinifiedSourceMapPath = distDir + '/' + outputFileMinifiedSourceMapName,
      generateBrowserFiles;

  generateBrowserFiles = function () {
    fs.mkdir(distDir, function (err) {
      if (err) {
        if (err.code !== 'EEXIST') {
          throw err;
        }
      }
      process.stdout.write('Generating a version of Robin for the browser: [=');
      progressInterval = setInterval(function () {
        process.stdout.write('=');
      }, 100);
      browserify = Browserify();
      browserifyOptions = {
        standalone: 'Robin'
      }
      browserify.add(inputFile);
      startTime = +new Date();
      browserify.bundle(browserifyOptions, function (err, src) {
        var duration;
        if (err) {
          throw err;
        }
        clearInterval(progressInterval);
        endTime = +new Date();
        duration = (endTime - startTime)/1000;
        duration = duration.toFixed(2);
        console.log('=] 100%');
        console.log('Generated verbose source file in: ' + duration + ' seconds.');
        fs.writeFile(outputFile, src, function (err) {
          var uglified;
          uglifyOptions = {
            outSourceMap: outputFileMinifiedSourceMapName
          }
          if (err) {
            throw err;
          }
          console.log('Verbose source file saved to dist/robin.browser.js');
          process.stdout.write('Generating minified version of Robin: [=');
          progressInterval = setInterval(function () {
            process.stdout.write('=');
          }, 100);
          startTime = +new Date();
          uglified = Uglify.minify(outputFile, uglifyOptions);
          clearInterval(progressInterval);
          endTime = +new Date();
          duration = (endTime - startTime)/1000;
          duration = duration.toFixed(2);
          console.log('=] 100%');
          console.log('Generated minified browser file in: ' + duration + ' seconds.\n');
          fs.writeFile(outputFileMinified, uglified.code, function (err) {
            if (err) {
              throw err;
            }
            console.log('Minified source file saved to dist/robin.browser.min.js');
          });
          fs.writeFile(outputFileMinifiedSourceMapPath, uglified.map, function (err) {
            if (err) {
              throw err;
            }
            console.log('Minified source map saved to dist/robin.browser.min.map');
          });
        });
      });
    });
  };

  return generateBrowserFiles();
}).call(this);
