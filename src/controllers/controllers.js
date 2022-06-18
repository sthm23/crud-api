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
  const user = users.find(item=>item.id === id);
  if(user){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  }else{
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({message: "user not found"}));
  }
}

export {getUsers, getUserById}