import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import CustomHeader from '../../components/header/CustomHeader';
import useThreads from '../../hooks/useThreads';
import ThreadList from '../../components/thread/ThreadList';

import { Colors, Constants } from '../../config';

const DiscussionView = () => {
  const { allThreads, myThreads, error, fetchThreads, loading } = useThreads();

  console.log('threads in view', allThreads);
  console.log('my threads:', myThreads);

  return (
    <Container className="justify-content-center">
      <Row>
        <CustomHeader text={Constants.discussions} size="xlg" />
      </Row>
      <Row className="justify-content-around">
        {/* my threads */}
        <Col lg={6}>
          <div className="mb-3">
            <CustomHeader color={Colors.wineRed} text="My Threads" size="md" />
          </div>
          <ThreadList threads={myThreads} />
        </Col>
        {/* all threads */}
        <Col lg={6}>
          <div className="mb-3">
            <CustomHeader color={Colors.wineRed} text="Discover" size="md" />{' '}
          </div>
          <ThreadList threads={allThreads} />
        </Col>
      </Row>
    </Container>
  );
};

export default DiscussionView;
