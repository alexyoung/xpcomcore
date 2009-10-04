/** 
 * @fileoverview This file defines the implementation of our File object.
 */

/**
 * @class File class used for things such as creating filesystem paths, reading files, etc.
 */
function File() {};

/** 
 * Joins the given string arguments together using the operating system's native path
 * separator.
 * @param {String[]} components Set of strings to join together.
 * @returns {String} The resulting path.
 */
File.join = function() {
  var file = $Cc["@mozilla.org/file/local;1"].createInstance($Ci.nsILocalFile);
  file.initWithPath(arguments[0]);
  
  for(var i = 1; i < arguments.length; i++) {
    file.append(arguments[i]);
  }
  
  return file.path;
};

/** 
 * Reads the given number of bytes (or the entire contents if the argument is ommitted)
 * from the specified file
 * @param {String} filePath Path to a file.
 * @param {int} [maxBytes] Number of bytes to read from the file. Defaults to entire file.
 * @returns {String} The data read from the given file.
 */
File.read = function(filePath, maxBytes) {
  var file = $Cc["@mozilla.org/file/local;1"].createInstance($Ci.nsILocalFile);
  file.initWithPath(filePath);
  var fileInputStream = $Cc["@mozilla.org/network/file-input-stream;1"].createInstance($Ci.nsIFileInputStream);
  var scriptableStream = $Cc["@mozilla.org/scriptableinputstream;1"].createInstance($Ci.nsIScriptableInputStream);
  fileInputStream.init(file, -1, -1, 0);
  scriptableStream.init(fileInputStream);
  try {
    return scriptableStream.read(maxBytes || scriptableStream.available());
  } finally {
    scriptableStream.close();
  }
};