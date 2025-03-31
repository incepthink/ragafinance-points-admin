"use client";

import Navbar from "@/components/Navbar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import useChartData from "@/hooks/useChartData";
import useHomeData from "@/hooks/useHomeData";
import useUsers from "@/hooks/useUsers";
import Image from "next/image";
import { useEffect, useState } from "react";

const formatAddress = (address: string) => {
  return address.slice(0, 6).concat("...", address.slice(-4));
};

export default function Home() {
  const { data, isLoading } = useUsers();

  const [activeChart, setActiveChart] = useState<"points" | "deposits">(
    "points"
  );
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [depositPage, setDepositPage] = useState(1);
  const itemsPerPage = 10;

  const handleCheckboxChange = (address: string) => {
    if (!isUserDataLoading) {
      setSelectedUser((prev) => (prev === address ? null : address));
    }
  };

  // 🆕 Default select the first user
  useEffect(() => {
    if (data && data.length > 0 && !selectedUser) {
      setSelectedUser(data[0].eth_address);
    }
  }, [data, selectedUser]);

  useEffect(() => {
    setDepositPage(1);
  }, [selectedUser]);

  const { data: userData, isLoading: isUserDataLoading } = useHomeData(
    selectedUser ?? ""
  );

  const { data: chartData, isLoading: isChartLoading } = useChartData();
  console.log(chartData?.data);

  const paginatedDeposits = userData?.deposits?.slice(
    (depositPage - 1) * itemsPerPage,
    depositPage * itemsPerPage
  );
  const totalPages = Math.ceil(
    (userData?.deposits?.length ?? 0) / itemsPerPage
  );

  return (
    <div className="flex flex-col h-screen ">
      <Navbar />
      <div className=" relative flex-grow">
        <div className="rounded-md overflow-hidden absolute top-2 bottom-2 right-2 left-2 -z-50">
          <img
            src="/background.jpg"
            alt="background"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="p-8">
          <div className="grid grid-cols-3 gap-8 mt-4">
            <div className="bg-[#FECB77] p-4 rounded-sm">
              <p className="text-2xl font-semibold mb-4">Users</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Select</TableHead>
                    <TableHead>User Address</TableHead>
                    <TableHead className="text-right">Referral</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((user: any) => {
                    const isChecked = selectedUser === user.eth_address;
                    return (
                      <TableRow
                        key={user.eth_address}
                        onClick={() => handleCheckboxChange(user.eth_address)}
                        className="cursor-pointer hover:bg-[#fddda6]"
                      >
                        <TableCell
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 "
                        >
                          <Checkbox
                            className="ml-2"
                            checked={isChecked}
                            onCheckedChange={() =>
                              handleCheckboxChange(user.eth_address)
                            }
                            disabled={isUserDataLoading}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.eth_address}
                        </TableCell>{" "}
                        <TableCell className="font-medium text-right">
                          {user.referral_code}
                        </TableCell>{" "}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="bg-[#FECB77] p-4 rounded-sm flex flex-col">
              <p className="text-2xl font-semibold mb-4">
                Total Amount Deposited
              </p>
              <div className="mt-2">
                <p className="text-3xl opacity-80">
                  {userData?.totalValueDeposited} USD
                </p>
              </div>
              <p className="text-2xl font-semibold mb-4 mt-8">
                Total Points Earned
              </p>
              <div className="mt-2">
                <p className="text-3xl opacity-80">
                  {(userData?.totalPointsEarned ?? 0).toFixed(2)} points
                </p>
              </div>
            </div>

            <div className="bg-[#FECB77] p-4 rounded-sm">
              <p className="text-2xl font-semibold mb-4">Recent Deposits</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token Address</TableHead>
                    <TableHead className="text-right">Amount (USD)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedDeposits?.length ? (
                    paginatedDeposits?.map((deposit: any, index: number) => (
                      <TableRow key={deposit.token_address + index}>
                        <TableCell className="font-medium">
                          {formatAddress(deposit.token_address)}
                        </TableCell>
                        <TableCell className="font-medium text-right">
                          {deposit.asset_deposited_value_usd}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center">
                        No deposits found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() =>
                      setDepositPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={depositPage === 1}
                    className="bg-[#F78044] cursor-pointer px-3 py-1 rounded-sm disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span>
                    Page {depositPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setDepositPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={depositPage === totalPages}
                    className="bg-[#F78044] cursor-pointer px-3 py-1 rounded-sm disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#FECB77] p-4 rounded-sm flex flex-col">
              <p className="text-2xl font-semibold mb-4">Points Earned</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token Address</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userData?.points?.length ? (
                    userData.points.map((point: any, index: number) => (
                      <TableRow key={point.token_address + index}>
                        <TableCell className="font-medium">
                          {point.token_address === "reference points"
                            ? point.token_address
                            : formatAddress(point.token_address)}
                        </TableCell>
                        <TableCell className="font-medium text-right">
                          {point.points}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center">
                        No points found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <Card className="bg-[#FECB77] p-4 rounded-sm border-none">
              <CardContent>
                <h2 className="text-2xl font-semibold mb-4">
                  Cumulative Deposits & Points
                </h2>
                <div className="flex gap-4 mb-4">
                  <button
                    className={`px-4 py-2 rounded-sm cursor-pointer text-sm ${
                      activeChart === "points"
                        ? "bg-[#82ca9d] text-white"
                        : "bg-white"
                    }`}
                    onClick={() => setActiveChart("points")}
                  >
                    Points
                  </button>
                  <button
                    className={`px-4 py-2 rounded-sm cursor-pointer text-sm ${
                      activeChart === "deposits"
                        ? "bg-[#8884d8] text-white"
                        : "bg-white"
                    }`}
                    onClick={() => setActiveChart("deposits")}
                  >
                    Deposits
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={chartData?.data}>
                    <CartesianGrid stroke="#555" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date, index) => {
                        const d = new Date(date);
                        const day = d.getDate().toString().padStart(2, "0");
                        const month = d.toLocaleString("default", {
                          month: "short",
                        });
                        return index === 0 ? `${month} ${day}` : day;
                      }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {activeChart === "points" && (
                      <Area
                        type="monotone"
                        dataKey="points"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        name="Total Points Earned"
                      />
                    )}
                    {activeChart === "deposits" && (
                      <Area
                        type="monotone"
                        dataKey="deposits"
                        stroke="#8884d8"
                        fill="#8884d8"
                        name="Total Deposits (USD)"
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
