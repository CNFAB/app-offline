import React from 'react';
import { Badge } from 'react-bootstrap';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

const ConnectionStatus = () => {
  const isOnline = useOnlineStatus();

  return (
    <Badge bg={isOnline ? 'success' : 'danger'} className="ms-2">
      {isOnline ? '🟢 Online' : '🔴 Offline'}
    </Badge>
  );
};

export default ConnectionStatus;