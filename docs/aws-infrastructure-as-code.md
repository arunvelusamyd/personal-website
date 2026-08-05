# AWS — Infrastructure as Code

*By Arunkumar Velusamy · Oct 2023*

---

While reading more about AWS & its resources, Just came across the term Infrastructure as Code(IaC) in many places like Amazon Elastic Beanstalk(EB), CloudFormation, SAM(Serverless Application Model) and AMS CDK(Cloud Development Kit).

So like to explore a bit more about Infrastructure as Code and like to understand the concepts & differences between EB, CDK, SAM, CloudFormation.

## Infrastructure as Code

Wikipedia definition, Infrastructure as Code (IaC) is the process of managing and provisioning computer data centres through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.

We do not need to buy physical hardware & wire them together to set up your data centres and We do not need to use AWS console or CLI every time to set up your data centres.

You can create your own data centre at any time by writing some program or configuration template which can be reused at any time later to recreate the data centre with the same setup. We can easily upgrade and change using the already written code.

## CloudFormation

CloudFormation allows us to declare AWS resources in a template file, which will then be used to create an infrastructure that we need to run our applications.

we can use a template to create, update and delete an entire stack as a single unit, instead of managing resources individually. We can delete or recreate the entire infrastructure on the fly.

It is declarative programming used to code our infrastructure. Write your infrastructure once & launch them as many as you want in any region using any account.

## AWS CDK

We can use AWS CDK(Cloud development Kit) to define our infrastructure using a familiar programming language like Java, Javascript, Python, .NET. The program will then be compiled into a CloudFormation template. Read more about CDK CLI, CDK synth & constructs.

## AWS Elastic Beanstalk

AWS Elastic Beanstalk enables you to manage all of the resources that run your application as an environment. It helps to run & manage web apps easily.

We can easily deploy & scale web applications without worrying about the underlying AWS resources like EC2, ELB. All we need to do is just upload our code & select the platforms to run the application.

Under the hood, Elastic Beanstalk relies on CloudFormation. We can define CloudFormation resources in .ebextensions. Beanstalk is free but we have to pay for the underlying instances.

## Serverless Application Model

SAM is used to define Serverless applications using CloudFormation. We can write code for 3 serverless resource types, Lambda, API Gateway, DynamoDB. SAM CLI will help to package & deploy our code.
