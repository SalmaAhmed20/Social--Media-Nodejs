# Social Media Nodejs Final Project 
<img align="right" width=300px height=200px src="https://cdn.freebiesupply.com/logos/thumbs/2x/nodejs-1-logo.png">
<br>
<h2>Make your COnfiguration </h2>
<div  style="background-color: gray; width:50% ;padding:10px">
    PORT="port that server will"
    <br>
    JWT_SECRET="Part used in generating token"
    <br>
    SALT_ROUND="Used by bcrypt"
    <br>
    //get them by creating your own account on Atlas<br>
    MONGO_URL=mongodb+srv://< USERNAME >:< PASSWORD >..../< DATABASE_NAME >?retryWrites=true&w=majority
    <br>
    //get them by creating your own account on cloudnary <br>
    CLOUDINARY_CLOUD_NAME=""
    <br>
    CLOUDINARY_API_KEY=""
    <br>
    CLOUDINARY_API_SECRET=""
    <br>
</div>

<h2> We have 4 Main Entities </h2>
<h4>1- User </h4>
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
<h2>body</h2>
<div  style="background-color: gray; width:50% ;padding:10px">
    {
        username:"< username >",
        password:"< password >"
    }
    <br>
</div>
<h2>response</h2>
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
you have CRUD operations <b> ONLY ADMIN CAN DO</b>
<ul>
<li> Create a New User <br><b>Post http://localhost/user/ </b><br>
<h2>body</h2>
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
<h2>response</h2>
<div  style="background-color: gray; width:50% ;padding:10px">
    return list of users
    <br>
</div>
</li>
<br>    <br>
<li> Get Users by specific criteria <br>i.e)<b>Get http://localhost/user/role=creator </b><br>
i.e)<b>Get http://localhost/user/id=6425671c2f194fc2680e6b27 </b><br>
i.e)<b>Get http://localhost/user/usename=salma </b><br>
<h2>response</h2>
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
<h2>response</h2>
<div  style="background-color: gray; width:50% ;padding:10px">
    return deleted user
    <br>
</div>
</li>
</ul>
<h2>User can upload his profile image </h2>
<br>i.e)<b>Patch http://localhost/user/upload </b><br>
<h2>body</h2>
<img src="https://res.cloudinary.com/db3cu22uy/image/upload/v1680174942/ddd_t8sixh.png">
<h4>2- Post </h4>
<h4>3- Comment </h4>
<h4>4- review </h4>