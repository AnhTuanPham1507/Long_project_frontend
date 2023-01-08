import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { statisticAPI } from '../api/axios';
import axios from 'axios';
import useChartRevenue from '../hooks/useChartRevenue';
import useChartTopSold from '../hooks/useChartTopSold';

function DashBoard() {
    const [myRevenue, setMyRevenue] = useState(null)
    const [topSoldProducts, setTopSoldProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const baseOptionsRevenue = useChartRevenue()
    const baseOptionsTopSold = useChartTopSold()

    useEffect(() => {
        setLoading(true)
        Promise.all([statisticAPI.getRevenue(), statisticAPI.getTopSoldProducts()])
            .then((results) => {
                const data = results[0].data
                const revenue = Object.values(data.revenue)
                const costPrice = Object.values(data.costPrice)
                const gap = Object.values(data.gap)
                const tempTopSoldProducts = results[1].data.reduce((obj,item) => {
                    obj.labels = [...obj.labels,item.r_product.name]
                    obj.soldQuantities = [...obj.soldQuantities,item.quantity]
                    obj.stockQuantities = [...obj.stockQuantities,item.stockQuantity]
                    return obj
                },{labels:[],soldQuantities:[],stockQuantities:[]})
                setMyRevenue({ revenue, costPrice, gap });
                setTopSoldProducts(tempTopSoldProducts)
            })
            .catch((error) => {
                if (axios.isAxiosError(error))
                    alert((error.response ? error.response.data.message : error.message));
                else alert((error.toString()));
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        loading ?
            <Loading /> :
            <div style={{display:"flex", flexDirection:"column"}}>
                <ReactApexChart
                    options={
                        {
                            ...baseOptionsRevenue.options,
                            labels:
                                [
                                    "Quá khứ",
                                    "Tháng một",
                                    "Tháng hai",
                                    "Tháng ba",
                                    "Tháng tư",
                                    "Tháng năm",
                                    "Tháng sáu",
                                    "Tháng bảy",
                                    "Tháng tám",
                                    "Tháng chín",
                                    "Tháng mười",
                                    "Tháng mười một",
                                    "Tháng mười hai",
                                ]
                        }
                    }
                    series={
                        [
                            {
                                name: 'Doanh thu',
                                type: 'column',
                                data: myRevenue?.revenue,
                            },
                            {
                                name: 'Chi phí bỏ ra',
                                type: 'area',
                                data: myRevenue?.costPrice
                            },
                            {
                                name: 'Chênh lệch',
                                type: 'none',
                                data: myRevenue?.gap,
                            },
                        ]
                    }
                    height={350}
                />
                <ReactApexChart
                style={{width:"100%"}}
                    options={
                        {
                            ...baseOptionsTopSold.options,
                            labels:topSoldProducts?.labels
                        }
                    }
                    series={
                        [
                            {
                                name: 'Đã bán',
                                type: 'bar',
                                data: topSoldProducts?.soldQuantities,
                            },
                            {
                                name: 'Còn lại',
                                type: 'none',
                                data: topSoldProducts?.stockQuantities
                            },
                        ]
                    }
                    height={350}
                />
            </div>


    );
}

export default DashBoard;