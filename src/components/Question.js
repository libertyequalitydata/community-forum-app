import React, {useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { request, gql  } from 'graphql-request'
import moment from 'moment'
import { Row, Col,ListGroup,ListGroupItem,InputGroup, Input, Button, Form, } from 'reactstrap'
import CreateAnswer from './CreateAnswer';
import VoteQuestion from "./VoteQuestion";
import VoteAnswer from "./VoteAnswer";
import { AccountContext } from "./Account";

export default function Question({data}){
    
    const {questionid} = useParams();
    const [question, setQuestion] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [response, setResponse] = React.useState([]);
    
    
    const {getUser} = useContext(AccountContext);

  
    const endpoint =process.env.REACT_APP_GRAPHQL_API;
    // const client = new GraphQLClient(uri)
    const variables = {
        "id": questionid 
    }
    const fillAnswer = (e) => {
      setResponse(e.target.value);
    }
    const createAnswer = (e) => {
      if (getUser() != null){
        const data = {
          questionID: questionid,
          body: response,
          accountID: getUser()
        }
        CreateAnswer(data)
      }

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
        downvotes {
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
    
    const getVotes = () => {
      if (question.upvotes != undefined){
        return question.upvotes.length-question.downvotes.length
      }
    }

    // const upvote = (data) => {
    //   const data2 = {
    //     "id": data,
    //     "vote": "upvote"
    //   }
    //   if (data === question.id){
    //     VoteQuestion(data2)
    //   } else {

    //   }
    // }

    // const downvote = (data) => {
    //   const data2 = {
    //     "id": data,
    //     "vote": "downvote"
    //   }
    //   if (data === question.id){
    //     VoteQuestion(data2)
    //   } else {

    //   }
    // }

    function upvote(id){
      const data = {
        "id": id,
        "vote": "upvote",
        "username": getUser()
      }
      if (id === question.id){
        VoteQuestion(data)
        
      } else {
        VoteAnswer(data)
      }
      
    }

    function downvote(id){
      const data = {
        "id": id,
        "vote": "downvote",
        "username": getUser()
      }
      if (id === question.id){
        VoteQuestion(data)
      } else {
        VoteAnswer(data)
      }
    }

    return(
      
        <div>
          <h1>{question.title}</h1>
          <small className='pl-2'>{getVotes()}</small>          
          <small className='pl-2'>Votes</small>
          <br/>
          <button onClick={()=>upvote(question.id)}>Upvote</button>
          <button onClick={()=>downvote(question.id)}>Downvote</button>
          <br/>
          <small className='float-left mt-4 text-break'>{moment(question.date).fromNow()} by {GetUser(question)}</small><br /><br />
          {Multiline(question.description)}
          {answers.map(answer=> (
    
    <Row className='border mb-2' key={answer.id}>
    
    <Col xs='3' className='my-auto mx-auto'>    
        <Row className="5">
            <small className='pl-2'>{answer.upvotes.length-answer.downvotes.length}</small>
            <small className='pl-2'>Votes</small>
            
          <br/>
          <button onClick={()=>upvote(answer.id)}>Upvote</button>
          <button onClick={()=>downvote(answer.id)}>Downvote</button>
          <br/>
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
