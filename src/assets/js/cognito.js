$(document).ready(function () {

    $('#login-button').click(function () {

        const user_name = $('#login-name').val()
        const user_password = $('#login-password').val()

        var authenticationData = {
            Username: user_name,
            Password: user_password,
        };
        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
        var poolData = {
            UserPoolId: 'eu-central-1_DX2w1mj2o', // Your user pool id here
            ClientId: '5dfoc069ntodvdsdvm3jt34sde' // Your client id here
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        var userData = {
            Username: user_name,
            Pool: userPool
        };

        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                var tokens = result.getAccessToken().getJwtToken();
                console.log('Received Access token.');


                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'eu-central-1_DX2w1mj2o', // your identity pool id here
                    Logins: {
                        // Change the key below according to the specific region your user pool is in.
                        'cognito-idp.eu-central-1.amazonaws.com/eu-central-1_DX2w1mj2o': result.getIdToken().getJwtToken()
                    }
                });

                // Instantiate aws sdk service objects now that the credentials have been updated.
                // example: var s3 = new AWS.S3();


                cognitoUser.getUserAttributes(function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    for (i = 0; i < result.length; i++) {
                        console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
                    }
                });

            },

            onFailure: function (err) {
                console.log(err);
            },

            newPasswordRequired: function (userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.

                // the api doesn't accept this field back
                delete userAttributes.email_verified;

                // Get these details and call
                cognitoUser.completeNewPasswordChallenge(user_password, userAttributes, this);
            },

        });
    })


});