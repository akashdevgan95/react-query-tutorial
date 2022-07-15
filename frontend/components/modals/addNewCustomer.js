import React, { useState } from "react";
import { Button, Modal, Icon, Form, Message } from "semantic-ui-react";

import { useMutation } from "react-query";
import { queryClient } from "../../pages/_app";

// services
import { generateCustomer, addCustomer, delay } from "../../services/services";

const AddNewCustomer = () => {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    city: "",
    country: "",
  });
  const { mutate, isLoading, isError, isSuccess, reset } = useMutation(
    () => addCustomer(customer),
    {
      onSuccess: () => {
        // Invalidate and refetch
        //queryClient.invalidateQueries("getAllCustomers");
      },
    }
  );

  return (
    <Modal
      onClose={() => {
        setOpen(false);
        setCustomer({
          name: "",
          email: "",
          age: "",
          phone: "",
          city: "",
          country: "",
          id: "",
        });
        reset();
      }}
      onOpen={() => setOpen(true)}
      size="tiny"
      open={open}
      trigger={
        <Button icon labelPosition="left" primary>
          <Icon name="add user" />
          Add New Customer
        </Button>
      }
    >
      <Modal.Header className="flex justify-between items-center">
        <p className="m-0">Add New Customer</p>
        <Button
          onClick={async () => {
            const response = await generateCustomer();
            const user = response.data.results[0];
            const name = user.name.first + " " + user.name.last;
            const email = user.email;
            const age = user.dob.age;
            const country = user.location.country;
            const city = user.location.city;
            const phone = user.phone;

            setCustomer({
              name,
              email,
              age,
              country,
              city,
              phone,
            });
          }}
          icon
          labelPosition="left"
          primary
        >
          <Icon name="add user" />
          Generate User
        </Button>
      </Modal.Header>
      <Modal.Content>
        {isSuccess && (
          <Message color="green" className="text-center">
            <h2>Customer Added Successfully!!!</h2>
          </Message>
        )}
        {isLoading && (
          <Message color="orange" className="text-center">
            <h2 className="animate-pulse">Adding Customer...</h2>
          </Message>
        )}
        {isError && (
          <Message color="red" className="text-center">
            <h2>Unable to add customer. Please try again later.</h2>
          </Message>
        )}
        <Form>
          <Form.Field>
            <label>Name</label>
            <input value={customer.name} placeholder="Name" />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input value={customer.email} placeholder="Email" />
          </Form.Field>
          <Form.Field>
            <label>Age</label>
            <input value={customer.age} placeholder="Age" />
          </Form.Field>
          <Form.Field>
            <label>Phone</label>
            <input value={customer.phone} placeholder="Phone" />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input value={customer.city} placeholder="City" />
          </Form.Field>
          <Form.Field>
            <label>Country</label>
            <input value={customer.country} placeholder="Country" />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={async () => {
            mutate();
          }}
          positive
        >
          Add
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddNewCustomer;
