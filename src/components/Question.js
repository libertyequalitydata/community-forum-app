import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { request, gql  } from 'graphql-request'
import moment from 'moment'
import { Row, Col,ListGroup,ListGroupItem,InputGroup, Input, Button, Form, } from 'reactstrap'
import CreateAnswer from './CreateAnswer';

export default function Question({data}){
    const {questionid} = useParams();
    const [question, setQuestion] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [response, setResponse] = React.useState([]);
    const endpoint =process.env.REACT_APP_GRAPHQL_API;
    // const client = new GraphQLClient(uri)
    const variables = {
        "id": questionid 
    }
    const fillAnswer = (e) => {
      setResponse(e.target.value);
    }
    const createAnswer = (e) => {
      const data = {
        questionID: questionid,
        accountID: "ckyn9h6vk07fp0b08kraoj3q5",
        body: response
      }
      CreateAnswer(data)
    }

    const queryQuestion = gql`
    query GetQuestion($id: ID!){
      question(where: { id: $id }) {
        id
        title
        description
        views {
          id
        }
        upvotes {
          id
        }
        account{
          username
        }
        date
        
      }
    }
    `
    const queryAnswers = gql`
    query GetAnswers($id: ID!){
      answers(where: { question: {id: $id} }){
        id
        account{
          username
        }
        description
        date
        upvotes{
          id
        }
        downvotes{
          id
        }

    
        
      }
    }
    `
    useEffect(()=> {
      const fetchData = async () => {
        await request(endpoint, queryQuestion, variables).then((data) => setQuestion(data.question))
        await request(endpoint, queryAnswers, variables).then((data) => setAnswers(data.answers))
      }
      fetchData().catch(console.error);;
    },[]);
    const GetUser = (data) => {
        if(data.account !== undefined){
          return data.account.username
        }
    };
    const Multiline = (data) => {
      if(data !== undefined){
        const newText = data.split ('\n').map ((item, i) => <p key={i}>{item}</p>);
        return newText
      }
      };

    return(
        <div>
          <h1>{question.title}</h1>
          <small className='float-left mt-4 text-break'>{moment(question.date).fromNow()} by {GetUser(question)}</small><br /><br />
          {Multiline(question.description)}
          {answers.map(answer=> (
    
    <Row className='border mb-2' key={answer.id}>
    
    <Col xs='3' className='my-auto mx-auto'>    
        <Row className="5">
            <small className='pl-2'>{answer.upvotes.length+answer.downvotes.length}</small>
            <small className='pl-2'>Votes</small>
        </Row>
    
    
    </Col>
    <Col >
      <ListGroup className='text-left '>
        <ListGroupItem className='border-0 text-break'>
          <Row>
            <small className='pl-3'>{moment(answer.date).fromNow()} by {GetUser(answer)}</small>
            {Multiline(answer.description)}
          </Row>
        </ListGroupItem>
      </ListGroup>

    </Col>
  </Row>
      ))}
          <Form>
              <InputGroup className='my-2 mt-3'>
              <br/>
              <textarea placeholder='Test' name='body' value={response} onChange={fillAnswer}></textarea>
            </InputGroup>
            <Button onClick={createAnswer} outline color="success">Reply</Button>{''}
          </Form>
        </div>
    )

}
