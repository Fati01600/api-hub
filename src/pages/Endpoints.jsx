import styled from "styled-components";
import background from "../assets/background.mp4";

// Styles
const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  color: #ffffff;
  font-family: "Arial", sans-serif;
`;

const VideoBackground = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  max-width: 1200px;
  margin: 20px auto;
`;

const Title = styled.h1`
  text-align: left;
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 30px;
`;

const Table = styled.table`
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  background-color: rgba(26, 26, 46, 0.8);
  border-radius: 10px;
`;

const Th = styled.th`
  border: 1px solid #30475e;
  padding: 15px;
  background-color: rgba(204, 14, 0, 0.82);
  color: #ffffff;
  text-align: center;
  font-size: 1.1rem;
`;

const Td = styled.td`
  border: 1px solid #30475e;
  padding: 12px;
  background-color: rgba(30, 39, 56, 0.8);
  color: #d3d3d3;
  text-align: center;
  font-size: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background: linear-gradient(45deg, rgb(204, 24, 0), rgb(0, 0, 0));
  color: white;
  border: none;
  border-radius: 20px;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0, 116, 204, 0.4);
  }

  &:active {
    transform: scale(0.95);
    background: #005bb5;
  }
`;

// Component
function Endpoints() {
  const endpoints = [
    { method: "GET", path: "/users/{id1}/compatibility/{id2}", roles: "[USER]" },
    { method: "GET", path: "/playlists", roles: "[USER]" },
    { method: "POST", path: "/playlists", roles: "[USER]" },
    { method: "PUT", path: "/playlists/{id}", roles: "[USER]" },
    { method: "DELETE", path: "/playlists/{id}", roles: "[USER]" },
    { method: "GET", path: "/songs", roles: "[ANYONE]" },
    { method: "POST", path: "/songs", roles: "[ADMIN]" },
  ];

  return (
    <PageWrapper>
      {/* Background video */}
      <VideoBackground autoPlay loop muted>
        <source src={background} type="video/mp4" />
      </VideoBackground>

      {/* Content */}
      <ContentWrapper>
        <Title>API Endpoints</Title>
        <Table>
          <thead>
            <tr>
              <Th>Method</Th>
              <Th>Path</Th>
              <Th>Roles</Th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((endpoint, index) => (
              <tr key={index}>
                <Td>{endpoint.method}</Td>
                <Td>{endpoint.path}</Td>
                <Td>{endpoint.roles}</Td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Buttons */}
        <ButtonWrapper>
          <StyledButton
            onClick={() =>
              window.open(
                "https://muzzplayer.api.showcodefatima.dk/api/v1/routes",
                "_blank"
              )
            }
          >
            API
          </StyledButton>
          <StyledButton
            onClick={() =>
              window.open("https://github.com/Fati01600/MuzzPlayer", "_blank")
            }
          >
            GitHub Repository
          </StyledButton>
        </ButtonWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default Endpoints;
