# Startup
\
\
\
**STARTUP SPECIFICATION**
\
\
ELEVATOR PITCH
\
Have you ever gotten excited to have a movie night with the family or friends and then sat down and asked, "well.. What do you wanna watch?" and then get the response of "Well, whatever you want to watch."? Of course you have. All lot of times it can be hard to find good movies that you haven't seen before, especially when sketchy online forums and sites all have different ideas of which movies are the best. Well you no longer have to waste half an hour before binge watching a show you've seen 17 times. Inroducing Friendly Review, the website where you can follow trusted friends with similiar taste and see their ratings for a huge collection of movies. Now it's easy to find something new to watch from a trusted source without all of the hassle. \
\
KEY FEATURES 

- Leave ratings for movies that your friends can see 
- See top rated movies according to your friends as a group 
- See your friends individual movie ratings 
- Follow and unfollow those that have similar taste to and those you trust 
- Browse large collection of movies and see the movies all of our users like and don't like 
- Secure login over https
\
\
\
\
**SKETCHES**
\
\
\
![IMG_1181](https://github.com/JBrockbank/Startup/assets/132620463/a28035ec-8a19-4b11-9c30-c4f78a2a6e72)
![IMG_1180](https://github.com/JBrockbank/Startup/assets/132620463/17c12ea6-7159-42ad-9c2a-189a6d57c020)

\
\
TECHNOLOGIES 
- HTML - Uses correct HTML structure. 4 Different HTML Pages for Login, Home, Ratings, and Profile
- CSS - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- JavaScript - Provides login, page navigation between the different views, interacting with the page
- Service - Backend service with endpoints for:
  - login
  - Movie database
  - Submitting Ratings
  - retrieving personal and others ratings
- DB - Store users, movie ratings for users, and movie database
- Login - Register and login users. Credentials securely stored in database. Can't see movies or rate movies unless authenticated.
- WebSocket - When users submit movie ratings, their raitings are viewable to all other users following them.
- React - Application ported to use the React web framework.



