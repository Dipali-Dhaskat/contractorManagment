import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddContractModal = ({ open, onClose, onSave }) => {
  const initialValues = {
    id: "",
    clientName: "",
    status: "Draft", // default status
  };

  const validationSchema = Yup.object({
    id: Yup.string().required("Contract ID is required"),
    clientName: Yup.string().required("Client Name is required"),
    status: Yup.string()
      .oneOf(
        ["Draft", "Finalized", "In Progress", "Completed"],
        "Invalid status"
      )
      .required("Status is required"),
  });

  const handleSubmit = (values) => {
    onSave(values);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "white",
          margin: "auto",
          width: 400,
          marginTop: 10,
        }}
      >
        <h2>Create New Contract</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <Field
                name="id"
                as={TextField}
                label="Contract ID"
                variant="outlined"
                fullWidth
                helperText={<ErrorMessage name="id" />}
                error={false}
                sx={{ marginBottom: 2 }}
                FormHelperTextProps={{
                  sx: {
                    color: "red",
                  },
                }}
              />
              <Field
                name="clientName"
                as={TextField}
                label="Client Name"
                variant="outlined"
                fullWidth
                helperText={<ErrorMessage name="clientName" />}
                error={false}
                sx={{ marginBottom: 2 }}
                FormHelperTextProps={{
                  sx: {
                    color: "red",
                  },
                }}
              />
              <Field
                name="status"
                as={TextField}
                label="Status"
                variant="outlined"
                fullWidth
                helperText={<ErrorMessage name="status" />}
                error={false}
                select
                sx={{ marginBottom: 2 }}
                onChange={(e) => setFieldValue("status", e.target.value)}
              >
                {["Draft", "Finalized", "In Progress", "Completed"].map(
                  (status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  )
                )}
              </Field>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Create Contract
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddContractModal;
