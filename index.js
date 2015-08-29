var gulp   = require( 'gulp' );
var shell  = require( 'gulp-shell' );
var Elixir = require( 'laravel-elixir' );

/*
 |----------------------------------------------------------------
 | Rsync
 |----------------------------------------------------------------
 |
 | This task offers a simple way to sync files from one place to
 | another. No more complicated than that! You may either set
 | a single file or alternatively you can sync a full dir.
 |
 */

Elixir.extend( 'rsync', function( src, output, args )
{
    var paths = new Elixir.GulpPaths().src( src.replace( /\/+$/, '' ) ).output( output );

    args = args || '-rc --delete --out-format="   - %n%L"';

    new Elixir.Task( 'rsync', function()
    {
        var command = 'rsync ' + args + ' ' + src + ' ' + paths.output.path;

        this.log( paths.src );

        Elixir.Log
            .heading( 'Syncing To...')
            .files( paths.output.path );

        return gulp
            .src( '' )
            .pipe( shell( command ) )
            .pipe( new Elixir.Notification( 'Rsync Completed!' ) );
    })
    .watch( paths.src.path )
    .ignore( paths.output.path );
});
