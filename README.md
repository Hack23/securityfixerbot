# securityfixerbot

> A GitHub App built with [Probot](https://github.com/probot/probot) that Security bot that will create PR with fixes

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
