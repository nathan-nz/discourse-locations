import { run } from "@ember/runloop";
import getUrl from "discourse-common/lib/get-url";
import { Promise } from "rsvp";

let token;

export function getToken() {
  if (!token) {
    token = $('meta[name="csrf-token"]').attr("content");
  }

  return token;
}

export function ajax(args) {
  return new Promise((resolve, reject) => {
    args.headers = { "X-CSRF-Token": getToken() };
    args.success = (data) => run(null, resolve, data);
    args.error = (xhr) => run(null, reject, xhr);
    args.url = getUrl(args.url);
    $.ajax(args);
  });
}
