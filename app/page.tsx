'use client';
import styled from 'styled-components';
import {useState} from 'react'; 
import action from '../lib/action'; 

const Main = styled.main`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Container = styled.div`
  max-width: 50rem;
  width: 100%;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid black;
  padding: 2rem;
  margin: 2rem auto;
  width: 100%;
  max-width: 600px; 

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #3b82f6;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: #64748b;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormDiv = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;

  &:hover {
    background-color: #2563eb;
  }
`;


export default function Home() {
  const [url, setUrl] = useState(""); 
  const [alias, setAlias] = useState(""); 
  const [result, setResult] = useState(""); 
  const [error, setError] = useState(""); 

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setResult(''); 
    const res = await action({ url, alias});
    
    if ("error" in res) {
      setError(res.error); 
        } else {
      setResult(res.shortened);
    }
  }

  return (
    <>
      <Main>
        <Container>
          <Card>
            <Title>URL Shortener</Title>
            <Subtitle>Create short links that have your own alias</Subtitle>
            
            <Form onSubmit = {handleSubmit}>
              <FormDiv>
                <Label htmlFor="url">Enter the URL you want to shorten</Label>
                <Input
                  id="url"
                  type="text"
                  value = {url} 
                  onChange = {(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/your/url"
                  required
                />
              </FormDiv>
              
              <FormDiv>
                <Label htmlFor="alias">Choose a custom alias</Label>
                <Input
                  id="alias"
                  type="text"
                  placeholder="Example: funnyvideo35"
                  onChange = {(e) => setAlias(e.target.value)}
                  required
                />
              </FormDiv>
              <Button type = "submit">
                Shorten URL
              </Button>
            </Form>
          </Card>
          {result && (
  <p style={{ color: "green", textAlign: "center", marginTop: "1rem" }}>
    Shortened URL: <a href={result} target="_blank">{result}</a>
  </p>
)}
{error && (
  <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>
    {error}
  </p>
)}
        </Container>
      </Main>
    </>
  );
}