import {checkId} from './checkId.js';

export async function updateUser(res, req, id, users){
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
      return users;
    }else if(user !== undefined && !checkId(id)){
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({message: 'invalid ID'}));
      return users;
    }else{
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({message: "user not found"}));
      return users;
    }
  });
}