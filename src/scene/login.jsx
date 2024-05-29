import React from 'react';
import { Box, Paper, TextField, InputAdornment, Grid, Button, Typography } from '@mui/material';
import { FaUser, FaLock } from 'react-icons/fa';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login() {
  const navigate = useNavigate()
const handleLogin = async (values, { setSubmitting }) => {
   navigate('/dashboard')  
  setSubmitting(false);
};

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Grid container sx={{  boxShadow: 3 }}>
        <Grid item xs={12} md={6}>
          <Box
            id="loginimg"
            sx={{
              width: '100%',
              height: '100%',
              display: { xs: 'none', md: 'block' },
            }}
          ></Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ margin: '30%', padding: '5%', textAlign: 'center' }} elevation={6}>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={Yup.object({
                username: Yup.string().required('Username is required'),
                password: Yup.string().required('Password is required'),
              })}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="loginForm">
                  <Field
                    as={TextField}
                    name="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaUser />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ErrorMessage name="username" component="div" className="error" />

                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaLock />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ErrorMessage name="password" component="div" className="error" />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{ mt: 3 }}
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
