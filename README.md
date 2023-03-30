# Social Media Nodejs Final Project 
<img align="right" width=300px height=200px src="https://cdn.freebiesupply.com/logos/thumbs/2x/nodejs-1-logo.png">
<br>
<h2>Make your Configuration </h2>
<div  style="background-color: gray; width:50% ;padding:10px">
    &#9 PORT="port that server will"
    <br>
    &#9 JWT_SECRET="Part used in generating token"
    <br>
    &#9 SALT_ROUND="Used by bcrypt"
    <br>
    &#9 //get them by creating your own account on Atlas<br>
    &#9MONGO_URL=mongodb+srv://< USERNAME >:< PASSWORD >..../< DATABASE_NAME >?retryWrites=true&w=majority
    <br>
    &#9 //get them by creating your own account on cloudnary <br>
    &#9 CLOUDINARY_CLOUD_NAME=""
    <br>
    &#9 CLOUDINARY_API_KEY=""
    <br>
    &#9 CLOUDINARY_API_SECRET=""
    <br>
</div>

<h2> We have 4 Main Entities </h2>
<h2>1- User </h2>
Starting with:
<b>http://localhost/user </b><br>
<b> first if it is the first time to use app</b> <br>
<b> You Need to Create Your Admin Manually in Database</b>
<h6>
    username:"admin"<br>
    password:"admin" "//you have to use bcrypt before storing it"<br>
    role:"admin"
</h6>
<h1>you have to login first</h1>
<b>POST http://localhost/user/login </b>
<h3>&#9 body</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
    &#9{
        &#9 &#9 username:"< username >",
        &#9 &#9 password:"< password >"
    &#9}
    <br>
</div>
<h3>&#9 response</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
{ <br>
    "message": "logged in", <br>
    "token": "generated token", <br> // save it in header as Authorization for any incoming request  <br>
    "user": { <br>
        "posts": [], <br>
        "_id": "your id", <br>
        "username": "Your username",<br>
        "role": "< Your Role >"<br>
    }<br>
}
    <br>
</div>
<br>
<h3>you have CRUD operations</h3> <b> ONLY ADMIN CAN DO</b>
<ul>
<li> Create a New User <br><b>Post http://localhost/user/ </b><br>
<h3>body</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
    {<br>
        username:"< username >",<br>
        password:"< password >",<br>
        role:"< creator,user,admin >"<br>
    }
    <br>
</div>
</li>
<br>    <br>
<li> Get All Users <br><b>Get http://localhost/user/ </b><br>
<h3>response</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
    return list of users
    <br>
</div>
</li>
<br>    <br>
<li> Get Users by specific criteria <br>i.e)<b>Get http://localhost/user/role=creator </b><br>
i.e)<b>Get http://localhost/user/id=6425671c2f194fc2680e6b27 </b><br>
i.e)<b>Get http://localhost/user/usename=salma </b><br>
<h3>response</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
    return list of users
    <br>
</div>
</li>
<br>    <br>
<li> Update User by specific id <br>i.e)<b>Patch http://localhost/user/6425671c2f194fc2680e6b27 </b><br>
<h6>user can update his info except role and id</h6>
<h2>body</h2>
<div  style="background-color: gray; width:50% ;padding:10px">
 {<br>
        username:"< new username > ",<br>or / and <br>
        password:"< new password >",<br> or / and <br>
        role:"< creator,user,admin >"<br> //only admin can change role
    }
    <br>    <br>
</div>
</li>
<br>    <br>
<li> Delete User by specific id <br>i.e)<b>Delete http://localhost/user/6425671c2f194fc2680e6b27 </b><br>
<h3>response</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
    return deleted user
    <br>
</div>
</li>
</ul>
<h3>User can upload his profile image </h3>
<br>i.e)<b>Patch http://localhost/user/upload </b><br>
<h3>body</h3>
<img src="https://res.cloudinary.com/db3cu22uy/image/upload/v1680174942/ddd_t8sixh.png">
<h2>2- Post </h2>
<h2>you have CRUD operations</h2> <b> ONLY CREATOR and ADMIN CAN DO</b>
<ul>
<li> Create a New Post <br><b>Post http://localhost/post/ </b><br>
<h3>body</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
    {<br>
        id:"unique number",<br>
        text:"< post body >"<br>
    }
    <br>
</div>
</li>
<br>    <br>
<li> Get All Posts <br><b>Get http://localhost/post/ </b><br>
<h6>user can see all posts </h6>
<h3>response</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
    return list of posts
    <br>
</div>
</li>
<br>    <br>
<li> Update post by specific id <br>i.e)<b>Patch http://localhost/post/:postid </b><br>
<h6>creator of the post is the only one can update post content</h6>
<h3>body</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
 {<br>
        text:"< new post body > "<br>
}
<br>    <br>
</div>
</li>
<br>    <br>
<li> Delete post by specific id <br>i.e)<b>Delete http://localhost/post/:postid  </b><br>
<h6>creator of the post and admin are only roles can delete post </h6>
</li>
</ul>
<h3> You can view 5-Top Rated Posts</h3>
<br>i.e)<b>Get http://localhost/post/top-five</b><br>
<h2>3- Comment </h2>
<h2>you have CRUD operations</h2>
<ul>
<li> Create a New Comment on post <br><b>Post http://localhost/comment/:postid </b><br>
i.e)<b>Post http://localhost/comment/3 </b><br>
note : postid=3
<h3>body</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
    {<br>
        text:"< comment body  >"<br>
    }
    <br>
</div>
</li>
<br>    <br>
<li> Get All Comments on specific post <br><b>Get http://localhost/comment/:postid </b><br>
<h3>response</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
    return the post with its comments
    <br>
</div>
</li>
<br>    <br>
<li> Update comment by specific id <br>i.e)<b>Patch http://localhost/comment/:commentid </b><br>
<h6>only the user wrote the comment can modify its content </h6>
<h3>body</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
 {<br>
        text:"< new comment body > "<br>
}
<br>    <br>
</div>
</li>
<br>    <br>
<li> Delete comment by specific id <br>i.e)<b>Delete http://localhost/comment/:commentid </b><br>
<h6>only the user wrote the comment and admin can delete comment </h6>
</li>
</ul>
<h2>4- review </h2>
<h2>you have CRUD operations</h2>
<ul>
<li> Create a New Review on post <br><b>Post http://localhost/review/ </b><br>
<h3>body</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
    {<br>
        _id:"< unique >",<br>
        postId,
        stars: number from 1 to 5
    }
    <br>
</div>
</li>
<br>    <br>
<li> Get All Reviews on specific post <br><b>Get http://localhost/review/:postid </b><br>
<h3>response</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
    return the post with its comments
    <br>
</div>
</li>
<br>    <br>
<li> Update review by specific id <br>i.e)<b>Patch http://localhost/review/:reviewid </b><br>
<h6>only the user reviewed the post can modify its rate </h6>
<h3>body</h3>
<div  style="background-color: gray; width:50% ;padding:10px">
 {<br>
        stars:"< number of stars > "<br>
}
<br>    <br>
</div>
</li>
<br>    <br>
<li> Delete review by specific id <br>i.e)<b>Delete http://localhost/review/:reviewid </b><br>
<h6>only the user reviewed the post and admin can delete review </h6>
</li>
</ul>
<h1>Authors</h1>
<b>Salma Ahmed<b>
<b>Shrouk Samir<b>