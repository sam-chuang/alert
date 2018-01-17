

var jscriptVersion = new Function("/*@cc_on return @_jscript_version; @*/")();

export function isIE10() {
    return jscriptVersion && jscriptVersion == 10
}