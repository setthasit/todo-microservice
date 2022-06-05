# Todo microservices

## Tech & Tools
This project was generated using [Nx](https://nx.dev).

### Backend: 
- Nest.js - Nest.js as a server-side API framework
- gRPC - use gPRC as a internal service call like from `bff-service` to `auth-service` will use gRPC, But `bff-service` will still accept HTTP request from clients.
- MongoDB - use MongoDB as a default datastore

## TODO:
- [ ] implement `account-service` and use it instead of `auth-service`
- [ ] refator auth module to not using account repository
- [ ] refactor todo logic correctness
- [ ] add unit test for all services(should not less than 70%)
- [ ] define proper design pattern for the project
- [ ] implement monitoring tools like Prometheus, Logger(LogStash)
- [ ] implement caching to reduce work load on read operation for DB, And to reduce latency from API call
- [ ] implement IaC like [Terraform](https://www.terraform.io/) or [Pulumi](https://www.pulumi.com/)
- [ ] implement graceful shutdown logic
- [ ] API document
