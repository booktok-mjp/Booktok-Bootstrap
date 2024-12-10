import React, { useState } from 'react';
import { Button, Container, Form, ListGroup, Card } from 'react-bootstrap';

import useThreadById from '../../hooks/useThreadById';
import CustomHeader from '../header/CustomHeader';
import LoadingSpinner from '../spinner/LoadingSpinner';

import './SingleThread.css';
import { Colors } from '../../config';
import BodyText from '../typography/BodyText';
import { addMessageToThread } from '../../services/threadService';
import { useAuth0 } from '@auth0/auth0-react';
import useThreads from '../../hooks/useThreads';

const SingleThread = ({ threadId }) => {
  const { thread, loading, error } = useThreadById(threadId);
  const { fetchThreads } = useThreads();
  const [newMessage, setNewMessage] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const response = await addMessageToThread({
        token,
        message: { content: newMessage },
        threadId,
      });
      await fetchThreads();
      console.log('response', response);
    } catch (error) {
      console.error('error', error);
    }
    setNewMessage('');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // ! separate components
  return (
    <Container className="single-thread-container p-4">
      {thread && (
        <>
          {/* Thread Details */}
          <div
            className="thread-details-container mb-4 shadow-sm"
            bg={Colors.cream}
          >
            <div>
              <p className="source-sans-3-bold fs-3"> {thread.title}</p>
              <p className="thread-book mt-2">
                <strong>Book:</strong> {thread.book}
              </p>
              <p className="thread-subject mt-2">{thread.subject}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="message-list-container mb-4 shadow-sm">
            <ListGroup className="message-list">
              {thread.messages.length > 0 ? (
                thread.messages.map((message) => (
                  <ListGroup.Item
                    key={message.id}
                    className="message-item py-2 d-flex justify-content-start align-items-start"
                    variant="light"
                  >
                    <div>
                      <p className="message-author mb-1">
                        <strong>User:</strong> {message.user_id}
                      </p>
                      <p className="message-content">{message.content}</p>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <BodyText text="No Messages..." />
              )}
            </ListGroup>
          </div>

          {/* Add Message */}
          <div className="add-message-container shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="newMessage" className="mb-3">
                  <Form.Label>
                    <CustomHeader text="Send a Message" size="md" />
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="dark"
                  disabled={!newMessage.trim()}
                  onSubmit={handleSubmit}
                >
                  Send
                </Button>
              </Form>
            </Card.Body>
          </div>
        </>
      )}
    </Container>
  );
};

export default SingleThread;
