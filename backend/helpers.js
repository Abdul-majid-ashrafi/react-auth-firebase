const cookieParser = require('cookie-parser');
const crypto = require('crypto');

// Firebase Setup
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
// serviceAccountKey from https://console.firebase.google.com/u/1/project/veziu-app/settings/serviceaccounts/adminsdk

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://veziu-app.firebaseio.com'
});

const OAUTH_SCOPES = ['r_liteprofile', 'r_emailaddress'];
const LinkedInAPI = require('./LinkedInAPI.js');
const cors = require('cors')({
    origin: true,
    credentials: true
});

/**
 * Creates a configured LinkedIn API Client instance.
 */
function linkedInClient(req) {
    // LinkedIn OAuth 2 setup
    // TODO: Configure the `linkedin.client_id` and `linkedin.client_secret` Google Cloud environment variables.
    const { headers: { referer = 'http://localhost:5000/api/login' } } = req;
    const originUrl = new URL(referer);
    console.log(" url: ", `${originUrl.origin}${originUrl.pathname}`);
    return new LinkedInAPI(
        '78o5v4r0w0jpo',
        'pV3CM25DC5AlNaw',
        `${originUrl.origin}${originUrl.pathname}`
    );
}

/**
 * Redirects the User to the LinkedIn authentication consent screen. ALso the 'state' cookie is set for later state
 * verification.
 */
async function linkedInLogin(req, res) {
    const Linkedin = linkedInClient(req);
    cookieParser()(req, res, () => {
        // generate random hax code for state
        const state = req.cookies.state || crypto.randomBytes(20).toString('hex');
        console.log('Setting verification state:', state, req.headers.referer);
        // console.log(JSON.stringify(req.headers));
        res.cookie('state', state.toString(), {
            maxAge: 3600000,
            secure: true,
            httpOnly: true
        });
        const redirecturl = Linkedin.getAuthorizationUrl(OAUTH_SCOPES, state.toString());
        console.log("redirecturl ", redirecturl)
        res.redirect(redirecturl);
    });
}

/**
 * Exchanges a given LinkedIn auth code passed in the 'code' URL query parameter for a Firebase auth token.
 * The request also needs to specify a 'state' query parameter which will be checked against the 'state' cookie.
 * The Firebase custom auth token is sent back in a JSONP callback function with function name defined by the
 * 'callback' query parameter.
 */
async function linkedInToken(req, res) {
    const Linkedin = linkedInClient(req);
    // console.log('linkedInToken req.headers', req.headers);
    return cors(req, res, () => {
        try {
            return cookieParser()(req, res, async () => {
                // console.log('Strating to get accesstoken', req.query);
                const { access_token: token } = await Linkedin.getAccessToken(req.query.code, req.query.state);
                // console.log("access_token ", token);
                const userResults = await Linkedin.requestProfile(token);
                const emailResults = await Linkedin.getCurrentMemberEmail(token);
                // We have a LinkedIn access token and the user identity now.
                const accessToken = token;
                const linkedInUserID = userResults.id;
                // const profilePic = userResults.pictureUrl;
                // const profilePic = userResults.profilePicture.displayImage;
                const userName = `${userResults.localizedFirstName} ${userResults.localizedLastName}`;
                const email = emailResults.elements && emailResults.elements[0] && emailResults.elements[0]['handle~'] ? emailResults.elements[0]['handle~'].emailAddress : '';
                console.log("userName ", userName)
                // Create a Firebase account and get the Custom Auth Token.
                const firebaseToken = await createFirebaseAccount(linkedInUserID, userName, email, accessToken);
                res.redirect(`http://localhost:3000/?token=${firebaseToken}`);
            });
        } catch (error) {
            console.log(error);
            return res.jsonp({ error: error.toString });
        }
    });
}

/**
 * Creates a Firebase account with the given user profile and returns a custom auth token allowing
 * signing-in this account.
 * Also saves the accessToken to the datastore at /linkedInAccessToken/$uid
 *
 * @returns {Promise<string>} The Firebase custom auth token in a promise.
 */
async function createFirebaseAccount(linkedinID, displayName, email, accessToken) {
    // The UID we'll assign to the user.
    const uid = `linkedin:${linkedinID}`;
    // Save the access token tot he Firebase Realtime Database.
    // const databaseTask = firebaseAdmin.database().ref(`/linkedInAccessToken/${uid}`).set(accessToken);
    // Create or update the user account.
    const userCreationTask = firebaseAdmin.auth().updateUser(uid, {
        displayName: displayName,
        // photoURL: photoURL,
        email: email,
        emailVerified: true
    }).catch((error) => {
        // If user does not exists we create it.
        if (error.code === 'auth/user-not-found') {
            return firebaseAdmin.auth().createUser({
                uid: uid,
                displayName: displayName,
                email: email,
                emailVerified: true
            });
        }
        throw error;
    });

    // Wait for all async task to complete then generate and return a custom auth token.
    await Promise.all([userCreationTask]);
    // Create a Firebase custom auth token.
    const token = await firebaseAdmin.auth().createCustomToken(uid);
    console.log('Created Custom token for UID "', uid, '" Token:', token);
    return token;
}

module.exports = {
    linkedInLogin,
    linkedInToken
};
