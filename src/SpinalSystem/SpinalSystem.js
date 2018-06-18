import {} from "spinal-core-connectorjs";
import * as Q from "q";

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

class SpinalSystem {
  constructor() {
    this.user = {
      username: "admin",
      password: "JHGgcz45JKilmzknzelf65ddDadggftIO98P"
    };
    this.promiseModel = null;
    this.promiseinit = null;
    this.modelsDictionary = {};
    this.modelsPathDictionary = {};
  }

  init() {
    if (this.promiseinit) return this.promiseinit.promise;
    this.promiseinit = Q.defer();
    this.getUser();
    if (this.user.username) {
      window.SpinalUserManager.get_user_id(
        "http://" + window.location.host,
        this.user.username,
        this.user.password,
        response => {
          let id = parseInt(response);
          this.conn = window.spinalCore.connect(
            `http://${id}:${this.user.password}@${window.location.host}/`
          );
          this.promiseinit.resolve();
        },
        () => {
          this.promiseinit.reject();
          this.promiseinit = null;
        }
      );
    } else {
      this.promiseinit.reject();
      this.promiseinit = null;
    }
    return this.promiseinit.promise;
  }

  getPath() {
    let path = getParameterByName("path");
    if (path) return atob(path);
    return undefined;
  }

  getUser() {
    return this.user;
  }

  getModel() {
    if (this.promiseModel) {
      return this.promiseModel.promise;
    }
    this.promiseModel = Q.defer();
    this.init().then(
      () => {
        let path = "/doc/doc_file";
        window.spinalCore.load(
          this.conn,
          path,
          docFile => {
            this.model = docFile;
            this.promiseModel.resolve(this.model);
          },
          () => {
            this.model = new window.Lst();
            window.spinalCore.store(
              this.conn,
              this.model,
              path,
              () => {
                this.promiseModel.resolve(this.model);
              },
              function() {
                console.error(
                  new Error(
                    "Imposible to store the file, check the connetion to the hub"
                  )
                );
                this.promiseModel.reject();
                this.promiseModel = null;
              }
            );
          }
        );
      },
      err => {
        console.error(err);
        this.promiseModel.reject();
        this.promiseModel = null;
      }
    );
    return this.promiseModel.promise;
  }

  _waitModelRdyRec(model, promise) {
    if (!model._server_id || window.FileSystem._tmp_objects[model._server_id]) {
      setTimeout(() => {
        this._waitModelRdyRec(model, promise);
      }, 100);
    } else promise.resolve(model);
  }
  waitModelRdy(model) {
    let defer = Q.defer();
    this._waitModelRdyRec(model, defer);

    return defer.promise;
  }
  loadModelPtr(model) {
    if (this.modelsDictionary[model._server_id]) {
      return this.modelsDictionary[model._server_id].promise;
    }
    this.modelsDictionary[model._server_id] = Q.defer();
    try {
      model.load(m => {
        this.modelsDictionary[model._server_id].resolve(m);
      });
    } catch (error) {
      let promise = this.modelsDictionary[model._server_id];
      this.modelsDictionary[model._server_id] = undefined;
      promise.reject();
    }
    return this.modelsDictionary[model._server_id].promise;
  }
  signOut() {
    window.localStorage.setItem("spinalhome_cfg", "");
  }
  load(path) {
    if (this.modelsPathDictionary[path]) {
      return this.modelsPathDictionary[path].promise;
    }
    this.modelsPathDictionary[path] = Q.defer();

    window.spinalCore.load(
      this.conn,
      path,
      m => {
        this.modelsPathDictionary[path].resolve(m);
      },
      () => {
        console.error("Failed to load model in : " + path);
        let promise = this.modelsPathDictionary[path];
        this.modelsPathDictionary[path] = undefined;
        promise.reject();
      }
    );

    return this.modelsPathDictionary[path].promise;
  }
}

export default SpinalSystem;
