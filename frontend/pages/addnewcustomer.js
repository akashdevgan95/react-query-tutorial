import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

//query
import { addCustomer } from "../queries";

const Addnewcustomer = () => {
  const router = useRouter();
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
  });
  const { mutate, isLoading, isError } = useMutation(() =>
    addCustomer(customer)
  );

  return (
    <div>
      <div className="flex items-center justify-between border-b ">
        <h1 className="m-0 mb-5">Add New Customer</h1>
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
            className="border p-2 block w-full"
            value={customer.name}
            type="text"
          />
        </div>
        <div>
          <label className="mt-5 block">Email:</label>
          <input
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
            className="border p-2 w-full"
            value={customer.email}
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

export default Addnewcustomer;
