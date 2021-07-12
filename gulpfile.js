// gulpfile.js
const gulp = require('gulp');
const http = require('http');
const connect = require('connect');
const serveStatic = require('serve-static');
const webdriver = require('gulp-webdriver');
const { remote } = require('webdriverio');

let server;

gulp.task('http:serve', (done) => {
  const app = connect();
  app.use("/", serveStatic('test/e2e/fixtures'))
  app.use("/js", serveStatic('build/'));
  app.use("/ira", serveStatic('androidApi/build/'));
  server = http.createServer(app).listen(9000, done);
  done();
});

gulp.task('http:cleanup', (done) => {
  if(server) {
    server.close();
  }
  done();
});




gulp.task('e2e', () => {
  return gulp.src('wdio.conf.js').pipe(webdriver({
    logLevel: 'info',
    waitForTimeout: 10000,
    reporter: 'spec'
  }))
});



gulp.task('test:e2e', gulp.series('http:serve', 'e2e', 'http:cleanup'));
