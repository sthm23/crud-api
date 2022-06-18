// import {  getUsers, getUserById, createUser, updateUser, deleteUser, badAnswer} from './controllers.js';
import {getUsers} from './getUsers.js';
import {getUserById} from './getUserById.js';
import {createUser} from './createUser.js';
import {updateUser} from './updateUser.js';
import {deleteUser} from './deleteUser.js';
import {badAnswer} from './badAnswer.js';
// import {getUsers} from './getUsers.js';


export async function commands(res, req, users){
  if(req.url === '/api/users' && req.method === 'GET'){
     const resalt = await getUsers(res, req, users);
     return resalt;
     
  }else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
    const id = req.url.split('/')[3];
    const resalt = await getUserById(res, req, id, users);
    return resalt;

  }else if(req.url === `/api/users` && req.method === 'POST'){
    const resalt = await createUser(res, req, users);
    return resalt;

  }else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'PUT'){
    const id = req.url.split('/')[3];
    const resalt = await updateUser(res, req, id, users);
    return resalt;

  }else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'DELETE'){
    const id = req.url.split('/')[3];
    const resalt = await deleteUser(res, req, id, users);
    return resalt;

  }else{
    const resalt = await badAnswer(res);
    return resalt;
  }
}