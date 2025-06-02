import React, { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import { 
  Container, 
  Header, 
  SpaceBetween
} from '@cloudscape-design/components';

const App = () => {
  const [refreshTrigger] = useState(0);

  return (
    <div className="app-container">
      <SpaceBetween size="l">
        <Header variant="h1">
          Welcome to your Task Management Dashboard!
        </Header>
        <Container>
          <TaskList refreshTrigger={refreshTrigger} />
        </Container>
      </SpaceBetween>
    </div>
  );
};

export default App;
