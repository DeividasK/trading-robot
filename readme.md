# Trading bot

This is a simple script that interacts with OANDA API to trade currencies

Code is hosted on an AWS Lambda

## Strategies

**Moving Averages Cross-Over** (MACO) trading strategy
(description)

### Feature list

(xx/08/2018) Open a trade with a correct stop-loss
(01/09/2018) Specify a trading account
(01/09/2018) Add limit order to the MACO strategy

### To do list

- Implement backtesting functionality
- Do not issue trades during set hours (weekends)
- Add MACO strategy description
- Proper position sizing
- Update a stop-loss of an open trade (small)
- Backtesting (large)
- Configure cron to run every 15 minutes on the hour, not based on the deploy time

### Running locally

- Run `yarn build:watch` to start watching the files.
- (in another tab) Run `yarn start` to start the trader.

### Commands

- `yarn logs:day` - creates "logs.txt" file with the logs for the last 24h

### Misc

- Node 8.x is required, because `Replay` doesn't work with Node 9/10 and real network requests are made.
