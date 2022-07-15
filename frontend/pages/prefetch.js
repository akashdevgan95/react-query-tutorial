import React, { useEffect } from "react";
import Link from "next/link";

//service
import { getCustomers } from "../services/services";

//query client
import { queryClient } from "./_app";

const prefetch = () => {
  useEffect(() => {
    queryClient.prefetchQuery("getAllCustomers", getCustomers);
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

export default prefetch;
