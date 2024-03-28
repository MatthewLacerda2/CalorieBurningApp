Calories Burning App // FullStack Task

This was a mini-challenge aimed to measure a full-stack developer candidate skills for a project

On this project, ExerciseEntries can be registered, with 'exercise type', 'number of calories' and 'date' stored
Users can create accounts, login, CRUD exercise entries
There is also a Leaderboarder, showing which users have burned the most calories, and biggest current streak and record streak

---

Technical aspects

Everything is CRUDed via an ASP.NET Core JSON WebApi. The webapp uses Token Authentication and Authorization
The project's database is a MySQL container. Swagger UI is supported to help out with manual testing and debugging, as well as setting documentation

On the Front-End, we are using a React with Typescript project. Everything there is done via http requests. Glad to be using a Token on this

---

How to run:

You'll need .NET 8.0.103 SDK
https://dotnet.microsoft.com/en-us/download/dotnet/8.0

And Docker Desktop
https://www.docker.com/products/docker-desktop/

Once you do, you can download the 'mysql' image if you haven't already

docker pull mysql

Then, get the container online

docker run -d -p 3306:3306 --name mysql_container -e MYSQL_ROOT_PASSWORD=xpvista7810 -e MYSQL_DATABASE=sqlcalories -e MYSQL_USER=lendacerda -e MYSQL_PASSWORD=xpvista7810 mysql

Now, clone this repository, enter it's root folder and update the database

cd .\CalorieBurningApp.Server\
dotnet ef database update

Now you can run the project with `dotnet watch run`and burn some calories!

P.S.: i recommend you do this from a separate 'Terminal' window, as you'll have the BackEnd and FrontEnd both running with Hot-Reload in separate tabs
