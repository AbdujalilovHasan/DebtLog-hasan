import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFoundPage = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <h2 className="mt-3">Sahifa topilmadi</h2>
          <p className="mt-4">
            Kiritilgan manzil noto'g'ri yoki mavjud emas.
          </p>
          <Button href="/" variant="primary" className="mt-3">
            Bosh sahifaga qaytish
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
