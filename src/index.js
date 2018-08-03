import React from 'react';
import {render} from 'react-dom';
import Chart from './Chart';
import {getData, getData2} from "./utils"
import {TypeChooser} from "react-stockcharts/lib/helper";

//react-stockcharts:
//https://github.com/rrag/react-stockcharts

class ChartComponent extends React.Component {

  //   constructor(props) {
  //       super(props)
  //       this.state = {
  //         data: null
  //       }
  //     }

    // buildUrl(verb, endpoint, data = {}){
    //     const apiRoot = '/api/v1/';
    //     const expires = new Date().getTime() + (60 * 1000);  // 1 min in the future
    //
    //     let query = '', postBody = '';
    //     if (verb === 'GET')
    //         query = '?' + qs.stringify(data);
    //     else
    //         // Pre-compute the reqBody so we can be sure that we're using *exactly* the same body in the request
    //         // and in the signature. If you don't do this, you might get differently-sorted keys and blow the signature.
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
    //         mode: "no-cors",
    //         headers,
    //     };
    //     if (verb !== 'GET') requestOptions.body = postBody;  // GET/HEAD requests can't have body
    //
    //     //const url = 'https://www.bitmex.com' + apiRoot + endpoint + query;
    //     const url = 'https://testnet.bitmex.com' + apiRoot + endpoint + query;
    //     // const url =
    //     //    "https://testnet.bitmex.com/api/v1/trade?symbol=XBTU18&count=100&reverse=false&startTime=2018-07-31%2011%3A00";
    //     console.log(url);
    //     return {url, requestOptions}
    //
    //     // return fetch(url, requestOptions).then(response => response.json()).then(
    //     //     response => {
    //     //         if ('error' in response) throw new Error(response.error.message);
    //     //         return response;
    //     //     },
    //     //     error => console.error('Network error', error),
    //     // );
    // }

    // loadData() {
    //     let self = this;
    //
    //     let urlData = this.buildUrl('GET', 'trade', {symbol: 'XBTU18', startTime: '2018-07-31 13:34'});
    //     // useing proxy to avoid CORS error, see
    //     // https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
    //     const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //     fetch(proxyUrl + urlData.url, urlData.requestOptions)
    //         .then(response => {
    //             if ('error' in response) throw new Error(response.error.message);
    //             let jsonPromise = response.json();
    //             return jsonPromise;})
    //         .then(data => {
    //             console.log(data);
    //             self.setState({
    //                 data
    //             });
    //             console.log("DONE");
    //         });
    // }

    // componentDidMount() {
	// 	let dataLoaderPromise = getData2();
    //     dataLoaderPromise.then(data => {
	// 		this.setState({ data })
	// 	});
    //     console.log("DATA WAS LOADED");
	// }

    // new_componentDidMount() {
    //     let self = this;
    //
    //     let urlData = this.buildUrl('GET', 'trade', {symbol: 'XBTU18', startTime: '2018-07-31 13:34'});
    //     // useing proxy to avoid CORS error, see
    //     // https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
    //     const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //     fetch(proxyUrl + urlData.url, urlData.requestOptions)
    //         .then(response => {
    //             if ('error' in response) throw new Error(response.error.message);
    //             let jsonPromise = response.json();
    //             return jsonPromise;})
    //         .then(data => {
    //             console.log(data);
    //             self.setState({
    //                 data
    //             });
    //             console.log("DONE");
    //         });
    // }

    // componentDidMount() {
    // 	let v = getData();
    // 	v.then(data => {
    // 		this.setState({ data })
    // 	})
    // }
    render() {
        return (
            <TypeChooser>
                {type => <Chart type={type}/>}
            </TypeChooser>
        )

        // if (this.state == null) {
        //     return <div>Loading...</div>
        // }
        // return (
        //     <TypeChooser>
        //         {type => <Chart type={type} data={this.state.data}/>}
        //     </TypeChooser>
        // )
    }
}

render(
    <ChartComponent/>,
    document.getElementById("root")
);


//////////////////////////////////////////////////////////
// import React from 'react';
// import { render } from 'react-dom';
// import Chart from './Chart';
// import { getData } from "./utils"
//
// import { TypeChooser } from "react-stockcharts/lib/helper";
//
//
// class ChartComponent extends React.Component {
// // state = {
// //     data: [1,2,3]
// //   };
//
//   loadData() {
//     fetch("https://api.postcodes.io/random/postcodes")
//       .then(response => response.json())
//       .then(json => {
//         this.setState({
//           data: json.result
//         });
//         console.log(json);
//
//       });
//   }
//
//   componentDidMount() {
//     this.loadData();
//   }
//
// 	// componentDidMount() {
// 	// 	let v = getData();
// 	// 	v.then(data => {
// 	// 		this.setState({ data })
// 	// 	})
// 	// }
// 	render() {
// 		if (this.state == null) {
// 			return <div>Loading...</div>
// 		}
// 		return (
// 			<TypeChooser>
// 				{type => <Chart type={type} data={this.state.data} />}
// 			</TypeChooser>
// 		)
// 	}
// }
//
// render(
// 	<ChartComponent />,
// 	document.getElementById("root")
// );
//
//////////////////////////////////////////////////////////////////////////

// import React from 'react';
// import { render } from 'react-dom';
// import Chart from './Chart';
// import { getData } from "./utils"
//
// import { TypeChooser } from "react-stockcharts/lib/helper";
//
//
//
// class ChartComponent extends React.Component {
// 	componentDidMount() {
// 		let v = getData();
// 		v.then(data => {
// 			this.setState({ data })
// 		})
// 	}
// 	render() {
// 		if (this.state == null) {
// 			return <div>Loading...</div>
// 		}
// 		return (
// 			<TypeChooser>
// 				{type => <Chart type={type} data={this.state.data} />}
// 			</TypeChooser>
// 		)
// 	}
// }
//
// render(
// 	<ChartComponent />,
// 	document.getElementById("root")
// );
