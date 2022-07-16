import React from "react";
import { useQuery } from "react-query";
import { Table, Message, Button, Icon } from "semantic-ui-react";

//services
import { getCustomers } from "../../services/services";

//components
import AddNewCustomer from "../modals/addNewCustomer";
import EditCustomer from "../modals/editCustomer";

const CustomersTable = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery("getAllCustomers", getCustomers);

  const allCustomers = response?.data.data;

  if (isLoading) {
    return (
      <Message color="orange" className="text-center">
        <h2 className="animate-pulse">Loading...</h2>
      </Message>
    );
  }

  if (isError) {
    return (
      <Message color="red" className="text-center">
        <h2>Unable to fetch data. Please try again later.</h2>
      </Message>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="m-0">List of Customers</h1>
        <AddNewCustomer />
      </div>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allCustomers?.map((customer) => {
            const { name, age, email, phone, city, country } =
              customer.attributes;
            return (
              <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>{age}</Table.Cell>
                <Table.Cell>{phone}</Table.Cell>
                <Table.Cell>{city}</Table.Cell>
                <Table.Cell>{country}</Table.Cell>
                <Table.Cell>
                  <EditCustomer
                    user={{ ...customer.attributes, id: customer.id }}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default CustomersTable;
