import React from 'react';
import RequestItem from './RequestItem';

const RequestList = ({ requests, fetchRequests }) => (
    <ul>
        {requests.map((request) => (
            <RequestItem key={request.id} request={request} fetchRequests={fetchRequests} />
        ))}
    </ul>
);

export default RequestList;
