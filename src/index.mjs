import { createServer } from "http";
import { getUsers } from './controllers/getUsers.js';
import { getUserById } from './controllers/getUserById.js';
import { createUser } from './controllers/createUser.js';
import { updateUser } from './controllers/updateUser.js';
import { deleteUser } from './controllers/deleteUser.js';


let users = [];

const PORT = process.env.PORT || 3000;

const server = createServer(async (req, res) => {
  const id = req.url.split('/')[3];
  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(res, req, users);

  } else if (req.url === `/api/users/${id}`  && req.method === 'GET') {
    getUserById(res, req, id, users);

  } else if (req.url === `/api/users` && req.method === 'POST') {
    await createUser(res, req, users);

  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'PUT') {
    await updateUser(res, req, id, users);

  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'DELETE') {
    await deleteUser(res, req, id, users);

  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({Message: "You write bad path request"}));
  }
});

server.listen(PORT, () => console.log(`Server has runned in ${PORT}`));