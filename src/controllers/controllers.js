import {v4} from 'uuid';

let users = [  
  {
    id: 1,
    username: 'sanjar',
    age: 29,
    hobbies: [ 'football', 'programming' ]
  },
  {
    id: 2,
    username: 'sherzod',
    age: 30,
    hobbies: [ 'wath film', 'treyding' ]
  }
];


function getUsers(res, req){
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

function getUserById(res, req, id){
  const user = users.find(item=>item.id == id);

  if(user){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  }else{
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({message: "user not found"}));
  }
}

async function createUser(res, req){
  let str = '';

  req.on('data', chunk=>{
    str+=chunk.toString();
  });

  req.on('end', async()=>{
    const data = await JSON.parse(str);

    const user = data.hasOwnProperty("username");
    const ages = data.hasOwnProperty("age");
    const hobbie = data.hasOwnProperty("hobbies") && Array.isArray(data.hobbies);

    if(user && ages && hobbie){
      const newUser = {id: v4(), ... data};
      users.push(newUser);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    }else{
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({message: "all prop don't write"}));
    }
  });
  
}

export {getUsers, getUserById, createUser}
