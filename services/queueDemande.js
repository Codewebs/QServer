const MAX_QUEUE_SIZE = 12;

const pendingRequestsQueue = [];
const acceptedRequestsQueue = [];
const modifiedRequestsQueue = [];
const cancelledRequestsQueue = [];
const refusedRequestsQueue = [];


function enqueuePendingRequest(requestData) {
  pendingRequestsQueue.push(requestData);
}

function enqueueAcceptedRequest(requestData) {
  acceptedRequestsQueue.push(requestData);
}

function enqueueModifiedRequest(requestData) {
  modifiedRequestsQueue.push(requestData);
}

function enqueueCancelledRequest(requestData) {
  cancelledRequestsQueue.push(requestData);
}

function enqueueRefusedRequest(requestData) {
  refusedRequestsQueue.push(requestData);
}
