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
const distDir = './dist';

function templateInjectionTask( cb )
{
	gulp.src( [ 'src/**/*.html' ] )
	.pipe( file_include({
		prefix: "@@",
		basepath : './src/',
		indent: true,
		context: {
			imgBase: "https://info.lazardassetmanagement.com/rs/394-MLC-997/images"
		}
	}) )
	.pipe( gulp.dest( tempDir ) )
	.on( 'end', cb )
}

function inlineCssTask( cb )
{
	const cssString = fs.readFileSync( 'src/styles/index.css', 'utf8' );

	gulp.src( `${tempDir}/**/*.html` )
	.on( 'data', function( { basename, path, relative } ){
		const dir = `./dist/${relative.replace( basename, '' )}`;
		var preserveMediaQueries = false;
		if( path.indexOf('master') !== -1 )
				preserveMediaQueries = true;
		juice.juiceFile( path, {
			extraCss : cssString,
			preserveMediaQueries,
			webResources: {
				images: 0
			}
		}, function( err, outputHtml ) {
			if( !fs.existsSync( dir ) )
				fs.mkdirSync( dir, { recursive : true } );

			fs.writeFileSync( `${dir}${basename}`, outputHtml, 'utf8' );
		} )
	} )
	.on( 'end', cb );
}

async function cleanup( cb )
{
	await deleteAsync( [ tempDir, distDir ] );
	cb();
}

function watchTask(  )
{
	gulp.watch( [ './src/**/*.html', './src/**/*.css' ], gulp.series( 'build' ) );
}

gulp.task( 'build', gulp.series( cleanup, templateInjectionTask, inlineCssTask ) );
gulp.task( 'watch', gulp.series( 'build', watchTask ) );
gulp.task( 'clean', gulp.series( cleanup ) );