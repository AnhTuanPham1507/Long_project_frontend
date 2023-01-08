
function useChartTopSold(props) {
    const baseOptions = {

          options: {
            title: {
                align:"center",
                text: "Sản phẩm bán chạy trong tháng"
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
            },
            tooltip: {
              shared: true,
              intersect: false,
              y: {
                formatter: function (y) {
                    return y + " cái";
                  }
              }
            }
          },
        };
    return baseOptions
}

export default useChartTopSold;