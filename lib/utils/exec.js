
var spawn = require('child_process').spawn

    //runs a command with args,
    //returning a promise that will resolve with
    //{ out:..., err:..., code:... }
    //the promise does not reject.
    //pass the ondataout and ondataerr handlers
    //that will pass incremental changes to you
    //but this doesn't change the above behavior.

module.exports = function(cmd, args, cwd, ondataout, ondataerr) {

    return new Promise(function(resolve, reject){

        var total_err = '';
        var total_out = '';
        var proc = spawn(cmd, args, {cwd: cwd});

        proc.stdout.on('data', function(data){
            var s = data.toString('utf-8');
            total_out += s;
            if(ondataout) ondataout(s);
        });

        proc.stderr.on('data', function(data){
            var s = data.toString('utf-8');
            total_err += s;
            if(ondataerr) ondataerr(s);
        });

        proc.on('close', function(code) {
            resolve({
                out:total_out,
                err:total_err,
                code:code
            });
        }); //on close

    }); //Promise

} //module.exports
