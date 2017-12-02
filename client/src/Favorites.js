import React from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';



const GridComponent = (
  <Grid>
    <Row className="show-grid">
      <Col className="no-space" xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
    </Row>
  </Grid>
);

export default GridComponent;