var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve2(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/component/index.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createReactRouter,
  createRouteConfig,
  Outlet,
  RouterProvider
} from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import React4, { useEffect } from "react";

// src/api-client/index.ts
var api_client_exports = {};
__export(api_client_exports, {
  AccessTokensService: () => AccessTokensService,
  ApiError: () => ApiError,
  CancelError: () => CancelError,
  CancelablePromise: () => CancelablePromise,
  OpenAPI: () => OpenAPI,
  OrganizationsService: () => OrganizationsService,
  PostsService: () => PostsService
});

// src/api-client/core/ApiError.ts
var ApiError = class extends Error {
  constructor(request2, response, message) {
    super(message);
    this.name = "ApiError";
    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
    this.body = response.body;
    this.request = request2;
  }
};

// src/api-client/core/CancelablePromise.ts
var CancelError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CancelError";
  }
  get isCancelled() {
    return true;
  }
};
var CancelablePromise = class {
  constructor(executor) {
    this._isResolved = false;
    this._isRejected = false;
    this._isCancelled = false;
    this._cancelHandlers = [];
    this._promise = new Promise((resolve2, reject) => {
      this._resolve = resolve2;
      this._reject = reject;
      const onResolve = (value) => {
        var _a;
        if (this._isResolved || this._isRejected || this._isCancelled) {
          return;
        }
        this._isResolved = true;
        (_a = this._resolve) == null ? void 0 : _a.call(this, value);
      };
      const onReject = (reason) => {
        var _a;
        if (this._isResolved || this._isRejected || this._isCancelled) {
          return;
        }
        this._isRejected = true;
        (_a = this._reject) == null ? void 0 : _a.call(this, reason);
      };
      const onCancel = (cancelHandler) => {
        if (this._isResolved || this._isRejected || this._isCancelled) {
          return;
        }
        this._cancelHandlers.push(cancelHandler);
      };
      Object.defineProperty(onCancel, "isResolved", {
        get: () => this._isResolved
      });
      Object.defineProperty(onCancel, "isRejected", {
        get: () => this._isRejected
      });
      Object.defineProperty(onCancel, "isCancelled", {
        get: () => this._isCancelled
      });
      return executor(onResolve, onReject, onCancel);
    });
  }
  then(onFulfilled, onRejected) {
    return this._promise.then(onFulfilled, onRejected);
  }
  catch(onRejected) {
    return this._promise.catch(onRejected);
  }
  finally(onFinally) {
    return this._promise.finally(onFinally);
  }
  cancel() {
    var _a;
    if (this._isResolved || this._isRejected || this._isCancelled) {
      return;
    }
    this._isCancelled = true;
    if (this._cancelHandlers.length) {
      try {
        for (const cancelHandler of this._cancelHandlers) {
          cancelHandler();
        }
      } catch (error) {
        console.warn("Cancellation threw an error", error);
        return;
      }
    }
    this._cancelHandlers.length = 0;
    (_a = this._reject) == null ? void 0 : _a.call(this, new CancelError("Request aborted"));
  }
  get isCancelled() {
    return this._isCancelled;
  }
};
Symbol.toStringTag;

// src/api-client/core/OpenAPI.ts
var OpenAPI = {
  BASE: "http://localhost:3001/api",
  VERSION: "1.0.0",
  WITH_CREDENTIALS: false,
  CREDENTIALS: "include",
  TOKEN: void 0,
  USERNAME: void 0,
  PASSWORD: void 0,
  HEADERS: void 0,
  ENCODE_PATH: void 0
};

