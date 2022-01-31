import { request, gql } from 'graphql-request'



function VoteAnswer(props){
  const uri =process.env.REACT_APP_GRAPHQL_API;
  const disconnectUpvote = gql`
  mutation upvoteAnswer($id: ID!, $username: String!) {
    updateAnswer(
      where: {id: $id}
      data: {upvotes: {disconnect: {username: $username}}}
    ) {
      id
      upvotes {
        username
      }
    }
  }
  `
  const disconnectDownvote = gql`
mutation downvoteAnswer($id: ID!, $username: String!) {
  updateAnswer(
    where: {id: $id}
    data: {downvotes: {disconnect: {username: $username}}}
  ) {
    id
    downvotes {
      username
    }
  }
}
`
  const mutationUpvote = gql`
mutation upvoteQuestion($id: ID!, $username: String!) {
  updateAnswer(
    where: {id: $id}
    data: {upvotes: {connect: {where: {username: $username}}}}
  ) {
    id
    upvotes {
      username
    }
  }
}
`
const mutationDownvote = gql`
mutation downvoteAnswer($id: ID!, $username: String!) {
  updateAnswer(
    where: {id: $id}
    data: {downvotes: {connect: {where: {username: $username}}}}
  ) {
    id
    downvotes {
      username
    }
  }
}
`
const publishAnswer = gql`
mutation publish($id: ID!) {
    publishAnswer(where: { id: $id}, to: PUBLISHED) {
      id
    }
  }
`  

  const vote = async()=>{
      const variables = {
        "id": props.id,
        "username": props.username
      }
  
      const requestHeaders = {
          authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDMwNDMxMjAsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuZ3JhcGhjbXMuY29tL3YyL2NreWx4aWpzcDBnNTUwMXo1ZjEyOGJ5amkvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiZDgzYzQyN2MtZDhkNS00YjU5LWEyZGYtYWIzZGQ4OGU2ZWU4IiwianRpIjoiY2t5c3hnOWEzMGpvYTAxejNjamx5Y2QzdiJ9.y1qXkWTFrSRJv39ppzB7JyCC5OANsPA71a1-30jzNfmZ2b6rUWYKg57Yq6a6UtCBJ2vtGjDLE1z7akq_yiR22NQl7K8Ug1Dfc_OXI9FDoBg2yhhpGnk7Q0OLghG7bK4f_U_JLHnqONBoY1jyGsa0tzkiOrDuv34PHPPrrgcLaChcv0Df0l1Co6taDPF20DhMoin5Qtq0PL26gg0pQTfznZtOuSV7blDmaH_j0QQpf2XoueF22p8mfAQpuCK8a7M2tGQJe21_n94_HawH9f-mg1KifEtUiAMlXQ5W5F2YWzxnn1ZnTFN-R7sd6zsLplqQX9Jor-OZkMgyDMuuFgqQ94TKwwJV46yFGcvmPIlovXCmZN99YABlOPXFQ4JqH4E1-GkP9_0uybCcoGuCOYgmOdwb91uqWvszraoYqHUO15fONdhDF6QH1EYnR2HprEiJ-hI6EHV2PP_RAGXzc2lH7g9POXc3zDOCPPeBmpLx_1NvZkD5vNL_HcS6MN8NdW1eMSHMUJrOXykYRePzMiOWoH2TYaiXV6NJYH7jKHYE0ETqhkOwmVX6yf7mVDsnKxaOgsO1EKETOBEonl_-qC2Q0bQcqjz24p5eZSguIc5lEtujQmIlZj6zISnIfd2Hf3BdWjBVvougrVwpchHJ150cmy3EHh5bQkYwGGh59XDQ-38'
          }
      await request(uri, disconnectDownvote, variables, requestHeaders)
      await request(uri, disconnectUpvote, variables, requestHeaders)       
    if (props.vote === "upvote"){
      
      await request(uri, mutationUpvote, variables, requestHeaders).then((data)=>{console.log(data)})
    } else if (props.vote === "downvote"){
      
      await request(uri, mutationDownvote, variables, requestHeaders)
    }
    const variables2 = {
      "id": props.id
    }
    await request(uri, publishAnswer, variables2, requestHeaders)
    }
  
    return(
      vote()
    )

}
export default VoteAnswer;