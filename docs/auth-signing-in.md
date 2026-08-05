# Authentication Demystified

*OAuth 2.0, OpenID Connect, SSO and How They Work Together*

*By Arunkumar Velusamy · Sep 2024*

---

## Authentication vs Authorization

Authentication verifies the identity of a user or service or anything. Authorization determines what an authenticated user or anything can access to.

## OAuth

OAuth is an open authorization standard. OAuth 2.0 is the latest version of the OAuth protocol. With its token-based approach, It can grant limited permissions to access the resource which user wants to & have access to without the need to sharing passwords every time. Tokens can be easily revoked or expired. This is adding an extra layer of security.

There are couple of flow types to implement OAuth 2.0,

1. Authorization code flow
2. Implicit flow
3. Resource owner flow
4. Client credential flow

## Auth & Resource server

Before going through these different flows. We have to get some clarity around resource server, auth server.

Auth server will authenticate the user & issues the tokens. Resource server hosts the actual resource which user wants to access and it trust the auth server & the token provided by the auth server. It validates the token with the help of auth server allow user to access the resources. We should not confuse resource server with users or resource owners.

## 1. Authorization code flow

If a third party web or mobile application wants access the resources from your server, we should choose this flow.

## 2. Implicit flow

If the application is a purely a client side application(ex: written only in Javascript) and no server side code, then we can use this flow. EX : Outlook or other Mail applications, where it depends only on the resource server and it's doesn't own anything in the backend.

## 3. Resource owner flow

If there's a high level of trust between user and application or application and oauth provider, we can choose this application. If the application is the owner of the resource, we can use this flow.
Ex: if your company have webapp, mobile app and any other application and all needs to access the same resource and your company owns the oauth server, we can go and use this flow. Here, there's a complete trust between the app and auth server or the app and user.

## 4. Client credential flow

If the client is also a backend server, we can go & use this flow.

## Open ID Connect

OpenID Connect or OIDC is an authentication layer built on top of the OAuth 2.0 protocol.

> **Scope** define the level of access
> **Claims** are the informations about the user that are contained within token
> **Client Id** is an identifier of the application who makes requests to auth server
> **Client Secret** is a confidential key that is used to authenticate the application
> **Redirect URI** used in auth code flow. Once authenticated, redirect the user.
> **Auth Code** temporary code issued in auth code flow. Append in redirect uri
> **grant types** are methods by which client can obtain an access token
> **Access Token** used to gain access to protected resources
> **Refresh Token** used to obtain new access token when current access token expires
> **ID Token** is used in OpenID Connect, contains information about the user.
> **Identity Provider(IdP)** OIDC is a protocol that uses IDPs to authenticate users.

## Single Sign-on(SSO)

Single Sign-On (SSO) is a user authentication process that allows a user to access multiple applications with one set of credentials.

Whenever user tries to access resource server, resource server will redirect the user to auth server to authenticate. Since OIDC is the authtication layer on top of oauth, it get the credentials from user & validates it with Identity provider(Idp).

Upon successful authentication, IdP creates the login session. Once login session created, auth server will respond to the client with ID token & Access token or redirects to resource server with ID token & auth code which will later be exchanged with Access token. It depends on the oauth 2 flow which we implement.

## Login session

Login session will always be created by IdP. Session cookie is tied to the Idp's domain (eg: idp.example.com), not to the resource domains. This happens through browser cookie mechanism. Browser ensures that this cookie is sent only when requests are made to IdP's domain.

## Clients using Multiple domains

When user accesses domain A and domain B, the sso flow will redirect to the IdP for authentication or session validation. During this redirect, browser will automatically includes the session cookie.

IdP will validate the session. If it is a valid session, IdP recognizes that the user is already logged in and authenticated. Based on this, IdP will issue new ID token for the request client domain with out asking to login again. If the session is not valid, It will show login page & get the credentials. Upon successful authentication, IdP creates the login session.

## No Cross domain cookie sharing

Session cookie is never shared directly between domains. Each domain must go through the IdP to check the user's session. Browser ensures that this session cookie is sent only with requests to the IdP's domain.

## Auth & resource are in same domain

Lets assume auth & resource are in same domain but have different url path. We can use path based cookie which will make sure that the session cookie will only be sent to requests under that path.

## Login has no connection with client application

Once user logged in using IdP, session will be set in browser for that domain & redirects to the client with auth code