// src/api-client/core/request.ts
var isDefined = (value) => {
  return value !== void 0 && value !== null;
};
var isString = (value) => {
  return typeof value === "string";
};
var isStringWithValue = (value) => {
  return isString(value) && value !== "";
};
var isBlob = (value) => {
  return typeof value === "object" && typeof value.type === "string" && typeof value.stream === "function" && typeof value.arrayBuffer === "function" && typeof value.constructor === "function" && typeof value.constructor.name === "string" && /^(Blob|File)$/.test(value.constructor.name) && /^(Blob|File)$/.test(value[Symbol.toStringTag]);
};
var isFormData = (value) => {
  return value instanceof FormData;
};
var base64 = (str) => {
  try {
    return btoa(str);
  } catch (err) {
    return Buffer.from(str).toString("base64");
  }
};
var getQueryString = (params) => {
  const qs = [];
  const append = (key, value) => {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  };
  const process = (key, value) => {
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          process(key, v);
        });
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([k, v]) => {
          process(`${key}[${k}]`, v);
        });
      } else {
        append(key, value);
      }
    }
  };
  Object.entries(params).forEach(([key, value]) => {
    process(key, value);
  });
  if (qs.length > 0) {
    return `?${qs.join("&")}`;
  }
  return "";
};
var getUrl = (config, options) => {
  const encoder = config.ENCODE_PATH || encodeURI;
  const path = options.url.replace("{api-version}", config.VERSION).replace(/{(.*?)}/g, (substring, group) => {
    var _a;
    if ((_a = options.path) == null ? void 0 : _a.hasOwnProperty(group)) {
      return encoder(String(options.path[group]));
    }
    return substring;
  });
  const url = `${config.BASE}${path}`;
  if (options.query) {
    return `${url}${getQueryString(options.query)}`;
  }
  return url;
};
var getFormData = (options) => {
  if (options.formData) {
    const formData = new FormData();
    const process = (key, value) => {
      if (isString(value) || isBlob(value)) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    };
    Object.entries(options.formData).filter(([_, value]) => isDefined(value)).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => process(key, v));
      } else {
        process(key, value);
      }
    });
    return formData;
  }
  return void 0;
};
var resolve = (options, resolver) => __async(void 0, null, function* () {
  if (typeof resolver === "function") {
    return resolver(options);
  }
  return resolver;
});
var getHeaders = (config, options) => __async(void 0, null, function* () {
  const token = yield resolve(options, config.TOKEN);
  const username = yield resolve(options, config.USERNAME);
  const password = yield resolve(options, config.PASSWORD);
  const additionalHeaders = yield resolve(options, config.HEADERS);
  const headers = Object.entries(__spreadValues(__spreadValues({
    Accept: "application/json"
  }, additionalHeaders), options.headers)).filter(([_, value]) => isDefined(value)).reduce((headers2, [key, value]) => __spreadProps(__spreadValues({}, headers2), {
    [key]: String(value)
  }), {});
  if (isStringWithValue(token)) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (isStringWithValue(username) && isStringWithValue(password)) {
    const credentials = base64(`${username}:${password}`);
    headers["Authorization"] = `Basic ${credentials}`;
  }
  if (options.body) {
    if (options.mediaType) {
      headers["Content-Type"] = options.mediaType;
    } else if (isBlob(options.body)) {
      headers["Content-Type"] = options.body.type || "application/octet-stream";
    } else if (isString(options.body)) {
      headers["Content-Type"] = "text/plain";
    } else if (!isFormData(options.body)) {
      headers["Content-Type"] = "application/json";
    }
  }
  return new Headers(headers);
});
var getRequestBody = (options) => {
  var _a;
  if (options.body) {
    if ((_a = options.mediaType) == null ? void 0 : _a.includes("/json")) {
      return JSON.stringify(options.body);
    } else if (isString(options.body) || isBlob(options.body) || isFormData(options.body)) {
      return options.body;
    } else {
      return JSON.stringify(options.body);
    }
  }
  return void 0;
};
var sendRequest = (config, options, url, body, formData, headers, onCancel) => __async(void 0, null, function* () {
  const controller = new AbortController();
  const request2 = {
    headers,
    body: body != null ? body : formData,
    method: options.method,
    signal: controller.signal
  };
  if (config.WITH_CREDENTIALS) {
    request2.credentials = config.CREDENTIALS;
  }
  onCancel(() => controller.abort());
  return yield fetch(url, request2);
});
var getResponseHeader = (response, responseHeader) => {
  if (responseHeader) {
    const content = response.headers.get(responseHeader);
    if (isString(content)) {
      return content;
    }
  }
  return void 0;
};
var getResponseBody = (response) => __async(void 0, null, function* () {
  if (response.status !== 204) {
    try {
      const contentType = response.headers.get("Content-Type");
      if (contentType) {
        const isJSON = contentType.toLowerCase().startsWith("application/json");
        if (isJSON) {
          return yield response.json();
        } else {
          return yield response.text();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  return void 0;
});
var catchErrorCodes = (options, result) => {
  const errors = __spreadValues({
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable"
  }, options.errors);
  const error = errors[result.status];
  if (error) {
    throw new ApiError(options, result, error);
  }
  if (!result.ok) {
    throw new ApiError(options, result, "Generic Error");
  }
};
var request = (config, options) => {
  return new CancelablePromise((resolve2, reject, onCancel) => __async(void 0, null, function* () {
    try {
      const url = getUrl(config, options);
      const formData = getFormData(options);
      const body = getRequestBody(options);
      const headers = yield getHeaders(config, options);
      if (!onCancel.isCancelled) {
        const response = yield sendRequest(config, options, url, body, formData, headers, onCancel);
        const responseBody = yield getResponseBody(response);
        const responseHeader = getResponseHeader(response, options.responseHeader);
        const result = {
          url,
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          body: responseHeader != null ? responseHeader : responseBody
        };
        catchErrorCodes(options, result);
        resolve2(result.body);
      }
    } catch (error) {
      reject(error);
    }
  }));
};

// src/api-client/services/AccessTokensService.ts
var AccessTokensService = class {
  static queryAccessTokensTest() {
    return request(OpenAPI, {
      method: "GET",
      url: "/access-tokens/test"
    });
  }
};

// src/api-client/services/OrganizationsService.ts
var OrganizationsService = class {
  static queryOrganizationsFindUnique(id) {
    return request(OpenAPI, {
      method: "GET",
      url: "/organizations/findUnique",
      query: {
        "id": id
      }
    });
  }
};

// src/api-client/services/PostsService.ts
var PostsService = class {
  static queryPostsFindMany() {
    return request(OpenAPI, {
      method: "GET",
      url: "/posts/findMany"
    });
  }
  static queryPostsFindUnique(id) {
    return request(OpenAPI, {
      method: "GET",
      url: "/posts/findUnique",
      query: {
        "id": id
      }
    });
  }
  static mutationPostsUpdate(requestBody) {
    return request(OpenAPI, {
      method: "PATCH",
      url: "/posts/update",
      body: requestBody,
      mediaType: "application/json"
    });
  }
  static mutationPostsCreate(requestBody) {
    return request(OpenAPI, {
      method: "POST",
      url: "/posts/create",
      body: requestBody,
      mediaType: "application/json"
    });
  }
  static mutationPostsDelete(id) {
    return request(OpenAPI, {
      method: "DELETE",
      url: "/posts/delete",
      query: {
        "id": id
      }
    });
  }
};

// src/component/pages/posts.tsx
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { Pill } from "@manuscript/glue";
var PostsPage = () => {
  var _a;
  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: () => PostsService.queryPostsFindMany()
  });
  const postCreate = useMutation({
    mutationFn: PostsService.mutationPostsCreate
  });
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col w-full gap-4 p-4" }, /* @__PURE__ */ React.createElement("h1", { className: "text-lg" }, "Posts"), /* @__PURE__ */ React.createElement("p", null, "These are all of your posts"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        const toastId = toast.loading("Creating post");
        postCreate.mutate(
          {
            slug: "ewfer",
            content: "ewrflkrejflrke"
          },
          {
            onSuccess: () => __async(void 0, null, function* () {
              yield posts.refetch();
              toast.success("Created post", {
                id: toastId
              });
            })
          }
        );
      }
    },
    "create new"
  ), (_a = posts.data) == null ? void 0 : _a.map((p) => /* @__PURE__ */ React.createElement(PostDisplay, { post: p, key: p.id })));
};
var PostDisplay = (props) => {
  const { post } = props;
  return /* @__PURE__ */ React.createElement("div", { className: "p-4 border rounded-md border-color" }, /* @__PURE__ */ React.createElement(Pill, null, post.slug), JSON.stringify(post));
};
var posts_default = PostsPage;

