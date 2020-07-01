import { v1 as uuidv1 } from "uuid";

function createRequestBody(formInput, username) {
  return {
    ...formInput,
    start_time: formInput.startTime,
    stop_time: formInput.stopTime,
    username,
    eventId: uuidv1(),
  };
}

export default createRequestBody;
