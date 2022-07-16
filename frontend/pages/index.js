import React from "react";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

export default function Home() {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery("getAllCustomers", () => {
    return axios("http://localhost:1337/api/customers");
  });
  const router = useRouter();
  const allCustomers = response?.data.data;

  if (isLoading) {
    return (
      <h2 className="border-sky-600 bg-sky-100 text-sky-600 p-5 rounded border-2">
        Loading...
      </h2>
    );
  }

  if (isError) {
    return (
      <h2 className="border-red-600 bg-red-100 text-red-600 p-5 rounded border-2">
        Unable to fetch data. Please try again later.
      </h2>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="m-0">List of Customers</h1>
        <Link href="/addnewcustomer">
          <a className="bg-blue-500 text-white px-4 py-3 rounded border-2 flex">
            Add New Customer
          </a>
        </Link>
      </div>
      <table className="w-full">
        <tr className="w-full text-left">
          <th>Name</th>
          <th>Email</th>
          <th>Edit</th>
        </tr>
        {allCustomers?.map((customer, i) => {
          const { name, email } = customer.attributes;
          return (
            <tr key="i" className="text-left">
              <td>{name}</td>
              <td>{email}</td>
              <td>
                <span
                  onClick={() =>
                    router.push({
                      pathname: "/editcustomer",
                      query: { name: name, email: email, id: customer.id },
                    })
                  }
                  className="bg-blue-500 cursor-pointer text-white px-4 py-1 rounded border-2"
                >
                  Edit
                </span>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
