/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useEffect, useMemo, useState } from 'react';
import { api } from '~/utils/api';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AdminRevenue = () => {
    const [chartData, setChartData] = useState();
    const { data: revenues, refetch } = api.admin.findRevenue.useQuery();

    const dataSet = (year: number) => {
        const arr = {
            2023: new Array(12).fill(0),
            2024: new Array(12).fill(0),
        };
        if (revenues != undefined && revenues != null) {
            revenues?.map((item) => {
                if (item._id.year === year) {
                    arr[year].splice(item._id.month - 1, 1, item.totalAmount);
                    setChartData(arr[year]);
                }
            });
        }
    };

    const handleChange = (year: number) => {
        setChartData('');
        dataSet(year);
    };

    useEffect(() => {
        dataSet(new Date().getFullYear());
    }, [revenues]);

    const data = {
        labels: [
            'T. Một',
            'T. Hai',
            'T. Ba',
            'T. Tư',
            'T. Năm',
            'T. Sáu',
            'T. Bảy',
            'T. Tám',
            'T. Chín',
            'T. Mười',
            'T. Mười Một',
            'T. Mười Hai',
        ],
        datasets: [
            {
                label: 'Doanh thu theo tháng',
                data: chartData,
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.3,
            },
        ],
    };
    return (
        <>
            <div className="absolute-center w-4/5 flex-col">
                <div className="my-12 flex h-[40px] w-full items-center justify-end">
                    <span className="mr-3 font-primary text-2xl font-bold">
                        Năm:{' '}
                    </span>
                    <select
                        onChange={(e) => handleChange(parseInt(e.target.value))}
                        name="year"
                        id=""
                        defaultValue={2023}
                        className="h-[40px] w-[70px] rounded-3xl border border-black pl-3 font-primary text-2xl font-bold"
                    >
                        <option value="2023" selected>
                            2023
                        </option>
                        <option value="2024">2024</option>
                    </select>
                </div>

                <Line className="w-full" data={data} />
            </div>
        </>
    );
};
export default AdminRevenue;
