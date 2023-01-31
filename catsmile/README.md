## Sett-up
1. Clone repository
2. Create a file `.env` 

## Run
node node/test.mjs

## Trouble & Solution
### Trouble
- Previously I experienced an error where no contract was found on behalf of my Inery account

 missing create.issuer (type=name)
    at Object.serializeStruct [as serialize] (/root/test/ineryjs/dist/ineryjs-serialize.js:607:27)
    at Object.serializeActionData (/root/test/ineryjs/dist/ineryjs-serialize.js:1390:12)
    at Object.serializeAction (/root/test/ineryjs/dist/ineryjs-serialize.js:1400:23)
    at Api.<anonymous> (/root/test/ineryjs/dist/ineryjs-api.js:369:67)
    at step (/root/test/ineryjs/dist/ineryjs-api.js:44:23)
    at Object.next (/root/test/ineryjs/dist/ineryjs-api.js:25:53)
    at fulfilled (/root/test/ineryjs/dist/ineryjs-api.js:16:58)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
Error: Unknown action destroy in contract catsmile
    at Object.serializeActionData (/root/test/ineryjs/dist/ineryjs-serialize.js:1387:15)
    at Object.serializeAction (/root/test/ineryjs/dist/ineryjs-serialize.js:1400:23)
    at Api.<anonymous> (/root/test/ineryjs/dist/ineryjs-api.js:369:67)
    at step (/root/test/ineryjs/dist/ineryjs-api.js:44:23)
    at Object.next (/root/test/ineryjs/dist/ineryjs-api.js:25:53)
    at fulfilled (/root/test/ineryjs/dist/ineryjs-api.js:16:58)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
### Solution
create again contract with your account inery
