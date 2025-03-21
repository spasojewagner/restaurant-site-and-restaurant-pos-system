import React, { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { formatDateAndTime } from "../../utils";
import { getOrders, updateOrderStatus, deleteOrder } from "../../https";
import { PiDotsThreeFill } from "react-icons/pi";
import { FaTrashAlt } from "react-icons/fa";

const RecentOrders = () => {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orderStatusUpdate = useMutation({
    mutationFn: ({ orderId, orderStatus }) => updateOrderStatus({ orderId, orderStatus }),
    onSuccess: (data) => {
      enqueueSnackbar("Order status updated successfully!", { variant: "success" });
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      enqueueSnackbar("Failed to update order status", { variant: "error" });
    },
  });

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await getOrders();
      console.log("Fetched orders:", response);
      return response;
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong", { variant: "error" });
    console.error("Error fetching orders:", isError);
  }

  const handleStatusChange = (orderId, orderStatus) => {
    console.log("Updating order:", orderId, orderStatus);

    if (!orderId) {
      enqueueSnackbar("Invalid order ID", { variant: "error" });
      return;
    }

    orderStatusUpdate.mutate({ orderId, orderStatus });
  };

  //brisanje narudzbine testa 
  const deleteOrderMutation = useMutation({
    mutationFn: (orderId) => deleteOrder(orderId),
    onSuccess: () => {
      enqueueSnackbar("Order deleted successfully!", { variant: "success" });
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      enqueueSnackbar("Failed to delete order", { variant: "error" });
    }
  });


  return (
    <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
      <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#333] text-[#ababab]">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Items</th>
              <th className="p-3">Table No</th>
              <th className="p-3">Total</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {resData?.data.data.map((order, index) => (
              <React.Fragment key={index}>
                <tr className="border-b border-gray-600 hover:bg-[#333]">
                  <td className="p-4">#{Math.floor(new Date(order.orderDate).getTime())}</td>
                  <td className="p-4">{order.customerDetails?.name}</td>
                  <td className="p-4">
                    <select
                      className={`bg-[#1a1a1a] text-[#f5f5f5] border border-gray-500 p-2 rounded-lg focus:outline-none ${order.orderStatus === "Ready" ? "text-green-500" : order.orderStatus === "Completed" ? "text-blue-500" : "text-yellow-500"}`}
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option className="text-yellow-500" value="In Progress">
                        In Progress
                      </option>
                      <option className="text-green-500" value="Ready">
                        Ready
                      </option>
                      <option className="text-blue-500" value="Completed">
                        Completed
                      </option>
                    </select>
                  </td>
                  <td className="p-4">{formatDateAndTime(order.createdAt)}</td>
                  <td className="p-4 text-center">
                    <button
                      className="text-blue-400 hover:text-blue-500 transition mr-1"
                      onClick={() => setSelectedOrder(prev => prev === order ? null : order)}
                    >
                      <PiDotsThreeFill size={40} />
                    </button>
                  </td>
                  <td className="p-4">
  {order.table && order.table.tableNo ? `Table - ${order.table.tableNo}` : "Online"}
</td>
                  <td className="p-4">${order.bills.totalWithTax.toFixed(2)}</td>
                  <td className="p-4 text-center">
                    <button
                      className="text-red-400 hover:text-red-500 transition"
                      onClick={() => deleteOrderMutation.mutate(order._id)}
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </td>
                </tr>

                {selectedOrder === order && (
                  <tr className="bg-[#333]">
                    <td colSpan="8" className="p-4">
                      <div className="ml-4">
                        <p className="text-[#f5f5f5] font-semibold mb-2">Items:</p>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between max-w-xs">
                              <span>{item.name}</span>
                              <span>${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;