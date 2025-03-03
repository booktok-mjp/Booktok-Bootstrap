import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { SlSpeech } from 'react-icons/sl';

import useThreadById from '../../hooks/useThreadById';
import CustomHeader from '../header/CustomHeader';
import LoadingSpinner from '../spinner/LoadingSpinner';
import BodyText from '../typography/BodyText';
import { addMessageToThread } from '../../services/threadService';
import { Colors } from '../../config';

import './SingleThread.css';

const SingleThread = ({ threadId }) => {
  const { thread, loading, refetchThread } = useThreadById(threadId);
  const [newMessage, setNewMessage] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      await addMessageToThread({
        token,
        message: { content: newMessage },
        threadId,
      });
      await refetchThread();
    } catch (error) {
      console.error('error', error);
    }
    setNewMessage('');
  };

  if (loading || !thread) {
    return <LoadingSpinner />;
  }

  return (
    <Container fluid className="single-thread-container my-4">
      <Row className="thread-header p-3 mb-3">
        <Col>
          <div className="header-container mb-2">
            <div className="icon-title">
              <SlSpeech size={30} className="me-2" color={Colors.wineRed} />
              <CustomHeader
                text={thread.title}
                size="lg"
                color={Colors.wineRed}
                alignLeft
              />
            </div>
            <p className="thread-subtitle mb-1">
              <strong>Book:</strong> {thread.book}
            </p>
          </div>
          {thread.subject && (
            <div className="message-bubble mb-3">
              <span className="mb-0">{thread.subject}</span>
              <span className="text-muted w-fit">10 mins ago</span>
            </div>
          )}
        </Col>
      </Row>

      <Row className="messages-feed p-3 mb-3">
        <Col>
          {thread.messages.length > 0 ? (
            thread.messages.map((message) => (
              <div key={message.id} className="message-bubble mb-3">
                <div>
                  <span className="message-author">@user: </span>
                  <span className="message-content">{message.content}</span>
                </div>
                <BodyText text="10 mins ago" />
              </div>
            ))
          ) : (
            <BodyText text="No Messages..." />
          )}
        </Col>
      </Row>

      <Row className="p-3 send-message-area">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="newMessage" className="mb-3">
              <Form.Control
                style={{ backgroundColor: Colors.ivory }}
                as="textarea"
                rows={5}
                placeholder="Write your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </Form.Group>
            <div className="text-left">
              <Button
                type="submit"
                style={{ backgroundColor: Colors.wineRed }}
                variant="dark"
                disabled={!newMessage.trim()}
              >
                Send
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleThread;
