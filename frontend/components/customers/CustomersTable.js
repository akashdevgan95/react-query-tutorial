import React from "react";
import { useQuery } from "react-query";
import { Icon, Table, Button, Label } from "semantic-ui-react";

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
    return <p>Loading...</p>;
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
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allCustomers.map((customer) => {
            const { name, age, email, phone, city, country } =
              customer.attributes;
            return (
              <Table.Row>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>{age}</Table.Cell>
                <Table.Cell>{phone}</Table.Cell>
                <Table.Cell>{city}</Table.Cell>
                <Table.Cell>
                  <Label size="large" color="orange">
                    {country}
                  </Label>
                </Table.Cell>
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
