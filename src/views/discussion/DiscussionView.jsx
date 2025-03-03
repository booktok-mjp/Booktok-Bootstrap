import { useState } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { BiSolidMessageAdd, BiSolidMessageX } from 'react-icons/bi';

import CustomHeader from '../../components/header/CustomHeader';
import useThreads from '../../hooks/useThreads';
import ThreadList from '../../components/thread/ThreadList';
import LoadingSpinner from '../../components/spinner/LoadingSpinner';
import ReactIconButton from '../../components/button/ReactIconButton';
import ThreadForm from '../../components/form/ThreadForm';
import { Colors } from '../../config';

import './DiscussionView.css';

// TODO: separate components
const DiscussionView = () => {
  const { allThreads, myThreads, fetchThreads, loading } = useThreads();
  const [showForm, setShowForm] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <CustomHeader
          text="Booktok Threads"
          color={Colors.brunswickGreen}
          size="xlg"
          isPacifico
        />
      </Row>
      <Row>
        {/* My Threads Section */}
        <Col lg={5} className="mb-4">
          <Card className="shadow-sm" style={{ backgroundColor: Colors.cream }}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <CustomHeader
                color={Colors.darkSlate}
                text="My Threads"
                size="md"
              />
              {showForm ? (
                <ReactIconButton
                  onClick={() => setShowForm(false)}
                  icon={<BiSolidMessageX size={24} />}
                  tooltipText="Cancel"
                />
              ) : (
                <ReactIconButton
                  icon={<BiSolidMessageAdd size={24} />}
                  onClick={() => setShowForm(true)}
                  tooltipText="Add new thread"
                />
              )}
            </Card.Header>
            <Card.Body>
              {showForm && (
                <div className="mb-3">
                  <ThreadForm
                    fetchThreads={fetchThreads}
                    setShowForm={setShowForm}
                  />
                </div>
              )}
              <ThreadList threads={myThreads} />
            </Card.Body>
          </Card>
        </Col>

        {/* Discover Section */}
        <Col lg={7} className="mb-4">
          <Card className="shadow-sm" style={{ backgroundColor: Colors.cream }}>
            <Card.Header>
              <CustomHeader
                color={Colors.wineRed}
                text="Latest Topics"
                size="md"
              />
            </Card.Header>
            <Card.Body>
              <ThreadList threads={allThreads} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DiscussionView;