// src/component/pages/schemas.tsx
import { useAtomValue } from "jotai";
import React2 from "react";

// src/component/store.ts
import { atom } from "jotai";
var GlobalStateAtom = atom({
  baseProps: {
    accessToken: "",
    schemas: []
  }
});

// src/component/pages/schemas.tsx
var SchemasPage = () => {
  const { baseProps } = useAtomValue(GlobalStateAtom);
  const { schemas } = baseProps;
  return /* @__PURE__ */ React2.createElement("div", { className: "flex flex-col w-full gap-4 p-4" }, /* @__PURE__ */ React2.createElement("h1", { className: "text-lg" }, "Schemas"), /* @__PURE__ */ React2.createElement("p", null, "These are all the schemas you have defined"), /* @__PURE__ */ React2.createElement("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3" }, schemas.map((s, i) => {
    return /* @__PURE__ */ React2.createElement(SchemaDisplay, { schema: s, key: `${i}-${s.name}` });
  })));
};
var SchemaDisplay = (props) => {
  const { schema } = props;
  return /* @__PURE__ */ React2.createElement("div", { className: "flex flex-col gap-2 p-4 border rounded-md shadow-sm border-color" }, /* @__PURE__ */ React2.createElement("div", null, schema.name), /* @__PURE__ */ React2.createElement("div", { className: "flex gap-2" }, Object.keys(schema.validator.shape).map((k) => {
    return /* @__PURE__ */ React2.createElement("div", { key: k, className: "px-2 py-1 bg-gray-500 rounded-md" }, k);
  })));
};
var schemas_default = SchemasPage;

