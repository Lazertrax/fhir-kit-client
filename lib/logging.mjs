import { inspect } from 'util';
import debugFactory from 'debug';

const errorLogger = debugFactory('fhir-kit-client:error');
const infoLogger = debugFactory('fhir-kit-client:info');

function inspectObject(obj) {
  return inspect(obj, { depth: null, maxArrayLength: 5 });
}

export const logRequestError = function(error) {
  if (!errorLogger.enabled) { return; }
  if (error.response) {
    errorLogger(`Error: ${error.response.status}`);
  } else {
    errorLogger('An error occurred while making the request:');
  }
  if (error.config) {
    errorLogger(`    ${error.config.method.toUpperCase()} ${error.config.url}`);
    errorLogger(`    Headers: ${inspectObject(error.config.headers)}`);
  }

  if (error.response) {
    errorLogger(inspectObject(error.response.data));
  }
};

export const logRequestInfo = function(action, url, headers) {
  if (!infoLogger.enabled) { return; }
  if (url) { infoLogger(`${action.toUpperCase()} ${url.toString()}`); }
  infoLogger(`Headers: ${inspectObject(headers)}`);
};

export const logResponseInfo = function(response) {
  if (!infoLogger.enabled) { return; }
  infoLogger(`Response: ${response.status}`);
  infoLogger(inspectObject(response.data));
};

export const logError = function(error) {
  if (!errorLogger.enabled) { return; }
  errorLogger(error);
};