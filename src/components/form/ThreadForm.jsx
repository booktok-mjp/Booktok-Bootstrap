import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import useAddThread from '../../hooks/useAddThread';
import { Colors } from '../../config';

const ThreadForm = ({ fetchThreads, setShowForm }) => {
  const [title, setTitle] = useState('');
  const [book, setBook] = useState('');
  const [content, setContent] = useState('');
  const { handleAddThread: addThread, loading } = useAddThread();

  const handleAddThread = async (e) => {
    e.preventDefault();
    const thread = {
      title,
      book,
      subject: content,
    };

    try {
      await addThread(thread);
      fetchThreads();
      setTitle('');
      setContent('');
      setBook('');
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form className="mb-3">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          required
          disabled={loading}
          placeholder="subject"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          onChange={(e) => setBook(e.target.value)}
          type="text"
          value={book}
          required
          disabled={loading}
          placeholder="book"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          as="textarea"
          rows={3}
          onChange={(e) => setContent(e.target.value)}
          value={content}
          required
          disabled={loading}
          placeholder="..."
        />
      </Form.Group>
      <div className="d-grid gap-2">
        <Button
          variant="outline-secondary"
          style={{ backgroundColor: Colors.wineRed, color: Colors.ivory }}
          size="md"
          onClick={handleAddThread}
        >
          Create New Thread
        </Button>
      </div>
    </Form>
  );
};

export default ThreadForm;
