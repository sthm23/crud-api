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

function checkId(id){
  const hex = ['a','b','c','d','e','f','A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9','-'];
  for(let i=0; i<id.length; i++){
    if(!hex.includes(id[i])){
      return false;
    }
  }
  return true;
}

function getUsers(res, req){
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

function getUserById(res, req, id){
  const user = users.find(item=>item.id == id);

  if(user !== undefined && checkId(id)){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  }else if(user !== undefined && !checkId(id)){
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({message: 'invalid ID'}));
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

function updateUser(res, req, id){
  const chengingUser = users.find(item=>item.id == id);
  const ind = users.findIndex(item=>item.id === id);
  let str = '';
  req.on('data', chunk=>{
    str+=chunk.toString();
  });

  req.on('end', async()=>{
    const updDate = await JSON.parse(str);
    const user = {
      "id": chengingUser.id,
      "username": updDate.username || chengingUser.username,
      "age": updDate.age || chengingUser.age,
      "hobbies": updDate.hobbies || chengingUser.hobbies
    };
    
    if(user !== undefined && checkId(id)){
      users[ind] = user;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }else if(user !== undefined && !checkId(id)){
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({message: 'invalid ID'}));
    }else{
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({message: "user not found"}));
    }
  });
}

function deleteUser(res, req, id){
  const user = users.find(item=>item.id == id);
  const ind = users.findIndex(item=>item.id === id);
  
  if(user !== undefined && checkId(id)){
    users.splice(ind, 1);
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({message: 'User has been deleted'}));
  }else if(user !== undefined && !checkId(id)){
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({message: 'invalid ID'}));
  }else{
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({message: "user not found"}));
  }

}

export {getUsers, getUserById, createUser, updateUser,deleteUser}