

import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

const fetch = require('node-fetch');
const crypto = require('crypto');
const qs = require('qs');


const apiKey = 'lJZegNts4GX9sHXU44UpYusd';
const apiSecret = 'GK21mGRYlgWrHAXWjauywye7_MM0aHVHrS7kuDB9oh1BnP_y';

// function parseData(parse) {
// 	return function(d) {
// 		d.date = parse(d.date);
// 		d.open = +d.open;
// 		d.high = +d.high;
// 		d.low = +d.low;
// 		d.close = +d.close;
// 		d.volume = +d.volume;
//
// 		return d;
// 	};
// }
//
// const parseDate = timeParse("%Y-%m-%d");

// export function getData() {
// 	const promiseMSFT = fetch("//rrag.github.io/react-stockcharts/data/MSFT.tsv")
// 		.then(response => {
// 			let d = response.text();
// 		    return d;
// 		})
// 		.then(data => {
// 			let v = tsvParse(data, parseData(parseDate));
// 			//v = v.slice(0,253);  //crashes on 253
// 			return v;
// 		});
// 	return promiseMSFT;
// }


export function  getData2(startDate /*Date obj*/) {
        //let self = this;

        let urlData = buildUrl('GET', 'trade', {count: 400, symbol: 'XBTU18', startTime: startDate});
        // use proxy to avoid CORS error, see
        // https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const promiseMSFT = fetch(proxyUrl + urlData.url, urlData.requestOptions)
            .then(response => {
                if ('error' in response) throw new Error(response.error.message);
                let jsonPromise = response.json();
                return jsonPromise;
            })
            .then(data => {
                //console.log(data);
                let v = data.map((i) => ({date: new Date(i.timestamp), price: i.price}));
                return v;
            });
	return promiseMSFT;

}

function  buildUrl(verb, endpoint, data = {}){
	const apiRoot = '/api/v1/';
	const expires = new Date().getTime() + (60 * 1000);  // 1 min in the future

	let query = '', postBody = '';
	if (verb === 'GET')
		query = '?' + qs.stringify(data);
	else
		// Pre-compute the reqBody so we can be sure that we're using *exactly* the same body in the request
		// and in the signature. If you don't do this, you might get differently-sorted keys and blow the signature.
		postBody = JSON.stringify(data);

	const signature = crypto.createHmac('sha256', apiSecret)
		.update(verb + apiRoot + endpoint + query + expires + postBody).digest('hex');

	const headers = {
		'content-type': 'application/json',
		'accept': 'application/json',
		// This example uses the 'expires' scheme. You can also use the 'nonce' scheme. See
		// https://www.bitmex.com/app/apiKeysUsage for more details.
		'api-expires': expires,
		'api-key': apiKey,
		'api-signature': signature,
	};

	const requestOptions = {
		method: verb,
		mode: "no-cors",
		headers,
	};
	if (verb !== 'GET') requestOptions.body = postBody;  // GET/HEAD requests can't have body

	//const url = 'https://www.bitmex.com' + apiRoot + endpoint + query;
	const url = 'https://testnet.bitmex.com' + apiRoot + endpoint + query;
	// const url =
	//    "https://testnet.bitmex.com/api/v1/trade?symbol=XBTU18&count=100&reverse=false&startTime=2018-07-31%2011%3A00";
	console.log(url);
	return {url, requestOptions}

	// return fetch(url, requestOptions).then(response => response.json()).then(
	//     response => {
	//         if ('error' in response) throw new Error(response.error.message);
	//         return response;
	//     },
	//     error => console.error('Network error', error),
	// );
}


//////////////////////////////////////////////////////////////////////
// const fetch = require('node-fetch');
// const crypto = require('crypto');
// const qs = require('qs');
//
// const apiKey = 'lJZegNts4GX9sHXU44UpYusd';
// const apiSecret = 'GK21mGRYlgWrHAXWjauywye7_MM0aHVHrS7kuDB9oh1BnP_y';
//
// function makeRequest(verb, endpoint, data = {}) {
//     const apiRoot = '/api/v1/';
//     const expires = new Date().getTime() + (60 * 1000);  // 1 min in the future
//
//     let query = '', postBody = '';
//     if (verb === 'GET')
//         query = '?' + qs.stringify(data);
//     else
//     // Pre-compute the reqBody so we can be sure that we're using *exactly* the same body in the request
//     // and in the signature. If you don't do this, you might get differently-sorted keys and blow the signature.
//         postBody = JSON.stringify(data);
//
//     const signature = crypto.createHmac('sha256', apiSecret)
//         .update(verb + apiRoot + endpoint + query + expires + postBody).digest('hex');
//
//     const headers = {
//         'content-type': 'application/json',
//         'accept': 'application/json',
//         // This example uses the 'expires' scheme. You can also use the 'nonce' scheme. See
//         // https://www.bitmex.com/app/apiKeysUsage for more details.
//         'api-expires': expires,
//         'api-key': apiKey,
//         'api-signature': signature,
//     };
//
//     const requestOptions = {
//         method: verb,
//         headers,
//     };
//     if (verb !== 'GET') requestOptions.body = postBody;  // GET/HEAD requests can't have body
//
//     //const url = 'https://www.bitmex.com' + apiRoot + endpoint + query;
//     const url = 'https://testnet.bitmex.com' + apiRoot + endpoint + query;
//     // const url =
//     //     "https://testnet.bitmex.com/api/v1/trade?symbol=XBTU18&count=100&reverse=false&startTime=2018-07-31%2011%3A00";
//     console.log(url);
//
//     return fetch(url, requestOptions).then(
//         response => {
//             let d = response.json();
//             return d;
//         })
//          .then(
//         response => {
//             if ('error' in response) throw new Error(response.error.message);
//             return response;
//         },
//         error => console.error('Network error', error),
//     );
// }
//
// export function getData() {
//     const result = makeRequest('GET', 'trade',
//         {
//             symbol: 'XBTU18',
//             startTime: '2018-07-31 13:34'
//         });
//     return result;
// }
//





