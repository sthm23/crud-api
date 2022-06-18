import { createServer } from "http";
import {  getUsers, getUserById} from './controllers/controllers.js';

const PORT = process.env.PORT || 3000;
const server = createServer((req, res)=>{

  if(req.url === '/api/users' && req.method === 'GET'){
    getUsers(res, req);
  }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET'){
    const id = req.url.split('/')[3];
    getUserById(res, req, id);
  }else{
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({"Message": "Error"}));
  }
  
});
server.listen(PORT, ()=>console.log(`Server has runned in ${PORT}`));
