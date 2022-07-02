# Waitlist 

The Waitlist app was created to help the Oak Lawn Child Care daycare have one unformed waitlist with the children's parents. The daycare can manage and view their waitlist while giving parents a place to have the most up to date information on it as well as having the ability to add their own children to it. The app consists of user authentication.
Hosted App: https://oaklawnchildcare-waitlist.netlify.app/

## How to run
1. Either fork or download the app and open the folder in the cli
2. Install all dependencies using the  `npm i` comand
3. Start hte web server using the `npm run local` command. The app will be served at http://localhost:3000/ (Normally)
4. Go to http://localhost:3000/ in your browser and use the app. 


## How to use
1. Due to the fact that your computer is not logged in the first time you enter the app, you must login using your email and password. 
2. Since you most likely do not have an account yet, however, click on the sign up link under instead.
3. There you have to fill in the input fields such as display name, email, and password. (You can now sign in with this information)
4. Once you have finished, click sign up. Once Firebase has registered your account, you will be transported to the dashboard page. 
5. In the dashboard page, you will have access to all of the waiting list. On the top-right you should see your display name.
6. To log out, click on 'Log Out' button on top-left portion of the screen.
7. To see one of of waitlists, click on one of the links at the bottom of the dashboard page. 
8. You will be transported to a page displaying all the information of the waitlist. Under the title, the current waitlist size is displayed.
9. Under that, you would see all the children that you registered for the waitllist. 
10. Since you have not registered any children yet, no children will show. You can change that by clicking on the 'Add your child to the Waitlist?' button.
11. To register a child, you must provide all necessary information such as child name, child age, parent full name, and parent contact info. 
12. Once you have entered all information, click on the 'Submit' button. If you would like to cancel registering a child, click on the 'X' at the top-right portion of the screen. 
13. If you clicked 'Submit', the page should reload and display all new information including the updated waitlist size and the child's information that you entered.
14. To edit child information, click on the 'Edit' button on the top-left portion of the box displaying the child information. 
15. If you clicked 'Edit', you will see a screens similar to the one registering the child for the waitlist expcept now the input fields are filled in.
16. To change a piece of information, simply enter the new information on whatever input field you would like to change. 
17. Once finished, click 'Update!'. After the page reloads, the new child information will show.  
18. To delete a child you registed, click on the 'Delete' button on the top-right portion of the box displaying the child information. 
19. The window will ask if you are sure you would like to delete the child's information, you can click yes if you are.
20. To return to the dashboard, either click on the dashboard button the top-left portion of the screen or click on the 'WAITLIST' button the navigation bar at the very top of the page. (On mobile devices, you must first open the drop down menu by clicking on the three bars at the top-left corner of the screen.  

*Documentation still in progress*
