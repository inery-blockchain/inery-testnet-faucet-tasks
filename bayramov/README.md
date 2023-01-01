```
    curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
    sudo apt-get install -y nodejs
    ```

    

  - [Windows Installation](https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi)

- npm

  - Ubuntu

  ```
  sudo apt install npm
  ```


### Installation

1. Clone the repo

   ```
   git clone https://github.com/alteregogi/ineryjs.git
   ```

2. Change directory to cloned repo

   ```
   cd ineryjs
   ```

3. Install NPM packages

   ```
   npm install
   ```

4. Copy `.env-sample` and rename it to `.env`

   ```
   cp .env-sample .env
   ```

5. Edit ```.env``` file with your information



## Usage

Run RPC Example

```
npm run rpc-example
```
