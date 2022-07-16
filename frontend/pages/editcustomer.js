import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const Editnewcustomer = () => {
  const router = useRouter();
  const [customer, setCustomer] = useState({
    id: router.query.id,
    name: router.query.name,
    email: router.query.email,
  });
  const { mutate, isLoading, isError } = useMutation(() => {
    return axios({
      method: "put",
      url: `http://localhost:1337/api/customers/${customer.id}`,
      headers: {},
      data: {
        data: customer,
      },
    });
  });

  return (
    <div>
      <div className="flex items-center justify-between border-b ">
        <h1 className="m-0 mb-5">Edit Customer</h1>
        <span
          onClick={() => router.push("/")}
          className="bg-blue-500 mb-5 text-white px-4 py-3 rounded border-2 flex"
        >
          Back to all customers
        </span>
      </div>
      <div className="form bg-slate-100 p-5 w-80 mx-auto mt-5">
        <div>
          <label>Name:</label>
          <input
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            value={customer.name}
            className="border p-2 block w-full"
            type="text"
          />
        </div>
        <div>
          <label className="mt-5 block">Email:</label>
          <input
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
            value={customer.email}
            className="border p-2 w-full"
            type="text"
          />
        </div>
        <button
          onClick={mutate}
          className="bg-blue-500 text-white px-4 py-3 mt-5 rounded border-2 flex"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Editnewcustomer;
