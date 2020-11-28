import webhooks from "@octokit/webhooks"
import * as probot from "probot"
import { ProbotOctokit } from "probot"

interface PushState {
	readonly author: string
	readonly branch: string
	readonly commitSha: string
	readonly octokit: InstanceType<typeof ProbotOctokit>
	readonly org: string
	pullRequestId: string
	pullRequestNumber: number
	readonly repo: string
}

/** called when this bot gets notified about a push on Github */
export async function onPush(context: probot.Context<webhooks.EventPayloads.WebhookPayloadPush>): Promise<void> {
	let state: PushState | undefined
	try {
		state = {
			author: context.payload.pusher.name,
			branch: context.payload.ref.replace("refs/heads/", ""),
			commitSha: context.payload.after.substring(0, 7),
			octokit: context.github,
			org: context.payload.repository.owner.login,
			pullRequestId: "",
			pullRequestNumber: 0,
			repo: context.payload.repository.name,
		}
		const repoPrefix = `${state.org}/${state.repo}|${state.branch}|${state.commitSha}`

		// ignore deleted branches
		if (state.commitSha === "0000000") {
			console.log(`${repoPrefix}: IGNORING BRANCH DELETION`)
			return
		}

		// log push detected
		console.log(`${repoPrefix}: PUSH DETECTED`)

		// ignore commits by Securityfixer
		if (state.author === "securityfixer[bot]") {
			console.log(`${repoPrefix}: IGNORING COMMIT BY Securityfixerbot`)
			return
		}
	}
	catch (e) {
		console.log(`ON PUSH:`, e)
		return
	}

}

