import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_6ktg1FIBy",
    ClientId: "2tg6t6rkrgjk4hc7a3bd9sa54j"
}


export default new CognitoUserPool(poolData);