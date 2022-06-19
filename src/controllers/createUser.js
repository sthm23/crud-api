import {v4} from 'uuid';

async function createUser(res, req, users){
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
      return users;
    }else{
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({message: "all prop don't write"}));
      return users;
    }
  });
  
}
export {createUser}