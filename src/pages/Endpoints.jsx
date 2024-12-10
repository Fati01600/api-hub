import styled from 'styled-components';

const Table = styled.table`
  width: 90%;
  margin: 2rem auto;
  border-collapse: collapse;
`;


const Th = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #FF6F61; /* Lysk rød farve */
  color: #FFFFFF; 
  text-align: center;
`;


const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #333333; 
  color: #FFFFFF; /* Hvid tekst */
`;

//Er lidt i tvivl om hvordan jeg får endpointsne 
function Endpoints() {
  const endpoints = [
    { method: 'GET', path: '/users/{id1}/compatibility/{id2}', roles: '[USER]' },
    { method: 'GET', path: '/playlists', roles: '[USER]' },
    { method: 'POST', path: '/playlists', roles: '[USER]' },
    { method: 'PUT', path: '/playlists/{id}', roles: '[USER]' },
    { method: 'DELETE', path: '/playlists/{id}', roles: '[USER]' },
    { method: 'GET', path: '/songs', roles: '[ANYONE]' },
    { method: 'POST', path: '/songs', roles: '[ADMIN]' },
  ];

  return (
    <div>
      <h1>API Endpoints</h1>
      <Table>
        <thead>
          <tr>
            <Th>Method</Th>
            <Th>Path</Th>
            <Th>Roles</Th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((ep, index) => (
            <tr key={index}>
              <Td>{ep.method}</Td>
              <Td>{ep.path}</Td>
              <Td>{ep.roles}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Endpoints;
