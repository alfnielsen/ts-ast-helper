"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var ts = require("typescript");
function watch(rootFileNames, options) {
    var files = {};
    // initialize the list of files
    rootFileNames.forEach(function (fileName) {
        files[fileName] = { version: 0 };
    });
    // Create the language service host to allow the LS to communicate with the host
    var servicesHost = {
        getScriptFileNames: function () { return rootFileNames; },
        getScriptVersion: function (fileName) {
            return files[fileName] && files[fileName].version.toString();
        },
        getScriptSnapshot: function (fileName) {
            if (!fs.existsSync(fileName)) {
                return undefined;
            }
            return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString());
        },
        getCurrentDirectory: function () { return process.cwd(); },
        getCompilationSettings: function () { return options; },
        getDefaultLibFileName: function (options) { return ts.getDefaultLibFilePath(options); },
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        readDirectory: ts.sys.readDirectory,
        directoryExists: ts.sys.directoryExists,
        getDirectories: ts.sys.getDirectories,
    };
    // Create the language service files
    var services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry());
    // Now let's watch the files
    rootFileNames.forEach(function (fileName) {
        // First time around, emit all files
        emitFile(fileName);
        // Add a watch on the file to handle next change
        fs.watchFile(fileName, { persistent: true, interval: 250 }, function (curr, prev) {
            // Check timestamp
            if (+curr.mtime <= +prev.mtime) {
                return;
            }
            // Update the version to signal a change in the file
            files[fileName].version++;
            // write the changes to disk
            emitFile(fileName);
        });
    });
    function emitFile(fileName) {
        var output = services.getEmitOutput(fileName);
        if (!output.emitSkipped) {
            console.log("Emitting ".concat(fileName));
        }
        else {
            console.log("Emitting ".concat(fileName, " failed"));
            logErrors(fileName);
        }
        output.outputFiles.forEach(function (o) {
            fs.writeFileSync(o.name, o.text, 'utf8');
        });
    }
    function logErrors(fileName) {
        var allDiagnostics = services
            .getCompilerOptionsDiagnostics()
            .concat(services.getSyntacticDiagnostics(fileName))
            .concat(services.getSemanticDiagnostics(fileName));
        allDiagnostics.forEach(function (diagnostic) {
            var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            if (diagnostic.file) {
                var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
                console.log("  Error ".concat(diagnostic.file.fileName, " (").concat(line + 1, ",").concat(character + 1, "): ").concat(message));
            }
            else {
                console.log("  Error: ".concat(message));
            }
        });
    }
}
// Initialize files constituting the program as all .ts files in the current directory
var currentDirectoryFiles = fs
    .readdirSync(process.cwd())
    .filter(function (fileName) {
    return fileName.length >= 3 && fileName.substr(fileName.length - 3, 3) === '.ts';
});
// Start the watcher
watch(currentDirectoryFiles, { module: ts.ModuleKind.CommonJS });
