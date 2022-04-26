<html>  <head>  </head>  <body>  <h1>Messaging App API</h1>    <div class="app-desc">Messaging App API</div>       <div class="app-desc">Contact Info: <a href="huang.yiqin@northeastern.edu">huang.yiqin@northeastern.edu</a></div>    <div class="app-desc">Version: 0.0.1-oas3</div>        <div class="license-info">Apache 2.0</div>    <div class="license-url">http://www.apache.org/licenses/LICENSE-2.0.html</div>  <h2>Access</h2>  <h2><a name="__Methods">Methods</a></h2>  [ Jump to <a href="#__Models">Models</a> ]  <h3>Table of Contents </h3>  <div class="method-summary"></div>  <h4><a href="#Public">Public</a></h4>  <ul>  <li><a href="#usersLoginPost"><code><span class="http-method">post</span> /users/login</code></a></li>  <li><a href="#usersPost"><code><span class="http-method">post</span> /users</code></a></li>  <li><a href="#usersidContactsDelete"><code><span class="http-method">delete</span> /users/:id/contacts</code></a></li>  <li><a href="#usersidContactsGet"><code><span class="http-method">get</span> /users/:id/contacts</code></a></li>  <li><a href="#usersidContactsPost"><code><span class="http-method">post</span> /users/:id/contacts</code></a></li>  <li><a href="#usersidDelete"><code><span class="http-method">delete</span> /users/:id</code></a></li>  <li><a href="#usersidPicGet"><code><span class="http-method">get</span> /users/:id/pic</code></a></li>  <li><a href="#usersidPicPost"><code><span class="http-method">post</span> /users/:id/pic</code></a></li>  <li><a href="#usersidPut"><code><span class="http-method">put</span> /users/:id</code></a></li>  </ul>  <h1><a name="Public">Public</a></h1>  <div class="method"><a name="usersLoginPost"></a>    <div class="method-path">    <a class="up" href="#__Methods">Up</a>    <pre class="post"><code class="huge"><span class="http-method">post</span> /users/login</code></pre></div>    <div class="method-summary">validates the password (<span class="nickname">usersLoginPost</span>)</div>    <div class="method-notes">Validate the password</div>    <h3 class="field-label">Consumes</h3>    This API call consumes the following media types via the <span class="header">Content-Type</span> request header:    <ul>      <li><code>application/json</code></li>    </ul>    <h3 class="field-label">Request body</h3>    <div class="field-items">      <div class="param">body <a href="#users_login_body">users_login_body</a> (required)</div>                  <div class="param-desc"><span class="param-type">Body Parameter</span> &mdash; username and password </div>                </div>  <!-- field-items -->    <h3 class="field-label">Return type</h3>    <div class="return-type">      <a href="#inline_response_200_1">inline_response_200_1</a>          </div>    <!--Todo: process Response Object and its headers, schema, examples -->    <h3 class="field-label">Example data</h3>    <div class="example-data-content-type">Content-Type: application/json</div>    <pre class="example"><code>{  "nickname" : "Mike Frank",  "id" : "624d18faf4bebba40e0dce1f"}</code></pre>    <h3 class="field-label">Produces</h3>    This API call produces the following media types according to the <span class="header">Accept</span> request header;    the media type will be conveyed by the <span class="header">Content-Type</span> response header.    <ul>      <li><code>application/json</code></li>    </ul>    <h3 class="field-label">Responses</h3>    <h4 class="field-label">200</h4>    Correct password        <a href="#inline_response_200_1">inline_response_200_1</a>    <h4 class="field-label">400</h4>    User does not exist        <a href="#inline_response_400_1">inline_response_400_1</a>    <h4 class="field-label">401</h4>    Wrong password        <a href="#Object">Object</a>    <h4 class="field-label">500</h4>    Internal server error        <a href="#inline_response_500">inline_response_500</a>  </div> <!-- method -->  <hr/>  <div class="method"><a name="usersPost"></a>    <div class="method-path">    <a class="up" href="#__Methods">Up</a>    <pre class="post"><code class="huge"><span class="http-method">post</span> /users</code></pre></div>    <div class="method-summary">creates a user (<span class="nickname">usersPost</span>)</div>    <div class="method-notes">Create a user</div>    <h3 class="field-label">Consumes</h3>    This API call consumes the following media types via the <span class="header">Content-Type</span> request header:    <ul>      <li><code>application/json</code></li>    </ul>    <h3 class="field-label">Request body</h3>    <div class="field-items">      <div class="param">body <a href="#users_body">users_body</a> (required)</div>                  <div class="param-desc"><span class="param-type">Body Parameter</span> &mdash; User to be created </div>                </div>  <!-- field-items -->    <h3 class="field-label">Return type</h3>    <div class="return-type">      <a href="#inline_response_200">inline_response_200</a>          </div>    <!--Todo: process Response Object and its headers, schema, examples -->    <h3 class="field-label">Example data</h3>    <div class="example-data-content-type">Content-Type: application/json</div>    <pre class="example"><code>{  "message" : "mike2204 is created successfully"}</code></pre>    <h3 class="field-label">Produces</h3>    This API call produces the following media types according to the <span class="header">Accept</span> request header;    the media type will be conveyed by the <span class="header">Content-Type</span> response header.    <ul>      <li><code>application/json</code></li>    </ul>    <h3 class="field-label">Responses</h3>    <h4 class="field-label">200</h4>    User created        <a href="#inline_response_200">inline_response_200</a>    <h4 class="field-label">400</h4>    User already exist        <a href="#inline_response_400">inline_response_400</a>    <h4 class="field-label">500</h4>    Internal server error        <a href="#inline_response_500">inline_response_500</a>  </div> <!-- method -->  <hr/>  <div class="method"><a name="usersidContactsDelete"></a>    <div class="method-path">    <a class="up" href="#__Methods">Up</a>    <pre class="delete"><code class="huge"><span class="http-method">delete</span> /users/:id/contacts</code></pre></div>    <div class="method-summary">deletes a friend (<span class="nickname">usersidContactsDelete</span>)</div>    <div class="method-notes">Delete a friend</div>    <h3 class="field-label">Consumes</h3>    This API call consumes the following media types via the <span class="header">Content-Type</span> request header:    <ul>      <li><code>application/json</code></li>    </ul>    <h3 class="field-label">Request body</h3>    <div class="field-items">      <div class="param">body <a href="#id_contacts_body_1">id_contacts_body_1</a> (required)</div>                  <div class="param-desc"><span class="param-type">Body Parameter</span> &mdash; the username of the friend </div>                </div>  <!-- field-items -->    <h3 class="field-label">Return type</h3>    <div class="return-type">      <a href="#inline_response_200_7">inline_response_200_7</a>          </div>    <!--Todo: process Response Object and its headers, schema, examples -->    <h3 class="field-label">Example data</h3>    <div class="example-data-content-type">Content-Type: application/json</div>    <pre class="example"><code>{  "message" : "sid77 is no longer your contact."}</code></pre>    <h3 class="field-label">Produces</h3>    This API call produces the following media types according to the <span class="header">Accept</span> request header;    the media type will be conveyed by the <span class="header">Content-Type</span> response header.    <ul>      <li><code>application/json</code></li>    </ul>    <h3 class="field-label">Responses</h3>    <h4 class="field-label">200</h4>    friend deleted        <a href="#inline_response_200_7">inline_response_200_7</a>    <h4 class="field-label">400</h4>    Wrong user id or wrong frind&#x27;s username        <a href="#inline_response_400_3">inline_response_400_3</a>    <h4 class="field-label">500</h4>    Internal server error        <a href="#inline_response_500">inline_response_500</a>  </div> <!-- method -->  <hr/>  <div class="method"><a name="usersidContactsGet"></a>    <div class="method-path">    <a class="up" href="#__Methods">Up</a>    <pre class="get"><code class="huge"><span class="http-method">get</span> /users/:id/contacts</code></pre></div>    <div class="method-summary">obtains a list of contacts (<span class="nickname">usersidContactsGet</span>)</div>    <div class="method-notes">Obtain a list of contacts</div>    <h3 class="field-label">Return type</h3>    <div class="return-type">      array[<a href="#inline_response_200_6">inline_response_200_6</a>]          </div>    <!--Todo: process Response Object and its headers, schema, examples -->    <h3 class="field-label">Example data</h3>    <div class="example-data-content-type">Content-Type: application/json</div>    <pre class="example"><code>[ {  "nickname" : "Sid Alan",  "username" : "sid77"}, {  "nickname" : "Sid Alan",  "username" : "sid77"} ]</code></pre>    <h3 class="field-label">Produces</h3>    This API call produces the following media types according to the <span class="header">Accept</span> request header;    the media type will be conveyed by the <span class="header">Content-Type</span> response header.    <ul>      <li><code>application/json</code></li>    </ul>    <h3 class="field-label">Responses</h3>    <h4 class="field-label">200</h4>    User information updated            <h3 class="field-label">Example data</h3>    <div class="example-data-content-type">Content-Type: application/json</div>    <pre class="example"><code>[{&quot;username&quot;:&quot;jenny333&quot;,&quot;nickname&quot;:&quot;Jenny Eva&quot;},{&quot;username&quot;:&quot;sid77&quot;,&quot;nickname&quot;:&quot;Sid Alan&quot;}]</code></pre>    <h4 class="field-label">400</h4>    Wrong user id        <a href="#inline_response_400_2">inline_response_400_2</a>    <h4 class="field-label">500</h4>    Internal server error        <a href="#inline_response_500">inline_response_500</a>  </div> <!-- method -->  <hr/>  <div class="method"><a name="usersidContactsPost"></a>    <div class="method-path">    <a class="up" href="#__Methods">Up</a>    <pre class="post"><code class="huge"><span class="http-method">post</span> /users/:id/contacts</code></pre></div>    <div class="method-summary">adds a friend (<span class="nickname">usersidContactsPost</span>)</div>    <div class="method-notes">Add a friend</div>    <h3 class="field-label">Consumes</h3>    This API call consumes the following media types via the <span class="header">Content-Type</span> request header:    <ul>      <li><code>application/json</code></li>    </ul>    <h3 class="field-label">Request body</h3>    <div class="field-items">      <div class="param">body <a href="#id_contacts_body">id_contacts_body</a> (required)</div>                  <div class="param-desc"><span class="param-type">Body Parameter</span> &mdash; the username of the friend </div>                </div>  <!-- field-items -->    <h3 class="field-label">Return type</h3>    <div class="return-type">            Object    </div>    <!--Todo: process Response Object and its headers, schema, examples -->    <h3 class="field-label">Example data</h3>    <div class="example-data-content-type">Content-Type: application/json</div>    <pre class="example"><code>{ }</code></pre>    <h3 class="field-label">Produces</h3>    This API call produces the following media types according to the <span class="header">Accept</span> request header;    the media type will be conveyed by the <span class="header">Content-Type</span> response header.    <ul>      <li><code>application/json</code></li>    </ul>    <h3 class="field-label">Responses</h3>    <h4 class="field-label">200</h4>    friend added        <a href="#Object">Object</a>    <h4 class="field-label">400</h4>    Wrong user id or wrong frind&#x27;s username        <a href="#inline_response_400_3">inline_response_400_3</a>    <h4 class="field-label">500</h4>    Internal server error        <a href="#inline_response_500">inline_response_500</a>  </div> <!-- method -->  <hr/>  <div class="method"><a name="usersidDelete"></a>    <div class="method-path">    <a class="up" href="#__Methods">Up</a>    <pre class="delete"><code class="huge"><span class="http-method">delete</span> /users/:id</code></pre></div>    <div class="method-summary">deletes a user (<span class="nickname">usersidDelete</span>)</div>    <div class="method-notes">Delete a user and delete all the related contacts/friends</div>    <h3 class="field-label">Return type</h3>    <div class="return-type">      <a href="#inline_response_200_3">inline_response_200_3</a>          </div>    <!--Todo: process Response Object and its headers, schema, examples -->    <h3 class="field-label">Example data</h3>    <div class="example-data-content-type">Content-Type: application/json</div>    <pre class="example"><code>{  "message" : "Successfully removed mike2204"}</code></pre>    <h3 class="field-label">Produces</h3>    This API call produces the following media types according to the <span class="header">Accept</span> request header;    the media type will be conveyed by the <span class="header">Content-Type</span> response header.    <ul>      <li><code>application/json</code></li>    </ul>    <h3 class="field-label">Responses</h3>    <h4 class="field-label">200</h4>    User information updated        <a href="#inline_response_200_3">inline_response_200_3</a>    <h4 class="field-label">400</h4>    Wrong user id        <a href="#inline_response_400_2">inline_response_400_2</a>    <h4 class="field-label">500</h4>    Internal server error        <a href="#inline_response_500">inline_response_500</a>  </div> <!-- method -->  <hr/>  <div class="method"><a name="usersidPicGet"></a>    <div class="method-path">    <a class="up" href="#__Methods">Up</a>    <pre class="get"><code class="huge"><span class="http-method">get</span> /users/:id/pic</code></pre></div>    <div class="method-summary">get user profile photo url (<span class="nickname">usersidPicGet</span>)</div>    <div class="method-notes">Get user profile photo url</div>    <h3 class="field-label">Return type</h3>    <div class="return-type">      <a href="#inline_response_200_4">inline_response_200_4</a>          </div>    <!--Todo: process Response Object and its headers, schema, examples -->    <h3 class="field-label">Example data</h3>    <div class="example-data-content-type">Content-Type: application/json</div>    <pre class="example"><code>{  "img_url" : "https://xxx.s3.amazonaws.com/profile_img/864d18fad3bexha40e0dbbi3.jpeg"}</code></pre>    <h3 class="field-label">Produces</h3>    This API call produces the following media types according to the <span class="header">Accept</span> request header;    the media type will be conveyed by the <span class="header">Content-Type</span> response header.    <ul>      <li><code>application/json</code></li>    </ul>    <h3 class="field-label">Responses</h3>    <h4 class="field-label">200</h4>    Get photo url successfully        <a href="#inline_response_200_4">inline_response_200_4</a>    <h4 class="field-label">400</h4>    Wrong user id        <a href="#inline_response_400_2">inline_response_400_2</a>    <h4 class="field-label">404</h4>    Profile photo not found        <a href="#inline_response_404">inline_response_404</a>    <h4 class="field-label">500</h4>    Internal server error        <a href="#inline_response_500">inline_response_500</a>  </div> <!-- method -->  <hr/>  <div class="method"><a name="usersidPicPost"></a>    <div class="method-path">    <a class="up" href="#__Methods">Up</a>    <pre class="post"><code class="huge"><span class="http-method">post</span> /users/:id/pic</code></pre></div>    <div class="method-summary">add or update user profile photo (<span class="nickname">usersidPicPost</span>)</div>    <div class="method-notes">Add or update user profile photo</div>    <h3 class="field-label">Consumes</h3>    This API call consumes the following media types via the <span class="header">Content-Type</span> request header:    <ul>      <li><code>multipart/form-data</code></li>    </ul>    <h3 class="field-label">Form parameters</h3>    <div class="field-items">      <div class="param">image (required)</div>                  <div class="param-desc"><span class="param-type">Form Parameter</span> &mdash;  format: binary</div>    </div>  <!-- field-items -->    <h3 class="field-label">Return type</h3>    <div class="return-type">      <a href="#inline_response_200_5">inline_response_200_5</a>          </div>    <!--Todo: process Response Object and its headers, schema, examples -->    <h3 class="field-label">Example data</h3>    <div class="example-data-content-type">Content-Type: application/json</div>    <pre class="example"><code>{  "message" : "Successfully uploaded to s3 bucket."}</code></pre>    <h3 class="field-label">Produces</h3>    This API call produces the following media types according to the <span class="header">Accept</span> request header;    the media type will be conveyed by the <span class="header">Content-Type</span> response header.    <ul>      <li><code>application/json</code></li>    </ul>    <h3 class="field-label">Responses</h3>    <h4 class="field-label">200</h4>    Add or update user profile photo successfully        <a href="#inline_response_200_5">inline_response_200_5</a>    <h4 class="field-label">400</h4>    Wrong user id        <a href="#inline_response_400_2">inline_response_400_2</a>    <h4 class="field-label">500</h4>    Internal server error        <a href="#inline_response_500_1">inline_response_500_1</a>  </div> <!-- method -->  <hr/>  <div class="method"><a name="usersidPut"></a>    <div class="method-path">    <a class="up" href="#__Methods">Up</a>    <pre class="put"><code class="huge"><span class="http-method">put</span> /users/:id</code></pre></div>    <div class="method-summary">updates user information (<span class="nickname">usersidPut</span>)</div>    <div class="method-notes">Update user information</div>    <h3 class="field-label">Consumes</h3>    This API call consumes the following media types via the <span class="header">Content-Type</span> request header:    <ul>      <li><code>application/json</code></li>    </ul>    <h3 class="field-label">Request body</h3>    <div class="field-items">      <div class="param">body <a href="#users_id_body">users_id_body</a> (required)</div>                  <div class="param-desc"><span class="param-type">Body Parameter</span> &mdash; nickname and/or password </div>            <div class="param-desc"><span class="param-type">example: <code>{  &quot;summary&quot; : &quot;password only&quot;,  &quot;value&quot; : {    &quot;password&quot; : &quot;ghjkjiuhyhte&quot;  }}</code></span></div>    </div>  <!-- field-items -->    <h3 class="field-label">Return type</h3>    <div class="return-type">      <a href="#inline_response_200_2">inline_response_200_2</a>          </div>    <!--Todo: process Response Object and its headers, schema, examples -->    <h3 class="field-label">Example data</h3>    <div class="example-data-content-type">Content-Type: application/json</div>    <pre class="example"><code>{  "nickname" : "Mike Jack",  "username" : "mike2204"}</code></pre>    <h3 class="field-label">Produces</h3>    This API call produces the following media types according to the <span class="header">Accept</span> request header;    the media type will be conveyed by the <span class="header">Content-Type</span> response header.    <ul>      <li><code>application/json</code></li>    </ul>    <h3 class="field-label">Responses</h3>    <h4 class="field-label">200</h4>    User information updated        <a href="#inline_response_200_2">inline_response_200_2</a>    <h4 class="field-label">400</h4>    Wrong user id        <a href="#inline_response_400_2">inline_response_400_2</a>    <h4 class="field-label">500</h4>    Internal server error        <a href="#inline_response_500">inline_response_500</a>  </div> <!-- method -->  <hr/>  <h2><a name="__Models">Models</a></h2>  [ Jump to <a href="#__Methods">Methods</a> ]  <h3>Table of Contents</h3>  <ol>    <li><a href="#User"><code>User</code></a></li>    <li><a href="#id_contacts_body"><code>id_contacts_body</code></a></li>    <li><a href="#id_contacts_body_1"><code>id_contacts_body_1</code></a></li>    <li><a href="#id_pic_body"><code>id_pic_body</code></a></li>    <li><a href="#inline_response_200"><code>inline_response_200</code></a></li>    <li><a href="#inline_response_200_1"><code>inline_response_200_1</code></a></li>    <li><a href="#inline_response_200_2"><code>inline_response_200_2</code></a></li>    <li><a href="#inline_response_200_3"><code>inline_response_200_3</code></a></li>    <li><a href="#inline_response_200_4"><code>inline_response_200_4</code></a></li>    <li><a href="#inline_response_200_5"><code>inline_response_200_5</code></a></li>    <li><a href="#inline_response_200_6"><code>inline_response_200_6</code></a></li>    <li><a href="#inline_response_200_7"><code>inline_response_200_7</code></a></li>    <li><a href="#inline_response_400"><code>inline_response_400</code></a></li>    <li><a href="#inline_response_400_1"><code>inline_response_400_1</code></a></li>    <li><a href="#inline_response_400_2"><code>inline_response_400_2</code></a></li>    <li><a href="#inline_response_400_3"><code>inline_response_400_3</code></a></li>    <li><a href="#inline_response_404"><code>inline_response_404</code></a></li>    <li><a href="#inline_response_500"><code>inline_response_500</code></a></li>    <li><a href="#inline_response_500_1"><code>inline_response_500_1</code></a></li>    <li><a href="#users_body"><code>users_body</code></a></li>    <li><a href="#users_id_body"><code>users_id_body</code></a></li>    <li><a href="#users_login_body"><code>users_login_body</code></a></li>  </ol>  <div class="model">    <h3><a name="User"><code>User</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">id (optional)</div><div class="param-desc"><span class="param-type"><a href="#UUID">UUID</a></span>  format: uuid</div><div class="param">username </div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: mike2204</span></div><div class="param">nickname </div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: Mike Frank</span></div><div class="param">password </div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  format: password</div>          <div class="param-desc"><span class="param-type">example: ghjkjiuhyhte</span></div><div class="param">createdDate (optional)</div><div class="param-desc"><span class="param-type"><a href="#DateTime">Date</a></span>  format: date-time</div>          <div class="param-desc"><span class="param-type">example: 2016-08-29T09:12:33.001Z</span></div><div class="param">modifiedDate (optional)</div><div class="param-desc"><span class="param-type"><a href="#DateTime">Date</a></span>  format: date-time</div>          <div class="param-desc"><span class="param-type">example: 2016-08-29T09:12:33.001Z</span></div><div class="param">friends (optional)</div><div class="param-desc"><span class="param-type"><a href="#User">array[User]</a></span>  </div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="id_contacts_body"><code>id_contacts_body</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">friend_username (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: sid77</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="id_contacts_body_1"><code>id_contacts_body_1</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">friend_username (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: sid77</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="id_pic_body"><code>id_pic_body</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">image (optional)</div><div class="param-desc"><span class="param-type"><a href="#binary">byte[]</a></span>  format: binary</div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_200"><code>inline_response_200</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">message (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: mike2204 is created successfully</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_200_1"><code>inline_response_200_1</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">id (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: 624d18faf4bebba40e0dce1f</span></div><div class="param">nickname (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: Mike Frank</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_200_2"><code>inline_response_200_2</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">username (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: mike2204</span></div><div class="param">nickname (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: Mike Jack</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_200_3"><code>inline_response_200_3</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">message (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: Successfully removed mike2204</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_200_4"><code>inline_response_200_4</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">img_url (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: https://xxx.s3.amazonaws.com/profile_img/864d18fad3bexha40e0dbbi3.jpeg</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_200_5"><code>inline_response_200_5</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">message (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: Successfully uploaded to s3 bucket.</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_200_6"><code>inline_response_200_6</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">username (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: sid77</span></div><div class="param">nickname (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: Sid Alan</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_200_7"><code>inline_response_200_7</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">message (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: sid77 is no longer your contact.</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_400"><code>inline_response_400</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">error (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: Username: mike2204 is occupied.</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_400_1"><code>inline_response_400_1</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">error (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: mike2204 does not exist.</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_400_2"><code>inline_response_400_2</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">error (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: Wrong user id: 864d18fad3bexha40e0dbbi3</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_400_3"><code>inline_response_400_3</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">error (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: Wrong user id: 864d18fad3bexha40e0dbbi3 or Wrong friend&#x27;s username: sid88</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_404"><code>inline_response_404</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">error (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: 864d18fad3bexha40e0dbbi3 has no profile image.</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_500"><code>inline_response_500</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">error (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="inline_response_500_1"><code>inline_response_500_1</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">error (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: image_upload_error</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="users_body"><code>users_body</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">username (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: mike2204</span></div><div class="param">nickname (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: Mike Frank</span></div><div class="param">password (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: ghjkjiuhyhte</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="users_id_body"><code>users_id_body</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">nickname (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: Mike Jack</span></div><div class="param">password (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: ghjkjiuhyhte</span></div>    </div>  <!-- field-items -->  </div>  <div class="model">    <h3><a name="users_login_body"><code>users_login_body</code></a> <a class="up" href="#__Models">Up</a></h3>        <div class="field-items">      <div class="param">username (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: mike2204</span></div><div class="param">password (optional)</div><div class="param-desc"><span class="param-type"><a href="#string">String</a></span>  </div>          <div class="param-desc"><span class="param-type">example: ghjkjiuhyhte</span></div>    </div>  <!-- field-items -->  </div>  </body></html>