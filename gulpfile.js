/*

	- template injection -> output.html(s)
	- juice -> dist
	- clean up

*/
import gulp from 'gulp';

import fs from 'fs';
import path from 'path'

import file_include from 'gulp-file-include';
import juice from 'juice';

import { deleteAsync } from 'del';

const tempDir = './_temp';

function templateInjectionTask( cb )
{
	gulp.src( [ 'src/**/*.html' ] )
	.pipe( file_include({
		prefix: "@@",
		basepath : './src/',
		indent: true
	}) )
	.pipe( gulp.dest( tempDir ) )
	.on( 'end', cb )
}

function inlineCssTask( cb )
{
	gulp.src( `${tempDir}/**/*.html` )
	.on( 'data', function( { basename, path, relative } ){
		const dir = `./dist/${relative.replace( basename, '' )}`;
		juice.juiceFile( path, {}, function( err, outputHtml ) {
			if( !fs.existsSync( dir ) )
				fs.mkdirSync( dir, { recursive : true } );

			fs.writeFileSync( `${dir}${basename}`, outputHtml, 'utf8' );
		} )
	} )
	.on( 'end', cb );
}

async function cleanup( cb )
{
	await deleteAsync( [ tempDir ] );
	cb();
}

function watchTask(  )
{
	gulp.watch( [ './src/**/*.html', './src/**/*.css' ], gulp.series( 'build' ) );
}

gulp.task( 'build', gulp.series( templateInjectionTask, inlineCssTask ) );
gulp.task( 'watch', gulp.series( 'build', watchTask ) );