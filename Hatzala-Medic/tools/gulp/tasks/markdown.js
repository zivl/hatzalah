var gulp = require('gulp');
var markdown = require('gulp-markdown-to-json');


function markdownTask(options) {
    return gulp.src(options.src)
        .pipe(markdown())
        .pipe(gulp.dest(options.dest));
}

module.exports = markdownTask;