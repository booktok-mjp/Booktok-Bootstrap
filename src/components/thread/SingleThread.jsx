import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Container, Form, ListGroup, Card } from 'react-bootstrap';
import { SlSpeech } from 'react-icons/sl';

import useThreadById from '../../hooks/useThreadById';
import CustomHeader from '../header/CustomHeader';
import LoadingSpinner from '../spinner/LoadingSpinner';
import BodyText from '../typography/BodyText';
import useThreads from '../../hooks/useThreads';
import { addMessageToThread } from '../../services/threadService';

import './SingleThread.css';

// TODO: change api to include username with each message in threads
// TODO: create separate components for details, messages and form
const SingleThread = ({ threadId }) => {
  const { thread, loading } = useThreadById(threadId);
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

  return (
    <Container className="single-thread-container p-4">
      {thread && (
        <>
          {/* Thread Details */}
          <Card className="mb-4 shadow-sm flex-col">
            <Card.Header className="justify-center">
              <SlSpeech size={50} style={{ marginRight: 10 }} />
              <CustomHeader text={thread.title} size="lg" />
            </Card.Header>
            <Card.Body>
              <p className="mb-2">
                <strong>Book:</strong> {thread.book}
              </p>
              <p className="mb-0">{thread.subject}</p>
            </Card.Body>
          </Card>

          {/* Messages */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-light">
              <CustomHeader text="Messages" size="md" />
            </Card.Header>
            <ListGroup variant="flush">
              {thread.messages.length > 0 ? (
                thread.messages.map((message) => (
                  <ListGroup.Item key={message.id} className="py-3 ">
                    <span className="mb-1">
                      <strong>@user: </strong> {message.user_id}
                    </span>
                    <span className="mb-0">{message.content}</span>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>
                  <BodyText text="No Messages..." />
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>

          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <CustomHeader text="Send a Message" size="md" />
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="newMessage" className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </Form.Group>
                <div className="">
                  <Button
                    type="submit"
                    variant="dark"
                    disabled={!newMessage.trim()}
                  >
                    Send
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default SingleThread;
