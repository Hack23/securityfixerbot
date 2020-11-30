// import index from '../src/index'

import nock from 'nock'

// Requiring our app implementation
import myProbotApp from '../src'
import { Probot, ProbotOctokit } from 'probot'
// Requiring our fixtures
//const issuesOpenedPayload = require('./fixtures/issues.opened.json');

const emptypayload = require('./fixtures/empty.json');
const pushpayload = require('./fixtures/push.json');
const pushdeletionpayload = require('./fixtures/branch-deletion-push.json');
const pushsecuritybotpayload = require('./fixtures/security-bot-push.json');

const fs = require('fs')
const path = require('path')

const privateKey = fs.readFileSync(path.join(__dirname, 'fixtures/mock-cert.pem'), 'utf-8')

describe('My Probot app', () => {
	let probot: any

	beforeEach(() => {
		nock.disableNetConnect()
		probot = new Probot({
			id: 123,
			privateKey,
			githubToken: "test",
			// disable request throttling and retries for testing
			Octokit: ProbotOctokit.defaults({
				retry: { enabled: false },
				throttle: { enabled: false },
			})
		})
		// Load our app into probot
		probot.load(myProbotApp)
	});

	test('onpush branch deletion do nothing', async () => {
		const mock = nock('https://api.github.com')
		await probot.receive({ name: 'push',  payload: pushdeletionpayload })
		expect(mock.pendingMocks()).toStrictEqual([])
	});

	test('onpush securityfixerbot author do nothing', async () => {
		const mock = nock('https://api.github.com')

		await probot.receive({ name: 'push',  payload: pushsecuritybotpayload })
		expect(mock.pendingMocks()).toStrictEqual([])
	});

	test('onpush check code if PR should be created', async () => {
		const mock = nock('https://api.github.com')

		await probot.receive({ name: 'push',  payload: pushpayload })
		expect(mock.pendingMocks()).toStrictEqual([])
	});
	
	test('onpush failure', async () => {
		const mock = nock('https://api.github.com')

		await probot.receive({ name: 'push',  payload: emptypayload })
		expect(mock.pendingMocks()).toStrictEqual([])
	});
	

	afterEach(() => {
		nock.cleanAll()
		nock.enableNetConnect()
	});
});

// For more information about testing with Jest see:
// https://facebook.github.io/jest/

// For more information about using TypeScript in your tests, Jest recommends:
// https://github.com/kulshekhar/ts-jest

// For more information about testing with Nock see:
// https://github.com/nock/nock