// src/component/sidebar.tsx
import { useQuery as useQuery2 } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import React3 from "react";
var Sidebar = () => {
  return /* @__PURE__ */ React3.createElement("div", { className: "flex flex-col gap-4 p-4 border-r border-color" }, /* @__PURE__ */ React3.createElement(ConnectionStatus, null), /* @__PURE__ */ React3.createElement("div", { className: "flex flex-col gap-2" }, /* @__PURE__ */ React3.createElement(Link, { to: "/" }, "Posts"), /* @__PURE__ */ React3.createElement(Link, { to: "/schemas" }, "Schemas")));
};
var sidebar_default = Sidebar;
var ConnectionStatus = () => {
  var _a, _b, _c;
  const accessToken = useQuery2({
    queryKey: ["access-token"],
    queryFn: AccessTokensService.queryAccessTokensTest
  });
  const organization = useQuery2({
    queryKey: ["organization", (_a = accessToken.data) == null ? void 0 : _a.organizationId],
    queryFn: () => {
      var _a2;
      return OrganizationsService.queryOrganizationsFindUnique(
        (_a2 = accessToken.data) == null ? void 0 : _a2.organizationId
      );
    },
    enabled: !!((_b = accessToken.data) == null ? void 0 : _b.organizationId)
  });
  return /* @__PURE__ */ React3.createElement("div", { className: "p-2 border rounded-md border-color" }, "Connected to ", /* @__PURE__ */ React3.createElement("strong", null, (_c = organization.data) == null ? void 0 : _c.clerkOrganizationName));
};

// src/component/index.tsx
import { Toaster } from "react-hot-toast";
var rootRoute = createRouteConfig();
var postsRoute = rootRoute.createRoute({
  path: "/",
  component: posts_default
});
var schemasRoute = rootRoute.createRoute({
  path: "/schemas",
  component: schemas_default
});
var routeConfig = rootRoute.addChildren([postsRoute, schemasRoute]);
var memoryHistory = createMemoryHistory({
  initialEntries: ["/"]
});
var router = createReactRouter({ routeConfig, history: memoryHistory });
OpenAPI.BASE = "http://localhost:3001/api";
var queryClient = new QueryClient();
var ManuscriptStudio = (props) => {
  const { accessToken } = props;
  OpenAPI.TOKEN = accessToken;
  const setGlobalState = useSetAtom(GlobalStateAtom);
  useEffect(() => {
    setGlobalState((prev) => {
      return __spreadProps(__spreadValues({}, prev), {
        baseProps: props
      });
    });
  }, [props]);
  return /* @__PURE__ */ React4.createElement(RouterProvider, { router }, /* @__PURE__ */ React4.createElement(QueryClientProvider, { client: queryClient }, /* @__PURE__ */ React4.createElement("div", { className: "flex w-full h-full dark:bg-gray-800 dark:text-slate-50" }, /* @__PURE__ */ React4.createElement(sidebar_default, null), /* @__PURE__ */ React4.createElement(Outlet, null), /* @__PURE__ */ React4.createElement(Toaster, null))));
};
export {
  api_client_exports as ManuscriptApi,
  ManuscriptStudio
};
