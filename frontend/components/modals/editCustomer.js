import React, { useState } from "react";
import { Button, Modal, Icon, Form } from "semantic-ui-react";

import { useMutation } from "react-query";
import { queryClient } from "../../pages/_app";

// services
import { editCustomer } from "../../queries";

const EditCustomer = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = useState({
    name: user.name || "",
    email: user.email || "",
    age: user.age || "",
    phone: user.phone || "",
    city: user.city || "",
    country: user.country || "",
    id: user.id || "",
  });
  const { mutate, isLoading, isError, isSuccess, reset } = useMutation(
    () => editCustomer(customer),
    {
      onSuccess: () => {
        // Invalidate and refetch
        //queryClient.invalidateQueries("getAllCustomers");
      },
    }
  );

  const handleChange = (value, property) => {
    setCustomer({
      ...customer,
      [property]: value,
    });
  };

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
        <Button size="mini" icon labelPosition="left" primary>
          <Icon name="edit" />
          Edit
        </Button>
      }
    >
      <Modal.Header className="flex justify-between items-center">
        <p className="m-0">Edit Customer</p>
      </Modal.Header>
      <Modal.Content>
        {isSuccess && (
          <Message color="green" className="text-center">
            <h2>Customer Edited Successfully!!!</h2>
          </Message>
        )}
        {isLoading && (
          <Message color="orange" className="text-center">
            <h2 className="animate-pulse">Editing Customer...</h2>
          </Message>
        )}
        {isError && (
          <Message color="red" className="text-center">
            <h2>Unable to edit customer. Please try again later.</h2>
          </Message>
        )}
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              onChange={(e) => handleChange(e.target.value, "name")}
              value={customer.name}
              placeholder="Name"
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              onChange={(e) => handleChange(e.target.value, "email")}
              value={customer.email}
              placeholder="Email"
            />
          </Form.Field>
          <Form.Field>
            <label>Age</label>
            <input
              onChange={(e) => handleChange(e.target.value, "age")}
              value={customer.age}
              placeholder="Age"
            />
          </Form.Field>
          <Form.Field>
            <label>Phone</label>
            <input
              onChange={(e) => handleChange(e.target.value, "phone")}
              value={customer.phone}
              placeholder="Phone"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              onChange={(e) => handleChange(e.target.value, "city")}
              value={customer.city}
              placeholder="City"
            />
          </Form.Field>
          <Form.Field>
            <label>Country</label>
            <input
              onChange={(e) => handleChange(e.target.value, "country")}
              value={customer.country}
              placeholder="Country"
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => mutate()} positive>
          Done
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditCustomer;
