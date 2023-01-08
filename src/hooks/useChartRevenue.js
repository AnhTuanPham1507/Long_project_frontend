import numberWithCommas from "../utils/FormatPrice";

function useChartRevenue(props) {
    const baseOptions = {

          options: {
            title: {
                align:"center",
                text: "Doanh Thu theo năm"
            },
            chart: {
              height: 350,
              stacked: false,
              toolbar: { show: false },
              zoom: { enabled: false },
            },
            stroke: {
              width: [0, 2, 5],
              curve: 'smooth'
            },
            plotOptions: {
              bar: {
                columnWidth: '50%'
              }
            },
            
            fill: {
              opacity: [0.85, 0.25, 1],
              gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
              }
            },
            markers: {
              size: 0
            },
            xaxis: {
    
            },
            yaxis: {
              min: 0,
              labels:{
                formatter: function (y) {
                  if (typeof y !== "undefined") {
                    let label =  numberWithCommas(y);
                    if(label.length > 10){
                      label = label.split(",0")
                      return `${label[0]} triệu`
                    }
                    return label;
                  }
                  return y;
                }
              } 
            },
            tooltip: {
              shared: true,
              intersect: false,
              y: {
                formatter: function (y) {
                  if (typeof y !== "undefined") {
                    let label =  numberWithCommas(y);
                    if(label.length > 10){
                      label = label.split(",0")
                      return `${label[0]} triệu`
                    }
                    return label;
                  }
                  return y;
                }
              }
            }
          },
        };
    return baseOptions
}

export default useChartRevenue;