///////////////////////////////////////////////////////////////////////////////////////////
//
//
// import { tsvParse, csvParse } from  "d3-dsv";
// import { timeParse } from "d3-time-format";
//
// function parseData(parse) {
// 	return function(d) {
// 		d.date = parse(d.date);
// 		d.open = +d.open;
// 		d.high = +d.high;
// 		d.low = +d.low;
// 		d.close = +d.close;
// 		d.volume = +d.volume;
//
// 		return d;
// 	};
// }
//
// const parseDate = timeParse("%Y-%m-%d");
//
// export function getData() {
// 	const promiseMSFT = fetch("https://testnet.bitmex.com/api/v1/trade?symbol=XBTU18&startTime=2018-07-31%2013%3A34")
// 		.then(response => {
// 			let d = response.json();
// 		    return d;
// 		})
// 		.then(data => {
// 			let v = tsvParse(data, parseData(parseDate));
// 			return v;
// 		});
// 	return promiseMSFT;
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { tsvParse, csvParse } from  "d3-dsv";
// import { timeParse } from "d3-time-format";
//
// function parseData(parse) {
// 	return function(d) {
// 		d.date = parse(d.date);
// 		d.open = +d.open;
// 		d.high = +d.high;
// 		d.low = +d.low;
// 		d.close = +d.close;
// 		d.volume = +d.volume;
//
// 		return d;
// 	};
// }
//
// const parseDate = timeParse("%Y-%m-%d");

// export function getData() {
// 	const promiseMSFT = fetch("//rrag.github.io/react-stockcharts/data/MSFT.tsv")
// 		.then(response => {
// 			return response.text();
// 		})
// 		.then(data => {
// 			let v = tsvParse(data, parseData(parseDate));
// 			return v;
// 		});
// 	return promiseMSFT;
// }

// const fetch = require('node-fetch');
// const crypto = require('crypto');
// const qs = require('qs');
//
// const apiKey = 'lJZegNts4GX9sHXU44UpYusd';
// const apiSecret = 'GK21mGRYlgWrHAXWjauywye7_MM0aHVHrS7kuDB9oh1BnP_y';
//
// function makeRequest(verb, endpoint, data = {}) {
//     const apiRoot = '/api/v1/';
//     const expires = new Date().getTime() + (60 * 1000);  // 1 min in the future
//
//     let query = '', postBody = '';
//     if (verb === 'GET')
//         query = '?' + qs.stringify(data);
//     else
//     // Pre-compute the reqBody so we can be sure that we're using *exactly* the same body in the request
//     // and in the signature. If you don't do this, you might get differently-sorted keys and blow the signature.
//         postBody = JSON.stringify(data);
//
//     const signature = crypto.createHmac('sha256', apiSecret)
//         .update(verb + apiRoot + endpoint + query + expires + postBody).digest('hex');
//
//     const headers = {
//         'content-type': 'application/json',
//         'accept': 'application/json',
//         // This example uses the 'expires' scheme. You can also use the 'nonce' scheme. See
//         // https://www.bitmex.com/app/apiKeysUsage for more details.
//         'api-expires': expires,
//         'api-key': apiKey,
//         'api-signature': signature,
//     };
//
//     const requestOptions = {
//         method: verb,
//         headers,
//     };
//     if (verb !== 'GET') requestOptions.body = postBody;  // GET/HEAD requests can't have body
//
//     //const url = 'https://www.bitmex.com' + apiRoot + endpoint + query;
//     const url = 'https://testnet.bitmex.com' + apiRoot + endpoint + query;
//     // const url =
//     //     "https://testnet.bitmex.com/api/v1/trade?symbol=XBTU18&count=100&reverse=false&startTime=2018-07-31%2011%3A00";
//     console.log(url);
//
//     return fetch(url, requestOptions).then(response => response.json()).then(
//         response => {
//             if ('error' in response) throw new Error(response.error.message);
//             return response;
//         },
//         error => console.error('Network error', error),
//     );
// }
//
// export function getData() {
//     const result = makeRequest('GET', 'trade',
//         {
//             symbol: 'XBTU18',
//             startTime: '2018-07-31 13:34'
//         });
//     return result;
// }
