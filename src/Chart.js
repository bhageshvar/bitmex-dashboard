
// import SpreadPlot from "./SpreadPlot";
import {LineAndScatterChart as SpreadPlot} from "./SpreadPlotLinear";
import updatingDataWrapper from "./updatingDataWrapper";

const SpreadPlotWithUpdatingData = updatingDataWrapper(SpreadPlot);

export default SpreadPlotWithUpdatingData;
