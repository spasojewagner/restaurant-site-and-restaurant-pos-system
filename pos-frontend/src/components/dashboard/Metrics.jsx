import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders, getPayments, getTables , getReservations} from "../../https";
import { enqueueSnackbar } from "notistack";

const Metrics = () => {
  // Dohvati podatke iz API-ja
  const { data: ordersRes } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  const { data: paymentsRes } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });
  const { data: tablesRes } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });
  const { data: reservationRes } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  });




  const orders = ordersRes?.data?.data || [];
  const payments = paymentsRes?.data?.data || [];
  const tables = tablesRes?.data?.data || [];
  const reservations = reservationRes?.data?.data || [];

  // Izračunaj Revenue kao sumu svih plaćanja sa statusom \"COMPLETED\"
  const revenue = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((acc, cur) => acc + Number(cur.amount), 0);
  const formattedRevenue = `$${revenue.toFixed(2)}`;

  // Outbound Clicks nije dostupan u bazi – koristi statičku vrednost
  const outboundClicks = "10,342";

  // Total Customer: broj jedinstvenih kupaca (prema telefonu) u narudžbinama
  const totalCustomers = orders.reduce((acc, order) => {
    if (order.customerDetails && order.customerDetails.name) {
      acc.add(order.customerDetails.name);
    }
    return acc;
  }, new Set()).size;

  // Event Count: ukupan broj narudžbina
  const totalReservations = reservations.length;

  const metricsData = [
    {
      title: "Revenue",
      value: formattedRevenue,
      percentage: "12%",
      color: "#025cca",
      isIncrease: false,
    },
    {
      title: "Outbound Clicks",
      value: outboundClicks,
      percentage: "16%",
      color: "#02ca3a",
      isIncrease: true,
    },
    {
      title: "Total Customer",
      value: totalCustomers.toString(),
      percentage: "10%",
      color: "#f6b100",
      isIncrease: true,
    },
    {
      title: "Total Reservations",
      value: totalReservations.toString(),
      percentage: "10%",
      color: "#be3e3f",
      isIncrease: false,
    },
  ];

  // Izračunavanje aktivnih narudžbina
  const activeOrders = orders.filter(
    (order) => order.orderStatus && order.orderStatus.toLowerCase() === "in progress"
  ).length || 0;

  // Ako API za stolove ne vrati podatke, postavi 0
  const totalTables = (tables && tables.length) || 0;

  const itemsData = [
    { title: "Total Categories", value: "4", percentage: "12%", color: "#5b45b0", isIncrease: false },
    { title: "Total Dishes", value: "100", percentage: "12%", color: "#285430", isIncrease: true },
    { title: "Active Orders", value: String(activeOrders), percentage: "12%", color: "#735f32", isIncrease: true },
    { title: "Total Tables", value: String(totalTables), percentage: "0%", color: "#7f167f", isIncrease: false }
  ];


  return (
    <div className="container mx-auto py-2 px-6 md:px-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-[#f5f5f5] text-xl">
            Overall Performance
          </h2>
          <p className="text-sm text-[#ababab]">
          💡Here is a snapshot of the business performance, including revenue, customer interactions, and key metrics over the selected period.
          </p>
        </div>
        {/* <button className="flex items-center gap-1 px-4 py-2 rounded-md text-[#f5f5f5] bg-[#1a1a1a]">
          Last 1 Month
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button> */}
      </div>

      <div className="mt-6 grid grid-cols-4 gap-4">
        {metricsData.map((metric, index) => (
          <div
            key={index}
            className="shadow-sm rounded-lg p-4"
            style={{ backgroundColor: metric.color }}
          >
            <div className="flex justify-between items-center">
              <p className="font-medium text-xs text-[#f5f5f5]">
                {metric.title}
              </p>
              <div className="flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  style={{ color: metric.isIncrease ? "#f5f5f5" : "red" }}
                >
                  <path
                    d={
                      metric.isIncrease
                        ? "M5 15l7-7 7 7"
                        : "M19 9l-7 7-7-7"
                    }
                  />
                </svg>
                <p
                  className="font-medium text-xs"
                  style={{ color: metric.isIncrease ? "#f5f5f5" : "red" }}
                >
                  {metric.percentage}
                </p>
              </div>
            </div>
            <p className="mt-1 font-semibold text-2xl text-[#f5f5f5]">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-between mt-12">
        <div>
          <h2 className="font-semibold text-[#f5f5f5] text-xl">
            Item Details
          </h2>
          <p className="text-sm text-[#ababab]">
          💡 Monitor key inventory and order details to ensure seamless customer service and efficient management.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4">
          {itemsData.map((item, index) => (
            <div
              key={index}
              className="shadow-sm rounded-lg p-4"
              style={{ backgroundColor: item.color }}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-xs text-[#f5f5f5]">{item.title}</p>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  >
                    <path d="M5 15l7-7 7 7" />
                  </svg>
                  <p className="font-medium text-xs text-[#f5f5f5]">{item.percentage}</p>
                </div>
              </div>
              <p className="mt-1 font-semibold text-2xl text-[#f5f5f5]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
