import * as _ from "lodash";

export function tokenize(str: string) {
  return _.filter(
    str.replace(/\(/g, "( ").replace(/\)/g, " )").split(" "),
    function (s) {
      return !_.isUndefined(s);
    });
}
