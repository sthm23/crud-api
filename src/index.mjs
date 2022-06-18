import { createServer } from "http";
import {  getUsers, getUserById, createUser, updateUser, deleteUser} from './controllers/controllers.js';

const PORT = process.env.PORT || 3000;
const server = createServer((req, res)=>{
 

  if(req.url === '/api/users' && req.method === 'GET'){
    getUsers(res, req);
  }else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
    const id = req.url.split('/')[3];
    getUserById(res, req, id);
  }else if(req.url === `/api/users` && req.method === 'POST'){
    createUser(res, req);
  }else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'PUT'){
    const id = req.url.split('/')[3];
    updateUser(res, req, id);
  }else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'DELETE'){
    const id = req.url.split('/')[3];
    deleteUser(res, req, id);
  }else{
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({"Message": "Error request"}));
  }
  
});
server.listen(PORT, ()=>console.log(`Server has runned in ${PORT}`));
