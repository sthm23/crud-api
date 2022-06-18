
export function getUsers(res, req, users){
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
  return users;
}