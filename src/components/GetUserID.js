import React, {useEffect, useContext} from "react";
import { AccountContext } from "./Account";
import { request, gql } from 'graphql-request'

const GetUserID = async (props) =>{
    const uri =process.env.REACT_APP_GRAPHQL_API;
    
    const querySearch = gql`
query GetUserID($username: String!){
    account(where: {username: $username}){
      id
    }
  }
`
    const main = async()=>{
        // console.log(props)
        let userID = ""
        const variables = {
            "username": props
          }
        await request(uri, querySearch, variables).then((data) => userID = (data.account.id)) 

        return userID
    }

    return(
        main()
    )
    
}
export default GetUserID;