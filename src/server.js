import http from 'node:http'


const users = []

const server = http.createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/users') {
    return response
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users))
  }

  if(request.method === 'POST' && request.url === '/users') {

    users.push({
      id: 1,
      name: "John Doe",
      email: "john.doe@gmail.com",
    })
    return response.writeHead(201).end()
  }
 
  return response.writeHead(404).end('Not Found')
})

server.listen(3333)