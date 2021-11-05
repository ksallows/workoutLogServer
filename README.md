/user/register 	POST 	    Allows a new user to be created with a username and password.

![POST /user/register - postman](readmeImages/Postman_6jglnTYdch.png)

/user/login 	POST 	    Allows log in with an existing user.

![POST user/login - postman](readmeImages/Postman_HofMIOneZF.png)

/log/           POST 	    Allows users to create a workout log with descriptions, definitions, results, and owner properties.

![POST /log/ - postman](readmeImages/Postman_mzIe6waRdK.png)
![POST /log/ - pgAdmin](readmeImages/pgAdmin4_YuyJEF1pGl.png)

/log/           GET 	    Gets all logs for an individual user.

![GET /log/ - postman](readmeImages/Postman_nJIDFzrmyg.png)

/log/:id        GET         Gets individual logs by {{id}} for an individual user.

![GET /log/:id - postman](readmeImages/Postman_vFQy8GSIUB.png)

/log/:id        PUT 	    Allows individual logs to be updated by a user.

![PUT /log/:id - postman](readmeImages/Postman_QY1yAztjPp.png)

/log/:id 	    DELETE 	    Allows individual logs to be deleted by a user.

![DELETE /log/:id - postman](readmeImages/Postman_HofMIOneZF.png)
![DELETE /log/:id - pgAdmin](readmeImages/pgAdmin4_0QLKdkmMmy.png)