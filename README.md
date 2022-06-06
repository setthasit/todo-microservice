# Todo microservices

## Tech & Tools
This project was generated using [Nx](https://nx.dev).

### Backend: 
- Nest.js - Nest.js as a server-side API framework
- gRPC - use gPRC as a internal service call like from `bff-service` to `auth-service` will use gRPC, But `bff-service` will still accept HTTP request from clients.
- MongoDB - use MongoDB as a default datastore

## TODO
- [ ] implement `account-service` and use it instead of `auth-service`
- [ ] refator auth module to not using account repository
- [ ] refactor todo logic correctness
- [ ] add unit test for all services(should not less than 70%)
- [ ] define proper design pattern for the project
- [ ] implement monitoring tools like Prometheus, Logger(LogStash)
- [ ] implement caching to reduce work load on read operation for DB, And to reduce latency from API call
- [ ] Docker file for building image and deployment
- [ ] CI/CD script for Github Action
- [ ] implement IaC like [Terraform](https://www.terraform.io/) or [Pulumi](https://www.pulumi.com/)
- [ ] implement graceful shutdown logic
- [ ] API document

## How to run
### Run in Local Machine
1. run `yarn install` at the root of the project
2. change the `env.example` file name to `.env`
3. run `yarn start:all` to start the all the service
4. `bff-service` should running on http://localhost:3333 according to `.env` file
5. import Postman collection `TodoMicroservice.postman_collection.json` into Postman
