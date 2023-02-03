1. Install PHP on your machine, if you don't have it already installed. You can check if you have PHP installed by running `php -v` in your terminal. 
2. Install the `phpdotenv` library, which allows you to manage environment variables. You can install it using Composer by running the following command in your terminal: `composer require vlucas/phpdotenv`.
3. Create .env and change its value

```
cp .env-test .env
```

4. change env variable to match with your info

```
TOKEN_CONTRACT=<account-name>
ISSUER_ACCOUNT=<account-name>
TOKEN_SYMBOL=<symbol>
TOTAL_SUPPLY=<total-supply>
PRIVATE_KEY=<private-key>
```

5. Run the script by executing the following command in your terminal:

```
php createNewToken.php
```

