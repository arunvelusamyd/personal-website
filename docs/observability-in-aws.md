# Observability in AWS

*By Arunkumar Velusamy · Aug 2023*

---

Before starting the Monitoring or Observability features of AWS, I would like to write down my thoughts on why and what we need to monitor in a few sentences. It was an interesting topic for me for the last few years. Because it's all about data, metrics, and analytics. Spent some time reading about Opentracing, OpenTelemetry, elastic search, kibana, grafana in the past.

## Why do we need to monitor our application?

Once application development is done, we deploy them into production. Now we have to make sure that it is running properly, working as expected & It is more stable. In case of full or partial outages, monitoring will help us to respond quickly, even before the application users report the outages or sometimes we can even avoid the outages. Monitoring will also help to improve performance and reduce application latency. We can also reduce costs. For example, if the trend is very low or there are not many requests to process, we can shut down some servers to reduce costs.

## What do we need to monitor?

we can monitor both technology metrics & application/business trends. When we say technology metrics, we can monitor/track the below metrics,

* CPU utilization
* Disk usage
* Thread counts
* Garbage collection
* Disk IO and etc

When we say application or business trends, we have to collect both metrics and application logs to monitor the trends based on,

* Number of successful logins
* Number of requests
* Payment failure

These will help to improve the stability, performance & user experience.

## Amazon CloudWatch

CloudWatch is to collect & track metrics of AWS resources, which we are using for our application. It is a metric repository. AWS resources like EC2 put metrics to this repository and we can retrieve statistics based on those metrics. We can also put our own custom metrics.

**Alarms & Events**

We can configure alarms that watch metrics and send notifications or automatically start/stop/terminate the resource when certain criteria are met. For example, we can monitor the CPU usage and disk reads and writes of our EC2 instances, then use that data to determine whether we should launch additional instances to handle the increased load or stop some when the load is very low. We can also set up only sending notifications to get some alerts & react based on the data/metrics.

## CloudWatch Metrics

Metrics are the fundamental concept in CloudWatch. A metric represents a time-ordered set of data points that are published to CloudWatch. Think of a metric as a variable to monitor and the data points as representing the values of that variable over time.

Metrics are data about the performance of your systems. AWS services such as EC2 instances, EBS volumes, RDS DB instances, will send data like CPU utilization, disk usage to CloudWatch. We can also publish custom metrics from our applications to CloudWatch. CloudWatch will load these metrics and allow us to search for data/metrics, view trends from the graph and create alarms.

Below are some of the terminologies we use in CloudWatch,  
**Namespaces**: A namespace is a container for CloudWatch metrics. There is no default namespace. You must specify a namespace for each data point you publish to CloudWatch.  
**Timestamps**: Each metric data point must be associated with a time stamp. If you do not provide a time stamp, CloudWatch creates a timestamp for you based on the time the data point was received.  
**Dimensions**: A dimension is a name/value pair that is part of the identity of a metric. You can assign up to 10 dimensions to a metric.

## CloudWatch logs

CloudWatch logs enable us to centralize the logs from all of our systems, application & AWS Services such as EC2 instances, AWS Lambda function executions, Cloud Trail, VPC flow logs, Route 53. We can send our own logs to CloudWatch.

CloudWatch Logs enables us to see all of our logs, regardless of their source, as a single and consistent flow of events ordered by time. We can query them and sort them based on other dimensions, group them by specific fields, create custom computations with a powerful query language, and visualize log data in dashboards.

**Alerts**: We can also create alerts based on some rules & can trigger when specified information is found, such as Out of memory error or HTTP error code 404 or any business exception.

**Log Groups** represent an application & logs from all resources of the application or we can also group them based on resource types.  
**Log Stream** represents instances & logs from instances within our application  
**Log event** is a record of some activity recorded by the application or resource being monitored.  
**Metric filters** to extract metric observations from ingested events and transform them to data points in a CloudWatch metric.  
**Retention settings** can be used to specify how long log events are kept in CloudWatch Logs.

## CloudWatch Events

Amazon CloudWatch Events delivers a near real-time stream of system events that describe changes in Amazon Web Services (AWS) resources. For example, EC2 instance start, EBS volume create/delete, CodeDeploy failure.

Using simple rules that you can quickly set up, you can match events and route them to one or more target functions or streams.

