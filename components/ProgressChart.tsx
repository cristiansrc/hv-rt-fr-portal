"use client";
import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
const ProgressChart = ({ progress }: { progress: number }) => {
  const [chartProgress, setChartProgress] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setChartProgress(progress);
    }
  }, [inView, progress]);

  const options: ApexOptions = {
    chart: {
      type: "radialBar",
      width: 250,
      height: 250,
      sparkline: {
        enabled: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 2000,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 1350,
        },
      },
    },
    series: [chartProgress],
    legend: {
      show: false,
    },
    stroke: {
      lineCap: "butt",
    },
    colors: ["#000000"],
    plotOptions: {
      radialBar: {
        dataLabels: {
          value: {
            show: false,
          },
          name: {
            offsetY: 15,
            fontSize: "44px",
          },
        },
        hollow: {
          size: "80%",
        },
      },
    },
    labels: [""],
    grid: {
      padding: {
        top: -16,
        bottom: -20,
      },
    },
  };

  return (
    <div ref={ref}>
      <ApexChart options={options} series={options.series} type="radialBar" width={"100%"} height={250} />
    </div>
  );
};

export default ProgressChart;
