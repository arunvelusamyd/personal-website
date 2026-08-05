# AWS Serverless

*By Arunkumar Velusamy · Oct 2023*

---

Serverless allows developers to run application code in the cloud without worrying about managing any servers. It does not mean that there are no servers. AWS takes care of infrastructure management so that developers can only focus on writing code & deploying them. When I started reading serverless, it sounded like what I read about AWS, where you don't need to manage any infra. But it is more interesting, Once I know the details.

Actually, we shall be writing & deploying functions. we do not need to manage / provision any servers or even see them. AWS takes care of patching the underlying operating system, Autoscaling & high availability and etc. **Serverless applications are event-driven and we are only charged when our code is executed**. This is something we have to note down. If you are running an EC2 instance, you have to pay even if our code is not really running or not serving any request.

Here are some examples of serverless technologies in AWS

* Lamda
* DynamoDB
* Cognito
* API GAteway
* Amazon S3
* SNS
* SQS
* Kinesis Data Firehose
* Aurora Serverless

If we deep dive into AWS lambda, we can get a better understanding of what serverless is.

```
example.com/profile?customer=retail&customer=priority
```

## Lamda integration with S3 event notifications & CloudWatch Events

This is an example of Asynchronous type invocation.

## Lamda Permissions

Lamda Execution Role(IAM) : Grants Lamda function permissions to AWS service/resources. Below are some examples of managed policies for Lamda. We can also create our own policies for Lamda.

* AWSLamdaBasicExecutionRole — Upload logs to CloudWatch
* AWSLamdaKinesisExecutionRole — Read from Kinesis
* AWSLamdaDynamoDBExecutionRole — Read from DynamoDB streams
* AWSLamdaVPCAccessExecutionRole — Deploy Lamda functions in VPC

Lamda Resource Based Policies : Give other accounts & AWS services permission to use our Lamda resources.

## Read more

Read more about monitoring , FaaS (Function as a service), external dependencies, container images, deployments and Pricing. When I am reading this, below is the pricing

```
Free tier of 1,000,000 AWS Lambda requests and 400,000 GBs of compute time
$0.20 per 1 million requests thereafter ($0.0000002 per request)

Pay per duration: (in increment of 1 ms)
400,000 GB-seconds of compute time per month if Free.
== 400,000 seconds if function is 1 GB RAM
== 320,000 seconds if function is 128 MB RAM
After that $1.00 for 600,000 GB-seconds
```