**Events**: An event indicates a change in your AWS environment. AWS resources can generate events when their state changes.  
**Rules**: A rule matches incoming events and routes them to targets for processing. A single rule can route to multiple targets, all of which are processed in parallel. Rules are not processed in a particular order. **Targets**: A target processes events. Targets can include Amazon EC2 instances, AWS Lambda functions, Kinesis streams, Amazon ECS tasks, Step Functions state machines, Amazon SNS topics, Amazon SQS queues, and built-in targets. A target receives events in JSON format.

### Amazon EventBridge

Amazon EventBridge is the advanced version to manage events. It uses the same CloudWatch Events API but provides more features than CloudWatch Events. It is the next version of CloudWatch Events.

Amazon EventBridge is a serverless event bus service that you can use to connect your applications with data from a variety of sources.

**Default event Bus**: When we use CloudWatch events, We actually use Default event Bus. It is generated by AWS services. But in EventBridge, multiple buses are added.  
**Partner event Bus**: it receives events from SaaS service or application.  
**Custom event Bus**: We can define our own custom event bus for our own application.

**Amazon EventBridge Schema**

A schema defines the structure of events that are sent to EventBridge. EventBridge provides schemas for all events that are generated by AWS services. You can also create or upload custom schemas or infer schemas directly from events on an event bus. It allows you to generate code for our application, that will know in advance how data is structured in the event bus. Schemas can be versioned.

## Cloud Trail

From the AWS documentation,

*AWS CloudTrail is an AWS service that helps you enable governance, compliance, and operational and risk auditing of your AWS account. Actions taken by a user, role, or an AWS service are recorded as events in CloudTrail.*

CloudWatch is all about performance, metrics, application logs, and alarms. But Cloud Trail records all user activity in our AWS account. The user activity can be from anywhere like AWS console, AWS CLI, AWS SDKs & APIs. It records events related to the creation, modification, or deletion of AWS resources such as IAM users, S3 Buckets, and EC2 instances.

It also delivers log files containing API calls to an S3 bucket. So It can be integrated with CloudWatch logs.

If we need an audit log of user activity in our AWS account, we have to use CloudTrail. CloudWatch is all about monitoring the application by its performance, metrics, logs, and creating alarms.

## X-Ray

Visual analysis of our application. We can see data/request flow into our application and can quickly see the dependencies of a service/API request or our application. This is so helpful when we have microservice-based architecture.

From AWS documentation,

AWS X-Ray is a service that collects data about requests that your application serves and provides tools that you can use to view, filter, and gain insights into that data to identify issues and opportunities for optimization.

X-ray is about visualizing & tracking the end-to-end flow of any request coming into our system. the request.

If your application is monolithic, then we may not need X-Ray to track the request. But when we have a microservice-based application, we need a tool like X-Ray to track the request flow. Because the request will flow through multiple services, before responding to the client. If there is any issue or error in the request, it is hard to figure out where the issue is.

X-Ray will help us to look at the end-to-end view of the request & figure out where the issue or error is & help to troubleshoot. we can also find out which service is taking too long to respond and that will help us to improve the application performance.

## X-Ray SDK & X-Ray Daemon

We can enable X-ray by importing X-Ray SDK in our code or by installing the X-Ray daemon.  
X-Ray SDK will capture the calls to AWS services, database calls & Calls to Queue(like SQS) and share them with AWS X-Ray.  
The AWS X-Ray daemon is a software application that listens for traffic on UDP port 2000, gathers raw segment data, and relays it to the AWS X-Ray API. We can also enable X-Ray AWS integration. If services like AWS Lambda that already been integrated with AWS X-Ray, then it will run the daemon. we don't need to do anything. But each application must have the IAM rights to write the data to X-Ray

## X-Ray Instrumentation

Instrumenting the application involves sending trace data for incoming and outbound requests and other events within the application, along with metadata about each request. There are three instrumentation options.

* **Auto instrumentation**: Instrument your application with zero code changes, typically via configuration changes, adding an auto-instrumentation agent, or other mechanisms.
* **Library instrumentation**: Make minimal application code changes to add pre-built instrumentation targeting specific libraries or frameworks, such as the AWS SDK, Apache HTTP clients, or SQL clients.
* **Manual instrumentation**: Add instrumentation code to your application at each location where we want to send trace information.

## X-Ray sampling

X-Ray SDK applies a sampling algorithm to determine which requests get traced. By default, the X-Ray SDK records the first request each second and five percent of any additional requests.

***Note****: CloudWatch is for overall metrics. X-Ray is for tracing. CloudTrail is for auditing the API calls.*
