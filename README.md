# Project name: Tic-Tac-Toe
Here is a quick overview of my Tic-Tac-Toe game implementation.
## Game Link
[Tic-Tac-Toe Game](https://viktorolesnevych.github.io/tic-tac-toe/)
## Technologies used
Project is built with Vanilla Javascript, HTML and CSS using functional approach
## User stories
* As a user, I should be able to start a new tic tac toe game.
* As a user, I should be able to click on a square to add X first and then O, and so on.
* As a user, I should be have some notifiest about whose turn it is.
* As a user, I should not be able to click the same square twice.
* As a user, I should be shown a message when I win, lose or tie.
* As a user, I should be able to play the game again without refreshing the page.
## Wireframe
* In this current project AdobeXD was used to build a wireframe:
![Wireframe picture](https://raw.githubusercontent.com/viktorolesnevych/tic-tac-toe/master/TiTacPNGDesign.png)
## Main logic and features implemented
  I decided to move forward with functionl approach to solve the problem of the game logic. My idea was to store all winning combinations positions in a separate 
structure that then will be used to compare with the current game state. In this case, after each user action appalication compares positions on the board of a current
user and if he wins stops the game.
###### Additional features of the game
* Players can track multiple game rounds with a win, lose and draw counters which are shown on statistics table.
* If user loses connection, he can still get back his current game state together with previous game roonds statistics with a help of browser local storage.
* Some of the sound effects in the game
* Dark and White UI themes
* Web site responsiveness for mobile browsers
* AI implemented, which will definitely do his best to not let you win the game.
## Screenshots
![White theme](https://raw.githubusercontent.com/viktorolesnevych/tic-tac-toe/master/assets/whiteTheme.png)
![Dark theme](https://raw.githubusercontent.com/viktorolesnevych/tic-tac-toe/master/assets/blackTheme.png)
## Futere ideas
##### Some of my thoughts of how to make the game better:
* Keep working on styling; add more of animation effects, better design and different user tokens.
* Upgrade AI algorythm, add more different branches of how to overplay the user, add different AI levels like easy, medium, hard.
* Implement multiplayer :thinking:
