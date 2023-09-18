import React from 'react';
import { Container, Button } from 'react-bootstrap';
import AppNavbar from '../../components/navbar';  // Import your AppNavbar component here

function ErrorPage() {
  return (
    <>
      <AppNavbar />

      <Container>
        <h1 className="mt-5">Oops! Something went wrong.</h1>
        <p>We apologize for the inconvenience. An error has occurred.</p>
        <p>
          <Button href="/" variant="primary">
            Return to Home
          </Button>
        </p>
      </Container>
    </>
  );
}

export default ErrorPage;
