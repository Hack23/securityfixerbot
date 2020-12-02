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
import webhooks from "@octokit/webhooks";
import { Context, ProbotOctokit } from "probot";

interface PushState {
  readonly author: string;
  readonly branch: string;
  readonly ref: string;
  readonly commitSha: string;
  readonly octokit: InstanceType<typeof ProbotOctokit>;
  readonly org: string;
  pullRequestId: string;
  pullRequestNumber: number;
  readonly repo: string;
}

export async function onPush(
  context: Context<webhooks.EventPayloads.WebhookPayloadPush>
): Promise<void> {
  let state: PushState | undefined;
  try {
    state = {
      author: context.payload.pusher.name,
      branch: context.payload.ref.replace("refs/heads/", ""),
      ref: context.payload.ref,
      commitSha: context.payload.after.substring(0, 7),
      octokit: context.github,
      org: context.payload.repository.owner.login,
      pullRequestId: "",
      pullRequestNumber: 0,
      repo: context.payload.repository.name,
    };
    const repoPrefix = `${state.org}/${state.repo}|${state.branch}|${state.commitSha}`;

    if (state.commitSha === "0000000") {
      console.log(`IGNORING BRANCH DELETION : ${repoPrefix}`);
      return;
    }

    if (state.author === "securityfixer[bot]") {
      console.log(`IGNORING COMMIT BY Securityfixerbot : ${repoPrefix}`);
      return;
    }
    console.log(`PUSH DETECTED : ${repoPrefix}`);

    const content = await context.octokit.repos.getContent({
      owner: state.org,
      path: "",
      ref: state.ref,
      repo: state.repo,
    });

    console.log(`CONTENT : ${content}`);

    //CHECK CONTENT
  } catch (e) {
    console.log(`FAILURE ON PUSH:${context.payload}`, e);
    return;
  }
}
