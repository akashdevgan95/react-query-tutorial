import React from "react";
import { Table, Label, Message, Button, Icon } from "semantic-ui-react";
import { useQuery, useMutation } from "react-query";

//query client
import { queryClient } from "../../pages/_app";

//services
import { deleteCustomer } from "../../services/services";

const DeleteCustomer = ({ id }) => {
  const deleteMutation = useMutation(
    (id) => {
      deleteCustomer(id);
    },

    {
      onSuccess: () => {
        console.log("success");
        queryClient.invalidateQueries("getAllCustomers");
      },
    }
  );
  return (
    <Button
      onClick={() => deleteMutation.mutate(id)}
      size="mini"
      icon
      labelPosition="left"
      color="red"
    >
      <Icon name="remove" />
      Delete
    </Button>
  );
};

export default DeleteCustomer;
