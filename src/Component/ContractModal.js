import React from "react";
import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContractModal = ({ open, contract, onClose, onSave }) => {
  const initialValues = {
    id: contract?.id,
    clientName: contract?.clientName,
    status: contract?.status,
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
        <h2>Edit Contract</h2>
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
                disabled
                sx={{ marginBottom: 2 }}
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
                select // This will make it a dropdown
                sx={{ marginBottom: 2 }}
                helperText={<ErrorMessage name="status" />}
                error={false}
                onChange={(e) => setFieldValue("status", e.target.value)}
              >
                {["Draft", "Finalized", "In Progress", "Completed"].map(
                  (status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  )
                )}
              </Field>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ContractModal;
