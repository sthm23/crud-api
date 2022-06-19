import {checkId} from './checkId.js';

export function deleteUser(res, req, id, users){
  const user = users.find(item=>item.id == id);
  const ind = users.findIndex(item=>item.id === id);
  
  if(user !== undefined && checkId(id)){
    users.splice(ind, 1);
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({message: 'User has been deleted'}));
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

}