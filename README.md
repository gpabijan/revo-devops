
## Description

Task for Revolut DevOps Role.

## Running the app locally

### in Docker
```bash
$ docker-compose up

```
will create 2 separate containers: one 
with DB and one with the application.


## Test

I created only one basic test.

```bash
# unit tests
$ npm run test

```
## Deployment to K8s
to deploy the application, simply push code to ```master``` branch.
Buddy Works will automatically start the build and deploy the 
new pod.

##Pipeline
1. User push the code to repository
2. Github send Webhook to BuddyWorks
3. Buddy is building the docker container
 and push it to Google Repository
 ![alte text](buddyworks.png)
4. The last step of Buddy is to deploy
 new image/deployment on K8s cluster 
5. K8s is rolling update new application with zero downtime\

![alt text](image.png)

## Kubernetes

App is using standard secrets and configmap from K8s resources:
![alt_text](secrets_cm.png)

App is avalaible at:
```http://35.234.128.102:8080/hello/```
