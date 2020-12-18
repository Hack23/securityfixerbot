/* 
ISC License

Copyright (c) 2020, James Pether Sörling <james@hack23.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
import nock from "nock";

// Requiring our app implementation
import myProbotApp from "../src";
import { Probot, ProbotOctokit } from "probot";
// Requiring our fixtures

import emptypayload from "./fixtures/empty.json";
import pushpayload from "./fixtures/push.json";
import pushdeletionpayload from "./fixtures/branch-deletion-push.json";
import pushsecuritybotpayload from "./fixtures/security-bot-push.json";
import getcontentresponse from "./fixtures/getcontents.json";
import getcontenterrorresponse from "./fixtures/getcontentserror.json";

import fs = require("fs");
import path = require("path");

const privateKey = fs.readFileSync(
  path.join(__dirname, "fixtures/mock-cert.pem"),
  "utf-8"
);

describe("My Probot app", () => {
  let probot: any;
  const mock = nock("https://api.github.com");

  beforeEach(() => {
    nock.disableNetConnect();
    probot = new Probot({
      privateKey,
      githubToken: "test",
      // disable request throttling and retries for testing
      Octokit: ProbotOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),
    });
    // Load our app into probot
    probot.load(myProbotApp);
  });

  test("onpush branch deletion do nothing", async () => {
    await probot.receive({ name: "push", payload: pushdeletionpayload });
    expect(mock.pendingMocks()).toStrictEqual([]);
  });

  test("onpush securityfixerbot author do nothing", async () => {
    await probot.receive({ name: "push", payload: pushsecuritybotpayload });
    expect(mock.pendingMocks()).toStrictEqual([]);
  });

  test("onpush check code if PR should be created", async () => {
    mock
      .get("/repos/Codertocat/Hello-World/contents/?ref=refs/tags/simple-tag")
      .reply(200, getcontentresponse);

    await probot.receive({ name: "push", payload: pushpayload });
    expect(mock.pendingMocks()).toStrictEqual([]);
  });

  test("onpush check code if PR should be created and failure getting content", async () => {
    mock
      .get("/repos/Codertocat/Hello-World/contents/?ref=refs/tags/simple-tag")
      .reply(404, getcontenterrorresponse);

    await probot.receive({ name: "push", payload: pushpayload });
    expect(mock.pendingMocks()).toStrictEqual([]);
  });

  test("onpush failure", async () => {
    await probot.receive({ name: "push", payload: emptypayload });
    expect(mock.pendingMocks()).toStrictEqual([]);
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});

// For more information about testing with Jest see:
// https://facebook.github.io/jest/

// For more information about using TypeScript in your tests, Jest recommends:
// https://github.com/kulshekhar/ts-jest

// For more information about testing with Nock see:
// https://github.com/nock/nock
