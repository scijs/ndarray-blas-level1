var gulp = require('gulp')
  , mdEq = require('gulp-markdown-equations')
  , tap = require('gulp-tap')
  , filter = require('gulp-filter')
  , latex = require('gulp-latex')
  , pdftocairo = require('gulp-pdftocairo')


gulp.task('mdtex',function() {

  var texFilter = filter('*.tex')
  var mdFilter = filter('*.md')

  // Instantiate the transform and set some defaults:
  var eqSub = mdEq({
    defaults: {
      display: { margin: '1pt' },
      inline: {margin: '1pt'}
    }
  })

  return gulp.src('*.mdtex')
    .pipe(eqSub)

    // Separate the equations:
    .pipe(texFilter)

    // Render the equations to pdf:
    .pipe(latex())

    // Convert the pdf equations to png:
    .pipe(pdftocairo({format: 'png'}))

    // Send them to the images folder:
    .pipe(gulp.dest('images'))

    // Match the output images up with the markdown input so that we can use the resulting
    // metadata to construct html that replaces the original equations:
    .pipe(tap(function(file) {
      eqSub.complete(file,function(cb,meta) {
        var img = '<img alt="'+meta.alt+'" valign="middle" src="'+meta.path+'" width="'+meta.width/2+'" height="'+meta.height/2+'">'
        meta.display ? cb('<p align="center">'+img+'</p>') : cb(img)
      })
    }))

    // Grab the original markdown file that's now complete:
    .pipe(texFilter.restore()).pipe(mdFilter)

    // Output in the current directory:
    .pipe(gulp.dest('./'))
})
