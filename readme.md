# Trading bot

This is a simple script that interacts with OANDA API to trade currencies

Code is hosted on an AWS Lambda

### Feature list

- Open a trade with a correct stop-loss
- Specify a trading account

### To do list

- Update take profit orders
- Proper position sizing
- Update a stop-loss of an open trade (small)
- Backtesting (large)
- Configure cron to run every 15 minutes on the hour, not based on the deploy time

### Running locally

- Run `yarn build:watch` to start watching the files.
- (in another tab) Run `yarn start` to start the trader.

### Commands

- `yarn logs:day` - creates "logs.txt" file with the logs for the last 24h
