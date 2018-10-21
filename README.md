# PerC

## Description
PerC is a project meant to encourage 10% donations of weekly expenditures completed via Monzo account. 
At the end of each week, the suggested donation amount is calculated according to the monitored expenditures. A user will be notified when the donation is ready to be confirmed and can either modify the amount to round it or just confirm it. Thus, the donation is processed from the user's Monzo account and when done, it is available in the transactions history.

PerC is a prototype and is mainly dedicated to Stewardship UK. (https://www.stewardship.org.uk)

## Monzo access keys
before running this, you will need to create a `config.json` file at the project root.
The file should be as follows: 
```
{
  "accountId": MONZO_ACCOUNT_ID
  "apiKey": MONZO_API_KEY
}
```
You can get your accountId and API key from monzo by visiting https://developers.monzo.com/ and signing in with your monzo account.

## Running
1. Clone the repo
2. run `npm install`
3. run `node index.js`

## Endpoints
There are two main endpoints that we used for the proof of concept:
1. `/weekly-donation` this simply returns a number that corresponds to 10% of the total of your monzo transactions
2. `/give/:amount` this posts an entry to your monzo feed that confirms the donation. *this is just aesthetic. no donation will actually be made*
