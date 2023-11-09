import {
  Observable,
  __assign,
  createErrorClass,
  map
} from "./chunk-3H6TURPV.js";
import "./chunk-AC2VUBZ6.js";

// node_modules/rxjs/dist/esm5/internal/ajax/getXHRResponse.js
function getXHRResponse(xhr) {
  switch (xhr.responseType) {
    case "json": {
      if ("response" in xhr) {
        return xhr.response;
      } else {
        var ieXHR = xhr;
        return JSON.parse(ieXHR.responseText);
      }
    }
    case "document":
      return xhr.responseXML;
    case "text":
    default: {
      if ("response" in xhr) {
        return xhr.response;
      } else {
        var ieXHR = xhr;
        return ieXHR.responseText;
      }
    }
  }
}

// node_modules/rxjs/dist/esm5/internal/ajax/AjaxResponse.js
var AjaxResponse = function() {
  function AjaxResponse2(originalEvent, xhr, request, type) {
    if (type === void 0) {
      type = "download_load";
    }
    this.originalEvent = originalEvent;
    this.xhr = xhr;
    this.request = request;
    this.type = type;
    var status = xhr.status, responseType = xhr.responseType;
    this.status = status !== null && status !== void 0 ? status : 0;
    this.responseType = responseType !== null && responseType !== void 0 ? responseType : "";
    var allHeaders = xhr.getAllResponseHeaders();
    this.responseHeaders = allHeaders ? allHeaders.split("\n").reduce(function(headers, line) {
      var index = line.indexOf(": ");
      headers[line.slice(0, index)] = line.slice(index + 2);
      return headers;
    }, {}) : {};
    this.response = getXHRResponse(xhr);
    var loaded = originalEvent.loaded, total = originalEvent.total;
    this.loaded = loaded;
    this.total = total;
  }
  return AjaxResponse2;
}();

// node_modules/rxjs/dist/esm5/internal/ajax/errors.js
var AjaxError = createErrorClass(function(_super) {
  return function AjaxErrorImpl(message, xhr, request) {
    this.message = message;
    this.name = "AjaxError";
    this.xhr = xhr;
    this.request = request;
    this.status = xhr.status;
    this.responseType = xhr.responseType;
    var response;
    try {
      response = getXHRResponse(xhr);
    } catch (err) {
      response = xhr.responseText;
    }
    this.response = response;
  };
});
var AjaxTimeoutError = function() {
  function AjaxTimeoutErrorImpl(xhr, request) {
    AjaxError.call(this, "ajax timeout", xhr, request);
    this.name = "AjaxTimeoutError";
    return this;
  }
  AjaxTimeoutErrorImpl.prototype = Object.create(AjaxError.prototype);
  return AjaxTimeoutErrorImpl;
}();

