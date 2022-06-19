
export function badAnswer(res, req, users){
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({"Message": "You write bad path request"}));
  return users;
}