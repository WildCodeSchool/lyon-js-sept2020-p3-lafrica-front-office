import axios, { CancelToken } from "axios";
import queryString from "query-string";

import * as Promise from "bluebird";

Promise.config({
  cancellation: true,
});

// If our API is deployed somewhere else, we just have to change the
// REACT_APP_API_BASE_URL variable in .env file at the root of the project
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const makeCancellable = (method, url, data, config) => {
  return new Promise((resolve, reject, onCancel) => {
    const source = CancelToken.source();
    instance({
      method,
      url,
      data,
      cancelToken: source.token,
      ...config,
    })
      .then(resolve)
      .catch((thrown) => {
        // Cancellations should not provoque errors.
        // Only rethrow the non-cancellation related exceptions
        if (!axios.isCancel(thrown)) throw thrown;
      })
      .catch(reject);

    onCancel(() => {
      // With bluebird Promises, we've got a cancel() method on Promises !
      // When it is called, this code runs.
      // It's the perfect place to cancel the axios
      // request in order to save bandwidth, CPU and memory :)
      source.cancel("Request was cancelled");
    });
  });
};

export const extractData = (res) => res.data;

export const isCancelledError = (fetchRequestError) =>
  fetchRequestError && fetchRequestError.constructor.name === "CancelledError";

export const getCollection = (
  collectionName,
  queryParams,
  config = {}
) =>
  makeCancellable(
    "get",
    `/${collectionName}${
      queryParams ? `?${queryString.stringify(queryParams)}` : ""
    }`,
    null,
    config
  ).then(extractData);

export const makeEntityAdder = (collectionName) => (attributes, config = {}) =>
  makeCancellable("post", `/${collectionName}`, attributes, config).then(
    extractData
  );

export const getEntity = (collectionName, id) =>
  makeCancellable("get", `/${collectionName}/${id}`).then(extractData);

export const makeEntityDeleter = (collectionName) => (id) =>
  makeCancellable("delete", `/${collectionName}/${id}`).then(extractData);

export const makeEntityUpdater = (collectionName) => (id, attributes) =>
  makeCancellable("patch", `/${collectionName}/${id}`, attributes).then(
    extractData
  );

export default instance;
