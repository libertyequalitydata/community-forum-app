import React, {useEffect, useRef} from "react";
import { request, gql } from 'graphql-request'


import {
  Row, Col,
  ListGroup, ListGroupItem,

} from 'reactstrap';
import { Link as ReactLink} from 'react-router-dom'
import moment from 'moment'
import { Link, Text, Flex, Spacer, Box } from '@chakra-ui/react'

export default function GetQuestions(props){
  // console.log("GQ Rendered");
  const [questions, setQuestions] = React.useState([]);
  // const [questionsFinal, setQuestionsFinal] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false)
  const previousValue = useRef([])
  const uri =process.env.REACT_APP_GRAPHQL_API;
  const axios = require("axios");
  


const querySearch = {
  "operationName":"GetQuestionsSearched",
  "query": `
query GetQuestionsSearched($search: String!){
    questions(where: {title_contains: $search}){
      id
      account{
        username
      }
      title
      description
      date
      views{
        id
      }
      upvotes{
        id
      }
      downvotes{
        id
      }
    }
  }`,
  "variables": {"search": props.query}
}
// const queryAnswers = gql`
// query MyQuery($id: ID!) {
//   answersConnection(where: {question: {id: $id}}) {
//     aggregate {
//       count
//     }
//   }
// }

// `
const headers = {
  "content-type": "application/json",
    // "Authorization": "<token>"
};
// const graphqlQueryQuestion = {
//     "operationName": "GetQuestion",
//     "query": `query GetQuestion($id: ID!){
//       question(where: { id: $id }) {
//         id
//         title
//         description
//         views {
//           id
//         }
//         upvotes {
//           id
//         }
//         downvotes {
//           id
//         }
//         account{
//           username
//         }
//         date
        
//       }
//     }`,
//     "variables": {"id": questionid}
// };
// const graphqlQueryAnswers = {
//     "operationName": "GetAnswers",
//     "query": `    query GetAnswers($id: ID!){
//       answers(where: { question: {id: $id} }){
//         id
//         account{
//           username
//         }
//         description
//         date
//         upvotes{
//           id
//         }
//         downvotes{
//           id
//         }

    
        
//       }
//     }`,
//     "variables": {"id": questionid}
// };
  var answer = [];

  const myAsyncLoopFunction = async (array) => {
    const promises = array.map(asyncFunction)
    await Promise.all(promises)
    
    setAnswers(answer)
    console.log(`All async tasks complete!`)
    console.log("Prev " + previousValue.current.toString())
    console.log("answers - " +answer.toString())
    console.log("questions - " +array.toString())
    if (answer.length!==array.length){
      console.log("1")
      // setAnswers(previousValue.current)
    } else {
      console.log("2")
      previousValue.current = answer
    }
    console.log(previousValue.current)
    setLoaded(true)
  }

  const asyncFunction = async (item) => {
    const queryAnswers = {
      "operationName": "MyQuery",
      "query": `query MyQuery($id: ID!) {
        answersConnection(where: {question: {id: $id}}) {
          aggregate {
            count
          }
        }
      }`,
    "variables": {"id": item.id}}
    const responseAnswers = await axios({
      url: uri,
      method: 'post',
      headers: headers,
      data: queryAnswers
    });
    answer.push({
      "question": item.id,
      "answerCount": responseAnswers.data.data.answersConnection.aggregate.count
    })
    
  }



  useEffect(()=> {
    const fetchData = async () => {
      setAnswers([])

      // if (props.query !== ''){
      //   // const variables = {
      //   //   "search": props.query 
      //   // }
      //   // await request(uri, querySearch, variables).then((data) => setQuestions(data.questions))
      //   // console.log("Testing")
      //   const responseQuestion = await axios({
      //     url: uri,
      //     method: 'post',
      //     headers: headers,
      //     data: querySearch
      //   });
      //   // console.log(responseQuestion)
      //   setQuestions(responseQuestion.data.data.questions)

      // } else {
        const responseQuestion = await axios({
          url: uri,
          method: 'post',
          headers: headers,
          data: querySearch
        });
        setQuestions(responseQuestion.data.data.questions)

        myAsyncLoopFunction(responseQuestion.data.data.questions)
        
        
  
        // await request(uri, query).then((data) => setQuestions(data.questions))
        // await request(uri, query).then((data) => console.log(data))
      // }
        

      
      
    }
    setLoaded(false)
    setAnswers([])
    fetchData().catch(console.error);;
    // console.log(answers)
    

  },[props]);
  // console.log(uri);

  const answerCount = (id) => {
    // let promise = new Promise((resolve, reject) => {
      // setTimeout(() => resolve(answer), 1000)
      const answer = previousValue.current.find(e => e.question === id)
      // console.log(answer)
      // console.log(loaded)
      return (answer.answerCount)

        // return(answer.answerCount); 

    // });
    // let result = await promise; 
    

  }

  
  return(
<div>
  {questions.map( (question)=> (
    <Box borderWidth='3px' borderRadius='lg' key={question.id}>
      <Flex>
        <Box >
          <Text>{question.views.length} Views</Text>
          <Text>{
            loaded&&previousValue.current.length===questions.length ? 
            answerCount(question.id):
            null
            
            } Answers</Text>
          <Text>{question.upvotes.length+question.downvotes.length} Votes</Text>
        </Box>
        <Spacer />
        <Box >
          <Text align="start" fontSize='xl' color="blue"><Link align="end" as={ReactLink} to={`/question/${question.title.replace(/[^A-Z0-9]+/ig, "-")}/${question.id}`}>{question.title} </Link></Text>
          <Text align="start">{moment(question.date).fromNow()} by {question.account.username}</Text>
        </Box>
        
      </Flex>
    </Box>

  ))}
  <br/>




</div>

  );

}