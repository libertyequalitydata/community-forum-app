import { request, gql } from 'graphql-request'
import moment from 'moment'


export const CreateAnswer = async (props) => {
  const uri =process.env.REACT_APP_GRAPHQL_API;

const mutationAnswer = gql`
mutation MyMutation($body: String!, $question: ID!, $date: DateTime!, $account: String!) {
    createAnswer(
      data: {description: $body, question: {connect: {id: $question}}, account: {connect: {username: $account}}, date: $date}
    ) {
      id
      date
      description
      account {
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

        const variables = {
          "date": moment().toISOString(),
          "body": props.body,
          "account": props.accountID,
          "question": props.questionID,

        }
        const requestHeaders = {
            authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDMwNDMxMjAsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuZ3JhcGhjbXMuY29tL3YyL2NreWx4aWpzcDBnNTUwMXo1ZjEyOGJ5amkvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiZDgzYzQyN2MtZDhkNS00YjU5LWEyZGYtYWIzZGQ4OGU2ZWU4IiwianRpIjoiY2t5c3hnOWEzMGpvYTAxejNjamx5Y2QzdiJ9.y1qXkWTFrSRJv39ppzB7JyCC5OANsPA71a1-30jzNfmZ2b6rUWYKg57Yq6a6UtCBJ2vtGjDLE1z7akq_yiR22NQl7K8Ug1Dfc_OXI9FDoBg2yhhpGnk7Q0OLghG7bK4f_U_JLHnqONBoY1jyGsa0tzkiOrDuv34PHPPrrgcLaChcv0Df0l1Co6taDPF20DhMoin5Qtq0PL26gg0pQTfznZtOuSV7blDmaH_j0QQpf2XoueF22p8mfAQpuCK8a7M2tGQJe21_n94_HawH9f-mg1KifEtUiAMlXQ5W5F2YWzxnn1ZnTFN-R7sd6zsLplqQX9Jor-OZkMgyDMuuFgqQ94TKwwJV46yFGcvmPIlovXCmZN99YABlOPXFQ4JqH4E1-GkP9_0uybCcoGuCOYgmOdwb91uqWvszraoYqHUO15fONdhDF6QH1EYnR2HprEiJ-hI6EHV2PP_RAGXzc2lH7g9POXc3zDOCPPeBmpLx_1NvZkD5vNL_HcS6MN8NdW1eMSHMUJrOXykYRePzMiOWoH2TYaiXV6NJYH7jKHYE0ETqhkOwmVX6yf7mVDsnKxaOgsO1EKETOBEonl_-qC2Q0bQcqjz24p5eZSguIc5lEtujQmIlZj6zISnIfd2Hf3BdWjBVvougrVwpchHJ150cmy3EHh5bQkYwGGh59XDQ-38'
            }

      const data = await request(uri, mutationAnswer, variables, requestHeaders)
      const answerID = data.createAnswer.id;
      const variables2 = {
        "id": answerID
      }
      await request(uri, publishAnswer, variables2, requestHeaders)
}

export default CreateAnswer