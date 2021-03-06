import React, { useEffect } from "react";
import Link from "next/link";

//query client
import { queryClient } from "./_app";

const Prefetch = () => {
  useEffect(() => {
    queryClient.prefetchQuery("getAllCustomers", () => {
      return axios("http://localhost:1337/api/customers");
    });
  }, []);
  return (
    <>
      <h1 className="text-center">Prefetch Data on this page!!</h1>
      <Link className="text-center block" href="/">
        <a className="block text-center text-xl">Homepage</a>
      </Link>
    </>
  );
};

export default Prefetch;
