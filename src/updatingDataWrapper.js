import React from "react";
import {getData2} from "./utils";

function getDisplayName(ChartComponent) {
    const name = ChartComponent.displayName || ChartComponent.name || "ChartComponent";
    return name;
}

let toISOStr = Date.prototype.toISOString;

export default function updatingDataWrapper(ChartComponent) {
    const MS_PER_MINUTE = 60000;
    let durationInMinutes = 30;
    class UpdatingComponentHOC extends React.Component {
        constructor(props) {
            super(props);
            this.intervalTime = 1000; // ms
            let curDate = new Date();
            this.startDate = new Date(curDate.valueOf() - durationInMinutes * MS_PER_MINUTE);
            this.updatePlotData = this.updatePlotData.bind(this);
            this.getDateRange = this.getDateRange.bind(this);
            //let durationInMinutes = 1;
            //this.endDate = new Date();
            //date.setMinutes(date.getMinutes() - 1);
            //this.startDate = new Date(this.endDate.valueOf() - durationInMinutes * MS_PER_MINUTE);
        }

        componentDidMount() {
            this.updatePlotData();
        }

        updatePlotData(){
            console.log(this.startDate);
            let dataLoaderPromise = getData2(this.startDate);
            // dataLoaderPromise.then(data => {
            //     console.log(this);
            //     console.log(typeof this.setState);
            //     this.setState({data});
            // });
            dataLoaderPromise.then(
                data => {
                    //console.log(this);
                    //console.log(typeof this.setState);
                    this.setState(
                        {data},
                        () => {//after state was updated
                           //console.log(this.state);
                           this.interval = setTimeout(this.updatePlotData, this.intervalTime);
                           let curDate = new Date();
                           this.startDate = new Date(curDate.valueOf() - durationInMinutes * MS_PER_MINUTE);
                           // let isoDate = toISOStr.call(this.startDate);
                           // console.log(isoDate);
                         }
                    );
                }
            );
        }

        // componentDidUpdate(_, previousState) {
        //   console.log(previousState);
        //   console.log(this.state);
        // }

        render() {
            if (this.state == null) {
                return <div>Loading...</div>
            }

            const {data} = this.state;
            if (data.length < 3){
                return <div>To little data. Increase timeframe.</div>
            }
            const {type} = this.props;
            const dateRange = this.getDateRange(data);
            const curDate = new Date().toISOString();
            const lastVal = `time: ${data[data.length - 1].date.toString()}, price: ${data[data.length - 1].price.toString()}`;
            return <div>
                <div>Time of loading: {curDate}</div>
                <div>Last loaded data: {lastVal}</div>
                <ChartComponent ref="component" data={data} type={type} dateRange={dateRange}/>
            </div>;
        }

        getDateRange(data){
            let startDate = data[0].date;
            let endDate = data[data.length - 1].date;
            return {startDate, endDate};
        }
    }

    UpdatingComponentHOC.defaultProps = {
        type: "svg",
    };
    UpdatingComponentHOC.displayName = `updatingDataWrapper(${ getDisplayName(ChartComponent) })`;

    return UpdatingComponentHOC;
}