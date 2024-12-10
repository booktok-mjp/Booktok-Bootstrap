import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BiSolidMessageAdd, BiSolidMessageX } from 'react-icons/bi';

import CustomHeader from '../../components/header/CustomHeader';
import useThreads from '../../hooks/useThreads';
import ThreadList from '../../components/thread/ThreadList';
import LoadingSpinner from '../../components/spinner/LoadingSpinner';
import ReactIconButton from '../../components/button/ReactIconButton';
import ThreadForm from '../../components/form/ThreadForm';
import { Colors } from '../../config';

import './DiscussionView.css';

const DiscussionView = () => {
  const { allThreads, myThreads, error, fetchThreads, loading } = useThreads();
  const [showForm, setShowForm] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <Row className="mb-3">
        <CustomHeader text="Chat with Booktok!" size="xlg" />
      </Row>
      <Row className="justify-content-around">
        {/* my threads */}
        <Col className="thread-container-discussion h-50" lg={5}>
          <div className="d-flex justify-content-between mb-3">
            <CustomHeader
              color={Colors.darkSlate}
              text="My Threads"
              size="md"
            />
            {showForm ? (
              <ReactIconButton
                onClick={() => setShowForm(false)}
                icon={<BiSolidMessageX />}
                tooltipText="Cancel"
              />
            ) : (
              <ReactIconButton
                icon={<BiSolidMessageAdd />}
                onClick={() => setShowForm(!showForm)}
                tooltipText="Add new thread"
              />
            )}
          </div>
          {showForm && (
            <ThreadForm fetchThreads={fetchThreads} setShowForm={setShowForm} />
          )}
          <ThreadList threads={myThreads} />
        </Col>

        {/* all threads */}
        <Col className="thread-container-discussion h-50" lg={6}>
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
