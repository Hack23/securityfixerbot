# securityfixerbot

> A GitHub App built with [Probot](https://github.com/probot/probot) that Security bot that will create PR with fixes

[![license](https://img.shields.io/github/license/Hack23/securityfixerbot.svg)](https://raw.githubusercontent.com/Hack23/securityfixerbot/master/LICENSE)
[![CLA assistant](https://cla-assistant.io/readme/badge/Hack23/securityfixerbot)](https://cla-assistant.io/Hack23/securityfixerbot)
[![Build Status](https://travis-ci.org/Hack23/securityfixerbot.svg?branch=master)](https://travis-ci.org/Hack23/securityfixerbot)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=securityfixerbot&metric=ncloc)](https://sonarcloud.io/dashboard?id=securityfixerbot)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=securityfixerbot&metric=sqale_index)](https://sonarcloud.io/dashboard?id=securityfixerbot)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=securityfixerbot&metric=coverage)](https://sonarcloud.io/dashboard?id=securityfixerbot)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/Hack23/securityfixerbot.svg)](http://isitmaintained.com/project/Hack23/securityfixerbot "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/Hack23/securityfixerbot.svg)](http://isitmaintained.com/project/Hack23/securityfixerbot "Percentage of issues still open")
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=securityfixerbot)](https://sonarcloud.io/dashboard?id=securityfixerbot)


## Setup

```sh
# Install dependencies
npm install

# Compile
npm run build

# Run
npm run start
```

## Docker

```sh
# 1. Build container
docker build -t securityfixerbot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> securityfixerbot
```

## Contributing

If you have suggestions for how securityfixerbot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2020 James Pether Sörling <james@hack23.com>
