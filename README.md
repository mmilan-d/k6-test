# K6 nfr

K6 Performance and Stress Testing

## Session 1 - Installation
Install K6
Git Create Project
Locally Clone Project


Done !

## Write and Execute Sample Test




## Framework 
Contains 
Environment
Test Data
Utility - Common Functions 
Test Scripts - K6 Scripts

### Environment
- env.sh file- create file - contains sensitive data. This data willbe local. This file wot be checked-in to Git. Each employee in team will have env/.sh. It contains variables and values that can be declared as ENV variables inside CI/CD
Whats sensitive data ? - User Name, Password, Tokens, Secret Keys
It alos contains data whihc can be configured at the runtime. For example, number of virtual users - lets say you want to pass number of users at the runtime to k6 script For example, k6 run --vus 10, instead of 10 pass value from Env variable. 
So , there is no need to modify tets script. Just configure ENV value and users will be changed

- env.js file - env file
Lets assme that you are testing google.com
Then, internally in google project
there can be
Dev Environment - http://www.google-dev.com - developers are contonously pushing code here
Int Environment - http://www.google-int.com - testers are tetsing here, making sure that there are not critical defects, regresion defects
Prod Environment - http://www.gogole.com - Actual Google that is visible to the world, production envrionment

There can be many more environments

So we aretesting moodle
lets create files

There are 2 types of environment


#### Trend
- whats trend - Custom metrics ...lets check an example


### Lets create Git Pipeline

You want to execute K6 scripts in Ci/CD - Git Pipeline
So you need to create YML file
You can scedule to run Pipeline whenever you want
Whenever developer pushed code, they can trigger your Pipeline to find out if their new code changes/ merge/ changes has introduced any issues

We will execute sample scripts from test directory

Now lest checked the code
we will direclty checked-in code in master bracnh

For best prctises of checked-in code, please refer to GIT best practises

before that lets see env variables
if you have to use env.sh file, then you need to declare all variables inside CI/CD variables

This is how you can integrate K6 scripts with GIT PIPELINE

THANKS a lot


### Change USer Details
git config --global user.name "CtrlAltSkills Care"
git config --global user.email ctrlaltskills@gmail.com

### Some theory - 
Which runner to choose ? means
on which machine we shuld execute performance test
What should be ideal configuration of machine for executing k6 / performance tsts

Avoid Windows OS - Do not execute K6 test - actual K6 test with your project/ APIs on Windows. Windows is heavy weight OS

If you test scripts contaisn pure ES5+ scripts, very less dynamic data generation like you are generating too must data at the runtime as a part of your test scripts/ tets cases/ .. then 1VPC/ 2gb ram MIGHT BE ENOUGH TO EXECUTE TESTS WITH 100 vu

yOU CAN FOLLOW SCLAE UP APPROACH
sTART WITH sMALL

uSE aMAZON ec2 VMs
create VM with 1VPC, 1 GB RAM, install K6, execute tets with lest say 20-50 Virtual Users, see if it works check if there are any performance issues...check that there are no memory error - out of memroy while executing tests
Memory errors will be visibl on K6 console

You can also, logged in to AW EC2 console, verify memroy and CPU usage when your tests are running

Check that CPU usage is not very high > 90%, atleast 20% memory must remain free

Crate checlist of what things you will verify wile selecting runner

Many more things you can follow while chosing corrct runner/ machine to execute tests

If you choose incorrt runner/ machine configuration, then you might see higer repsonse, more failures, out of memory issues

So choose runner / machine carefully to execute k6 test cases
