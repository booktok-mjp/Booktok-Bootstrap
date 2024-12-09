import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import useAddThread from '../../hooks/useAddThread';

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
        <Form.Label>Title</Form.Label>
        <Form.Control
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          required
          disabled={loading}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Book</Form.Label>
        <Form.Control
          onChange={(e) => setBook(e.target.value)}
          type="text"
          value={book}
          required
          disabled={loading}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={(e) => setContent(e.target.value)}
          value={content}
          required
          disabled={loading}
        />
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="secondary" size="md" onClick={handleAddThread}>
          Create New Thread
        </Button>
      </div>
    </Form>
  );
};

export default ThreadForm;