// node_modules/rxjs/dist/esm5/internal/ajax/ajax.js
function ajaxGet(url, headers) {
  return ajax({ method: "GET", url, headers });
}
function ajaxPost(url, body, headers) {
  return ajax({ method: "POST", url, body, headers });
}
function ajaxDelete(url, headers) {
  return ajax({ method: "DELETE", url, headers });
}
function ajaxPut(url, body, headers) {
  return ajax({ method: "PUT", url, body, headers });
}
function ajaxPatch(url, body, headers) {
  return ajax({ method: "PATCH", url, body, headers });
}
var mapResponse = map(function(x) {
  return x.response;
});
function ajaxGetJSON(url, headers) {
  return mapResponse(ajax({
    method: "GET",
    url,
    headers
  }));
}
var ajax = function() {
  var create = function(urlOrConfig) {
    var config = typeof urlOrConfig === "string" ? {
      url: urlOrConfig
    } : urlOrConfig;
    return fromAjax(config);
  };
  create.get = ajaxGet;
  create.post = ajaxPost;
  create.delete = ajaxDelete;
  create.put = ajaxPut;
  create.patch = ajaxPatch;
  create.getJSON = ajaxGetJSON;
  return create;
}();
var UPLOAD = "upload";
var DOWNLOAD = "download";
var LOADSTART = "loadstart";
var PROGRESS = "progress";
var LOAD = "load";
function fromAjax(init) {
  return new Observable(function(destination) {
    var _a, _b;
    var config = __assign({ async: true, crossDomain: false, withCredentials: false, method: "GET", timeout: 0, responseType: "json" }, init);
    var queryParams = config.queryParams, configuredBody = config.body, configuredHeaders = config.headers;
    var url = config.url;
    if (!url) {
      throw new TypeError("url is required");
    }
    if (queryParams) {
      var searchParams_1;
      if (url.includes("?")) {
        var parts = url.split("?");
        if (2 < parts.length) {
          throw new TypeError("invalid url");
        }
        searchParams_1 = new URLSearchParams(parts[1]);
        new URLSearchParams(queryParams).forEach(function(value, key2) {
          return searchParams_1.set(key2, value);
        });
        url = parts[0] + "?" + searchParams_1;
      } else {
        searchParams_1 = new URLSearchParams(queryParams);
        url = url + "?" + searchParams_1;
      }
    }
    var headers = {};
    if (configuredHeaders) {
      for (var key in configuredHeaders) {
        if (configuredHeaders.hasOwnProperty(key)) {
          headers[key.toLowerCase()] = configuredHeaders[key];
        }
      }
    }
    var crossDomain = config.crossDomain;
    if (!crossDomain && !("x-requested-with" in headers)) {
      headers["x-requested-with"] = "XMLHttpRequest";
    }
    var withCredentials = config.withCredentials, xsrfCookieName = config.xsrfCookieName, xsrfHeaderName = config.xsrfHeaderName;
    if ((withCredentials || !crossDomain) && xsrfCookieName && xsrfHeaderName) {
      var xsrfCookie = (_b = (_a = document === null || document === void 0 ? void 0 : document.cookie.match(new RegExp("(^|;\\s*)(" + xsrfCookieName + ")=([^;]*)"))) === null || _a === void 0 ? void 0 : _a.pop()) !== null && _b !== void 0 ? _b : "";
      if (xsrfCookie) {
        headers[xsrfHeaderName] = xsrfCookie;
      }
    }
    var body = extractContentTypeAndMaybeSerializeBody(configuredBody, headers);
    var _request = __assign(__assign({}, config), {
      url,
      headers,
      body
    });
    var xhr;
    xhr = init.createXHR ? init.createXHR() : new XMLHttpRequest();
    {
      var progressSubscriber_1 = init.progressSubscriber, _c = init.includeDownloadProgress, includeDownloadProgress = _c === void 0 ? false : _c, _d = init.includeUploadProgress, includeUploadProgress = _d === void 0 ? false : _d;
      var addErrorEvent = function(type, errorFactory) {
        xhr.addEventListener(type, function() {
          var _a2;
          var error = errorFactory();
          (_a2 = progressSubscriber_1 === null || progressSubscriber_1 === void 0 ? void 0 : progressSubscriber_1.error) === null || _a2 === void 0 ? void 0 : _a2.call(progressSubscriber_1, error);
          destination.error(error);
        });
      };
      addErrorEvent("timeout", function() {
        return new AjaxTimeoutError(xhr, _request);
      });
      addErrorEvent("abort", function() {
        return new AjaxError("aborted", xhr, _request);
      });
      var createResponse_1 = function(direction, event) {
        return new AjaxResponse(event, xhr, _request, direction + "_" + event.type);
      };
      var addProgressEvent_1 = function(target, type, direction) {
        target.addEventListener(type, function(event) {
          destination.next(createResponse_1(direction, event));
        });
      };
      if (includeUploadProgress) {
        [LOADSTART, PROGRESS, LOAD].forEach(function(type) {
          return addProgressEvent_1(xhr.upload, type, UPLOAD);
        });
      }
      if (progressSubscriber_1) {
        [LOADSTART, PROGRESS].forEach(function(type) {
          return xhr.upload.addEventListener(type, function(e) {
            var _a2;
            return (_a2 = progressSubscriber_1 === null || progressSubscriber_1 === void 0 ? void 0 : progressSubscriber_1.next) === null || _a2 === void 0 ? void 0 : _a2.call(progressSubscriber_1, e);
          });
        });
      }
      if (includeDownloadProgress) {
        [LOADSTART, PROGRESS].forEach(function(type) {
          return addProgressEvent_1(xhr, type, DOWNLOAD);
        });
      }
      var emitError_1 = function(status) {
        var msg = "ajax error" + (status ? " " + status : "");
        destination.error(new AjaxError(msg, xhr, _request));
      };
      xhr.addEventListener("error", function(e) {
        var _a2;
        (_a2 = progressSubscriber_1 === null || progressSubscriber_1 === void 0 ? void 0 : progressSubscriber_1.error) === null || _a2 === void 0 ? void 0 : _a2.call(progressSubscriber_1, e);
        emitError_1();
      });
      xhr.addEventListener(LOAD, function(event) {
        var _a2, _b2;
        var status = xhr.status;
        if (status < 400) {
          (_a2 = progressSubscriber_1 === null || progressSubscriber_1 === void 0 ? void 0 : progressSubscriber_1.complete) === null || _a2 === void 0 ? void 0 : _a2.call(progressSubscriber_1);
          var response = void 0;
          try {
            response = createResponse_1(DOWNLOAD, event);
          } catch (err) {
            destination.error(err);
            return;
          }
          destination.next(response);
          destination.complete();
        } else {
          (_b2 = progressSubscriber_1 === null || progressSubscriber_1 === void 0 ? void 0 : progressSubscriber_1.error) === null || _b2 === void 0 ? void 0 : _b2.call(progressSubscriber_1, event);
          emitError_1(status);
        }
      });
    }
    var user = _request.user, method = _request.method, async = _request.async;
    if (user) {
      xhr.open(method, url, async, user, _request.password);
    } else {
      xhr.open(method, url, async);
    }
    if (async) {
      xhr.timeout = _request.timeout;
      xhr.responseType = _request.responseType;
    }
    if ("withCredentials" in xhr) {
      xhr.withCredentials = _request.withCredentials;
    }
    for (var key in headers) {
      if (headers.hasOwnProperty(key)) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
    if (body) {
      xhr.send(body);
    } else {
      xhr.send();
    }
    return function() {
      if (xhr && xhr.readyState !== 4) {
        xhr.abort();
      }
    };
  });
}
function extractContentTypeAndMaybeSerializeBody(body, headers) {
  var _a;
  if (!body || typeof body === "string" || isFormData(body) || isURLSearchParams(body) || isArrayBuffer(body) || isFile(body) || isBlob(body) || isReadableStream(body)) {
    return body;
  }
  if (isArrayBufferView(body)) {
    return body.buffer;
  }
  if (typeof body === "object") {
    headers["content-type"] = (_a = headers["content-type"]) !== null && _a !== void 0 ? _a : "application/json;charset=utf-8";
    return JSON.stringify(body);
  }
  throw new TypeError("Unknown body type");
}
var _toString = Object.prototype.toString;
function toStringCheck(obj, name) {
  return _toString.call(obj) === "[object " + name + "]";
}
function isArrayBuffer(body) {
  return toStringCheck(body, "ArrayBuffer");
}
function isFile(body) {
  return toStringCheck(body, "File");
}
function isBlob(body) {
  return toStringCheck(body, "Blob");
}
function isArrayBufferView(body) {
  return typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(body);
}
function isFormData(body) {
  return typeof FormData !== "undefined" && body instanceof FormData;
}
function isURLSearchParams(body) {
  return typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams;
}
function isReadableStream(body) {
  return typeof ReadableStream !== "undefined" && body instanceof ReadableStream;
}
export {
  AjaxError,
  AjaxResponse,
  AjaxTimeoutError,
  ajax
};
//# sourceMappingURL=rxjs_ajax.js.map
